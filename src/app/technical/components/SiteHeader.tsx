"use client";

import React, { FC } from 'react';

const SiteHeader: FC = () => (
    <header className="w-full p-4 z-30 absolute top-0 left-0">
        <div className="container mx-auto flex justify-between items-center">
            <img src="https://placehold.co/140x40/FFFFFF/000000?text=GDG" height="30" width="100" alt="GDG Logo" className="invert" />
            <img src="https://placehold.co/80x40/FFFFFF/000000?text=TIU" height="25" width="60" alt="TIU Logo" className="invert" />
        </div>
    </header>
);

export default SiteHeader;
