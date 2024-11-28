import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware function
export function middleware(request: NextRequest) {
  const user = request.cookies.get("user");

  if (!user) {
    return NextResponse.redirect(new URL('/login', request.url));
  } else {
    return NextResponse.redirect(new URL('/', request.url));
  }
}

export const config = {
  matcher: ['*'], // Apply middleware to /dashboard and its subpaths
};
