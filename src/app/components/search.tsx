'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { markdown } from '@/app/lib/github_api'

type md = {
  markdowns: markdown[]
  searchQuery?: string
}

export default function Search({ markdowns, searchQuery = '' }: md) {
  const [search, setSearch] = useState(searchQuery)
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null)
  const [loadingSlug, setLoadingSlug] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    setSearch(searchQuery)
  }, [searchQuery])

  const currentSearch = searchQuery || search

  const handleCopy = async (slug: string) => {
    try {
      await navigator.clipboard.writeText(`${location.origin}/notes/${slug}`)
      setCopiedSlug(slug)
      setTimeout(() => setCopiedSlug(null), 2000)
    } catch {
      alert("Failed copy markdown's URL")
    }
  }

  const handleShare = async (slug: string) => {
    const url = `${location.origin}/${slug}`
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Lihat catatan ini',
          text: 'Markdown ini mungkin berguna untukmu.',
          url,
        })
      } else {
        await navigator.clipboard.writeText(url)
        alert('Link disalin karena fitur Share tidak didukung browser ini.')
      }
    } catch {
      alert('Gagal membagikan tautan.')
    }
  }

  const handleDownload = async (slug: string) => {
    try {
      const githubRawUrl = `https://raw.githubusercontent.com/oujisan/OuVault/main/${slug}.md`

      const res = await fetch(githubRawUrl)
      if (!res.ok) throw new Error('Failed get markdown')

      const data = await res.text()
      const blob = new Blob([data], { type: 'text/markdown' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${slug}.md`
      a.click()
      URL.revokeObjectURL(url)
    } catch {
      alert('Failed download markdown')
    }
  }

  const handleNavigate = (slug: string) => {
    setLoadingSlug(slug)
    setTimeout(() => {
      router.push(`/${slug}`)
    }, 50)
  }

  const filtered = markdowns
    .filter(
      (md) =>
        typeof md.title === 'string' &&
        typeof md.slug === 'string' &&
        typeof md.category === 'string'
    )
    .filter((md) => {
      if (currentSearch.startsWith('#')) {
        const categoryQuery = currentSearch.slice(1).toLowerCase().trim()
        return md.category.toLowerCase().includes(categoryQuery)
      } else {
        return md.title.toLowerCase().includes(currentSearch.toLowerCase())
      }
    })

  return (
    <div className="max-w-2xl mx-auto">
      {/* Result List */}
      {filtered.length === 0 ? (
        <p className="text-center text-gray-400">No results found.</p>
      ) : (
        filtered.map((post) => (
          <div
            key={post.slug}
            className="border border-[#30363d] hover:border-[#2a6fd1] rounded-xl p-4 flex justify-between items-center mb-3 hover:bg-[#161b22] transition-colors cursor-pointer"
          >
            {/* Clickable Title */}
            <button
              onClick={() => handleNavigate(post.slug)}
              className="flex gap-4 items-center w-full min-w-0 text-left cursor-pointer"
            >
              <Image
                src={
                  post.category
                    ? `/category/${post.category}.svg`
                    : '/note.svg'
                }
                alt={post.category || 'note'}
                width={24}
                height={24}
                className="h-6 w-auto"
              />
              <p className="font-semibold break-words">{post.title}</p>
            </button>

            {/* Action Buttons */}
            <div className="flex gap-4 items-center ml-4">
              <button
                onClick={() => handleCopy(post.slug)}
                className="opacity-30 hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                title="Copy"
              >
                {copiedSlug === post.slug ? (
                  <Image 
                    src="/check.svg" 
                    alt="Copied" 
                    width={20} 
                    height={20} 
                    className="w-auto h-9 sm:h-7" 
                  />
                ) : (
                  <Image 
                    src="/copy.svg" 
                    alt="Copy Link" 
                    width={20} 
                    height={20} 
                    className="w-auto h-9 sm:h-7" 
                  />
                )}
              </button>
              <button
                onClick={() => handleDownload(post.slug)}
                className="opacity-30 hover:opacity-100 transition-opacity duration-200 cursor-pointer "
                title="Download"
              >
                <Image 
                  src="/download.svg" 
                  alt="Download" 
                  width={20} 
                  height={20} 
                  className="w-auto h-9 sm:h-7" 
                />
              </button>

              <button
                onClick={() => handleShare(post.slug)}
                className="opacity-30 hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                title="Share"
              >
                <Image 
                  src="/share.svg" 
                  alt="Share" 
                  width={20} 
                  height={20} 
                  className="w-auto h-9 sm:h-7" 
                />
              </button>

            </div>
          </div>
        ))
      )}

      {/* Fullscreen Loading Spinner */}
      {loadingSlug && (
        <div className="fixed inset-0 z-50 bg-[#0d1117] backdrop-blur-sm flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-4 border-white border-t-transparent rounded-full" />
        </div>
      )}
    </div>
  )
}