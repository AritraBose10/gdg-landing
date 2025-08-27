"use client";

import React, { FC, FormEvent, useState } from 'react';
import { OnChangeValue } from 'react-select';
import AnimatedFormField from './AnimatedFormField';

// --- Type Definitions ---
interface SkillOption {
    value: string;
    label: string;
}

interface FormData {
    name: string;
    batchYear: string;
    studentId: string;
    email: string;
    linkedin: string;
    github: string;
    experiences: string;
    skills: SkillOption[];
    whyJoin: string;
    acknowledgement: boolean;
}

interface FormField {
    id: keyof FormData;
    label: string;
    type: string;
    color: string;
    delay: string;
    required?: boolean;
    options?: string[];
    text?: string;
}

interface HologramFormProps {
    onSuccess: () => void;
    onFailure: () => void;
}

// --- Form Configuration ---
const initialFormData: FormData = {
    name: '',
    batchYear: '2025',
    studentId: '',
    email: '',
    linkedin: '',
    github: '',
    experiences: '',
    skills: [],
    whyJoin: '',
    acknowledgement: false,
};

const formSteps: FormField[][] = [
    // Step 1
    [
        { id: 'name', label: 'Full Name', type: 'text', color: '#4285F4', delay: '0.5s' },
        { id: 'batchYear', label: 'Batch Year of Study', type: 'select', color: '#DB4437', delay: '0.8s', options: ['2025', '2026', '2027', '2028'] },
        { id: 'studentId', label: 'Student ID', type: 'text', color: '#F4B400', delay: '1.1s' },
    ],
    // Step 2
    [
        { id: 'email', label: 'Email Address', type: 'email', color: '#4285F4', delay: '0.5s' },
        { id: 'linkedin', label: 'LinkedIn Profile URL (Optional)', type: 'url', color: '#DB4437', delay: '0.8s', required: false },
        { id: 'github', label: 'GitHub Profile URL (Optional)', type: 'url', color: '#F4B400', delay: '1.1s', required: false },
        { id: 'experiences', label: 'Previous Experiences in Relevant Field', type: 'textarea', color: '#0F9D58', delay: '1.4s' },
    ],
    // Step 3
    [
        { id: 'skills', label: 'Skills (Select up to 5)', type: 'skills', color: '#81c995', delay: '0.5s' },
        { id: 'whyJoin', label: 'Why should you be considered for this role?', type: 'textarea', color: '#4285F4', delay: '0.8s' },
        { id: 'acknowledgement', label: 'Acknowledgement', type: 'checkbox', color: '#DB4437', delay: '1.1s', text: 'I understand being a Core Team member requires responsibility, teamwork and consistent contribution.' },
    ]
];

// --- Component ---
const HologramForm: FC<HologramFormProps> = ({ onSuccess, onFailure }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<FormData>(initialFormData);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value, type } = e.target;
        const isCheckbox = type === 'checkbox';
        setFormData(prev => ({ ...prev, [id]: isCheckbox ? (e.target as HTMLInputElement).checked : value }));
    };

    const handleSkillsChange = (selectedOptions: OnChangeValue<SkillOption, true>) => {
        setFormData(prev => ({ ...prev, skills: selectedOptions as SkillOption[] }));
    };

    const handleNext = () => setCurrentStep(prev => prev + 1);
    const handleBack = () => setCurrentStep(prev => prev - 1);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log('Final Form Data:', formData);

        // Simulate an API call and randomly succeed or fail
        setTimeout(() => {
            if (Math.random() > 0.5) {
                onSuccess();
            } else {
                onFailure();
            }
        }, 1000);
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
                        onChange={field.type === 'skills' ? handleSkillsChange : handleInputChange}
                    >
                        {field.type === 'select' && field.options?.map(option => <option key={option} value={option}>{option}</option>)}
                        {field.type === 'checkbox' && field.text}
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
                    <button type="submit" className="hologram-button py-2 px-6 font-bold rounded-md z-50">SUBMIT</button>
                )}
            </div>
        </form>
    );
};

export default HologramForm;
