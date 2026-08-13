import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value;
  const { pathname } = request.nextUrl;

  // Protect all /admin routes EXCEPT the main /admin route (which contains the login screen)
  if (pathname.startsWith('/admin/') && pathname !== '/admin') {
    if (!token) {
      // User is not authenticated, redirect to login
      const url = request.nextUrl.clone();
      url.pathname = '/admin';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
