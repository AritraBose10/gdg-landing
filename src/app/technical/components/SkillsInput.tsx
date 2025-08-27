"use client";

import { FC } from 'react';
import Select, { OnChangeValue, StylesConfig } from 'react-select';

// --- Type Definitions ---
interface SkillOption {
    value: string;
    label: string;
}

interface SkillsInputProps {
    value: SkillOption[];
    onChange: (selectedOptions: OnChangeValue<SkillOption, true>) => void;
}

// --- Component ---
const allSkills: SkillOption[] = [
    { value: 'react', label: 'React.js' },
    { value: 'nextjs', label: 'Next.js' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'python', label: 'Python' },
    { value: 'figma', label: 'Figma' },
    { value: 'firebase', label: 'Firebase' },
    { value: 'gcp', label: 'Google Cloud Platform' },
    { value: 'android', label: 'Android (Kotlin/Java)' },
    { value: 'public-speaking', label: 'Public Speaking' },
    { value: 'event-management', label: 'Event Management' },
    // ...add as many skills as you like
];

// Custom styles to match your hologram theme
const customStyles: StylesConfig<SkillOption, true> = {
    control: (provided) => ({
        ...provided,
        background: 'transparent',
        border: 'none',
        borderBottom: '2px solid #5f636880',
        borderRadius: 0,
        boxShadow: 'none',
        minHeight: '42px',
        '&:hover': { borderColor: '#5f6368' },
    }),
    valueContainer: (provided) => ({
        ...provided,
        padding: '0 8px',
    }),
    multiValue: (provided) => ({
        ...provided,
        backgroundColor: 'rgba(129, 201, 149, 0.2)',
        color: '#81c995',
    }),
    multiValueLabel: (provided) => ({
        ...provided,
        color: '#81c995',
    }),
    input: (provided) => ({
        ...provided,
        color: '#e2e8f0',
        fontFamily: '"Roboto Mono", monospace',
    }),
    menu: (provided) => ({
        ...provided,
        background: '#0a0a10',
        border: '2px solid #5f636880',
    }),
    option: (provided, state) => ({
        ...provided,
        background: state.isFocused ? '#4285F4' : 'transparent',
        color: state.isFocused ? 'white' : '#e2e8f0',
        fontFamily: '"Roboto Mono", monospace',
    }),
    placeholder: (provided) => ({
        ...provided,
        color: '#5f6368',
    }),
};

const SkillsInput: FC<SkillsInputProps> = ({ value, onChange }) => {
    return (
        <Select
            isMulti
            instanceId="skills-select"
            options={allSkills}
            value={value}
            onChange={onChange}
            styles={customStyles}
            placeholder="Search and select up to 5 skills..."
            // This enforces the "max 5" rule
            isOptionDisabled={() => value.length >= 5}
        />
    );
};

export default SkillsInput;
