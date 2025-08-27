"use client";

import React, { FC, FormEvent, useState } from 'react';
import { OnChangeValue } from 'react-select';
import AnimatedFormField from './AnimatedFormField';
// --- UPDATED: Type Definitions ---
interface SkillOption {
    value: string;
    label: string;
}

interface FormData {
    name: string;
    batchYear: string;
    year: string;
    studentId: string;
    email: string;
    phoneNumber: string;
    domain: SkillOption[];
    linkedin: string;
    github: string;
    experiences: string;
    skills: SkillOption[];
}

interface FormField {
    id: keyof FormData;
    label: string;
    type: string;
    color: string;
    delay: string;
    required?: boolean;
    options?: string[] | { value: string; label: string; }[];
    text?: string;
}

interface HologramFormProps {
    onSuccess: () => void;
    onFailure: () => void;
}

// --- UPDATED: Form Configuration ---
const initialFormData: FormData = {
    name: '',
    batchYear: '2025',
    year: '2nd Year',
    studentId: '',
    email: '',
    phoneNumber: '',
    domain: [],
    linkedin: '',
    github: '',
    experiences: '',
    skills: [],
};

const formSteps: FormField[][] = [
    // Step 1: Personal & Academic Info
    [
        { id: 'name', label: 'Full Name', type: 'text', color: '#4285F4', delay: '0.5s' },
        { id: 'studentId', label: 'Student ID', type: 'text', color: '#F4B400', delay: '0.8s' },
        { id: 'batchYear', label: 'Batch (e.g., 2025)', type: 'select', color: '#DB4437', delay: '1.1s', options: ['2025', '2026', '2027', '2028'] },
        { id: 'year', label: 'Year of Study', type: 'select', color: '#0F9D58', delay: '1.4s', options: ['2nd Year', '3rd Year', '4th Year'] },
    ],
    // Step 2: Contact & Professional Info
    [
        {
            id: 'domain',
            label: 'Preferred Domain(s)',
            type: 'domain',
            color: '#4285F4',
            delay: '0.5s',
            options: [
                { value: 'ai-ml', label: 'AI/ML' },
                { value: 'cloud', label: 'Cloud' },
                { value: 'web-dev', label: 'Web Development' },
                { value: 'android-dev', label: 'Android Development' },
                { value: 'design', label: 'Design' }
            ]
        },
        { id: 'email', label: 'Email Address', type: 'email', color: '#F4B400', delay: '0.5s' },
        { id: 'phoneNumber', label: 'Phone Number', type: 'tel', color: '#DB4437', delay: '0.8s' },

    ],
    // Step 3: Domain & Skills
    [

        { id: 'experiences', label: 'Previous Experiences in Relevant Field', type: 'textarea', color: '#DB4437', delay: '1.1s' },
        { id: 'linkedin', label: 'LinkedIn Profile URL (Optional)', type: 'url', color: '#F4B400', delay: '1.1s', required: false },
        { id: 'github', label: 'GitHub Profile URL (Optional)', type: 'url', color: '#0F9D58', delay: '1.4s', required: false },


    ],
    [{ id: 'skills', label: 'Skills (Select up to 5)', type: 'skills', color: '#4285F4', delay: '0.8s' }],
];

// --- Component ---
const HologramForm: FC<HologramFormProps> = ({ onSuccess, onFailure }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<FormData>(initialFormData);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleMultiSelectChange = (id: 'skills' | 'domain', selectedOptions: OnChangeValue<SkillOption, true>) => {
        setFormData(prev => ({ ...prev, [id]: selectedOptions as SkillOption[] }));
    };

    const handleSkillsChange = (selectedOptions: OnChangeValue<SkillOption, true>) => {
        setFormData(prev => ({ ...prev, skills: selectedOptions as SkillOption[] }));
    };

    const handleNext = () => setCurrentStep(prev => prev + 1);
    const handleBack = () => setCurrentStep(prev => prev - 1);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        console.log('Sending final form data:', formData);

        try {
            const response = await fetch('/api/submit-application', {
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
            onFailure(); // Trigger the failure page
        }
    };
    const totalSteps = formSteps.length;

    return (
        <form onSubmit={handleSubmit} className="mt-8">
            <div className="mb-6 text-center text-gray-400 text-sm">Step {currentStep + 1} of {totalSteps}</div>

            <div className="space-y-6" style={{ animation: 'fade-in 0.5s ease-out' }}>
                {formSteps[currentStep].map(field => (
                    <AnimatedFormField
                        key={field.id}
                        id={field.id}
                        label={field.label}
                        type={field.type}
                        color={field.color}
                        animationDelay={field.delay}
                        required={field.required}
                        value={formData[field.id]}
                        // 5. Updated onChange to handle the new 'domain' type
                        onChange={
                            field.type === 'skills'
                                ? (options) => handleMultiSelectChange('skills', options)
                                : field.type === 'domain'
                                    ? (options) => handleMultiSelectChange('domain', options)
                                    : handleInputChange
                        }
                    >
                        {field.type === 'select' && field.options?.map(option => <option key={option} value={option}>{option}</option>)}
                    </AnimatedFormField>
                ))}
            </div>

            <div className="mt-8 flex justify-between items-center">
                {currentStep > 0 ? (
                    <button type="button" onClick={handleBack} className="text-gray-400 hover:text-white transition z-50">&larr; Back</button>
                ) : <div />}

                {currentStep < totalSteps - 1 ? (
                    <button type="button" onClick={handleNext} className="hologram-button py-2 px-6 font-bold rounded-md z-50">Next &rarr;</button>
                ) : (
                    <button type="button" onClick={handleSubmit} className="hologram-button py-2 px-6 font-bold rounded-md z-50">SUBMIT</button>
                )}
            </div>
        </form>
    );
};

export default HologramForm;
