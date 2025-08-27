"use client";
import { FC, useState } from 'react';
import GlobalStyles from './components/GlobalStyles';
import NonTechnicalForm from './components/NonTechnicalForm';
import PlexusBackground from './components/PlexusBackground';
import SiteHeader from './components/SiteHeader';
// 1. Import the result pages from the shared components folder
import FailurePage from '../../app/technical/FailurePage';
import SuccessPage from '../../app/technical/SuccessPage';

type SubmissionStatus = 'idle' | 'success' | 'failure';

const Page: FC = () => {
    // 2. Add state to track the submission status
    const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>('idle');

    // 3. This function decides which component to render
    const renderContent = () => {
        switch (submissionStatus) {
            case 'success':
                return <SuccessPage />;
            case 'failure':
                return <FailurePage />;
            case 'idle':
            default:
                return (
                    <div className="w-full max-w-lg bg-[#1e1e2d]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl" style={{ animation: 'card-intro 1s ease-out forwards' }}>
                        <div className="text-center mb-8" style={{ animation: 'slide-in-up 0.6s ease-out 0.2s forwards', opacity: 0 }}>
                            <h1 className="text-3xl font-bold tracking-tight text-gray-100">
                                Non-Technical Application
                            </h1>
                        </div>
                        <NonTechnicalForm
                            onSuccess={() => setSubmissionStatus('success')}
                            onFailure={() => setSubmissionStatus('failure')}
                        />
                    </div>
                );
        }
    };

    return (
        <>
            <GlobalStyles />
            <main className="min-h-screen font-['Roboto',_sans-serif] text-white isolate">
                <PlexusBackground />
                <SiteHeader />
                <div className="min-h-screen flex items-center justify-center relative z-10 p-4">
                    {renderContent()}
                </div>
            </main>
        </>
    );
};
export default Page;
