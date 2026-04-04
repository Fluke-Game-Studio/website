import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { team } from "@/lib/data/content";
import { Github, Twitter, Instagram, Youtube } from "lucide-react";

const socialIcons: Record<string, React.ReactNode> = {
  twitter: <Twitter size={14} />,
  github: <Github size={14} />,
  instagram: <Instagram size={14} />,
  youtube: <Youtube size={14} />,
};

const avatarEmojis = ["👤", "👤", "👤", "👤"];

export default function TeamSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 bg-fluke-bg relative overflow-hidden" ref={ref}>
      <div className="section-divider absolute top-0 left-0" />
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="font-orbitron text-xs tracking-[0.4em] text-fluke-yellow uppercase mb-3">
            The Crew
          </p>
          <h2 className="font-bebas text-5xl sm:text-7xl text-fluke-text">
            Meet the Team
          </h2>
        </motion.div>

        {/* Team grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
            >
              <motion.div 
                whileHover={{ y: -10, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative rounded-2xl overflow-hidden p-6 flex flex-col items-center text-center isolate h-full"
                style={{
                  backgroundColor: 'var(--card-bg)',
                  border: '1px solid var(--card-border)',
                  boxShadow: 'var(--card-shadow)',
                }}
              >
                {/* Avatar */}
                <div
                  className="w-24 h-24 rounded-full mb-4 flex items-center justify-center text-4xl border-2 border-fluke-yellow/20 group-hover:border-fluke-yellow/50 transition-colors duration-200 overflow-hidden relative"
                  style={{ background: 'var(--fluke-surface)' }}
                >
                  <span>{avatarEmojis[i % 4]}</span>
                  <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-200 border border-var(--fluke-yellow)" />
                </div>

                {/* Info */}
                <h3 className="font-sora font-bold text-fluke-text group-hover:text-fluke-yellow transition-colors duration-200 mb-1">
                  {member.name}
                </h3>
                <p className="font-orbitron text-xs tracking-wider text-fluke-yellow mb-3">
                  {member.role}
                </p>
                <p className="font-sora text-xs text-fluke-muted leading-relaxed mb-4 line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                  {member.bio}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5 justify-center mb-6">
                  {member.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] font-sora px-2 py-0.5 rounded-full bg-fluke-bg border border-fluke-yellow/10 text-fluke-muted"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Socials */}
                <div className="flex gap-2">
                  {member.socials.map(({ platform, url }) => (
                    <a
                      key={platform}
                      href={url}
                      aria-label={platform}
                      className="w-8 h-8 rounded-lg bg-fluke-bg border border-fluke-yellow/10 flex items-center justify-center text-fluke-muted hover:text-fluke-yellow hover:border-fluke-yellow/40 transition-all duration-200 z-20"
                    >
                      {socialIcons[platform]}
                    </a>
                  ))}
                </div>

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
    </section>
  );
}
