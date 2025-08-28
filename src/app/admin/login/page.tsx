'use client';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { app } from '../../../lib/firebase';

const LoginPage: FC = () => {
    const auth = getAuth(app);
    const router = useRouter();

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const idToken = await result.user.getIdToken();

            // Send the token to your backend to create a session cookie
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${idToken}` },
            });

            if (response.ok) {
                // Redirect to the admin dashboard on successful login
                router.push('/admin/review'); // Or your main admin page
            } else {
                alert('Authentication failed. You might not be on the allowlist.');
                await auth.signOut();
            }
        } catch (error) {
            console.error("Error signing in with Google:", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
            <div className="text-center p-8 border border-gray-700 rounded-lg bg-gray-800 shadow-xl">
                <h1 className="text-3xl font-bold mb-4">Admin Portal</h1>
                <p className="mb-8 text-gray-400">Please sign in to access the Applicant Review dashboard.</p>
                <button
                    onClick={signInWithGoogle}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                >
                    Sign in with Google
                </button>
            </div>
        </div>
    );
};

export default LoginPage;
