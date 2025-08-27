'use client';

import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import { IconBackground } from '../components/IconBackground'; // Assuming you create this file
import { ShuffleWords } from '../components/ShuffleWords'; // Assuming you create this file

// --- Hydration Fix: Load ShuffleWords only on the client ---
const ClientShuffleWords = dynamic(() => Promise.resolve(ShuffleWords), {
  ssr: false,
});

// --- Helper Icon Components ---
const SunIcon: FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon: FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const Page: FC = () => {
  const words: string[] = ["AI/ML", "Cloud", "Web Dev", "Android", "Design", "Web3", "Creative Media", "DSA"];
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  // Add this entire function
  const renderThemeChanger = () => {
    if (!mounted) return null;

    const isDark = theme === 'dark';

    return (
      mounted && (
        <button
          onClick={() => setTheme(isDark ? 'light' : 'dark')}
          className="p-2 rounded-full theme-toggle-button backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors z-50"
          aria-label="Toggle theme"
        >
          {isDark ? (
            <SunIcon className="w-5 h-5 text-yellow-400" />
          ) : (
            <MoonIcon className="w-5 h-5 text-gray-800" />
          )}
        </button>
      )
    );
  }; // <-- Assuming the '}' was meant to close the component function


  return (
    <main id="landing-page-main" className="h-screen font-sans overflow-hidden flex flex-col">
      <IconBackground />
      <header className="w-full relative z-5000">
        <div className="absolute top-0 left-0 px-1 py-4">
          {mounted && (
            <Image
              src={theme === 'dark' ? "/logos/gdgdark.png" : "/logos/gdglight.png"}
              height={60}
              width={140}
              alt="GDG Logo"
            />
          )}
        </div>

        {/* Positioned at the absolute top-right corner */}
        <div className="absolute top-0 right-0 py-4 px-1 gap-4 flex items-center">
          {mounted && (
            <Image
              src={theme === 'dark' ? '/logos/tiudark.png' : '/logos/tiulight.png'}
              height={75}
              width={160}
              alt="TIU Logo"
            />
          )}
          {renderThemeChanger()}
        </div>
      </header>
      <div className="flex-grow flex items-center justify-center relative z-999 p-4">
        <div className={`flip-card ${isFlipped ? 'is-flipped' : ''}`}>
          <div className="flip-card-inner">

            {/* Front of the Card */}
            <div className="flip-card-front">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight flex flex-col items-center">
                Join the
                <br />
                <div className="h-12 sm:h-16 md:h-24 mt-1 text-blue-600 dark:text-blue-400">
                  <ClientShuffleWords words={words} />
                </div>
                Core Team
              </h1>
              <p className="mt-1 text-sm sm:text-base md:text-lg max-w-2xl mx-auto text-center">
                Become a leader in the tech community. Drive innovation, organize impactful events, and grow your skills with a passionate team at GDG On Campus TIU.
              </p>
              <button
                type="button"
                onClick={() => setIsFlipped(true)}
                className="glowing-btn mt-6 sm:mt-8 inline-block px-10 py-3 bg-[#1a73e8] text-white font-bold text-lg rounded-xl transition-all duration-300 shadow-lg transform hover:scale-105"
              >
                Register for Interviews
              </button>
            </div>

            {/* Back of the Card */}
            <div className="flip-card-back">
              <h2 className="text-3xl sm:text-4xl font-bold mb-8">Choose Your Path</h2>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
                <Link href="/technical">
                  <button
                    type="button"
                    className="glowing-btn inline-block text-center px-8 py-3 bg-green-500 text-white font-bold text-base sm:text-lg rounded-xl transition-all duration-300 shadow-lg transform hover:scale-105"
                  >
                    Technical Team
                  </button>
                </Link>

                <Link href="/non-technical">
                  <button
                    type="button"
                    className="glowing-btn inline-block text-center px-8 py-3 bg-purple-500 text-white font-bold text-base sm:text-lg rounded-xl transition-all duration-300 shadow-lg transform hover:scale-105"
                  >
                    Non-Technical Team
                  </button>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
      <footer className="w-full py-3 z-20">
        <div className="container mx-auto text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400 font-bold">
            You Know Who Made It
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} GDG On Campus TIU. All Rights Reserved.
          </p>
        </div>
      </footer>
    </main>
  );
};

export default Page;
