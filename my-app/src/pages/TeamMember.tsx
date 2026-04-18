import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, BadgeCheck, ChevronRight, Globe2, Linkedin, MessageSquare } from "lucide-react";
import EmployeeDetailPanel from "@/components/EmployeeDetailPanel";
import PremiumLoader from "@/components/PremiumLoader";
import {
  PublicAnalyticsDashboard,
  PublicAwardItem,
  PublicTeamMember,
  PublicUpdateItem,
  publicStudioService,
} from "@/services/publicStudioService";

function safeStr(v: any) {
  if (v === null || v === undefined) return "";
  return String(v).trim();
}

function linkedinProfileUrl(member: PublicTeamMember) {
  const explicit = safeStr((member as any).linkedin_url);
  if (explicit) return explicit;
  const memberId = safeStr(member.linkedin_member_id);
  const name = safeStr(member.linkedin_name || member.employee_name);
  if (memberId) return `https://www.linkedin.com/in/${encodeURIComponent(memberId)}`;
  if (name) return `https://www.linkedin.com/search/results/all/?keywords=${encodeURIComponent(name)}`;
  return "";
}

function discordProfileUrl(member: PublicTeamMember) {
  const explicit = safeStr((member as any).discord_url);
  if (explicit) return explicit;
  const memberId = safeStr(member.discord_member_id);
  if (memberId) return `https://discord.com/users/${encodeURIComponent(memberId)}`;
  return "";
}

function buildEmployeeSummaryPrompt(
  member: PublicTeamMember,
  analytics: PublicAnalyticsDashboard | null,
  awards: PublicAwardItem[],
  mediaCount: number
) {
  const weekly = analytics?.charts?.weeklySeries || [];
  const projectCount = analytics?.projectBreakdown?.length || 0;
  return [
    "Create a short public-safe employee summary for a portfolio website.",
    `Public username: ${safeStr((member as any).username) || "n/a"}`,
    `Employee: ${safeStr(member.employee_name)}`,
    `Title: ${safeStr(member.employee_title)}`,
    `Department: ${safeStr(member.department) || "n/a"}`,
    `Location: ${safeStr(member.location) || "n/a"}`,
    `Awards: ${awards.length}`,
    `Media: ${mediaCount}`,
    `Weekly points: ${weekly.length}`,
    `Project points: ${projectCount}`,
    "Write 4-6 concise lines focused on public-safe highlights.",
  ].join("\n");
}

export default function TeamMemberPage() {
  const { memberName = "" } = useParams();
  const navigate = useNavigate();
  const decodedName = useMemo(() => decodeURIComponent(memberName), [memberName]);

  const [team, setTeam] = useState<PublicTeamMember[]>([]);
  const [awards, setAwards] = useState<PublicAwardItem[]>([]);
  const [updates, setUpdates] = useState<PublicUpdateItem[]>([]);
  const [analytics, setAnalytics] = useState<PublicAnalyticsDashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const [teamResult, awardResult, updateResult, analyticsResult] = await Promise.allSettled([
          publicStudioService.fetchTeam(),
          publicStudioService.fetchRecentAwards(200),
          publicStudioService.fetchPublicUpdates(200),
          publicStudioService.fetchPublicAnalyticsDashboard(),
        ]);
        if (cancelled) return;

        if (teamResult.status === "fulfilled") {
          setTeam(teamResult.value);
        } else {
          throw teamResult.reason;
        }

        if (awardResult.status === "fulfilled") {
          setAwards(awardResult.value);
        } else {
          setAwards([]);
        }

        if (updateResult.status === "fulfilled") {
          setUpdates(updateResult.value.items || []);
        } else {
          setUpdates([]);
        }

        if (analyticsResult.status === "fulfilled") {
          setAnalytics(analyticsResult.value);
        } else {
          setAnalytics(null);
        }
      } catch (err: any) {
        if (cancelled) return;
        setError(err?.message || "Failed to load team member.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const member = useMemo(() => {
    const exact = team.find((item) => safeStr(item.employee_name).toLowerCase() === decodedName.toLowerCase());
    if (exact) return exact;
    return team.find((item) => safeStr(item.employee_name).toLowerCase().includes(decodedName.toLowerCase())) || null;
  }, [decodedName, team]);
  const employeeUsername = safeStr((member as any)?.username);

  const heroPicture = safeStr(member?.employee_picture || member?.employee_profilepicture);
  const initials =
    safeStr(member?.employee_name)
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((x) => x[0]?.toUpperCase())
      .join("") || "TM";

  const mediaItems = useMemo(() => {
    const all = updates.flatMap((item) => [...(item.attachments || []), ...(item.media || [])]);
    const seen = new Set<string>();
    const memberName = safeStr(member?.employee_name).toLowerCase();
    return all.filter((item) => {
      const key = safeStr(item.publicUrl || item.youtubeUrl || item.name);
      if (!key || seen.has(key)) return false;
      const owner = safeStr((item as any).employee_name || member?.employee_name).toLowerCase();
      if (owner && owner !== memberName) return false;
      seen.add(key);
      return true;
    });
  }, [member?.employee_name, updates]);

  const memberAwards = useMemo(
    () =>
      awards.filter(
        (award) => safeStr(award.person?.name).toLowerCase() === safeStr(member?.employee_name).toLowerCase()
      ),
    [awards, member?.employee_name]
  );

  if (loading) {
    return (
      <div className="pt-20 lg:pt-28 px-4 md:px-6 pb-20 min-h-screen bg-fluke-bg">
        <div className="max-w-7xl mx-auto">
          {/* Skeleton Breadcrumb */}
          <div className="h-4 w-32 bg-white/5 rounded mb-8 animate-pulse" />

          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 lg:gap-8 items-start">
            {/* Sidebar Skeleton */}
            <div className="rounded-3xl p-6 border border-white/10 bg-white/5 h-[600px] animate-pulse">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-24 h-24 rounded-3xl bg-fluke-yellow/10" />
                <div className="flex-1 space-y-3">
                  <div className="h-6 w-3/4 bg-white/10 rounded" />
                  <div className="h-4 w-1/2 bg-white/5 rounded" />
                </div>
              </div>
              <div className="flex gap-2 mb-8">
                <div className="h-8 w-24 bg-white/5 rounded-full" />
                <div className="h-8 w-24 bg-white/5 rounded-full" />
              </div>
              <div className="space-y-4">
                <div className="h-32 w-full bg-white/5 rounded-2xl" />
                <div className="h-32 w-full bg-white/5 rounded-2xl" />
              </div>
            </div>

            {/* Main Panel Skeleton */}
            <div className="rounded-3xl border border-white/10 bg-white/5 min-h-[800px] animate-pulse overflow-hidden">
              <div className="p-8 border-b border-white/10 space-y-4">
                <div className="h-4 w-32 bg-fluke-yellow/10 rounded" />
                <div className="h-16 w-3/4 bg-white/10 rounded" />
                <div className="h-4 w-full bg-white/5 rounded" />
              </div>
              <div className="p-8 space-y-6">
                <div className="h-48 w-full bg-white/5 rounded-3xl" />
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="h-24 w-full bg-white/5 rounded-2xl" />
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="h-64 w-full bg-white/5 rounded-3xl" />
                  <div className="h-64 w-full bg-white/5 rounded-3xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !member) {
    return (
      <div className="pt-28 px-6 min-h-screen bg-fluke-bg text-fluke-text">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl p-10 border border-white/10 bg-white/5">
            <p className="text-fluke-muted">{error || "Team member not found."}</p>
            <button
              onClick={() => navigate("/about")}
              className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-fluke-yellow text-black font-semibold"
            >
              <ArrowLeft size={16} />
              Back to About
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 lg:pt-28 px-4 md:px-6 pb-20 min-h-screen bg-fluke-bg text-fluke-text">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link
            to="/about"
            className="inline-flex items-center gap-2 text-fluke-muted hover:text-fluke-yellow transition-colors"
          >
            <ArrowLeft size={16} />
            Back to About
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 lg:gap-8 items-start">
          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="tm-sidebar sticky top-28 rounded-3xl p-4 md:p-6 border border-white/10 bg-[linear-gradient(180deg,rgba(18,27,50,0.98),rgba(10,15,28,0.95))] shadow-2xl"
          >
            <div className="flex items-center gap-4">
              <div className="tm-icon-box w-24 h-24 rounded-3xl overflow-hidden flex items-center justify-center bg-white/10 border border-white/10">
                {heroPicture ? (
                  <img src={heroPicture} alt={safeStr(member.employee_name)} className="w-full h-full object-cover" />
                ) : (
                  <span className="font-bebas text-4xl text-fluke-yellow">{initials}</span>
                )}
              </div>
              <div>
                <p className="font-bebas text-3xl leading-tight text-white">{member.employee_name}</p>
                <p className="text-fluke-muted text-sm mt-1">{member.employee_title || "Team Member"}</p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {member.department ? (
                <span className="tm-card inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-fluke-text">
                  <BadgeCheck size={12} />
                  {member.department}
                </span>
              ) : null}
              {member.location ? (
                <span className="tm-card inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-fluke-text">
                  <Globe2 size={12} />
                  {member.location}
                </span>
              ) : null}
              {member.employment_type ? (
                <span className="tm-card inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-fluke-text">
                  {member.employment_type}
                </span>
              ) : null}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="tm-card rounded-2xl p-4 bg-white/5 border border-white/10">
                <div className="text-[11px] uppercase tracking-[0.25em] text-fluke-muted mb-1">LinkedIn</div>
                <a
                  href={linkedinProfileUrl(member) || undefined}
                  target={linkedinProfileUrl(member) ? "_blank" : undefined}
                  rel={linkedinProfileUrl(member) ? "noreferrer" : undefined}
                  className={`font-semibold ${
                    linkedinProfileUrl(member) ? "text-green-500 hover:underline" : "text-fluke-muted"
                  }`}
                >
                  {member.linkedin_connected ? "Connected" : "Not connected"}
                </a>
              </div>
              <div className="tm-card rounded-2xl p-4 bg-white/5 border border-white/10">
                <div className="text-[11px] uppercase tracking-[0.25em] text-fluke-muted mb-1">Discord</div>
                <a
                  href={discordProfileUrl(member) || undefined}
                  target={discordProfileUrl(member) ? "_blank" : undefined}
                  rel={discordProfileUrl(member) ? "noreferrer" : undefined}
                  className={`font-semibold ${
                    discordProfileUrl(member) ? "text-sky-500 hover:underline" : "text-fluke-muted"
                  }`}
                >
                  {member.discord_connected ? "Connected" : "Not connected"}
                </a>
              </div>
            </div>

            <div className="tm-card mt-6 rounded-2xl p-4 bg-white/5 border border-white/10">
              <div className="text-[11px] uppercase tracking-[0.25em] text-fluke-yellow mb-2">Basic Info</div>
              <div className="space-y-2 text-sm text-fluke-muted">
                <div className="flex items-start justify-between gap-3">
                  <span>Name</span>
                  <span className="text-fluke-text text-right">{member.employee_name}</span>
                </div>
                <div className="flex items-start justify-between gap-3">
                  <span>Title</span>
                  <span className="text-fluke-text text-right">{member.employee_title || "—"}</span>
                </div>
                {employeeUsername ? (
                  <div className="flex items-start justify-between gap-3">
                    <span>Username</span>
                    <span className="text-fluke-text text-right">{employeeUsername}</span>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <a
                href={linkedinProfileUrl(member) || undefined}
                target={linkedinProfileUrl(member) ? "_blank" : undefined}
                rel={linkedinProfileUrl(member) ? "noreferrer" : undefined}
                className="tm-card inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs hover:border-green-400 hover:text-green-500 transition-colors"
              >
                <Linkedin size={12} />
                LinkedIn
              </a>
              <a
                href={discordProfileUrl(member) || undefined}
                target={discordProfileUrl(member) ? "_blank" : undefined}
                rel={discordProfileUrl(member) ? "noreferrer" : undefined}
                className="tm-card inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs hover:border-sky-400 hover:text-sky-500 transition-colors"
              >
                <MessageSquare size={12} />
                Discord
              </a>
            </div>
          </motion.aside>

          <section className="min-w-0 flex-1">
            <EmployeeDetailPanel member={member} awards={awards} updates={updates} analytics={analytics} />
          </section>
        </div>
      </div>
    </div>
  );
}
