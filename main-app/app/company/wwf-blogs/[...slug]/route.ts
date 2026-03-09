import { NextResponse } from 'next/server'

export async function GET(request: Request, { params }: { params: { slug?: string[] } }) {
  const slug = params?.slug ? params.slug.join('/') : ''
  // Preserve the rest of the path when redirecting, e.g. /company/wwf-blogs/index.html -> /company/blogs/index.html
  const origin = new URL(request.url).origin
  const target = new URL(`/company/blogs/${slug}`, origin)
  return NextResponse.redirect(target, 307)
}
