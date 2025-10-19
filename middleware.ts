import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value

  if (!token) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET!))
    const { pathname } = request.nextUrl

    if (pathname.startsWith('/volunteer-dashboard') && payload.role !== 'volunteer') {
      const url = request.nextUrl.clone()
      url.pathname = '/ngo-dashboard'
      return NextResponse.redirect(url)
    }

    if (pathname.startsWith('/ngo-dashboard') && payload.role !== 'ngo') {
      const url = request.nextUrl.clone()
      url.pathname = '/volunteer-dashboard'
      return NextResponse.redirect(url)
    }

  } catch (error) {
    // If token is invalid, redirect to login
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/volunteer-dashboard/:path*',
    '/ngo-dashboard/:path*',
    '/onboarding/:path*',
  ],
}
