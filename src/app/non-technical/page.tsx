"use client";
import { FC } from 'react';
import GlobalStyles from './components/GlobalStyles';
import NonTechnicalForm from './components/NonTechnicalForm';
import PlexusBackground from './components/PlexusBackground';
import SiteHeader from './components/SiteHeader';

const Page: FC = () => {
    return (
        <>
            <GlobalStyles />
            <main className="min-h-screen font-['Roboto',_sans-serif] overflow-hidden text-white">
                <PlexusBackground />
                <SiteHeader />
                <div className="min-h-screen flex items-center justify-center relative z-40 p-4">
                    <div className="w-full max-w-lg bg-[#1e1e2d]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl" style={{ animation: 'card-intro 1s ease-out forwards' }}>
                        <div className="text-center mb-8" style={{ animation: 'slide-in-up 0.6s ease-out 0.2s forwards', opacity: 0 }}>
                            <h1 className="text-3xl font-bold tracking-tight text-gray-100">
                                Non-Technical Application
                            </h1>
                        </div>
                        <NonTechnicalForm />
                    </div>
                </div>
            </main>
        </>
    );
};
export default Page;
