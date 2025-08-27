"use client";

import { FC, HTMLInputTypeAttribute, ReactNode } from 'react';
import SkillsInput from './SkillsInput'; // Import the new SkillsInput

interface AnimatedFormFieldProps {
    id: string;
    label: string;
    type?: HTMLInputTypeAttribute | 'select' | 'textarea' | 'skills' | 'checkbox';
    color: string;
    animationDelay: string;
    children?: ReactNode;
    value: any; // Use 'any' to handle different value types (string, boolean, array)
    onChange: (e: any) => void;
    required?: boolean;
}

const AnimatedFormField: FC<AnimatedFormFieldProps> = ({ id, label, type = 'text', color, animationDelay, children, value, onChange, required = true }) => {
    const animationDuration = "1s";

    const renderInput = () => {
        const commonProps = { id, required, value, onChange };
        const className = `hologram-input w-full p-2 outline-none transition text-[${color}]`;

        if (type === 'textarea') return <textarea {...commonProps} rows={3} className={`${className} resize-none`} />;
        if (type === 'select') return <select {...commonProps} className={`${className} appearance-none bg-[#0a0a10] custom-select`}>{children}</select>;
        if (type === 'skills') return <SkillsInput value={value} onChange={onChange} />;

        if (type === 'checkbox') {
            return (
                <div className="flex items-center gap-3 mt-2">
                    <input {...commonProps} type="checkbox" checked={value} className="h-5 w-5 bg-transparent border-2 border-gray-500 rounded text-green-400 focus:ring-green-400" />
                    <label htmlFor={id} className="text-sm text-gray-300">{children}</label>
                </div>
            );
        }

        return <input {...commonProps} type={type} className={className} />;
    };

    return (
        <div className="relative opacity-0" style={{ animation: `reveal-content ${animationDuration} ease-out ${animationDelay} forwards` }}>
            <span
                className="absolute top-0 left-0 w-full h-full"
                style={{ animation: `reveal-mask ${animationDuration} ease-out ${animationDelay} forwards`, backgroundColor: color }}
            ></span>
            <label htmlFor={id} className={`block text-sm font-medium mb-2 text-[${color}]`}>
                {label}
            </label>
            {renderInput()}
        </div>
    );
};

export default AnimatedFormField;
