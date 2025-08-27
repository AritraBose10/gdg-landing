'use client';

import { FC, memo, useEffect, useRef } from 'react';
import { ICON_SVG_STRINGS } from './constants';

// --- Type Definition ---
interface IconParticleType {
    x: number;
    y: number;
    size: number;
    img: HTMLImageElement;
    baseX: number;
    baseY: number;
    draw: () => void;
    update: (mouse: { x: number | null; y: number | null; radius: number }) => void;
}

// --- Helpers and Classes ---
const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = (err) => reject(err);
        img.src = src;
    });
};

class IconParticle implements IconParticleType {
    x: number; y: number; size: number; img: HTMLImageElement;
    baseX: number; baseY: number;
    angleX: number; angleY: number; speedX: number;
    speedY: number; amplitudeX: number; amplitudeY: number;
    ctx: CanvasRenderingContext2D;

    constructor(x: number, y: number, size: number, img: HTMLImageElement, ctx: CanvasRenderingContext2D) {
        this.x = x; this.y = y; this.size = size; this.img = img; this.ctx = ctx;
        this.baseX = this.x; this.baseY = this.y;
        this.angleX = Math.random() * Math.PI * 2;
        this.angleY = Math.random() * Math.PI * 2;
        this.speedX = Math.random() * 0.02 + 0.01;
        this.speedY = Math.random() * 0.02 + 0.01;
        this.amplitudeX = Math.random() * 20 + 10;
        this.amplitudeY = Math.random() * 20 + 10;
    }

    draw() {
        if (this.img.complete && this.img.naturalHeight !== 0) {
            this.ctx.save();
            this.ctx.globalAlpha = 0.7;
            this.ctx.drawImage(this.img, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
            this.ctx.restore();
        }
    }

    update(mouse: { x: number | null, y: number | null, radius: number }) {
        this.angleX += this.speedX;
        this.angleY += this.speedY;
        this.x = this.baseX + Math.cos(this.angleX) * this.amplitudeX;
        this.y = this.baseY + Math.sin(this.angleY) * this.amplitudeY;

        if (mouse.x !== null && mouse.y !== null) {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < mouse.radius) {
                let force = (mouse.radius - distance) / mouse.radius;
                this.x -= (dx / distance) * force * 10;
                this.y -= (dy / distance) * force * 10;
            }
        }
    }
}

// --- The Component ---
export const IconBackground: FC = memo(() => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const animationFrameIdRef = useRef<number>(0);

    useEffect(() => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let isMounted = true;


        const particles: IconParticle[] = [];
        const mouse = { x: null as number | null, y: null as number | null, radius: 150 };

        // --- Define Handlers to Reference for Cleanup ---
        const handleMouseMove = (event: MouseEvent) => {
            mouse.x = event.clientX;
            mouse.y = event.clientY;
        };
        const handleMouseOut = () => {
            mouse.x = null;
            mouse.y = null;
        };

        const animate = () => {
            if (!isMounted) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update(mouse);
                p.draw();
            });
            animationFrameIdRef.current = requestAnimationFrame(animate);
        };

        // --- Main setup function (async) ---
        let resizeHandler: (() => void) | null = null;
        const setupCanvas = async () => {
            try {
                const loadedIcons = await Promise.all(ICON_SVG_STRINGS.map(loadImage));
                if (!isMounted) return;

                const init = () => {
                    particles.length = 0; // Clear array before re-initializing
                    const numberOfParticles = 30;
                    for (let i = 0; i < numberOfParticles; i++) {
                        const size = Math.random() * 15 + 15;
                        const x = Math.random() * (canvas.width - size * 2) + size;
                        const y = Math.random() * (canvas.height - size * 2) + size;
                        const icon = loadedIcons[i % loadedIcons.length];
                        particles.push(new IconParticle(x, y, size, icon, ctx));
                    }
                };

                resizeHandler = () => {
                    canvas.width = window.innerWidth;
                    canvas.height = window.innerHeight;
                    init();
                };

                resizeHandler();
                animate();

                window.addEventListener('resize', resizeHandler);
                window.addEventListener('mousemove', handleMouseMove);
                window.addEventListener('mouseout', handleMouseOut);

            } catch (err) {
                console.error("Error loading icons:", err);
            }
        };

        setupCanvas();

        // --- THE FIX: The cleanup function is returned directly by useEffect ---
        return () => {
            isMounted = false;
            console.log("Cleaning up IconBackground...");

            cancelAnimationFrame(animationFrameIdRef.current);

            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseout', handleMouseOut);
            if (resizeHandler) {
                window.removeEventListener('resize', resizeHandler);
            }
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-[-1] bg-transparent" />;
});

IconBackground.displayName = 'IconBackground';
