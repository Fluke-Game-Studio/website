import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown, Gamepad2, Users } from "lucide-react";
import InteractiveGrid from "./InteractiveGrid";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-fluke-bg">
      {/* Radial gradient background */}
      <div className="absolute inset-0 bg-hero-gradient" />
      
      <InteractiveGrid />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-20"
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8 flex justify-center"
        >
          <div className="relative w-28 h-28">
            <img
              src="/logo.png"
              alt="Fluke Game Studio"
              className="w-full h-full object-contain drop-shadow-[0_0_20px_#F5C54266]"
            />
          </div>
        </motion.div>

        {/* Studio label */}
        <p className="font-orbitron text-xs tracking-[0.4em] text-fluke-yellow mb-4 uppercase">
          Fluke Game Studio
        </p>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-bebas text-6xl sm:text-8xl md:text-9xl leading-none mb-6 text-fluke-text"
        >
          Crafting <span className="text-fluke-yellow">Games,</span>
          <br />
          Worlds &amp; <span className="text-fluke-yellow">Digital</span>
          <br />
          Experiences
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="font-sora text-lg text-fluke-muted max-w-2xl mx-auto mb-10"
        >
          An indie game studio pushing the limits of creativity — building immersive worlds, stunning art, and unforgettable experiences.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/games"
            className="btn-primary px-8 py-4 rounded-xl text-base font-sora flex items-center gap-2 justify-center"
          >
            <Gamepad2 size={18} />
            Explore Games
          </Link>
          <Link
            to="/contact"
            className="btn-outline px-8 py-4 rounded-xl text-base font-sora flex items-center gap-2 justify-center"
          >
            <Users size={18} />
            Work With Us
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-20 flex flex-col items-center gap-2 text-fluke-muted/50"
        >
          <span className="font-sora text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={18} className="text-fluke-yellow/60" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-fluke-bg to-transparent" />
    </section>
  );
}
