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

        const docRef = await addDoc(collection(db, "non-tech-applications"), {
            ...formData,
            submittedAt: new Date(),
        });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_EMAIL,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
        });

        await transporter.sendMail({
            from: `"GDG On Campus TIU" <${process.env.GMAIL_EMAIL}>`,
            to: formData.email,
            subject: 'Application Received - GDG On Campus TIU',
            html: `
            <!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Application Received</title>
              </head>
              <body style="margin:0; padding:0; background-color:#f3f4f6; font-family: Arial, sans-serif;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td align="center" style="padding:40px 0; background-color:#f3f4f6;">
                      <table border="0" cellpadding="0" cellspacing="0" width="600" style="max-width:600px;">
                        <tr>
                          <td align="center" style="padding:40px; background-color:#ffffff; border-radius:12px;">
                            <!-- Success Icon -->
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                              <tr>
                                <td align="center" style="padding-bottom:24px;">
                                  <div style="width:64px; height:64px; border-radius:50%; background-color:#d1fae5; display:inline-block; text-align:center; line-height:64px;">
                                    <svg style="width:40px; height:40px; color:#0d9488;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                  </div>
                                </td>
                              </tr>
                              <!-- Heading -->
                              <tr>
                                <td align="center" style="font-size:24px; font-weight:bold; color:#111827; padding-bottom:12px;">
                                  Thank you, {{formData.name}}!
                                </td>
                              </tr>
                              <!-- Body -->
                              <tr>
                                <td align="center" style="font-size:16px; line-height:24px; color:#4b5563; padding-bottom:24px;">
                                  We have successfully received your application for the <strong>{{formData.role}}</strong> position.
                                </td>
                              </tr>
                              <!-- Informational Box -->
                              <tr>
                                <td>
                                  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#f9fafb; border:1px solid #e5e7eb; border-radius:8px;">
                                    <tr>
                                      <td style="padding:20px; font-size:14px; line-height:20px; color:#4b5563;">
                                        <h3 style="margin:0 0 8px 0; font-size:16px; font-weight:bold; color:#1f2937;">What's Next?</h3>
                                        Our team will carefully review your submission and get back to you shortly regarding the next steps. Thank you for your patience.
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                              <!-- Signature -->
                              <tr>
                                <td align="center" style="font-size:14px; line-height:20px; color:#6b7280; padding-top:24px;">
                                  Best Regards,<br>
                                  <strong style="color:#374151;">The GDG On Campus TIU Team</strong>
                                </td>
                              </tr>
                            </table>
                            <!-- End content -->
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </body>
            </html>
            `,
        });

        console.log("STEP 3: Successfully wrote to Firestore. Doc ID:", docRef.id);

        return NextResponse.json({ message: "Application submitted successfully!", id: docRef.id }, { status: 200 });

    } catch (error) {
        console.error("!!! ERROR in API Route:", error);
        return NextResponse.json({ message: "Error submitting application." }, { status: 500 });
    }
}
