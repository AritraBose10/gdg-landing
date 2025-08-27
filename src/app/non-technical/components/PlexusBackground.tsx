"use client";

import { FC, useEffect, useRef } from 'react';

const PlexusBackground: FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;

        // Store mutable values in refs to persist between renders
        const mouse = { x: canvas.width / 2, y: canvas.height / 2, isDown: false };
        let particles: any[] = [];
        let stars: any[] = [];
        let pulses: any[] = [];
        const googleColors = ['#4285F4', '#DB4437', '#F4B400', '#0F9D58'];

        // Define event handlers to be able to remove them later
        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };
        const handleMouseDown = () => { mouse.isDown = true; };
        const handleMouseUp = () => { mouse.isDown = false; };

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            // Re-initialize particles for the new screen size
            particles = [];
            const particleCount = window.innerWidth < 768 ? 50 : 100;
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.2,
                    vy: (Math.random() - 0.5) * 0.2,
                    radius: Math.random() * 1.5 + 1,
                    parallax: Math.random() * 0.4 + 0.1
                });
            }

            // Re-initialize stars
            stars = [];
            for (let i = 0; i < 150; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 1.2,
                    originalX: 0, // Will be set on first animation frame
                    originalY: 0,
                    parallax: Math.random() * 0.1 + 0.05
                });
            }
        };

        resizeCanvas();

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const parallaxX = (mouse.x - canvas.width / 2) / 20;
            const parallaxY = (mouse.y - canvas.height / 2) / 20;

            // Animate stars with parallax and "warp speed" on mousedown
            stars.forEach(star => {
                if (star.originalX === 0) {
                    star.originalX = star.x;
                    star.originalY = star.y;
                }

                if (mouse.isDown) {
                    const dx = star.x - canvas.width / 2;
                    const dy = star.y - canvas.height / 2;
                    star.x += dx * 0.03;
                    star.y += dy * 0.03;
                    ctx.beginPath();
                    ctx.moveTo(star.originalX - parallaxX * star.parallax, star.originalY - parallaxY * star.parallax);
                    ctx.lineTo(star.x, star.y);
                    ctx.strokeStyle = `rgba(255, 255, 255, 0.3)`;
                    ctx.stroke();
                } else {
                    star.x = star.originalX - parallaxX * star.parallax;
                    star.y = star.originalY - parallaxY * star.parallax;
                }
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, 0.8)`;
                ctx.fill();
            });

            // Animate particles
            particles.forEach(p => {
                if (!mouse.isDown) {
                    p.x += p.vx;
                    p.y += p.vy;
                    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
                }

                const currentX = p.x - parallaxX * p.parallax;
                const currentY = p.y - parallaxY * p.parallax;

                ctx.beginPath();
                ctx.arc(currentX, currentY, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, 0.5)`;
                ctx.fill();
            });

            // Animate connecting lines (the "plexus")
            for (let i = 0; i < particles.length; i++) {
                for (let j = i; j < particles.length; j++) {
                    const p1 = particles[i];
                    const p2 = particles[j];
                    const dist = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.moveTo(p1.x - parallaxX * p1.parallax, p1.y - parallaxY * p1.parallax);
                        ctx.lineTo(p2.x - parallaxX * p2.parallax, p2.y - parallaxY * p2.parallax);

                        const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
                        grad.addColorStop(0, googleColors[i % 4]);
                        grad.addColorStop(1, googleColors[j % 4]);

                        ctx.strokeStyle = grad;
                        ctx.lineWidth = 1 - dist / 150;
                        ctx.stroke();

                        if (Math.random() < 0.001) {
                            pulses.push({ start: p1, end: p2, progress: 0, color: googleColors[i % 4] });
                        }
                    }
                }
            }

            // Animate pulses along the lines
            pulses.forEach((pulse, index) => {
                pulse.progress += 0.04;
                if (pulse.progress >= 1) {
                    pulses.splice(index, 1);
                } else {
                    const currentX = pulse.start.x + (pulse.end.x - pulse.start.x) * pulse.progress;
                    const currentY = pulse.start.y + (pulse.end.y - pulse.start.y) * pulse.progress;

                    ctx.beginPath();
                    ctx.arc(currentX, currentY, 2, 0, Math.PI * 2);
                    ctx.fillStyle = pulse.color;
                    ctx.fill();
                }
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        // Add event listeners
        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        // Cleanup function to remove listeners when the component unmounts
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full bg-[#11111b]" />;
};

export default PlexusBackground;
