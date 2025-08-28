import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
    // THE FIX: Read the cookie directly from the request object.
    const sessionCookie = request.cookies.get('session')?.value;

    const isAdminPage = request.nextUrl.pathname.startsWith('/admin/review') || request.nextUrl.pathname.startsWith('/admin/dashboard');
    const isLoginPage = request.nextUrl.pathname.startsWith('/admin/login');

    // If the user has no session and is trying to access a protected admin page,
    // redirect them to the login page.
    if (!sessionCookie && isAdminPage) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // If the user has a session and is trying to access the login page,
    // redirect them to their dashboard.
    if (sessionCookie && isLoginPage) {
        return NextResponse.redirect(new URL('/admin/review', request.url));
    }

    return NextResponse.next();
}

// This configures the middleware to run on your login and admin pages
export const config = {
    matcher: ['/admin/login', '/admin/review/:path*', '/admin/dashboard/:path*'],
};
