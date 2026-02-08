"use client"
import React, { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    ox: number;
    oy: number;
    vx: number;
    vy: number;
    delay: number;
    /** state 1 means this particle is chosen to form the shape when hovered */
    isShaper: boolean;
}

interface AntigravityCanvasProps {
    text?: string;
    imageSrc?: string;
    colorIdle?: string;
    colorActive?: string;
    dotRadius?: number;
    spacing?: number;
    stiffnessHover?: number;
    stiffnessReturn?: number;
    damping?: number;
    mouseRadius?: number;
    mouseStrength?: number;
    fontSize?: number;
    className?: string;
    hover?: boolean;
}

export const AntigravityCanvas: React.FC<AntigravityCanvasProps> = ({
    text,
    imageSrc,
    colorIdle = "#e5e5e5",
    colorActive = "#6bb7ff",
    dotRadius = 1.2,
    spacing = 16,
    stiffnessHover = 0.05,
    stiffnessReturn = 0.035,
    damping = 0.9,
    mouseRadius = 120,
    mouseStrength = 0.04,
    fontSize: customFontSize,
    className = "",
    hover = false,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const pointsRef = useRef<{ x: number; y: number }[]>([]);
    const mouseRef = useRef<{ x: number; y: number }>({ x: -1000, y: -1000 });
    const requestRef = useRef<number>(0);
    const lastTimeRef = useRef<number>(0);
    const imageRef = useRef<HTMLImageElement | null>(null);

    const buildParticles = (w: number, h: number) => {
        const particles: Particle[] = [];
        const padding = spacing * 2;
        for (let y = -padding; y < h + padding; y += spacing) {
            for (let x = -padding; x < w + padding; x += spacing) {
                const ox = x + (Math.random() - 0.5) * 4;
                const oy = y + (Math.random() - 0.5) * 4;
                particles.push({
                    x: ox,
                    y: oy,
                    ox: ox,
                    oy: oy,
                    vx: 0,
                    vy: 0,
                    delay: Math.random(),
                    isShaper: Math.random() < 0.8 // 80% of dots are potential shapers
                });
            }
        }
        particlesRef.current = particles;
    };

    const buildPoints = (w: number, h: number) => {
        const off = document.createElement("canvas");
        const octx = off.getContext("2d");
        if (!octx) return;

        off.width = w;
        off.height = h;
        octx.clearRect(0, 0, w, h);

        if (imageSrc && imageRef.current && imageRef.current.complete) {
            const img = imageRef.current;
            const aspect = img.width / img.height;
            let targetW = w * 0.4;
            let targetH = targetW / aspect;
            if (targetH > h * 0.6) {
                targetH = h * 0.6;
                targetW = targetH * aspect;
            }
            octx.drawImage(img, (w - targetW) / 2, (h - targetH) / 2, targetW, targetH);
        } else if (text) {
            const fontSize = customFontSize || Math.min(w * 0.18, 220);
            octx.fillStyle = "#000";
            octx.font = `900 ${fontSize}px 'Outfit', system-ui`;
            octx.textAlign = "center";
            octx.textBaseline = "middle";
            octx.fillText(text, w / 2, h / 2 - 20);
        }

        const imgData = octx.getImageData(0, 0, w, h).data;
        const points: { x: number; y: number }[] = [];
        const sampleStep = 4;

        for (let y = 0; y < h; y += sampleStep) {
            for (let x = 0; x < w; x += sampleStep) {
                if (imgData[(y * w + x) * 4 + 3] > 120) {
                    points.push({ x, y });
                }
            }
        }
        pointsRef.current = points;
    };

    const animate = (time: number) => {
        if (!lastTimeRef.current) lastTimeRef.current = time;
        const dt = Math.min((time - lastTimeRef.current) / 16.67, 2);
        lastTimeRef.current = time;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const particles = particlesRef.current;
        const targets = pointsRef.current;
        const mouse = mouseRef.current;

        const sHover = stiffnessHover * dt;
        const sReturn = stiffnessReturn * dt;
        const currentDamping = Math.pow(damping, dt);

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            let tx, ty, stiffness, color;

            // CORE LOGIC: If hovered AND particle is a shaper AND we have shape points
            if (hover && p.isShaper && targets.length > 0) {
                const target = targets[i % targets.length];
                tx = target.x;
                ty = target.y;
                stiffness = sHover;
                color = colorActive; // This color should be passed from App.tsx (black, red, blue etc)
            } else {
                tx = p.ox;
                ty = p.oy;
                stiffness = sReturn;
                color = colorIdle;
            }

            // Physics
            const easedS = stiffness * (0.3 + p.delay * 0.7);
            p.vx += (tx - p.x) * easedS;
            p.vy += (ty - p.y) * easedS;

            // Mouse influence
            const dx = mouse.x - p.x;
            const dy = mouse.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < mouseRadius) {
                const force = (1 - dist / mouseRadius) * mouseStrength * dt;
                p.vx -= dx * force;
                p.vy -= dy * force;
            }

            p.vx *= currentDamping;
            p.vy *= currentDamping;
            p.x += p.vx;
            p.y += p.vy;

            ctx.fillStyle = color;
            ctx.beginPath();
            // Increase size slightly for shape dots to make it bolder
            const radius = (hover && p.isShaper) ? dotRadius * 1.2 : dotRadius;
            ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
            ctx.fill();
        }

        requestRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            const w = window.innerWidth;
            const h = window.innerHeight;
            if (canvasRef.current) {
                canvasRef.current.width = w;
                canvasRef.current.height = h;
                buildParticles(w, h);
                buildPoints(w, h);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        requestRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("resize", handleResize);
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [text, spacing, customFontSize, imageSrc]); // Removed hover from deps to avoid rebuild on hover

    // Re-build points if text or image change
    // Note: we need to handle text change in App.tsx to see it here

    return (
        <canvas
            ref={canvasRef}
            className={`fixed inset-0 z-0 pointer-events-none ${className}`}
            style={{ background: 'transparent', willChange: 'transform' }}
        />
    );
};

