"use client";

import React, { FC } from 'react';

// --- Type Definition ---
interface ProgressBarProps {
    currentStep: number;
    totalSteps: number;
}

// --- Component ---
const ProgressBar: FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
    return (
        <div className="flex justify-between items-center w-full max-w-xs mx-auto">
            {[...Array(totalSteps)].map((_, i) => (
                <React.Fragment key={i}>
                    <div className="flex flex-col items-center">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-500 ${currentStep > i ? 'bg-blue-500' : 'bg-gray-700'
                            }`}>
                            {currentStep > i + 1 ? (
                                // Show a checkmark for completed steps
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                                </svg>
                            ) : (
                                // Show the step number for current and upcoming steps
                                <span className="font-bold text-xs">{i + 1}</span>
                            )}
                        </div>
                    </div>
                    {i < totalSteps - 1 && (
                        // Render the connecting line between steps
                        <div className={`flex-1 h-1 mx-2 rounded-full transition-all duration-500 ${currentStep > i + 1 ? 'bg-blue-500' : 'bg-gray-700'
                            }`}></div>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

export default ProgressBar;
