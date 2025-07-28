'use client'

import Link from 'next/link'
import { Home, FileText } from 'lucide-react'

interface BreadcrumbProps {
  current: string
}

export default function Breadcrumb({ current }: BreadcrumbProps) {
  return (
    <div className="flex items-center space-x-2 text-sm pl-5 md:pl-8 text-[var(--color-text-dim)]">
      <Link
        href="/"
        className="flex items-center hover:text-[var(--color-text-light)] transition"
      >
        <Home className="w-4 h-4 mr-1" />
      </Link>
      <span className="text-[var(--color-gray)]">›</span>
      <div className="flex items-center text-[var(--color-accent-blue)] font-semibold">
        <FileText className="w-4 h-4 mr-1" />
        <span>{current}</span>
      </div>
    </div>
  )
}
