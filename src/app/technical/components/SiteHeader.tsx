"use client";

import Image from 'next/image';
import { FC } from 'react';

const SiteHeader: FC = () => (
    <header className="w-full relative z-30">
        {/* Positioned at the absolute top-left corner */}
        <div className="absolute top-0 left-0 px-1 py-4">
            <Image
                src="/logos/gdgdark.png" // Direct path to your GDG logo
                height={60}
                width={140}
                alt="GDG Logo"
            />
        </div>

        {/* Positioned at the absolute top-right corner */}
        <div className="absolute top-0 right-0 py-4 px-1">
            <Image
                src="/logos/tiudark.png" // Direct path to your TIU logo
                height={75}
                width={160}
                alt="TIU Logo"
            />
        </div>
    </header>
);

export default SiteHeader;
