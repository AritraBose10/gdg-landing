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

const SkillsInput: FC<SkillsInputProps> = ({ value, onChange }) => {


    const [skillOptions, setSkillOptions] = useState<SkillOption[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isMounted, setIsMounted] = useState(false);

    // 3. Use useEffect to fetch skills from the API when the component mounts.
    useEffect(() => {
        setIsMounted(true);

        // Replace with your actual Raw GitHub Gist URL
        const skillsApiUrl = 'https://gist.githubusercontent.com/AritraBose10/07ccd7f5a103bb16cb8ebe6d7864ba45/raw/1324c677428ad86badd8afe0ce5465dc2b75ffba/skills.json';

        fetch(skillsApiUrl)
            .then(res => res.json())
            .then((data: SkillOption[]) => {
                setSkillOptions(data);
            })
            .catch(err => {
                console.error("Failed to fetch skills:", err);
                // You could set an error state here
            })
            .finally(() => {
                setIsLoading(false); // Stop loading whether it succeeded or failed
            });
    }, []);

    return (
        <Select
            // 4. Update the <Select> component to use the new state.
            isMulti
            instanceId="skills-select"
            options={skillOptions}
            isLoading={isLoading} // Shows a loading indicator
            value={value}
            onChange={onChange}
            styles={customStyles}
            placeholder="Search and select up to 5 skills..."
            isOptionDisabled={() => value.length >= 5}
            noOptionsMessage={() =>
                isLoading
                    ? "Loading skills..."
                    : value.length >= 5
                        ? "You've reached the maximum of 5 skills."
                        : "No skills found."
            }
            menuPortalTarget={isMounted ? document.body : null}
            menuPosition={'fixed'}
        />
    );
};

export default SkillsInput;
