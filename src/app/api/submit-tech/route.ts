import { getApp, getApps, initializeApp } from 'firebase/app';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';



// Your Firebase configuration from .env.local
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

// This function handles POST requests
export async function POST(request: Request) {
    try {
        const formData = await request.json();

        // Save to Firestore
        const docRef = await addDoc(collection(db, "tech-applications"), {
            ...formData,
            submittedAt: new Date(),
        });

        console.log("Successfully wrote to Firestore. Doc ID:", docRef.id);

        // First, convert the array of domain objects into a comma-separated string


        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_EMAIL,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
        });



        // Send the confirmation email
        await transporter.sendMail({
            from: `"GDG On Campus TIU" <${process.env.GMAIL_EMAIL}>`,
            to: formData.email,
            subject: 'Application Received - GDG On Campus TIU',
            html: `
              <h1>Thank you for your application, ${formData.name}!</h1>
              <p>We have successfully received your application for the role of ${formData.role}.</p>
              <p>Our team will review it and get back to you soon.</p>
              <p>Best Regards,<br/>The GDG On Campus TIU Team</p>
            `,
        });

        return NextResponse.json({ message: "Application submitted successfully!", id: docRef.id }, { status: 200 });

    } catch (error) {
        console.error("!!! ERROR in API Route:", error);
        return NextResponse.json({ message: "Error submitting application." }, { status: 500 });
    }
}
