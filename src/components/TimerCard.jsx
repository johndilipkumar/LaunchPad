import { motion } from 'framer-motion';
import FlipCard from './FlipCard';

export function TimerCard({ value, label }) {
  return (
    <motion.div 
      className="flex flex-col items-center gap-3 sm:gap-4 md:gap-6 group"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 15 }}
    >
      {/* Flip Card with number values */}
      <FlipCard value={value} />

      {/* Label under the card */}
      <span className="text-[10px] sm:text-xs md:text-sm font-bold tracking-[0.2em] sm:tracking-[0.25em] text-space-lavender uppercase select-none group-hover:text-space-pink transition-colors duration-300">
        {label}
      </span>
    </motion.div>
  );
}

export default TimerCard;
