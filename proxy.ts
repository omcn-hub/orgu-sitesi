import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ADMIN_COOKIE, verifySessionToken } from '@/lib/adminAuth';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Sadece /admin altındaki sayfalara uygula (login sayfası hariç)
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const session = request.cookies.get(ADMIN_COOKIE);

    if (!(await verifySessionToken(session?.value))) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
