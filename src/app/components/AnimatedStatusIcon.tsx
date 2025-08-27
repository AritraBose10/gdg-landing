"use client";

import { FC } from 'react';

interface AnimatedStatusIconProps {
    variant: 'success' | 'failure';
}

const AnimatedStatusIcon: FC<AnimatedStatusIconProps> = ({ variant }) => {
    const isSuccess = variant === 'success';

    const config = {
        svgClass: isSuccess ? 'tick-svg-container' : 'x-svg-container',
        circleFill: isSuccess ? '#4285F4' : '#DB4437',
        pathClass: isSuccess ? 'tick-path' : 'x-path',
        pathDefinition: isSuccess ? "M14,27.2 21.2,34.4 38,17.6" : "M16 16 36 36 M36 16 16 36",
    };

    return (
        <div className="mx-auto mt-6 w-24 h-24">
            <svg viewBox="0 0 52 52" className={config.svgClass}>
                <circle cx="26" cy="26" r="25" fill={config.circleFill} />
                <path
                    className={config.pathClass}
                    stroke="#fff"
                    strokeWidth="5"
                    fill="none"
                    d={config.pathDefinition}
                />
            </svg>
        </div>
    );
};

export default AnimatedStatusIcon;
