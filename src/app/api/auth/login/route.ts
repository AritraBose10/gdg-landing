import { NextResponse } from 'next/server';
import admin from '../../../../lib/firebaseAdmin'; // Assumes you have this admin helper

// This is your list of pre-determined users
const ALLOWED_ADMIN_EMAILS = [
    'aritraboselm10@gmail.com', 'dev.bosepiush@gmail.com',
    'gdgoncampustiu@gmail.com', 'subhasishsuv@gmail.com',
    'ishan.rc2005@gmail.com', 'ayankaghosh2005@gmail.com',
    'rabishankarmaityofficial@gmail.com', 'and24903@gmail.com',
    'goenkakrish02@gmail.com','anuragroy485@gmail.com',
    'shubhbrj7@gmail.com','pradipsadhukhan16@gmail.com',
    'snehalghosh2004@gmail.com','mohakgupta500@gmail.com'
];

export async function POST(request: Request) {
    try {
        const authorization = request.headers.get('Authorization');
        if (authorization?.startsWith('Bearer ')) {
            const idToken = authorization.split('Bearer ')[1];
            const decodedToken = await admin.auth().verifyIdToken(idToken);

            // Check if the user's email is in the allowlist
            if (decodedToken.email && ALLOWED_ADMIN_EMAILS.includes(decodedToken.email)) {
                const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
                const sessionCookie = await admin.auth().createSessionCookie(idToken, { expiresIn });

                const response = NextResponse.json({ status: 'success' }, { status: 200 });
                response.cookies.set('session', sessionCookie, {
                    // ... options
                });
                return response;
            }
        }
        // If not in allowlist or no token, return unauthorized
        return NextResponse.json({ status: 'unauthorized' }, { status: 401 });
    } catch (error) {
        return NextResponse.json({ status: 'error' }, { status: 500 });
    }
}
