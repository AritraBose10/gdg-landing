import { getApp, getApps, initializeApp } from 'firebase/app';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { NextResponse } from 'next/server';

// Your Firebase configuration from .env.local
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
};

// Initialize Firebase (ensuring it's not initialized more than once)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

// This function handles POST requests
export async function POST(request: Request) {
    console.log("API ROUTE HIT: Received a new request.");
    try {
        const formData = await request.json();
        console.log("STEP 1: Successfully parsed form data from the request.");

        // NOTE: The Firebase initialization is outside this function, so if
        // there's an error there, it would crash the server on startup.

        console.log("STEP 2: Attempting to write to Firestore...");

        const docRef = await addDoc(collection(db, "tech-applications"), {
            ...formData,
            submittedAt: new Date(),
        });

        console.log("STEP 3: Successfully wrote to Firestore. Doc ID:", docRef.id);

        return NextResponse.json({ message: "Application submitted successfully!", id: docRef.id }, { status: 200 });

    } catch (error) {
        console.error("!!! ERROR in API Route:", error);
        return NextResponse.json({ message: "Error submitting application." }, { status: 500 });
    }
}
