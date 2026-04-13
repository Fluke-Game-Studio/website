import { motion } from "framer-motion";
import StudioStory from "@/components/home/StudioStory";
import StudioCapabilities from "@/components/home/StudioCapabilities";
import TeamSection from "@/components/home/TeamSection";
import CtaSection from "@/components/home/CtaSection";

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-fluke-bg">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-fluke-bg/50 to-fluke-bg z-10" />
          <div className="absolute inset-0 opacity-20 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
        </div>

        <div className="relative z-20 text-center px-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-orbitron text-fluke-yellow text-sm tracking-[0.4em] uppercase mb-4"
          >
            Behind the Brand
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-bebas text-7xl md:text-9xl text-fluke-text uppercase tracking-tight"
          >
            We Are <span className="gradient-text">Fluke</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-sora text-fluke-muted max-w-2xl mx-auto mt-6 text-lg"
          >
            A collective of creators, engineers, and dreamers dedicated to pushing the boundaries of interactive entertainment.
          </motion.p>
        </div>
      </section>

      {/* Main Sections */}
      <StudioStory />
      <div className="bg-fluke-surface">
        <StudioCapabilities />
      </div>
      <TeamSection />
      <CtaSection />
    </div>
  );
}
