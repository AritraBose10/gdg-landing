'use client';

import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';
import { FC } from 'react';
import { IconBackground } from '../components/IconBackground'; // Assuming you create this file
import { ShuffleWords } from '../components/ShuffleWords'; // Assuming you create this file

// --- Hydration Fix: Load ShuffleWords only on the client ---
const ClientShuffleWords = dynamic(() => Promise.resolve(ShuffleWords), {
  ssr: false,
});

// --- Helper Icon Components ---
const SunIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
);
const MoonIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
);

const Page: FC = () => {
  const words: string[] = ["AI/ML", "Cloud", "Web Dev", "Android", "Design"];
  const { theme, setTheme } = useTheme();

  return (
    <main className="h-screen font-sans overflow-hidden flex flex-col">
      <IconBackground />
      <header className="w-full p-4 z-30">
        <div className="container mx-auto flex justify-between items-center">
          <img src="https://placehold.co/140x40/000000/FFFFFF?text=GDG" height="30" width="100" alt="GDG Logo" className="dark:invert" />
          <div className="flex items-center gap-4">
            <img src="https://placehold.co/80x40/000000/FFFFFF?text=TIU" height="25" width="60" alt="TIU Logo" className="dark:invert" />
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full theme-toggle-button backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ?
                <SunIcon className="w-5 h-5 theme-icon" /> :
                <MoonIcon className="w-5 h-5 theme-icon" />}
            </button>
          </div>
        </div>
      </header>
      <div className="flex-grow flex items-center justify-center relative z-20 p-4">
        <div className="w-full max-w-4xl text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Join the
            <br />
            <div className="h-12 sm:h-16 md:h-24 mt-1">
              <ClientShuffleWords words={words} />
            </div>
            Core Team
          </h1>
          <p className="mt-1 text-sm sm:text-base md:text-lg max-w-2xl mx-auto text-gray-800">
            Become a leader in the tech community. Drive innovation, organize impactful events, and grow your skills with a passionate team at GDG On Campus TIU.
          </p>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="glowing-btn mt-6 sm:mt-8 inline-block px-8 py-3 sm:px-10 sm:py-3 bg-[#1a73e8] text-white font-bold text-base sm:text-lg rounded-xl transition-all duration-300 shadow-lg transform hover:scale-105"
          >
            Register for Interviews
          </a>
        </div>
      </div>
      <footer className="w-full py-3 z-20">
        <div className="container mx-auto text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} GDG On Campus TIU. All Rights Reserved.
          </p>
        </div>
      </footer>
    </main>
  );
};

export default Page;
