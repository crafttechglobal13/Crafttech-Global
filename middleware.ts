import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  // Additional security headers on every request
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // 1. Guard administrative and sensitive data APIs
  // Prevent unauthorized crawlers and bots from harvesting customer data
  if (pathname.startsWith('/api/orders') && request.method === 'GET') {
    const authHeader = request.headers.get('authorization') || request.headers.get('x-admin-key');
    const adminCookie = request.cookies.get('crafttech_admin_session');
    
    // In production or when queried externally without credentials, block public exposure
    const isLocalDev = process.env.NODE_ENV !== 'production';
    if (!authHeader && !adminCookie && !isLocalDev) {
      return NextResponse.json(
        { error: 'Unauthorized: Administrative credentials required' },
        { status: 401 }
      );
    }
  }

  if (pathname.startsWith('/api/enquiries') && request.method === 'GET') {
    const authHeader = request.headers.get('authorization') || request.headers.get('x-admin-key');
    const adminCookie = request.cookies.get('crafttech_admin_session');
    
    const isLocalDev = process.env.NODE_ENV !== 'production';
    if (!authHeader && !adminCookie && !isLocalDev) {
      return NextResponse.json(
        { error: 'Unauthorized: Administrative credentials required' },
        { status: 401 }
      );
    }
  }

  // 2. Prevent malicious HTTP request methods
  if (['TRACE', 'TRACK'].includes(request.method)) {
    return new NextResponse('Method Not Allowed', { status: 405 });
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
