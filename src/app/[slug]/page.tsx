import { getMarkdown } from '@/app/lib/github_api'
import { serialize } from 'next-mdx-remote/serialize'
import ClientWrapper from './client-wrapper'
import 'highlight.js/styles/nord.css'
import Navbar from '@/app/components/navbar'
import Breadcrumb from '../components/breadcrumb'

type PageProps = {
  params: { slug: string }
}

export default async function ViewerPage({ params }: PageProps) {
  const awaitedParams = await params;
  const slug = awaitedParams.slug;

  const post = await getMarkdown(slug);

  if (!post) return <div>Markdown not found.</div>

  const mdx = await serialize(post)

  return (
    <div>
        <Navbar />
        <div className='max-w-4xl mx-auto px-4 sm:px-8'>
            <Breadcrumb current={slug}/>
        </div>
        <ClientWrapper mdx={mdx} />
    </div>
  )
}