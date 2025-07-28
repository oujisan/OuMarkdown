'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getGitHubRateLimit, RateLimitInfo } from '@/app/lib/github_api'

interface NavbarProps {
  onSearchChange?: (search: string) => void
}

export default function Navbar({ onSearchChange }: NavbarProps) {
  const [search, setSearch] = useState('')
  const [rate, setRate] = useState<RateLimitInfo | null>(null)
  const [countdown, setCountdown] = useState('')

  useEffect(() => {
    getGitHubRateLimit().then(setRate)
  }, [])

  useEffect(() => {
    if (!rate) return

    const interval = setInterval(() => {
      const now = Math.floor(Date.now() / 1000)
      const diff = rate.reset - now

      if (diff <= 0) {
        setCountdown('00:00')
        clearInterval(interval)

        getGitHubRateLimit().then(setRate)
        return
      }

      const minutes = Math.floor(diff / 60)
      const seconds = diff % 60
      setCountdown(
        `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
      )
    }, 1000)

    return () => clearInterval(interval)
  }, [rate])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearch(value)
    onSearchChange?.(value)
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-[var(--color-bg)] text-[var(--color-text-light)] shadow-sm backdrop-blur-md">
      <nav className="w-full">
        <div className="max-w-screen-xl mx-auto py-4 px-4 sm:px-6 md:px-10 lg:px-16">

          {/* Header Grid */}
          <div className="grid grid-cols-3 items-center mb-2">
            {/* Logo */}
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

            {/* Title */}
            <div className="text-center">
              <p className="font-semibold text-lg">OuMarkdown</p>
              <p className="text-xs font-mono text-[var(--color-gray)]">
                {rate ? (
                  <>
                    Rate {rate.remaining}/{rate.limit}
                    {rate.remaining < rate.limit && ` • Resets in ${countdown}`}
                  </>
                ) : (
                  'Loading rate limit...'
                )}
              </p>
            </div>

            {/* GitHub */}
            <div className="flex items-center justify-end gap-4">
              <a
                href="https://github.com/oujisan"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-1 rounded-md border border-transparent transition-all hover:border-[var(--color-gray)]"
              >
                <Image 
                  src="/github.svg" 
                  alt="GitHub" 
                  width={24} 
                  height={24} 
                  className="h-6 w-auto" 
                />
              </a>
              <a
                href="https://discordapp.com/users/747625893928763393"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Discord"
                className="p-1 rounded-md border border-transparent transition-all hover:border-[var(--color-gray)] hidden sm:block"
              >
                <Image 
                  src="/discord.svg" 
                  alt="Discord" 
                  width={24} 
                  height={24} 
                  className="h-6 w-auto" 
                />
              </a>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex justify-center mb-2 mt-8">
            <div className="flex items-center border-x-2 border-[#2a6fd1] rounded-full px-4 py-2 bg-[#161b22] gap-3 w-full max-w-2xl">
              <Image 
                src="/search.svg" 
                alt="Search icon"
                width={24} 
                height={24} 
                className="h-6 w-auto" 
              />
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={handleSearchChange}
                className="w-full outline-none bg-transparent text-white placeholder-gray-400"
              />
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}