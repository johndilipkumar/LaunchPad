import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useCountdown from '../hooks/useCountdown';
import BackgroundEffects from '../components/BackgroundEffects';
import Countdown from '../components/Countdown';
import EmailForm from '../components/EmailForm';
import SocialLinks from '../components/SocialLinks';
import ConfettiEffect from '../components/ConfettiEffect';

export function Home() {
  // Configurable launch dates
  const getFutureDate = (daysAhead, secondsAhead = 0) => {
    const date = new Date();
    date.setDate(date.getDate() + daysAhead);
    date.setSeconds(date.getSeconds() + secondsAhead);
    return date;
  };

  // Default target date is 10 days from initial load
  const [targetDate, setTargetDate] = useState(() => getFutureDate(10));
  const { days, hours, minutes, seconds, isCompleted } = useCountdown(targetDate);
  const [showDevControls, setShowDevControls] = useState(false);

  // Stagger variants for layout fade-ins
  const layoutVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, damping: 15 } },
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between items-center text-white overflow-hidden font-sans py-12 md:py-16 px-4">
      {/* Dynamic Cosmic Background */}
      <BackgroundEffects />

      {/* DEVELOPER TESTING CONTROL PANEL */}
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={() => setShowDevControls(!showDevControls)}
          className="text-xs bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-full backdrop-blur-md text-space-lavender hover:text-white transition-all duration-300 font-semibold uppercase tracking-wider"
        >
          {showDevControls ? 'Hide Test Panel' : 'Test Launch Screen'}
        </button>

        <AnimatePresence>
          {showDevControls && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="absolute right-0 mt-2 p-4 rounded-xl bg-[#130b21]/95 border border-purple-500/30 backdrop-blur-md shadow-glass w-56 flex flex-col gap-2.5 text-center text-xs"
            >
              <p className="text-space-lavender font-semibold border-b border-white/10 pb-1.5">
                Developer Controls
              </p>
              <button
                onClick={() => {
                  // Set launch date to 10 seconds from now
                  setTargetDate(getFutureDate(0, 10));
                  setShowDevControls(false);
                }}
                className="w-full bg-purple-600/80 hover:bg-purple-500 py-1.5 rounded font-bold transition-colors text-white"
              >
                Launch in 10 Seconds
              </button>
              <button
                onClick={() => {
                  // Set launch date in the past
                  setTargetDate(getFutureDate(-1));
                  setShowDevControls(false);
                }}
                className="w-full bg-rose-600/80 hover:bg-rose-500 py-1.5 rounded font-bold transition-colors text-white"
              >
                Trigger Instant Launch
              </button>
              <button
                onClick={() => {
                  // Reset back to 10 days
                  setTargetDate(getFutureDate(10));
                  setShowDevControls(false);
                }}
                className="w-full bg-slate-700/80 hover:bg-slate-600 py-1.5 rounded font-bold transition-colors text-space-lavender"
              >
                Reset to 10 Days
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* MAIN LAYOUT WRAPPER */}
      <div className="flex-grow flex flex-col justify-center items-center w-full max-w-5xl mx-auto py-8 z-10">
        <AnimatePresence mode="wait">
          {!isCompleted ? (
            <motion.main
              key="countdown-state"
              variants={layoutVariants}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, y: -50, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center text-center gap-12 sm:gap-16 md:gap-20 w-full"
            >
              {/* Heading Area */}
              <motion.div variants={itemVariants} className="space-y-4 max-w-2xl px-4">
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-[0.25em] sm:tracking-[0.35em] text-white uppercase leading-tight select-none">
                  We're{' '}
                  <span className="bg-gradient-to-r from-rose-400 via-space-pink to-purple-500 bg-clip-text text-transparent filter drop-shadow-[0_0_15px_rgba(244,63,94,0.3)]">
                    Launching
                  </span>{' '}
                  Soon
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-space-lavender font-medium tracking-wide">
                  A next-generation experience is coming soon. Stay tuned for something amazing.
                </p>
              </motion.div>

              {/* Countdown timer cards */}
              <motion.div variants={itemVariants} className="w-full">
                <Countdown days={days} hours={hours} minutes={minutes} seconds={seconds} />
              </motion.div>

              {/* Subscription form */}
              <motion.div variants={itemVariants} className="w-full">
                <EmailForm />
              </motion.div>
            </motion.main>
          ) : (
            <motion.main
              key="launch-state"
              initial={{ opacity: 0, scale: 0.95, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 70, damping: 15, delay: 0.2 }}
              className="flex flex-col items-center text-center gap-8 px-4 py-8 max-w-3xl"
            >
              {/* Confetti Explosion Component */}
              <ConfettiEffect />

              {/* Celebration Emoji */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 120, damping: 10, delay: 0.4 }}
                className="text-7xl sm:text-8xl md:text-9xl filter drop-shadow-[0_0_20px_rgba(244,63,94,0.3)] select-none"
              >
                🚀
              </motion.div>

              {/* Celebratory Heading */}
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-[0.1em] sm:tracking-[0.15em] bg-gradient-to-r from-rose-400 via-space-pink to-purple-500 bg-clip-text text-transparent filter drop-shadow-[0_0_30px_rgba(244,63,94,0.4)] uppercase">
                  We Have Launched!
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-space-lavender font-medium tracking-wide max-w-lg mx-auto">
                  The future is here. Welcome to our next-generation web application experience.
                </p>
              </div>

              {/* Action Button */}
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(168, 85, 247, 0.6)' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => alert("Welcome aboard! Initiating system dashboard...")}
                className="mt-6 px-10 py-4 bg-gradient-to-r from-[#a855f7] to-[#3b82f6] text-white font-extrabold tracking-widest rounded-full uppercase shadow-neon-purple text-sm sm:text-base transition-all duration-300"
              >
                Explore Experience
              </motion.button>
            </motion.main>
          )}
        </AnimatePresence>
      </div>

      {/* FOOTER & SOCIAL LINKS */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="w-full flex flex-col justify-center items-center gap-4 py-4 z-10 mt-8"
      >
        <SocialLinks />
        <span className="text-[10px] text-space-lavender/40 tracking-widest uppercase select-none">
          © {new Date().getFullYear()} Launchpad Inc. All rights reserved.
        </span>
      </motion.footer>
    </div>
  );
}

export default Home;
