import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { services } from "@/lib/data/services";
import { ArrowRight, CheckCircle } from "lucide-react";

const categoryColors: Record<string, string> = {
  Development: "from-blue-600/5 to-blue-600/10 border-blue-600/20",
  Consulting: "from-purple-600/5 to-purple-600/10 border-purple-600/20",
  Art: "from-pink-600/5 to-pink-600/10 border-pink-600/20",
  Audio: "from-green-600/5 to-green-600/10 border-green-600/20",
  Publishing: "from-orange-600/5 to-orange-600/10 border-orange-600/20",
  Video: "from-red-600/5 to-red-600/10 border-red-600/20",
  Assets: "from-amber-600/5 to-amber-600/10 border-amber-600/20",
  Web: "from-cyan-600/5 to-cyan-600/10 border-cyan-600/20",
};

export default function ServicesPage() {
  const categories = [...new Set(services.map((s) => s.category))];

  return (
    <div className="min-h-screen bg-fluke-bg pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="font-orbitron text-xs tracking-[0.4em] text-fluke-yellow uppercase mb-3">
            What We Offer
          </p>
          <h1 className="font-bebas text-6xl sm:text-8xl text-fluke-text mb-4">
            Our Services
          </h1>
          <p className="font-sora text-fluke-muted max-w-xl mx-auto">
            From concept to shipping — we've got every skill your project needs. Work with us for a specific phase or the whole pipeline.
          </p>
        </div>

        {/* Services by category */}
        {categories.map((cat) => (
          <div key={cat} className="mb-20" id={services.find(s => s.category === cat)?.slug}>
            <div className="flex items-center gap-4 mb-8">
              <h2 className="font-orbitron font-bold text-2xl text-fluke-text">{cat}</h2>
              <div className="flex-1 h-px bg-fluke-yellow/10" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {services.filter((s) => s.category === cat).map((service, i) => (
                <motion.div 
                  key={service.id} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group scroll-mt-32" 
                  id={service.slug}
                >
                  <motion.div
                    whileHover={{ y: -8, scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="relative p-8 rounded-3xl overflow-hidden flex flex-col isolate h-full"
                    style={{
                      backgroundColor: 'var(--card-bg)',
                      border: '1px solid var(--card-border)',
                      boxShadow: 'var(--card-shadow)',
                    }}
                  >
                  {/* Hover background effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-fluke-yellow/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
                  
                  {/* Decorative corner element */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-fluke-yellow/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0 pointer-events-none" />

                  {/* Icon */}
                  <div className="relative z-10 w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/5 text-fluke-yellow/70 group-hover:text-fluke-yellow group-hover:bg-fluke-yellow/10 group-hover:scale-110 transition-all duration-500 mb-6">
                    <service.icon size={24} strokeWidth={1.5} />
                  </div>

                  {/* Title */}
                  <h3 className="relative z-10 font-bebas text-3xl tracking-wide text-fluke-text group-hover:text-fluke-yellow transition-colors mb-4">
                    {service.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="relative z-10 font-sora text-sm text-fluke-muted mb-6 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                    {service.longDescription}
                  </p>

                  <ul className="relative z-10 space-y-2 mb-8 flex-1">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs font-sora text-fluke-muted opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                        <CheckCircle size={14} className="text-fluke-yellow/70 flex-none mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Action Link */}
                  <Link
                    to="/contact"
                    className="relative z-10 inline-flex items-center justify-between w-full pt-4 border-t border-fluke-yellow/10 group/link"
                  >
                    <span className="text-[11px] font-orbitron tracking-widest text-fluke-muted group-hover/link:text-fluke-yellow uppercase transition-colors duration-300">
                      Start a Project
                    </span>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-fluke-surface/80 group-hover/link:bg-fluke-yellow group-hover/link:text-fluke-bg text-fluke-muted transition-all duration-300 transform group-hover/link:translate-x-1">
                      <ArrowRight size={14} />
                    </div>
                  </Link>
                  
                  {/* Hover state overlay */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-30" 
                    style={{ 
                      border: '2px solid var(--card-hover-border)',
                      boxShadow: 'var(--card-hover-shadow)',
                      borderRadius: 'inherit'
                    }} 
                  />
                </motion.div>
              </motion.div>
            ))}
            </div>
          </div>
        ))}

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center py-20 rounded-3xl mt-8 transition-all duration-300"
          style={{
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            boxShadow: 'var(--card-shadow)',
          }}
        >
          <h2 className="font-bebas text-5xl text-fluke-text mb-4">Not Sure Where to Start?</h2>
          <p className="font-sora text-fluke-muted mb-6 max-w-sm mx-auto">
            Tell us about your project and we&apos;ll suggest the best approach.
          </p>
          <Link to="/contact" className="btn-primary px-10 py-4 rounded-xl font-sora inline-flex items-center justify-center">
            Get a Free Consultation
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
