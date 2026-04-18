import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import AboutAccordion from "@/components/about/AboutAccordion";
import StudioStory from "@/components/home/StudioStory";
import TeamSection from "@/components/home/TeamSection";
import CtaSection from "@/components/home/CtaSection";
import InteractiveGrid from "@/components/home/InteractiveGrid";

export default function AboutPage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        // Use a small timeout to ensure the component is fully rendered
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    }
  }, [location]);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-fluke-bg">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-fluke-bg/50 to-fluke-bg z-10" />
          <InteractiveGrid />
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
      <AboutAccordion />
      <TeamSection />
      <StudioStory />
      <CtaSection />
    </div>
  );
}
