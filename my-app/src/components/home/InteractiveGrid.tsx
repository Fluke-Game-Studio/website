import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { MouseEvent } from "react";

export default function InteractiveGrid() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className="absolute inset-0 z-0 group"
      onMouseMove={handleMouseMove}
    >
      {/* Base Grid Layer */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Interactive Spotlight Layer */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(245, 197, 66, 0.15),
              transparent 80%
            )
          `,
        }}
      />

      {/* Interactive Grid Lines Layer */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          maskImage: useMotionTemplate`
            radial-gradient(
              300px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
          backgroundImage: `linear-gradient(var(--fluke-yellow) 1px, transparent 1px), linear-gradient(90deg, var(--fluke-yellow) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-20 w-1 h-20 bg-gradient-to-b from-fluke-yellow/40 to-transparent" />
        <div className="absolute top-20 left-20 w-20 h-1 bg-gradient-to-r from-fluke-yellow/40 to-transparent" />
        
        <div className="absolute bottom-20 right-20 w-1 h-20 bg-gradient-to-t from-fluke-yellow/40 to-transparent" />
        <div className="absolute bottom-20 right-20 w-20 h-1 bg-gradient-to-l from-fluke-yellow/40 to-transparent" />
      </div>
    </div>
  );
}
