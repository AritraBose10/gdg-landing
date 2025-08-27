"use client";
import { FC, FormEvent, useState } from 'react';
import FloatingLabelInput from './FloatingLabelInput';
import ProgressBar from './ProgressBar';

const NonTechnicalForm: FC = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '', email: '', role: 'Events Lead', statement: ''
    });
    const totalSteps = 3;

    const handleNext = () => setStep(prev => prev + 1);
    const handleBack = () => setStep(prev => prev - 1);
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        alert(`Application Submitted:\n${JSON.stringify(formData, null, 2)}`);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    return (
        <>
            <ProgressBar currentStep={step} totalSteps={totalSteps} />
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                {step === 1 && (
                    <div key="step1" className="space-y-6" style={{ animation: 'slide-in-up 0.5s ease-out forwards' }}>
                        <FloatingLabelInput id="name" label="Full Name" value={formData.name} onChange={handleChange} />
                        <FloatingLabelInput id="email" type="email" label="Email Address" value={formData.email} onChange={handleChange} />
                    </div>
                )}
                {step === 2 && (
                    <div key="step2" className="space-y-6" style={{ animation: 'slide-in-up 0.5s ease-out forwards' }}>
                        <FloatingLabelInput id="role" type="select" label="Preferred Role" value={formData.role} onChange={handleChange}>
                            <option>Events Lead</option>
                            <option>Marketing & Outreach Lead</option>
                            <option>Community Manager</option>
                        </FloatingLabelInput>
                    </div>
                )}
                {step === 3 && (
                    <div key="step3" className="space-y-6" style={{ animation: 'slide-in-up 0.5s ease-out forwards' }}>
                        <FloatingLabelInput id="statement" type="textarea" label="Why are you passionate about tech communities?" value={formData.statement} onChange={handleChange} />
                    </div>
                )}
                <div className="flex justify-between items-center pt-4">
                    {step > 1 ? <button type="button" onClick={handleBack} className="plexus-button py-2 px-6 font-bold text-base rounded-full">Back</button> : <div />}
                    {step < totalSteps ? <button type="button" onClick={handleNext} className="plexus-button py-2 px-6 font-bold text-base rounded-full">Next</button> : <button type="submit" className="plexus-button py-2 px-6 font-bold text-base rounded-full">Submit</button>}
                </div>
            </form>
        </>
    );
};
export default NonTechnicalForm;
