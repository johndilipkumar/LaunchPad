import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function EmailForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success

  const validateEmail = (emailStr) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Email address is required.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setStatus('loading');

    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1500);
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 z-10">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success-message"
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center text-center p-6 rounded-2xl bg-gradient-to-br from-purple-900/40 to-rose-950/30 border border-purple-500/30 backdrop-blur-lg shadow-glass"
          >
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/40 text-emerald-400 mb-4 animate-bounce">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">You're on the list!</h3>
            <p className="text-sm text-space-lavender">
              Thank you for subscribing. We will send you an invite as soon as we launch.
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="mt-4 text-xs font-bold text-space-pink hover:text-rose-400 underline underline-offset-4 transition-colors"
            >
              Subscribe another email
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form-fields"
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex flex-col sm:flex-row gap-3 relative w-full">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  className={`w-full bg-[#1b152d]/40 hover:bg-[#1b152d]/60 focus:bg-[#170e28]/70 border ${
                    error ? 'border-rose-500 focus:border-rose-500 focus:shadow-[0_0_15px_rgba(244,63,94,0.4)]' : 'border-white/10 focus:border-space-pink focus:shadow-neon-pink'
                  } text-white rounded-full px-6 py-3.5 text-sm sm:text-base outline-none transition-all duration-300 placeholder-white/30 backdrop-blur-md`}
                  disabled={status === 'loading'}
                  aria-label="Email Address"
                />
              </div>

              <button
                type="submit"
                className="bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 hover:from-rose-400 hover:to-purple-500 active:scale-95 text-white font-bold rounded-full px-8 py-3.5 text-sm sm:text-base transition-all duration-300 shadow-neon-pink hover:shadow-[0_0_20px_rgba(244,63,94,0.6)] flex items-center justify-center min-w-[130px] disabled:opacity-75 disabled:pointer-events-none"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? (
                  <div className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Sending...</span>
                  </div>
                ) : (
                  <span>Notify Me</span>
                )}
              </button>
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-xs text-rose-400 font-semibold pl-4 flex items-center gap-1.5"
                  role="alert"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  {error}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

export default EmailForm;
