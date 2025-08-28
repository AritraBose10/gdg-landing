import { NextResponse } from 'next/server';

export async function POST() {
    // Clear the session cookie to sign the user out
    const response = NextResponse.json({ status: 'success' }, { status: 200 });
    response.cookies.set('session', '', { expires: new Date(0), path: '/' });
    return response;
}
