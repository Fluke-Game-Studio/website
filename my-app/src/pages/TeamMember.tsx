import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, BadgeCheck, Globe2, Linkedin, MessageSquare } from "lucide-react";
import EmployeeDetailPanel from "@/components/EmployeeDetailPanel";
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
      <div className="pt-28 px-6 min-h-screen bg-fluke-bg text-fluke-text">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-8 mt-12">
            {/* Sidebar Skeleton */}
            <div className="rounded-3xl p-6 border border-white/10 bg-white/5 animate-pulse h-[500px]">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-24 h-24 rounded-3xl bg-white/10" />
                <div className="flex-1">
                  <div className="h-6 w-3/4 bg-white/10 rounded mb-2" />
                  <div className="h-4 w-1/2 bg-white/10 rounded" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-10 w-full bg-white/5 rounded-xl" />
                <div className="h-10 w-full bg-white/5 rounded-xl" />
                <div className="h-32 w-full bg-white/5 rounded-xl" />
              </div>
            </div>
            {/* Content Skeleton */}
            <div className="space-y-6">
              <div className="h-[200px] w-full bg-white/5 rounded-3xl animate-pulse" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-[200px] bg-white/5 rounded-3xl animate-pulse" />
                <div className="h-[200px] bg-white/5 rounded-3xl animate-pulse" />
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
    <div className="pt-28 px-6 pb-20 min-h-screen bg-fluke-bg text-fluke-text">
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

        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-8 items-start">
          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="sticky top-28 rounded-3xl p-6 border border-white/10 bg-[linear-gradient(180deg,rgba(18,27,50,0.98),rgba(10,15,28,0.95))] shadow-2xl"
          >
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 rounded-3xl overflow-hidden flex items-center justify-center bg-white/10 border border-white/10">
                {heroPicture ? (
                  <img src={heroPicture} alt={safeStr(member.employee_name)} className="w-full h-full object-cover" />
                ) : (
                  <span className="font-bebas text-4xl text-fluke-yellow">{initials}</span>
                )}
              </div>
              <div>
                <p className="font-bebas text-3xl leading-tight">{member.employee_name}</p>
                <p className="text-fluke-muted text-sm mt-1">{member.employee_title || "Team Member"}</p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {member.department ? (
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-fluke-text">
                  <BadgeCheck size={12} />
                  {member.department}
                </span>
              ) : null}
              {member.location ? (
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-fluke-text">
                  <Globe2 size={12} />
                  {member.location}
                </span>
              ) : null}
              {member.employment_type ? (
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-fluke-text">
                  {member.employment_type}
                </span>
              ) : null}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-2xl p-4 bg-white/5 border border-white/10">
                <div className="text-[11px] uppercase tracking-[0.25em] text-fluke-muted mb-1">LinkedIn</div>
                <a
                  href={linkedinProfileUrl(member) || undefined}
                  target={linkedinProfileUrl(member) ? "_blank" : undefined}
                  rel={linkedinProfileUrl(member) ? "noreferrer" : undefined}
                  className={`font-semibold ${
                    linkedinProfileUrl(member) ? "text-green-400 hover:underline" : "text-fluke-muted"
                  }`}
                >
                  {member.linkedin_connected ? "Connected" : "Not connected"}
                </a>
              </div>
              <div className="rounded-2xl p-4 bg-white/5 border border-white/10">
                <div className="text-[11px] uppercase tracking-[0.25em] text-fluke-muted mb-1">Discord</div>
                <a
                  href={discordProfileUrl(member) || undefined}
                  target={discordProfileUrl(member) ? "_blank" : undefined}
                  rel={discordProfileUrl(member) ? "noreferrer" : undefined}
                  className={`font-semibold ${
                    discordProfileUrl(member) ? "text-sky-400 hover:underline" : "text-fluke-muted"
                  }`}
                >
                  {member.discord_connected ? "Connected" : "Not connected"}
                </a>
              </div>
            </div>

            <div className="mt-6 rounded-2xl p-4 bg-white/5 border border-white/10">
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
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs hover:border-green-400 hover:text-green-300 transition-colors"
              >
                <Linkedin size={12} />
                LinkedIn
              </a>
              <a
                href={discordProfileUrl(member) || undefined}
                target={discordProfileUrl(member) ? "_blank" : undefined}
                rel={discordProfileUrl(member) ? "noreferrer" : undefined}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs hover:border-sky-400 hover:text-sky-300 transition-colors"
              >
                <MessageSquare size={12} />
                Discord
              </a>
            </div>
          </motion.aside>

          <section>
            <EmployeeDetailPanel member={member} awards={awards} updates={updates} analytics={analytics} />
          </section>
        </div>
      </div>
    </div>
  );
}
