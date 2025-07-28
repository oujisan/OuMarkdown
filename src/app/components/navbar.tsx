'use client'

import { useState } from "react"
import Link from 'next/link'
import Image from 'next/image'

type NavbarProps = {
  title?: string
  slug: string
}

export default function Navbar({ title, slug }: NavbarProps) {

  const [copiedSlug, setCopiedSlug] = useState<string | null>(null)

  const handleCopy = async (slug: string) => {
    try {
      await navigator.clipboard.writeText(`${location.origin}/${slug}`)
      setCopiedSlug(slug)
      setTimeout(() => setCopiedSlug(null), 2000)
    } catch {
      alert("Failed copy markdown's URL")
    }
  }

  const handleShare = async (slug: string) => {
    const url = `${location.origin}/${slug}`
      if (navigator.share) {
        await navigator.share({
          title: `${title}`,
          text: 'Shared from OuMarkdownn',
          url,
        })
      } else {
        await navigator.clipboard.writeText(url)
        alert("Link copied! Sharing not supported on this browser.")
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

  return (
    <header className="sticky top-0 z-50 mb-4 w-full bg-[var(--color-bg)] text-[var(--color-text-light)] shadow-sm backdrop-blur-md">
      <nav className="w-full">
        <div className="max-w-screen-xl mx-auto py-4 px-4 sm:px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-3 items-center">
            <div className="flex items-center">
              <Link href="/" className="flex items-center h-full" aria-label="Fumori Home">
                <Image 
                  src="/fumori.svg" 
                  alt="Fumori Logo" 
                  width={20} 
                  height={20} 
                  className="h-5 w-auto" 
                />
              </Link>
            </div>
            <div className="text-center text-sm font-mono text-[var(--color-gray)] max-w-[80%] mx-auto">
              <p
                className="
                  overflow-hidden whitespace-nowrap text-ellipsis
                  sm:overflow-hidden sm:whitespace-nowrap sm:text-ellipsis
                  md:whitespace-normal md:overflow-visible md:text-clip
                "
                title={title}
              >
                {title}
              </p>
            </div>
            <div className="flex gap-3 items-center justify-end pr-2 sm:pr-4 md:pr-6 lg:pr-10">
              <button
                onClick={() => handleCopy(slug)}
                className="opacity-30 hover:opacity-100 duration-200 cursor-pointer p-1 rounded-md border transition-all hover:border-[var(--color-gray)] hidden sm:block"
                title="Copy"
              >
                {copiedSlug === slug ? (
                  <Image 
                    src="/check.svg" 
                    alt="Copied" 
                    width={20} 
                    height={20} 
                    className="w-auto h-6 sm:h-5" 
                  />
                ) : (
                  <Image 
                    src="/copy.svg" 
                    alt="Copy Link" 
                    width={20} 
                    height={20} 
                    className="w-auto h-6 sm:h-5" 
                  />
                )}
              </button>
              <button
                onClick={() => handleDownload(slug)}
                className="opacity-30 hover:opacity-100 duration-200 cursor-pointer p-1 rounded-md border transition-all hover:border-[var(--color-gray)] hidden sm:block"
                title="Download"
              >
                <Image 
                  src="/download.svg" 
                  alt="Download" 
                  width={20} 
                  height={20} 
                  className="w-auto h-6 sm:h-5" 
                />
              </button>
              <button
                onClick={() => handleShare(slug)}
                className="opacity-30 hover:opacity-100 duration-200 cursor-pointer p-1 rounded-md border transition-all hover:border-[var(--color-gray)]"
                title="Share"
              >
                <Image 
                  src="/share.svg" 
                  alt="Share" 
                  width={20} 
                  height={20} 
                  className="w-auto h-5" 
                />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}