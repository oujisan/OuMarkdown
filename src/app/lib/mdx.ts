import { serialize } from 'next-mdx-remote/serialize'
import type { MDXRemoteSerializeResult } from 'next-mdx-remote'
import rehypeHighlight from 'rehype-highlight'

import { getMarkdown } from '@/app/lib/github_api'

export async function fetchAndSerializeMDX(
  slug: string
): Promise<MDXRemoteSerializeResult | null> {
  try {
    const content = await getMarkdown(slug)

    if (!content) return null

    const mdxSource = await serialize(content, {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [rehypeHighlight],
      },
    })

    return mdxSource
  } catch (err) {
    console.error('❌ Error serializing MDX:', err)
    return null
  }
}
