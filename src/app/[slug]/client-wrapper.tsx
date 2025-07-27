'use client'

import dynamic from 'next/dynamic'
import type { MDXRemoteSerializeResult } from 'next-mdx-remote'

const ViewerClient = dynamic(() => import('./note-client'), {
  ssr: false,
})

export default function ClientWrapper({ mdx }: { mdx: MDXRemoteSerializeResult }) {
  return <ViewerClient mdx={mdx} />
}