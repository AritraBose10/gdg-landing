"use client";
import { FC, useEffect, useRef } from 'react';

const SiteHeader: FC = () => {
    const gdgLogoRef = useRef<HTMLImageElement>(null);
    const tiuLogoRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const x = (clientX - window.innerWidth / 2) / 50;
            const y = (clientY - window.innerHeight / 2) / 50;

            if (gdgLogoRef.current) gdgLogoRef.current.style.transform = `translate(${x}px, ${y}px)`;
            if (tiuLogoRef.current) tiuLogoRef.current.style.transform = `translate(${x}px, ${y}px)`;
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <header className="w-full p-4 absolute top-0 left-0">
            <div className="container mx-auto flex justify-between items-center">
                <img ref={gdgLogoRef} src="https://placehold.co/140x40/FFFFFF/000000?text=GDG" height="30" width="100" alt="GDG Logo" className="invert transition-transform duration-300 ease-out" />
                <img ref={tiuLogoRef} src="https://placehold.co/80x40/FFFFFF/000000?text=TIU" height="25" width="60" alt="TIU Logo" className="invert transition-transform duration-300 ease-out" />
            </div>
        </header>
    );
};
export default SiteHeader;
