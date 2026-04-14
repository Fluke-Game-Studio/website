import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { BadgeCheck, Globe2, Linkedin, MessageSquare, Users } from "lucide-react";
import { publicStudioService, PublicTeamMember } from "@/services/publicStudioService";

function safeStr(v: any) {
  if (v === null || v === undefined) return "";
  return String(v).trim();
}

function memberSlug(member: PublicTeamMember) {
  return encodeURIComponent(safeStr(member.employee_name));
}

export default function TeamSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [team, setTeam] = useState<PublicTeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const items = await publicStudioService.fetchTeam();
        if (cancelled) return;
        setTeam(items);
      } catch (err: any) {
        if (cancelled) return;
        setError(err?.message || "Failed to load team.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const cards = useMemo(() => team.slice(0, 12), [team]);

  return (
    <section className="py-32 bg-fluke-bg relative overflow-hidden" ref={ref} id="team">
      <div className="section-divider absolute top-0 left-0" />
      <div className="max-w-7xl mx-auto px-6">
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
          <p className="mt-4 text-fluke-muted max-w-2xl mx-auto">
            Public-safe studio profiles, connected accounts, and the latest awards and recognition.
          </p>
        </motion.div>

        {loading ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center text-fluke-muted">
            Loading team...
          </div>
        ) : error ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center text-red-300">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.map((member, i) => {
              const picture = safeStr(member.employee_profilepicture || member.employee_picture);
              const initials =
                safeStr(member.employee_name)
                  .split(/\s+/)
                  .filter(Boolean)
                  .slice(0, 2)
                  .map((x) => x[0]?.toUpperCase())
                  .join("") || "TM";
              return (
                <motion.div
                  key={`${member.employee_name}-${i}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.06, ease: "easeOut" }}
                >
                  <Link
                    to={`/about/team/${memberSlug(member)}`}
                    className="group relative rounded-2xl overflow-hidden p-6 flex flex-col items-center text-center isolate h-full transition-transform duration-300 hover:-translate-y-1"
                    style={{
                      backgroundColor: "var(--card-bg)",
                      border: "1px solid var(--card-border)",
                      boxShadow: "var(--card-shadow)",
                    }}
                  >
                    <div className="w-24 h-24 rounded-full mb-4 flex items-center justify-center text-4xl border-2 border-fluke-yellow/20 group-hover:border-fluke-yellow/50 transition-colors duration-200 overflow-hidden relative bg-[var(--fluke-surface)]">
                      {picture ? (
                        <img src={picture} alt={safeStr(member.employee_name)} className="w-full h-full object-cover" />
                      ) : (
                        <span className="font-bebas text-4xl text-fluke-yellow">{initials}</span>
                      )}
                    </div>

                    <h3 className="font-sora font-bold text-fluke-text group-hover:text-fluke-yellow transition-colors duration-200 mb-1">
                      {member.employee_name || "Team Member"}
                    </h3>
                    <p className="font-orbitron text-xs tracking-wider text-fluke-yellow mb-3">
                      {member.employee_title || member.employee_role || "Studio"}
                    </p>
                    <p className="font-sora text-xs text-fluke-muted leading-relaxed mb-4 line-clamp-3">
                      {[
                        member.department ? `Department: ${member.department}` : "",
                        member.location ? `Location: ${member.location}` : "",
                      ]
                        .filter(Boolean)
                        .join(" • ") || "Public profile available"}
                    </p>

                    <div className="flex flex-wrap gap-2 justify-center mb-4">
                      {member.linkedin_connected ? (
                        <span className="inline-flex items-center gap-1.5 text-[10px] px-2 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-300">
                          <Linkedin size={11} />
                          LinkedIn
                        </span>
                      ) : null}
                      {member.discord_connected ? (
                        <span className="inline-flex items-center gap-1.5 text-[10px] px-2 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300">
                          <MessageSquare size={11} />
                          Discord
                        </span>
                      ) : null}
                      {member.department ? (
                        <span className="inline-flex items-center gap-1.5 text-[10px] px-2 py-1 rounded-full bg-white/5 border border-white/10 text-fluke-muted">
                          <BadgeCheck size={11} />
                          {member.department}
                        </span>
                      ) : null}
                    </div>

                    <div className="mt-auto inline-flex items-center gap-2 text-xs text-fluke-text/80">
                      <Users size={14} />
                      View profile
                      <Globe2 size={14} className="opacity-60" />
                    </div>

                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-30"
                      style={{
                        border: "2px solid var(--card-hover-border)",
                        boxShadow: "var(--card-hover-shadow)",
                        borderRadius: "inherit",
                      }}
                    />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
