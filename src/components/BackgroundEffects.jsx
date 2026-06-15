import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import hillsPattern from '../assets/pattern-hills.svg';

export function BackgroundEffects() {
  const canvasRef = useRef(null);
  const [particles, setParticles] = useState([]);

  // Setup twinkling starfield using Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Generate stars
    const starCount = Math.floor((window.innerWidth * window.innerHeight) / 9000);
    const stars = Array.from({ length: starCount }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random(),
      speed: Math.random() * 0.015 + 0.005,
      twinkleDir: Math.random() > 0.5 ? 1 : -1,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      stars.forEach((star) => {
        // Twinkle effect
        star.opacity += star.speed * star.twinkleDir;
        if (star.opacity >= 1) {
          star.opacity = 1;
          star.twinkleDir = -1;
        } else if (star.opacity <= 0.1) {
          star.opacity = 0.1;
          star.twinkleDir = 1;
        }

        // Soft drawing
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Generate 25 floating particles for Framer Motion
  useEffect(() => {
    const items = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage
      y: Math.random() * 100, // percentage
      size: Math.random() * 6 + 2, // px
      duration: Math.random() * 20 + 10, // seconds
      delay: Math.random() * -20, // offset starting point
      color: Math.random() > 0.6 ? '#f43f5e' : Math.random() > 0.3 ? '#a855f7' : '#3b82f6', // pink, purple, blue
    }));
    setParticles(items);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full -z-50 overflow-hidden bg-[#0a0518]">
      {/* Base Cosmic Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#06020f] via-[#0d0724] to-[#12072b]" />

      {/* Glowing Nebulae / Radial Gradients */}
      <div className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] rounded-full bg-indigo-900/20 blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute top-[30%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/15 blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: '12s' }} />
      <div className="absolute -bottom-[10%] left-[20%] w-[50%] h-[50%] rounded-full bg-rose-950/20 blur-[130px] pointer-events-none animate-pulse" style={{ animationDuration: '10s' }} />
      <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] rounded-full bg-blue-950/15 blur-[110px] pointer-events-none animate-pulse" style={{ animationDuration: '14s' }} />

      {/* Twinkling Starfield Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-80" />

      {/* Floating Glowing Dust Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full pointer-events-none blur-[1px]"
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
          }}
          animate={{
            y: ['100vh', '-10vh'],
            opacity: [0, 0.7, 0.7, 0],
            x: [`${p.x}%`, `${p.x + (Math.random() * 10 - 5)}%`],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'linear',
          }}
        />
      ))}

      {/* Bottom Landscape Hills and Overlay */}
      <div className="absolute bottom-0 left-0 w-full select-none pointer-events-none">
        {/* Subtle grid pattern overlay for a futuristic digital aesthetic */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] h-52 mask-gradient-bottom" />
        
        {/* The Landscape SVG */}
        <img
          src={hillsPattern}
          alt="Landscape Hills"
          className="w-full object-cover min-h-[150px] opacity-25 md:opacity-40 select-none pointer-events-none"
          style={{
            filter: 'drop-shadow(0 -10px 20px rgba(139, 92, 246, 0.15))',
          }}
        />
        
        {/* Overlay fade to melt landscape into the background */}
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#12072b] to-transparent opacity-95" />
      </div>
    </div>
  );
}

export default BackgroundEffects;
