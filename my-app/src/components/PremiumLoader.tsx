import React from "react";
import { motion } from "framer-motion";
import PublicBotAvatar2DBit from "./PublicBotAvatar2DBit";

interface PremiumLoaderProps {
  message?: string;
}

const PremiumLoader: React.FC<PremiumLoaderProps> = ({ message = "Synthesizing Data..." }) => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-fluke-bg/80 backdrop-blur-xl">
      <div className="relative">
        {/* Glowing Background Rings */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 -m-20 rounded-full bg-fluke-yellow blur-[80px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 -m-12 rounded-full bg-cyan-500 blur-[100px]"
        />

        {/* Bot Avatar Backdrop */}
        <div className="relative p-8 rounded-full border border-white/10 bg-black/40 shadow-2xl backdrop-blur-md">
          <PublicBotAvatar2DBit status="thinking" size={120} />
          
          {/* Scanning Line Animation */}
          <motion.div
            animate={{
              top: ["0%", "100%", "0%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute left-0 right-0 h-[2px] bg-fluke-yellow/40 blur-[1px] shadow-[0_0_15px_var(--fluke-yellow)]"
          />
        </div>
      </div>

      <div className="mt-12 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-fluke-yellow font-bebas text-3xl tracking-[0.2em] uppercase"
        >
          {message}
        </motion.div>
        
        <div className="mt-4 flex gap-1.5 justify-center">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="w-2 h-2 rounded-full bg-fluke-yellow"
            />
          ))}
        </div>
      </div>

      {/* Grid Pattern Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(245, 197, 66, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(245, 197, 66, 0.2) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
    </div>
  );
};

export default PremiumLoader;
