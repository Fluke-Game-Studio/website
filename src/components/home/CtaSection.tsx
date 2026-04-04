import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { Zap, Mail, Timer, ShieldCheck, Users, BadgeDollarSign } from "lucide-react";

const trustItems = [
  { label: "Fast Turnaround", Icon: Timer },
  { label: "NDA Protected", Icon: ShieldCheck },
  { label: "Experienced Team", Icon: Users },
  { label: "Flexible Pricing", Icon: BadgeDollarSign },
];

export default function CtaSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-40 overflow-hidden bg-fluke-bg" ref={ref}>
      <div className="section-divider absolute top-0 left-0" />
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial from-fluke-yellow/10 via-transparent to-fluke-bg" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(var(--card-border) 1px, transparent 1px), linear-gradient(90deg, var(--card-border) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-fluke-yellow/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-fluke-yellow/5 rounded-full blur-[80px]" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/5 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="font-orbitron text-xs tracking-[0.4em] text-fluke-yellow uppercase mb-6">
            Let&apos;s Create Together
          </p>

          <h2 className="font-bebas text-6xl sm:text-8xl md:text-9xl text-fluke-text leading-none mb-6">
            Have a{" "}
            <span className="text-fluke-yellow">Game Idea?</span>
          </h2>

          <p className="font-sora text-lg text-fluke-muted max-w-xl mx-auto mb-12">
            Whether you need a full team, a specific skill, or expert advice — we&apos;re ready to bring your vision to life.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="btn-primary px-10 py-4 rounded-xl font-sora text-base flex items-center gap-2 justify-center"
            >
              <Zap size={18} />
              Start a Project
            </Link>
            <Link
              to="/contact"
              className="btn-outline px-10 py-4 rounded-xl font-sora text-base flex items-center gap-2 justify-center"
            >
              <Mail size={18} />
              Contact Us
            </Link>
          </div>

          {/* Trust indicators with Lucide icons */}
          <div className="mt-16 flex flex-wrap gap-8 justify-center">
            {trustItems.map(({ label, Icon }) => (
              <div key={label} className="flex items-center gap-2 text-fluke-muted">
                <Icon size={16} className="text-fluke-yellow shrink-0" />
                <span className="font-sora text-sm">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
