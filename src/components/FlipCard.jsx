import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function FlipCard({ value }) {
  const [currentValue, setCurrentValue] = useState(value);
  const [prevValue, setPrevValue] = useState(value);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    if (value !== currentValue) {
      setPrevValue(currentValue);
      setCurrentValue(value);
      setIsFlipping(true);
    }
  }, [value, currentValue]);

  return (
    <div className="relative w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-2xl flex flex-col text-4xl sm:text-6xl md:text-7xl font-bold font-mono tracking-normal text-space-pink overflow-visible select-none perspective-1000 shadow-glass">
      
      {/* GLOW EFFECT BEHIND CARD */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-rose-500/10 to-purple-500/10 blur-xl opacity-80 pointer-events-none -z-10 group-hover:scale-110 transition-transform duration-500" />
      
      {/* STATIC TOP HALF (SHOWS NEW VALUE) */}
      <div className="relative w-full h-1/2 bg-[#1b152d]/90 rounded-t-2xl border-t border-x border-white/10 overflow-hidden flex items-end justify-center">
        <span className="translate-y-1/2 bg-gradient-to-b from-rose-300 to-space-pink bg-clip-text text-transparent filter drop-shadow-[0_0_10px_rgba(244,63,94,0.3)]">
          {currentValue}
        </span>
        {/* Shadow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      </div>

      {/* STATIC BOTTOM HALF (SHOWS OLD VALUE WHEN FLIPPING, CURRENT VALUE WHEN IDLE) */}
      <div className="relative w-full h-1/2 bg-[#130b21]/95 rounded-b-2xl border-b border-x border-white/10 overflow-hidden flex items-start justify-center">
        <span className="-translate-y-1/2 bg-gradient-to-b from-space-pink to-purple-600 bg-clip-text text-transparent filter drop-shadow-[0_0_10px_rgba(244,63,94,0.3)]">
          {isFlipping ? prevValue : currentValue}
        </span>
        {/* Highlight Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
      </div>

      {/* ANIMATED FLIPPING TOP PANEL (OLDS VALUE FLIPS DOWN) */}
      {isFlipping && (
        <motion.div
          key={`top-${currentValue}`}
          className="absolute top-0 left-0 w-full h-1/2 bg-[#1b152d] rounded-t-2xl border-t border-x border-white/10 overflow-hidden flex items-end justify-center origin-bottom z-20"
          initial={{ rotateX: 0 }}
          animate={{ rotateX: -90 }}
          transition={{ duration: 0.3, ease: 'easeIn' }}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <span className="translate-y-1/2 bg-gradient-to-b from-rose-300 to-space-pink bg-clip-text text-transparent filter drop-shadow-[0_0_10px_rgba(244,63,94,0.3)]">
            {prevValue}
          </span>
          <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        </motion.div>
      )}

      {/* ANIMATED FLIPPING BOTTOM PANEL (NEW VALUE FLIPS DOWN) */}
      {isFlipping && (
        <motion.div
          key={`bottom-${currentValue}`}
          className="absolute bottom-0 left-0 w-full h-1/2 bg-[#130b21] rounded-b-2xl border-b border-x border-white/10 overflow-hidden flex items-start justify-center origin-top z-25"
          initial={{ rotateX: 90 }}
          animate={{ rotateX: 0 }}
          transition={{ duration: 0.3, delay: 0.3, ease: 'easeOut' }}
          onAnimationComplete={() => setIsFlipping(false)}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <span className="-translate-y-1/2 bg-gradient-to-b from-space-pink to-purple-600 bg-clip-text text-transparent filter drop-shadow-[0_0_10px_rgba(244,63,94,0.3)]">
            {currentValue}
          </span>
          <div className="absolute inset-0 bg-white/[0.02] pointer-events-none" />
        </motion.div>
      )}

      {/* MID SLOT DIVIDER */}
      <div className="absolute top-1/2 left-0 w-full h-[1.5px] bg-[#07030e]/80 z-30" />

      {/* LEFT AND RIGHT SIDE NOTCHES */}
      <div className="absolute top-1/2 -left-[5px] -translate-y-1/2 w-[10px] h-[10px] rounded-full bg-[#0a0518] border-r border-white/5 z-40 shadow-inner" />
      <div className="absolute top-1/2 -right-[5px] -translate-y-1/2 w-[10px] h-[10px] rounded-full bg-[#0a0518] border-l border-white/5 z-40 shadow-inner" />
    </div>
  );
}

export default FlipCard;
