import React from "react";
import { motion } from "framer-motion";

interface DiscordButtonProps {
  href?: string;
  className?: string;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export default function DiscordButton({
  href = "https://discord.gg/xDQPgXkj5X",
  className = "",
  variant = "primary",
  size = "md",
}: DiscordButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const variantClasses = {
    primary: "bg-[#5865F2] text-white hover:shadow-[0_0_20px_rgba(88,101,242,0.5)]",
    outline: "border-2 border-[#5865F2] text-[#5865F2] hover:bg-[#5865F2]/10",
    ghost: "text-[#5865F2] hover:bg-[#5865F2]/10",
  };

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className={`
        inline-flex items-center gap-3 font-orbitron font-bold tracking-widest rounded-xl 
        transition-all duration-300 isolate overflow-hidden
        ${sizeClasses[size]} 
        ${variantClasses[variant]} 
        ${className}
      `}
    >
      <div className="relative z-10 flex items-center gap-2">
        <svg
          viewBox="0 0 20 19"
          className="w-5 h-5 fill-current"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16.224 3.768a14.5 14.5 0 0 0-3.67-1.153c-.158.286-.343.67-.47.976a13.5 13.5 0 0 0-4.067 0c-.128-.306-.317-.69-.476-.976A14.4 14.4 0 0 0 3.868 3.77C1.546 7.28.916 10.703 1.231 14.077a14.7 14.7 0 0 0 4.5 2.306q.545-.748.965-1.587a9.5 9.5 0 0 1-1.518-.74q.191-.14.372-.293c2.927 1.369 6.107 1.369 8.999 0q.183.152.372.294-.723.437-1.52.74.418.838.963 1.588a14.6 14.6 0 0 0 4.504-2.308c.37-3.911-.63-7.302-2.644-10.309m-9.13 8.234c-.878 0-1.599-.82-1.599-1.82 0-.998.705-1.82 1.6-1.82.894 0 1.614.82 1.599 1.82.001 1-.705 1.82-1.6 1.82m5.91 0c-.878 0-1.599-.82-1.599-1.82 0-.998.705-1.82 1.6-1.82.893 0 1.614.82 1.599 1.82 0 1-.706 1.82-1.6 1.82" />
        </svg>
        <span>JOIN DISCORD</span>
      </div>
      {variant === "primary" && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.6 }}
        />
      )}
    </motion.a>
  );
}
