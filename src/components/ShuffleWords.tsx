'use client';

import { FC, memo, useEffect, useRef, useState } from 'react';

// --- Type Definition ---
interface ShuffleWordsProps {
    words: string[];
    duration?: number;
}

// --- The Component ---
export const ShuffleWords: FC<ShuffleWordsProps> = memo(({ words, duration = 3000 }) => {
    const [currentWord, setCurrentWord] = useState<string>(words[0]);
    const [wordIndex, setWordIndex] = useState<number>(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ<>*&%$#@!';
    const googleColors: string[] = ['#4285F4', '#DB4437', '#F4B400', '#0F9D58'];
    const currentColor: string = googleColors[wordIndex % googleColors.length];

    useEffect(() => {
        const shuffle = (targetWord: string) => {
            let iteration = 0;
            if (intervalRef.current) clearInterval(intervalRef.current);

            intervalRef.current = setInterval(() => {
                setCurrentWord(
                    targetWord
                        .split('')
                        .map((letter, index) => {
                            if (index < iteration) {
                                return targetWord[index];
                            }
                            return characters[Math.floor(Math.random() * characters.length)];
                        })
                        .join('')
                );

                if (iteration >= targetWord.length) {
                    if (intervalRef.current) clearInterval(intervalRef.current);
                }

                iteration += 1 / 3;
            }, 35);
        };

        shuffle(words[wordIndex]);

        const wordCycleInterval = setInterval(() => {
            setWordIndex((prev) => (prev + 1) % words.length);
        }, duration);

        // This single cleanup function handles everything
        return () => {
            clearInterval(wordCycleInterval);
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [wordIndex, words, duration]);

    return (
        <span
            className="font-mono tracking-wide"
            style={{ color: currentColor }}
            aria-live="polite"
            aria-label={words[wordIndex]}
        >
            {currentWord}
        </span>
    );
});
ShuffleWords.displayName = 'ShuffleWords';
