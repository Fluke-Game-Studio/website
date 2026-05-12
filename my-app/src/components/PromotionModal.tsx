import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';

const PromotionModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has already seen the promo this session
    const hasSeenPromo = sessionStorage.getItem('hasSeenPavanPromo');
    
    if (!hasSeenPromo) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem('hasSeenPavanPromo', 'true');
      }, 10000); // 10 seconds

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleAction = () => {
    window.open('https://pavan.flukegamestudio.com', '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-[450px] aspect-[2/3] bg-fluke-surface border border-fluke-yellow/30 rounded-2xl overflow-hidden shadow-2xl shadow-fluke-yellow/20"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors border border-white/10"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            {/* Poster Image */}
            <div className="absolute inset-0">
              <img 
                src="/data/content/screenshots/CodenamePavan/Codename-Pavan.png" 
                alt="Project Pavan Poster"
                className="w-full h-full object-cover"
              />
              {/* Cinematic Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            </div>

            {/* Content Overaly */}
            <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col items-center text-center gap-6">
              <div className="space-y-2">
                <motion.span 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="block font-orbitron text-fluke-yellow text-[10px] tracking-[0.3em] uppercase"
                >
                  Featured Project
                </motion.span>
                <motion.h2 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="font-bebas text-5xl sm:text-6xl text-white tracking-wider"
                >
                  PROJECT PAVAN
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-white/70 text-sm font-sora max-w-[280px] mx-auto"
                >
                  A mythology-inspired action adventure. The legend awaits your command.
                </motion.p>
              </div>

              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAction}
                className="group relative px-8 py-4 bg-fluke-yellow text-black font-orbitron font-bold text-sm tracking-widest rounded-lg flex items-center gap-2 overflow-hidden"
              >
                <span className="relative z-10">PLAY NOW</span>
                <ExternalLink size={16} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PromotionModal;
