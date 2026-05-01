import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-20 pointer-events-none">
        <div className="w-96 h-96 bg-fluke-yellow/50 rounded-full blur-[120px] mix-blend-screen" />
      </div>

      <div className="z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="font-bebas text-[150px] leading-none text-transparent bg-clip-text bg-gradient-to-b from-fluke-yellow to-fluke-glow mb-4">
            404
          </h1>
          <p className="font-orbitron tracking-widest text-xl text-fluke-muted uppercase mb-8">
            Signal Lost in Space
          </p>
          <p className="font-sora text-md text-fluke-muted max-w-md mx-auto mb-12 flex flex-col gap-2">
            <span>The page you are looking for has drifted into an unknown sector of the galaxy.</span>
            <span>Let's get you back to the mothership.</span>
          </p>
          
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-fluke-surface/30 backdrop-blur-md rounded-full border border-fluke-yellow/20 text-fluke-yellow hover:bg-fluke-yellow/10 hover:border-fluke-yellow/40 transition-all font-orbitron tracking-wide text-sm group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            RETURN TO BASE
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
