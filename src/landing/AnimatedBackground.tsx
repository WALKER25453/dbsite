import { useEffect, useRef } from 'react';

const PARTICLE_COUNT = 48;

type Particle = {
    x: number;
    y: number;
    vx: number;
    vy: number;
    r: number;
    hue: number;
};

export default function AnimatedBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const rafRef = useRef<number>(0);
    const mouseRef = useRef({ x: -1000, y: -1000 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const initParticles = () => {
            const w = canvas.width;
            const h = canvas.height;
            particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => ({
                x: Math.random() * w,
                y: Math.random() * h,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                r: Math.random() * 2.2 + 0.6,
                hue: Math.random() > 0.5 ? 220 : 265,
            }));
        };
        initParticles();

        const handleMouse = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener('mousemove', handleMouse);

        const draw = () => {
            const w = canvas.width;
            const h = canvas.height;
            ctx.clearRect(0, 0, w, h);
            const parts = particlesRef.current;
            const mouse = mouseRef.current;

            for (let i = 0; i < parts.length; i++) {
                const p = parts[i];
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > w) p.vx *= -1;
                if (p.y < 0 || p.y > h) p.vy *= -1;

                const mdx = p.x - mouse.x;
                const mdy = p.y - mouse.y;
                const mdist = Math.hypot(mdx, mdy);
                if (mdist < 140) {
                    const force = (140 - mdist) / 140;
                    p.x += (mdx / mdist) * force * 1.5;
                    p.y += (mdy / mdist) * force * 1.5;
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${p.hue}, 90%, 65%, 0.7)`;
                ctx.fill();

                for (let j = i + 1; j < parts.length; j++) {
                    const q = parts[j];
                    const dx = p.x - q.x;
                    const dy = p.y - q.y;
                    const dist = Math.hypot(dx, dy);
                    if (dist < 130) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(q.x, q.y);
                        ctx.strokeStyle = `hsla(${(p.hue + q.hue) / 2}, 80%, 60%, ${(1 - dist / 130) * 0.18})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }
            }
            rafRef.current = requestAnimationFrame(draw);
        };
        draw();

        return () => {
            cancelAnimationFrame(rafRef.current);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouse);
        };
    }, []);

    return (
        <div className='ln-bg' aria-hidden='true'>
            <div className='ln-bg__grid' />
            <div className='ln-bg__orb ln-bg__orb--blue' />
            <div className='ln-bg__orb ln-bg__orb--purple' />
            <div className='ln-bg__orb ln-bg__orb--cyan' />
            <canvas ref={canvasRef} className='ln-bg__canvas' />
        </div>
    );
}
