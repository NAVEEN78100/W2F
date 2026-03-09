import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  // Redirect base /company/wwf-blogs -> /company/blogs (preserve origin)
  const origin = new URL(request.url).origin
  const target = new URL('/company/blogs', origin)
  return NextResponse.redirect(target, 307)
}
