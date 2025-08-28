"use client";

import { FC, useEffect, useState } from 'react';
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
const allDomains: SkillOption[] = [
    { value: 'ai-ml', label: 'AI/ML' },
    { value: 'cloud', label: 'Cloud' },
    { value: 'web-dev', label: 'Web Development' },
    { value: 'android-dev', label: 'Android' },
    { value: 'web3', label: 'Web3' },
    { value: 'dsa', label: 'DSA' },
    { value: 'Robotics', label: 'Robotics' }
];

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
    menu: (provided) => ({
        ...provided,
        background: '#000000',
        border: '2px solid #5f636880',
    }),
    // This style applies to the menu WHEN IT'S IN A PORTAL
    menuPortal: (provided) => ({
        ...provided,
        zIndex: 9999, // A high z-index to appear over everything
    }),
    valueContainer: (provided) => ({
        ...provided,
        padding: '0 8px',

    }),
    multiValue: (provided) => ({
        ...provided,
        backgroundColor: 'rgba(129, 201, 149, 0.2)',
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
    option: (provided, state) => ({
        ...provided,
        background: state.isFocused ? '#4285F4' : 'black',
        color: state.isFocused ? 'white' : '#e2e8f0',
        fontFamily: '"Roboto Mono", monospace',
    }),
    placeholder: (provided) => ({
        ...provided,
        color: '#5f6368',
    }),
};

const DomainInput: FC<SkillsInputProps> = ({ value, onChange }) => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => { setIsMounted(true); }, []);

    return (
        <Select
            isMulti
            instanceId="domain-select"
            options={allDomains}
            value={value}
            onChange={onChange}
            styles={customStyles}
            placeholder="Search and select domain(s)..."
            menuPortalTarget={isMounted ? document.body : null}
            menuPosition={'fixed'}
        // C. Removed the isOptionDisabled and noOptionsMessage props
        />
    );
};

export default DomainInput;
