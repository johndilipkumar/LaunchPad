import { useEffect } from 'react';
import confetti from 'canvas-confetti';

export function ConfettiEffect() {
  useEffect(() => {
    // 1. Initial big blast from the center
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#a855f7', '#3b82f6', '#10b981', '#fbbf24'],
    });

    // 2. Secondary side-showers for 5 seconds
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    
    const randomInRange = (min, max) => {
      return Math.random() * (max - min) + min;
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      // Decreasing density over time
      const particleCount = 40 * (timeLeft / duration);

      // Left column shower
      confetti({
        particleCount,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: ['#f43f5e', '#a855f7', '#3b82f6'],
      });

      // Right column shower
      confetti({
        particleCount,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: ['#f43f5e', '#a855f7', '#3b82f6'],
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return null; // No direct DOM elements needed
}

export default ConfettiEffect;
