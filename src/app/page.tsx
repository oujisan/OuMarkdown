'use client'

import { useState, useEffect } from 'react'
import Search from './components/search'
import Navbar from './components/navbar-search'
import { getAllMarkdown, markdown } from '@/app/lib/github_api'
import RouteLoadingIndicator from '@/app/components/route-loading-indikator'

export default function Home() {
  const [markdowns, setMarkdowns] = useState<markdown[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMarkdowns = async () => {
      try {
        const data = await getAllMarkdown()
        setMarkdowns(data)
      } catch (error) {
        console.error('Failed to fetch markdowns:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMarkdowns()
  }, [])

  const handleSearchChange = (search: string) => {
    setSearchQuery(search)
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar onSearchChange={handleSearchChange} />
        <div className="p-6 flex items-center justify-center">
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navbar onSearchChange={handleSearchChange} />
      <div className="pt-4 px-6">
        <Search markdowns={markdowns} searchQuery={searchQuery} />
      </div>
    </div>
  )
}