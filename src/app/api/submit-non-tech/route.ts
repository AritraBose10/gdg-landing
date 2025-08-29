import { getApp, getApps, initializeApp } from 'firebase/app';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Your Firebase configuration from .env.local
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
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
        const emailHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Application Received</title>
            <style>
                /* Basic resets for email clients */
                body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
                table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
                img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
                body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }
                /* Hide preheader text */
                .preheader { display: none !important; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0; }
            </style>
        </head>
        <body style="background-color: #f1f3f4; margin: 0 !important; padding: 20px 0 !important; font-family: Roboto, Arial, sans-serif;">
            <!-- Preheader text for inbox preview -->
            <span class="preheader">We've received your application for the ${formData.role} position. Here are the next steps.</span>

            <!-- Main container table -->
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                    <td align="center" style="background-color: #f1f3f4;">
                        <!--[if (gte mso 9)|(IE)]>
                        <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                        <tr>
                        <td align="center" valign="top" width="600">
                        <![endif]-->
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <!-- Logo Header -->
                            <tr>
                                <td align="center" style="padding: 20px 0;">
                                    <!-- TODO: Replace this placeholder with a direct URL to your own hosted logo image. -->
                                    <img src="https://i.ibb.co/3503GG2D/logo.png" width="180" alt="GDG On Campus TIU Logo" style="display: block; border: 0px;"/>
                                </td>
                            </tr>
                            <!-- Main content card -->
                            <tr>
                                <td align="center" valign="top" style="padding: 40px; background-color: #ffffff; border-radius: 8px; border: 1px solid #dadce0;">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                        <!-- Google Colors Bar -->
                                        <tr>
                                            <td align="center" style="padding-bottom: 24px;">
                                                <table border="0" cellpadding="0" cellspacing="0" width="100" style="margin: 0 auto;">
                                                    <tr>
                                                        <td height="4" width="25" style="background-color: #4285F4; border-radius: 2px 0 0 2px;"></td>
                                                        <td height="4" width="25" style="background-color: #DB4437;"></td>
                                                        <td height="4" width="25" style="background-color: #F4B400;"></td>
                                                        <td height="4" width="25" style="background-color: #0F9D58; border-radius: 0 2px 2px 0;"></td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                        <!-- Main Heading -->
                                        <tr>
                                            <td align="center" style="padding-bottom: 16px;">
                                                <!-- Table for icon and text alignment -->
                                                <table border="0" cellpadding="0" cellspacing="0" align="center" style="margin: 0 auto;">
                                                    <tr>
                                                       
                                                        <td align="center" style="font-family: Arial, sans-serif; font-size: 28px; font-weight: 700; color: #202124;">
                                                            Application Received
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                        <!-- Body Text -->
                                        <tr>
                                            <td align="center" style="font-family: Roboto, Arial, sans-serif; font-size: 16px; line-height: 26px; color: #5f6368; padding-bottom: 24px;">
                                                Hi ${formData.name}, thank you for your interest in the <strong>${formData.role}</strong> position. We've successfully received your application.
                                            </td>
                                        </tr>
                                         <!-- Informational Box -->
                                        <tr>
                                            <td style="padding-bottom: 32px;">
                                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8f9fa; border-radius: 8px;">
                                                    <tr>
                                                        <td style="padding: 24px; font-family: Roboto, Arial, sans-serif; font-size: 15px; line-height: 22px; color: #3c4043;">
                                                            <h3 style="margin: 0 0 10px 0; font-size: 16px; font-weight: bold; color: #202124;">What's Next?</h3>
                                                            Our team will carefully review your submission and get back to you shortly. We appreciate your patience during this process.
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                        <!-- Signature -->
                                        <tr>
                                            <td align="center" style="font-family: Roboto, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #5f6368; padding-top: 10px;">
                                                Best Regards,<br>
                                                <strong style="color: #3c4043;">The GDG On Campus TIU Team</strong>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <!-- Footer -->
                            <tr>
                                <td align="center" style="padding: 24px 20px; font-family: Roboto, Arial, sans-serif; font-size: 12px; line-height: 18px; color: #5f6368;">
                                    You received this email because you applied for a position at GDG On Campus TIU.
                                </td>
                            </tr>
                        </table>
                        <!--[if (gte mso 9)|(IE)]>
                        </td>
                        </tr>
                        </table>
                        <![endif]-->
                    </td>
                </tr>
            </table>
        </body>
        </html>
`;


        await transporter.sendMail({
            from: `"GDG On Campus TIU" <${process.env.GMAIL_EMAIL}>`,
            to: formData.email,
            subject: 'Application Received - GDG On Campus TIU',
            html: emailHtml,
        });

        console.log("STEP 3: Successfully wrote to Firestore. Doc ID:", docRef.id);

        return NextResponse.json({ message: "Application submitted successfully!", id: docRef.id }, { status: 200 });

    } catch (error) {
        console.error("!!! ERROR in API Route:", error);
        return NextResponse.json({ message: "Error submitting application." }, { status: 500 });
    }
}
