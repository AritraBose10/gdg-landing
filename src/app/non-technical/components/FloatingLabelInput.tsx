"use client";
import { FC } from 'react';

interface FloatingLabelInputProps {
    id: string;
    label: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    children?: React.ReactNode;
}

const FloatingLabelInput: FC<FloatingLabelInputProps> = ({ id, label, type = 'text', value, onChange, children }) => {
    const commonProps = {
        id,
        required: true,
        className: "form-input w-full",
        placeholder: " ",
        value,
        onChange
    };

    const isSelect = type === 'select';
    const isTextarea = type === 'textarea';

    return (
        <div className="form-group">
            {isTextarea ? (
                <textarea {...commonProps} rows={5} className={`${commonProps.className} resize-none`} />
            ) : isSelect ? (
                <select {...commonProps} className={`${commonProps.className} appearance-none bg-[#1e1e2d]`}>
                    {children}
                </select>
            ) : (
                <input {...commonProps} type={type} />
            )}
            <label htmlFor={id} className={`form-label ${isSelect ? '!top-0 !text-xs !text-[#a7b5ff]' : ''}`}>
                {label}
            </label>
        </div>
    );
};
export default FloatingLabelInput;
