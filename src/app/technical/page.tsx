"use client";

import { FC, useState } from 'react';
import DigitalRainBackground from '../components/DigitalRainBackground';
import SiteHeader from '../technical/components/SiteHeader';
import FailurePage from './FailurePage';
import SuccessPage from './SuccessPage';
import GlobalStyles from './components/GlobalStyles';
import HologramForm from './components/HologramForm';

// A type to make our state management safer
type SubmissionStatus = 'idle' | 'success' | 'failure';

const Page: FC = () => {
    // This state controls which view is currently visible
    const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>('idle');

    // This function decides which component to render based on the current state
    const renderContent = () => {
        switch (submissionStatus) {
            case 'success':
                return <SuccessPage />;
            case 'failure':
                return <FailurePage />;
            case 'idle':
            default:
                return (
                    <div className="hologram-card w-full max-w-lg backdrop-blur-md">
                        <div className="bg-[#0a0a10]/90 rounded-lg p-8 sm:p-12">
                            <div className="text-center mb-8 opacity-0" style={{ animation: 'slide-in-up 0.8s ease-out 0.2s forwards' }}>
                                <h1 className="glitch-heading text-3xl font-bold tracking-tight" data-text="Core Team Application">
                                    Core Team Application
                                </h1>
                                <p className="mt-2 text-sm text-gray-400">
                                    [System Authentication Required]
                                </p>
                            </div>
                            <HologramForm
                                onSuccess={() => setSubmissionStatus('success')}
                                onFailure={() => setSubmissionStatus('failure')}
                            />
                        </div>
                    </div>
                );
        }
    };

    return (
        <>
            {/* GlobalStyles is at the top level to ensure its styles are always loaded */}
            <GlobalStyles />

            <main className="min-h-screen font-['Roboto_Mono',_monospace] overflow-y-auto bg-black text-white">
                <DigitalRainBackground />
                <SiteHeader />

                <div className="min-h-screen flex items-center justify-center relative z-20 p-4">
                    {renderContent()}
                </div>
            </main>
        </>
    );
};

export default Page;
