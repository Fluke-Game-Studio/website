import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { devlogs } from "@/lib/data/content";
import { Clock, ArrowRight, Settings, Palette, Trophy } from "lucide-react";

const devIcons = [Settings, Palette, Trophy];

const categoryColors: Record<string, string> = {
  Unity: "text-blue-600 bg-blue-50 border-blue-200",
  "Unreal": "text-orange-600 bg-orange-50 border-orange-200",
  Design: "text-purple-600 bg-purple-50 border-purple-200",
  "Studio Updates": "text-green-600 bg-green-50 border-green-200",
  Art: "text-pink-600 bg-pink-50 border-pink-200",
};

const categories = ["Game Dev", "Unity", "Unreal", "Design", "Studio Updates"];

export default function DevlogsPage() {
  return (
    <div className="min-h-screen bg-fluke-bg pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Main content */}
          <div className="lg:col-span-3">
            <div className="mb-12">
              <p className="font-orbitron text-xs tracking-[0.4em] text-fluke-yellow uppercase mb-3">
                Studio Updates
              </p>
              <h1 className="font-bebas text-6xl sm:text-8xl text-fluke-text yellow-line">
                Latest News
              </h1>
            </div>

            <div className="space-y-6">
              {devlogs.map((post, i) => (
                <motion.div 
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
                >
                  <Link to={`/devlogs/${post.slug}`} className="block">
                    <motion.div 
                      whileHover={{ y: -5, scale: 1.005 }}
                      whileTap={{ scale: 0.995 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      className="group relative flex flex-col sm:flex-row gap-6 rounded-2xl overflow-hidden isolate"
                      style={{
                        backgroundColor: 'var(--card-bg)',
                        border: '1px solid var(--card-border)',
                        boxShadow: 'var(--card-shadow)',
                      }}
                    >
                      {/* Thumbnail */}
                      <div
                        className="w-full sm:w-40 h-40 sm:h-auto flex-none flex items-center justify-center text-4xl relative overflow-hidden"
                        style={{
                          background: `linear-gradient(135deg, hsl(${i * 80 + 200}, 40%, var(--thumb-lightness, 8%)) 0%, hsl(${i * 80 + 230}, 50%, var(--thumb-lightness-hi, 14%)) 100%)`,
                        }}
                      >
                        <span className="opacity-30 group-hover:opacity-50 group-hover:scale-110 transition-all duration-500 text-fluke-yellow">
                          {(() => {
                            const Icon = devIcons[i % 3];
                            return <Icon size={40} strokeWidth={1.5} />;
                          })()}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="p-6 sm:py-6 sm:pr-6 sm:pl-0 flex flex-col justify-center flex-1 z-10">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`text-[10px] font-orbitron tracking-wider px-2 py-0.5 rounded border ${categoryColors[post.category] || "text-fluke-yellow bg-fluke-yellow/10 border-fluke-yellow/20"}`}>
                            {post.category}
                          </span>
                          <span className="flex items-center gap-1 text-[10px] text-fluke-muted font-sora">
                            <Clock size={10} />
                            {post.readTime} min read
                          </span>
                        </div>
                        <h2 className="font-sora font-bold text-fluke-text group-hover:text-fluke-yellow transition-colors mb-2">
                          {post.title}
                        </h2>
                        <p className="font-sora text-xs text-fluke-muted line-clamp-2 mb-3">{post.excerpt}</p>
                        <div className="flex items-center justify-between text-xs text-fluke-muted/60 font-sora">
                          <span>by {post.author}</span>
                          <span className="flex items-center gap-1 text-fluke-yellow/60 group-hover:text-fluke-yellow transition-colors">
                            Read more <ArrowRight size={12} />
                          </span>
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
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div 
              className="rounded-2xl p-6 transition-all duration-300"
              style={{
                backgroundColor: 'var(--card-bg)',
                border: '1px solid var(--card-border)',
                boxShadow: 'var(--card-shadow)',
              }}
            >
              <h3 className="font-orbitron text-xs tracking-widest text-fluke-yellow uppercase mb-4">Categories</h3>
              <ul className="space-y-2">
                {categories.map((cat) => (
                  <li key={cat}>
                    <button className="font-sora text-sm text-fluke-muted hover:text-fluke-yellow transition-colors w-full text-left py-1 flex items-center justify-between group">
                      {cat}
                      <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div 
              className="rounded-2xl p-6 transition-all duration-300"
              style={{
                backgroundColor: 'var(--card-bg)',
                border: '1px solid var(--card-border)',
                boxShadow: 'var(--card-shadow)',
              }}
            >
              <h3 className="font-orbitron text-xs tracking-widest text-fluke-yellow uppercase mb-3">Contributing</h3>
              <p className="font-sora text-xs text-fluke-muted mb-4">Want to write for our devlog? We&apos;re always looking for contributor voices.</p>
              <Link to="/contact" className="btn-outline text-xs py-2 px-4 rounded-lg font-sora w-full text-center block">
                Write for Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
