import { getMarkdown } from '@/app/lib/github_api'
import { serialize } from 'next-mdx-remote/serialize'
import ClientWrapper from './client-wrapper'
import 'highlight.js/styles/nord.css'
import Navbar from '@/app/components/navbar'
import Breadcrumb from '../components/breadcrumb'

type PageProps = {
  params: Promise<{ slug: string }>
}

export default async function ViewerPage({ params }: PageProps) {
  const awaitedParams = await params;
  const slug = awaitedParams.slug;

  let mdx = null;
  let errorMessage = '';
  let title = '';

  try {
    const result = await getMarkdown(slug);
    title = result.title;

    if (!result.filteredContent) {
      errorMessage = 'Catatan tidak ditemukan.';
    } else {
      mdx = await serialize(result.filteredContent);
    }
  } catch (err) {
    console.error('❌ Error saat memuat markdown:', err);
    errorMessage = 'Terjadi kesalahan saat memuat konten.';
  }

  return (
    <div>
      <Navbar title={title} slug={slug} />
      <div className='max-w-4xl mx-auto px-4 sm:px-8'>
        <Breadcrumb current={slug} />
        {errorMessage ? (
          <div className="mt-10 p-6 rounded-xl bg-red-500/10 border border-red-500 text-red-300 font-mono">
            ⚠️ {errorMessage}
          </div>
        ) : (
          <ClientWrapper mdx={mdx!} />
        )}
      </div>
    </div>
  );
}