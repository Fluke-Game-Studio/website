import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { portfolio } from "@/lib/data/content";
import { ArrowLeft } from "lucide-react";

export default function PortfolioDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const item = portfolio.find((p) => p.id === id);

  if (!item) {
    return (
      <div className="pt-32 px-6 min-h-screen bg-fluke-bg text-fluke-text flex items-center justify-center">
        <div className="text-center">
          <p className="text-fluke-muted mb-6">Portfolio item not found.</p>
          <button
            onClick={() => navigate("/portfolio")}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-fluke-yellow text-black font-semibold hover:bg-fluke-yellow/90 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Portfolio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 min-h-screen bg-fluke-bg text-fluke-text">
      <div className="max-w-5xl mx-auto px-6">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate("/portfolio")}
          className="inline-flex items-center gap-2 text-fluke-muted hover:text-fluke-yellow transition-colors mb-10 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Portfolio
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex items-start justify-between gap-6 mb-6">
            <div className="flex-1">
              <p className="font-orbitron text-xs tracking-[0.4em] text-fluke-yellow uppercase mb-3">
                {item.category}
              </p>
              <h1 className="font-bebas text-5xl sm:text-7xl text-fluke-text yellow-line mb-4">
                {item.title}
              </h1>
              <p className="font-sora text-lg text-fluke-muted max-w-2xl">
                {item.description}
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="font-bebas text-4xl text-fluke-yellow">{item.year}</p>
            </div>
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="rounded-3xl overflow-hidden mb-12 border border-white/10"
        >
          <div className="aspect-video bg-gradient-to-br from-fluke-surface to-fluke-bg flex items-center justify-center">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        </motion.div>

        {/* Tools & Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
        >
          <div>
            <p className="font-orbitron text-xs tracking-[0.4em] text-fluke-yellow uppercase mb-4">
              Technologies
            </p>
            <div className="flex flex-wrap gap-2">
              {item.tools.map((tool) => (
                <span
                  key={tool}
                  className="px-4 py-2 rounded-full bg-fluke-surface border border-fluke-yellow/20 text-fluke-text font-sora text-sm"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="font-orbitron text-xs tracking-[0.4em] text-fluke-yellow uppercase mb-4">
              Project Details
            </p>
            <div className="space-y-2 text-fluke-muted font-sora">
              <p>
                <span className="text-fluke-text">Category:</span> {item.category}
              </p>
              <p>
                <span className="text-fluke-text">Year:</span> {item.year}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="border-t border-white/10 pt-8"
        >
          <button
            onClick={() => navigate("/portfolio")}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-fluke-yellow text-black font-semibold hover:bg-fluke-yellow/90 transition-colors"
          >
            <ArrowLeft size={16} />
            View More Projects
          </button>
        </motion.div>
      </div>
    </div>
  );
}
