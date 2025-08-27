"use client";

import { FC, useEffect, useRef, useState } from 'react';

// --- Type Definition ---
interface TypewriterProps {
    text: string;
    speed?: number;
    delay?: number;
    onComplete?: () => void;
    className?: string;
}

// --- Component ---
const Typewriter: FC<TypewriterProps> = ({ text, speed = 25, delay = 0, onComplete, className }) => {
    const [displayedText, setDisplayedText] = useState('');

    // Use a ref to hold the onComplete callback
    // This prevents the effect from re-running if the callback changes
    const onCompleteRef = useRef(onComplete);
    useEffect(() => {
        onCompleteRef.current = onComplete;
    }, [onComplete]);

    useEffect(() => {
        const startDelay = setTimeout(() => {
            let i = 0;
            const intervalId = setInterval(() => {
                if (i >= text.length) {
                    clearInterval(intervalId);
                    if (onCompleteRef.current) {
                        onCompleteRef.current();
                    }
                    return;
                }
                setDisplayedText(text.substring(0, i + 1));
                i++;
            }, speed);
            return () => clearInterval(intervalId);
        }, delay);

        return () => clearTimeout(startDelay);
    }, [text, speed, delay]);

    const isComplete = displayedText.length >= text.length;

    return (
        <p className={`flex items-center ${className}`}>
            <span>{displayedText}</span>
            {!isComplete && <span className="blinking-cursor"></span>}
        </p>
    );
};

export default Typewriter;
