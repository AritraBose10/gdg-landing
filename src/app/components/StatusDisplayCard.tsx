"use-client";

import { FC, useState } from 'react';
import AnimatedStatusIcon from './AnimatedStatusIcon';
import Typewriter from './Typewriter';

interface StatusDisplayCardProps {
    status: 'success' | 'failure';
    lines: { text: string; className: string; }[];
    buttonText: string;
    onButtonClick: () => void;
}

const StatusDisplayCard: FC<StatusDisplayCardProps> = ({ status, lines, buttonText, onButtonClick }) => {
    const [step, setStep] = useState(0);

    const cardStyles = {
        success: {
            gradient: 'radial-gradient(circle at center, rgba(10, 25, 47, 0.8) 0%, rgba(10, 25, 47, 0.95) 100%)',
            borderColor: 'linear-gradient(90deg, #4285F4, #DB4437, #F4B400, #0F9D58, #4285F4)',
            buttonClass: 'hud-button-success',
        },
        failure: {
            gradient: 'radial-gradient(circle at center, rgba(47, 10, 10, 0.8) 0%, rgba(47, 10, 10, 0.95) 100%)',
            borderColor: 'linear-gradient(90deg, #DB4437, #F4B400, #DB4437, #f28b82, #DB4437)',
            buttonClass: 'hud-button-failure',
        }
    };

    const currentStyle = cardStyles[status];

    const handleTypewriterComplete = (nextStep: number) => {
        setStep(nextStep);
    };

    return (
        <div className="hologram-card w-full max-w-lg backdrop-blur-md" style={{ background: currentStyle.gradient }}>
            <style>{`.hologram-card::before { background: ${currentStyle.borderColor}; background-size: 400% 400%; }`}</style>
            <div className="bg-[#0a0a10]/90 rounded-lg p-8 sm:p-12">
                <div className="text-left space-y-2">
                    {lines.map((line, index) => (
                        step >= index && (
                            <Typewriter
                                key={index}
                                text={line.text}
                                delay={index === 0 ? 200 : 100}
                                onComplete={() => handleTypewriterComplete(index + 1)}
                                className={line.className}
                            />
                        )
                    ))}
                </div>

                {/* THE FIX IS HERE: Changed from '>' to '>=' */}
                {step >= lines.length && (
                    <div className="mt-8 opacity-0" style={{ animation: 'slide-in-up 0.8s ease-out 0.5s forwards' }}>
                        <AnimatedStatusIcon variant={status} />
                        <button
                            onClick={onButtonClick}
                            className={`w-full py-3 px-6 font-bold text-lg rounded-md mt-6 ${currentStyle.buttonClass}`}
                        >
                            {buttonText}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StatusDisplayCard;
