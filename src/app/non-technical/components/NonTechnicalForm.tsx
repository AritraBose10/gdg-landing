"use client";

import React, { FC, FormEvent, useState } from 'react';
import FloatingLabelInput from './FloatingLabelInput';
import ProgressBar from './ProgressBar';

// 1. Add props to communicate with the parent page
interface NonTechnicalFormProps {
    onSuccess: () => void;
    onFailure: () => void;
}

const NonTechnicalForm: FC<NonTechnicalFormProps> = ({ onSuccess, onFailure }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'Public Relations and OutReach',
        portfolioLink: '',
        statement: ''
    });
    const totalSteps = 3;

    const handleNext = () => setStep(prev => prev + 1);
    const handleBack = () => setStep(prev => prev - 1);
    const [isLoading, setIsLoading] = useState(false);

    // 2. Update handleSubmit to use the props
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('/api/submit-non-tech', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log('Submission successful!');
                onSuccess(); // Trigger the success page
            } else {
                console.error('Submission failed on the server.');
                onFailure(); // Trigger the failure page
            }
        } catch (error) {
            console.error('An error occurred while submitting:', error);
            onFailure();
        }
        finally {
            setIsLoading(false);
        }
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const showPortfolioField = formData.role === 'Design' || formData.role === 'Creative Media';

    return (
        <>
            <ProgressBar currentStep={step} totalSteps={totalSteps} />
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                {/* Step 1 and 2 content remains the same */}
                {step === 1 && (
                    <div key="step1" className="space-y-6" style={{ animation: 'slide-in-up 0.5s ease-out forwards' }}>
                        <FloatingLabelInput id="name" label="Full Name" value={formData.name} onChange={handleChange} required={true} />
                        <FloatingLabelInput id="email" type="email" label="Email Address" value={formData.email} onChange={handleChange} required={true} />
                    </div>
                )}
                {step === 2 && (
                    <div key="step2" className="space-y-6" style={{ animation: 'slide-in-up 0.5s ease-out forwards' }}>
                        <FloatingLabelInput id="role" type="select" label="Preferred Role" value={formData.role} onChange={handleChange} required={true} >
                            <option>Public Relations and OutReach</option>
                            <option>Social Media Handling</option>
                            <option>Creative Media</option>
                            <option>Operations and Management</option>
                            <option>Design</option>
                        </FloatingLabelInput>

                        {showPortfolioField && (
                            <div style={{ animation: 'slide-in-up 0.5s ease-out forwards' }}>
                                <FloatingLabelInput id="portfolioLink" type="url" label="Portfolio Link (Optional)" value={formData.portfolioLink} onChange={handleChange} required={false} />
                            </div>
                        )}
                    </div>
                )}
                {step === 3 && (
                    <div key="step3" className="space-y-6" style={{ animation: 'slide-in-up 0.5s ease-out forwards' }}>
                        <FloatingLabelInput id="statement" type="textarea" label="Why are you passionate about tech communities?" value={formData.statement} onChange={handleChange} required={true} />
                    </div>
                )}
                <div className="flex justify-between items-center pt-4">
                    {step > 1 ? <button type="button" onClick={handleBack} className="plexus-button py-2 px-6 font-bold text-base rounded-full">Back</button> : <div />}
                    {step < totalSteps ? <button type="button" onClick={handleNext} className="plexus-button py-2 px-6 font-bold text-base rounded-full">Next</button> : <button
                        type="submit"
                        className="hologram-button py-2 px-6 font-bold rounded-md z-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isLoading} // Disable the button while loading
                    >
                        {isLoading ? 'Submitting...' : 'SUBMIT'}
                    </button>}
                </div>
            </form>
        </>
    );
};
export default NonTechnicalForm;
