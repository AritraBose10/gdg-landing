"use client";

import { FC } from 'react';

// --- Helper Component for Styles ---
// This component injects the necessary CSS and Google Fonts into the page.
// In a larger Next.js application, you would typically handle fonts and global styles
// in your main layout file.
const GlobalStyles: FC = () => (
    <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap');

    /* --- The Loader Animation --- */
    .loader {
        display: flex;
        gap: 16px;
    }

    .dot {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        animation: subtle-pulse 2s infinite cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* Assigning Google Colors and Animation Delays */
    .dot-1 {
        background-color: #4285F4; /* Blue */
        animation-delay: 0s;
    }
    .dot-2 {
        background-color: #DB4437; /* Red */
        animation-delay: 0.2s;
    }
    .dot-3 {
        background-color: #F4B400; /* Yellow */
        animation-delay: 0.4s;
    }
    .dot-4 {
        background-color: #0F9D58; /* Green */
        animation-delay: 0.6s;
    }

    /* The subtle pulse and fade animation */
    @keyframes subtle-pulse {
        0%, 100% {
            transform: scale(1);
            opacity: 1;
        }
        50% {
            transform: scale(0.8);
            opacity: 0.5;
        }
    }
  `}</style>
);


// --- Main Loader Component ---
const Loader: FC = () => {
    return (
        <>
            <GlobalStyles />
            {/* This container simulates the centered layout from the original HTML */}
            <div className="flex items-center justify-center min-h-screen bg-[#202124] font-['Roboto',_sans-serif] text-[#e8eaed]">
                <div className="flex flex-col items-center gap-6">
                    <div className="loader">
                        <div className="dot dot-1"></div>
                        <div className="dot dot-2"></div>
                        <div className="dot dot-3"></div>
                        <div className="dot dot-4"></div>
                    </div>
                    <div className="text-lg font-medium tracking-wide">Loading...</div>
                </div>
            </div>
        </>
    );
};

export default Loader;
