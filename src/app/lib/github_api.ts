import axios from 'axios'

export const api = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Accept: "application/vnd.github+json",
    'X-GitHub-Api-Version': '2022-11-28'
  }
})

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

// --- Ekstrak judul dan kategori dari isi markdown ---
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

// --- Normalisasi slug menjadi nama file aman ---
function normalizeFilename(slug: string): string {
  const safeSlug = slug
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "");

  return safeSlug.endsWith(".md") || safeSlug.endsWith(".mdx")
    ? safeSlug
    : `${safeSlug}.mdx`;
}

export async function getAllMarkdown(): Promise<markdown[]> {
  try {
    const response = await api.get<githubApiFileMeta[]>(
      'repos/oujisan/OuVault/contents'
    );

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
        } catch (err: any) {
          return {
            title: file.name.replace(/\.md$/, ""),
            slug,
            category: 'note'
          };
        }
      })
    );

    return markdowns;
  } catch (error: any) {
    const status = axios.isAxiosError(error) && error.response?.status;
    const message = error.message;

    const log: logMessage = {
      message: error instanceof Error ? message : "Unknown error occurred",
      code: status || 500,
    };
    throw log;
  }
}

export async function getMarkdown(slug: string) {
  try {
    const filename = `${slug}.md`;
    const res = await api.get(`repos/oujisan/OuVault/contents/${filename}`);

    const base64 = res.data.content;
    const decoded = atob(base64);
    const { title, filteredContent } = extractTitle(decoded);

    return {title, filteredContent};
  } catch (error: any) {
    const status = axios.isAxiosError(error) && error.response?.status;
    const message = error.message;

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
    const res = await api.get('/rate_limit');
    const { limit, remaining, reset } = res.data.rate;

    return { limit, remaining, reset };
  } catch (err) {
    return null;
  }
}
