import axios, { AxiosError } from 'axios'

const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN || process.env.GITHUB_TOKEN
console.log('Token exists:', !!token)
console.log('Token prefix:', token?.substring(0, 10))

export const api = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Accept: "application/vnd.github+json",
    Authorization: token ? `Bearer ${token}` : '',
    'X-GitHub-Api-Version': '2022-11-28'
  }
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('GitHub API Authentication failed. Check your token.')
    }
    return Promise.reject(error)
  }
)

export interface githubApiFileMeta {
  name: string
  sha: string
  path: string
}

export interface markdown {
  title: string
  slug: string
  category: string
}

export interface logMessage {
  code: number
  message: string
}

function extractTitle(content: string): {
  title: string;
  category: string;
  filteredContent: string;
} {
  const lines = content.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();

    if (/^#\s+/.test(trimmed)) {
      const rawTitle = trimmed.replace(/^#\s*/, "").trim();
      const match = rawTitle.match(/^\[(.+?)\]\s*(.*)$/);

      if (match) {
        const [, category, titleWithoutCategory] = match;
        lines[i] = `# ${titleWithoutCategory.trim()}`;

        return {
          title: titleWithoutCategory.trim(),
          category: category.trim().toLowerCase(),
          filteredContent: lines.join("\n"),
        };
      }

      return {
        title: rawTitle,
        category: "note",
        filteredContent: content,
      };
    }
  }

  const fallback = content
    .replace(/^#*/, "")
    .replace(/\s+/g, " ")
    .slice(0, 100)
    .trim();

  return {
    title: fallback || "Untitled",
    category: "note",
    filteredContent: content,
  };
}

export async function getAllMarkdown(): Promise<markdown[]> {
  try {

    const response = await api.get<githubApiFileMeta[]>(
      'repos/oujisan/OuVault/contents'
    );

    console.log('API Response status:', response.status)

    const files = response.data.filter(
      (file) =>
        file.name.endsWith(".md") &&
        file.name.toLowerCase() !== "readme.md"
    );

    if (files.length === 0) {
      return [];
    }

    const markdowns = await Promise.all(
      files.map(async (file) => {
        const slug = file.name.replace(/\.md$/, "");

        try {
          const res = await api.get(`repos/oujisan/OuVault/contents/${file.name}`);
          const base64 = res.data.content;
          const content = atob(base64);
          const { title, category } = extractTitle(content);

          return { title, slug, category };
        } catch (fileError) {
          console.warn(`Failed to fetch content for ${file.name}:`, fileError);
          return {
            title: file.name.replace(/\.md$/, ""),
            slug,
            category: 'note'
          };
        }
      })
    );

    return markdowns;
  } catch (error) {
    const axiosError = error as AxiosError;
    const status = axiosError.response?.status;
    const message = axiosError.message;

    console.error('GitHub API Error:', {
      status,
      message,
      response: axiosError.response?.data
    });

    const log: logMessage = {
      message: error instanceof Error ? message : "Unknown error occurred",
      code: status || 500,
    };
    throw log;
  }
}

export async function getMarkdown(slug: string) {
  try {
    if (!token) {
      throw new Error('GitHub token is missing. Check your .env.local file.')
    }

    const filename = `${slug}.md`;
    const res = await api.get(`repos/oujisan/OuVault/contents/${filename}`);

    const base64 = res.data.content;
    const decoded = atob(base64);
    const { title, filteredContent } = extractTitle(decoded);

    return {title, filteredContent};
  } catch (error) {
    const axiosError = error as AxiosError;
    const status = axiosError.response?.status;
    const message = axiosError.message;

    console.error('GitHub API Error:', {
      status,
      message,
      response: axiosError.response?.data
    });

    const log: logMessage = {
      message: error instanceof Error ? message : "Unknown error occurred",
      code: status || 500,
    };
    throw log;
  }
}

export interface RateLimitInfo {
  limit: number
  remaining: number
  reset: number
}

export async function getGitHubRateLimit(): Promise<RateLimitInfo | null> {
  try {
    if (!token) {
      console.warn('No GitHub token available for rate limit check')
      return null
    }

    const res = await api.get('/rate_limit');
    const { limit, remaining, reset } = res.data.rate;

    return { limit, remaining, reset };
  } catch (error) {
    console.error('Failed to get rate limit:', error);
    return null;
  }
}