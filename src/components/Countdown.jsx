import { motion } from 'framer-motion';
import TimerCard from './TimerCard';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export function Countdown({ days, hours, minutes, seconds }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="flex flex-row justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-12 w-full max-w-4xl mx-auto px-4 overflow-visible"
    >
      <TimerCard value={days} label="Days" />
      <TimerCard value={hours} label="Hours" />
      <TimerCard value={minutes} label="Minutes" />
      <TimerCard value={seconds} label="Seconds" />
    </motion.div>
  );
}

export default Countdown;
