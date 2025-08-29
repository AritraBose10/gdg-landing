import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import admin from '../../../lib/firebaseAdmin';
// 1. UPDATED: Import only getFirestore from the admin SDK
import { getFirestore, Timestamp } from 'firebase-admin/firestore';

// Your list of pre-determined users
const ALLOWED_ADMIN_EMAILS = [
    'aritraboselm10@gmail.com', 'dev.bosepiush@gmail.com',
    'gdgoncampustiu@gmail.com', 'subhasishsuv@gmail.com', 'ishan.rc2005@gmail.com', 'ayankaghosh2005@gmail.com','rabishankarmaityofficial@gmail.com', 'and24903@gmail.com','goenkakrish02@gmail.com','anuragroy485@gmail.com','shubhbrj7@gmail.com','pradipsadhukhan16@gmail.com','snehalghosh2004@gmail.com','mohakgupta500@gmail.com','sagnikghosh551@gmail.com'];
interface ApplicationData {
    name: string;
    email: string;
    submittedAt: Timestamp;
    // Add other fields from your form as needed for type safety
    [key: string]: any; // Allows for other fields not explicitly typed
}

export async function GET() {
    try {
        // This cookie logic is correct, the error was likely due to the crash below
        const sessionCookie = (await cookies()).get('session')?.value || '';
        const decodedToken = await admin.auth().verifySessionCookie(sessionCookie, true);

        if (!decodedToken.email || !ALLOWED_ADMIN_EMAILS.includes(decodedToken.email)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const db = getFirestore(admin.apps[0]);

        // 2. FIXED: Use the correct Admin SDK syntax to get documents
        const techAppsQuery = await db.collection("tech-applications").get();
        const nonTechAppsQuery = await db.collection("non-tech-applications").get();

        // The rest of your data mapping logic is correct
        const technicalApps = techAppsQuery.docs.map(doc => ({ id: doc.id, ...doc.data(), type: 'Technical' }));
        const nonTechnicalApps = nonTechAppsQuery.docs.map(doc => ({ id: doc.id, ...doc.data(), type: 'Non-Technical' }));

        const allApplications = [...technicalApps, ...nonTechnicalApps];

        // allApplications.sort((a, b) => b.submittedAt.toMillis() - a.submittedAt.toMillis());

        return NextResponse.json(allApplications, { status: 200 });

    } catch (error) {
        // This will catch errors like invalid session cookies
        console.error("Error fetching applications:", error);
        return NextResponse.json({ error: 'Unauthorized or Internal Server Error' }, { status: 500 });
    }
}
