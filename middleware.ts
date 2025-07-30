import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const badBots = [
  'go-http', 'curl', 'python', 'axios', 'Java', 'HttpClient',
  'libwww-perl', 'wget', 'httpx', 'ruby', 'node-fetch',
  'discord-crawler', 'scrapy', 'aiohttp', 'okhttp', 'powershell'
]

export function middleware(request: NextRequest) {
  const ua = request.headers.get('user-agent')?.toLowerCase() || ''
  const method = request.method

  const isBadBot = badBots.some(bot => ua.includes(bot))

  if (isBadBot || method === 'OPTIONS') {
    return new NextResponse('Bot Blocked', { status: 403 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/:path*'],
}
