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
        year: '2nd Year',
        batch: '',
        phoneNumber: '',
        id: '',
        email: '',
        role: 'Public Relations and OutReach',
        portfolioLink: '',
        statement: ''
    });
    const totalSteps = 4;

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
                {/* Step 1: Name, Year, Batch */}
                {step === 1 && (
                    <div key="step1" className="space-y-6">
                        <FloatingLabelInput
                            id="name"
                            label="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <FloatingLabelInput
                            id="year"
                            type="select"
                            label="Year"
                            value={formData.year}
                            onChange={handleChange}
                            required
                        >

                            <option>2nd Year</option>
                            <option>3rd Year</option>
                            <option>4th Year</option>
                        </FloatingLabelInput>
                        <FloatingLabelInput
                            id="batch"
                            label="Batch"
                            value={formData.batch}
                            onChange={handleChange}
                            required
                        />
                    </div>
                )}

                {/* Step 2: Email, Phone, College ID */}
                {step === 2 && (
                    <div key="step2" className="space-y-6">
                        <FloatingLabelInput
                            id="email"
                            type="email"
                            label="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <FloatingLabelInput
                            id="phoneNumber"
                            label="Phone Number"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            required
                        />
                        <FloatingLabelInput
                            id="id"
                            label="College ID"
                            value={formData.id}
                            onChange={handleChange}
                            required
                        />
                    </div>
                )}

                {/* Step 3: Role & Portfolio */}
                {step === 3 && (
                    <div key="step3" className="space-y-6">
                        <FloatingLabelInput
                            id="role"
                            type="select"
                            label="Preferred Role"
                            value={formData.role}
                            onChange={handleChange}
                            required
                        >
                            <option>Public Relations and OutReach</option>
                            <option>Social Media Handling</option>
                            <option>Creative Media</option>
                            <option>Operations and Management</option>
                            <option>Design</option>
                        </FloatingLabelInput>

                        {showPortfolioField && (
                            <FloatingLabelInput
                                id="portfolioLink"
                                type="url"
                                label="Portfolio Link (Optional)"
                                value={formData.portfolioLink}
                                onChange={handleChange}
                            />
                        )}
                    </div>
                )}

                {/* Step 4: Statement */}
                {step === 4 && (
                    <div key="step4" className="space-y-6">
                        <FloatingLabelInput
                            id="statement"
                            type="textarea"
                            label="Why are you passionate about tech communities?"
                            value={formData.statement}
                            onChange={handleChange}
                            required
                        />
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center pt-4">
                    {step > 1 ? (
                        <button
                            type="button"
                            onClick={handleBack}
                            className="plexus-button py-2 px-6 font-bold text-base rounded-full"
                        >
                            Back
                        </button>
                    ) : (
                        <div />
                    )}

                    {step < totalSteps ? (
                        <button
                            type="button"
                            onClick={handleNext}
                            className="plexus-button py-2 px-6 font-bold text-base rounded-full"
                        >
                            Next
                        </button>
                    ) : (
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="hologram-button py-2 px-6 font-bold rounded-md z-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Submitting...' : 'SUBMIT'}
                        </button>
                    )}
                </div>
            </form>


        </>
    );
};
export default NonTechnicalForm;
