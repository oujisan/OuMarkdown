// app/components/RouteLoadingIndicator.tsx
'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function RouteLoadingIndicator() {
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const timeout = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timeout)
  }, [pathname])

  if (!loading) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <div className="text-white text-lg font-semibold animate-pulse">
        Opening note...
      </div>
    </div>
  )
}
