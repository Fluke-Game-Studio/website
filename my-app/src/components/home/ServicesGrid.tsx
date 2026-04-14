import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { services } from "@/lib/data/services";
import { ArrowRight } from "lucide-react";

export default function ServicesGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 bg-fluke-surface relative overflow-hidden" ref={ref}>
      <div className="section-divider absolute top-0 left-0" />
      
      {/* Background radial */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-fluke-yellow/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <p className="font-orbitron text-xs tracking-[0.4em] text-fluke-yellow uppercase mb-3">
            What We Do
          </p>
          <h2 className="font-bebas text-5xl sm:text-7xl text-fluke-text yellow-line">
            Our Services
          </h2>
          <p className="font-sora text-fluke-muted max-w-xl mx-auto mt-4">
            From concept to launch — we offer end-to-end creative and technical services for game developers and studios worldwide.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
            >
              <Link to={`/services#${service.slug}`} className="block h-full group">
                <motion.div 
                  whileHover={{ y: -8, scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative p-8 rounded-3xl overflow-hidden h-full min-h-[220px] flex flex-col isolate will-change-transform"
                  style={{
                    backgroundColor: 'var(--card-bg)',
                    border: '1px solid var(--card-border)',
                    boxShadow: 'var(--card-shadow)',
                  }}
                >

                  {/* Hover background effect - simplified */}
                  <div className="absolute inset-0 bg-gradient-to-br from-fluke-yellow/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />

                  {/* Icon */}
                  <div className="relative z-10 w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/5 text-fluke-yellow/70 group-hover:text-fluke-yellow group-hover:bg-fluke-yellow/10 group-hover:scale-110 transition-[transform,color,background-color] duration-300 mb-6 will-change-transform">
                    <service.icon size={24} strokeWidth={1.5} />
                  </div>

                  {/* Category badge */}
                  <div className="relative z-10 flex items-center gap-2 mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-fluke-yellow/50 group-hover:bg-fluke-yellow transition-colors duration-200" />
                    <span className="text-[10px] font-orbitron tracking-[0.2em] text-fluke-muted group-hover:text-fluke-text uppercase transition-colors duration-200">
                      {service.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="relative z-10 font-bebas text-2xl tracking-wide text-fluke-text group-hover:text-fluke-yellow transition-colors duration-200 mb-3">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="relative z-10 font-sora text-sm text-fluke-muted line-clamp-2 md:line-clamp-3 flex-1 opacity-80 group-hover:opacity-100 transition-opacity duration-200">
                    {service.description}
                  </p>

                  {/* Arrow - Bottom action */}
                  <div className="relative z-10 mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[11px] font-orbitron tracking-widest text-fluke-muted group-hover:text-fluke-yellow uppercase transition-colors duration-200">
                      Explore
                    </span>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 group-hover:bg-fluke-yellow group-hover:text-fluke-bg text-fluke-muted transition-[colors,transform] duration-200 transform group-hover:translate-x-1 will-change-transform">
                      <ArrowRight size={14} />
                    </div>
                  </div>

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
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Link
            to="/services"
            className="btn-outline px-8 py-3 rounded-xl font-sora inline-flex items-center gap-2"
          >
            View All Services
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
