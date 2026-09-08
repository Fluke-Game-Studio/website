import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Send, CheckCircle, LifeBuoy, MessageSquare, Copy, Check } from "lucide-react";
import { submitPublicContact, submitPublicSupport } from "@/services/publicIntakeService";

const projectTypes = [
  "Indie Game Development",
  "Game Design Consulting",
  "3D Art / Animation",
  "Sound Design",
  "Game Trailer / Cinematic",
  "Asset Store Content",
  "Web Development",
  "Video Editing",
  "Contract Development",
  "Other",
];

const budgetRanges = [
  "< $500",
  "$500 – $2,000",
  "$2,000 – $5,000",
  "$5,000 – $15,000",
  "$15,000+",
  "Let's Talk",
];

const supportCategories = [
  "Account / Login Issue",
  "Billing / Commitment Balance",
  "Game Bug / Technical Issue",
  "Download / Access Issue",
  "Application / Interview Issue",
  "Other",
];

type Tab = "general" | "support";

export default function ContactPage() {
  const [tab, setTab] = useState<Tab>("general");

  /* ---------------- General inquiry form ---------------- */
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    type: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setError("");
    setSubmitting(true);

    try {
      await submitPublicContact({
        context: "flukegames",
        name: form.name,
        email: form.email,
        company: form.company,
        budget: form.budget,
        type: form.type,
        message: form.message,
        pageUrl: typeof window !== "undefined" ? window.location.href : "",
      });
      setSent(true);
    } catch (err: any) {
      setError(err?.message || "Failed to send message.");
    } finally {
      setSubmitting(false);
    }
  };

  /* ---------------- Support / service issue form ---------------- */
  const [supportSent, setSupportSent] = useState(false);
  const [supportTicket, setSupportTicket] = useState("");
  const [supportError, setSupportError] = useState("");
  const [supportSubmitting, setSupportSubmitting] = useState(false);
  const [supportCopied, setSupportCopied] = useState(false);
  const [supportForm, setSupportForm] = useState({
    name: "",
    email: "",
    category: "",
    orderRef: "",
    message: "",
  });

  const handleSupportChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setSupportForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSupportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (supportSubmitting) return;
    setSupportError("");
    setSupportSubmitting(true);

    try {
      const res = await submitPublicSupport({
        context: "flukegames",
        name: supportForm.name,
        email: supportForm.email,
        category: supportForm.category,
        orderRef: supportForm.orderRef,
        message: supportForm.message,
        pageUrl: typeof window !== "undefined" ? window.location.href : "",
      });
      setSupportTicket(res?.ticketNumber || "");
      setSupportSent(true);
    } catch (err: any) {
      setSupportError(err?.message || "Failed to send your request.");
    } finally {
      setSupportSubmitting(false);
    }
  };

  const copyTicket = () => {
    if (!supportTicket || typeof navigator === "undefined") return;
    navigator.clipboard?.writeText(supportTicket).then(() => {
      setSupportCopied(true);
      setTimeout(() => setSupportCopied(false), 2000);
    });
  };

  const cardStyle = {
    backgroundColor: "var(--card-bg)",
    border: "1px solid var(--card-border)",
    boxShadow: "var(--card-shadow)",
  } as const;

  return (
    <div className="min-h-screen bg-fluke-bg pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="font-orbitron text-xs tracking-[0.4em] text-fluke-yellow uppercase mb-3">
            Get In Touch
          </p>
          <h1 className="font-bebas heading-page text-fluke-text mb-4">Contact Us</h1>
          <p className="font-sora text-fluke-muted max-w-xl mx-auto">
            Have a project in mind, or need help with something? Pick the right tab below and we&apos;ll get back to you.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div
            className="inline-flex rounded-xl p-1.5 gap-1"
            style={{ backgroundColor: "var(--card-bg)", border: "1px solid var(--card-border)" }}
          >
            <button
              type="button"
              onClick={() => setTab("general")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-sora text-sm transition-all duration-300 ${
                tab === "general"
                  ? "btn-primary"
                  : "text-fluke-muted hover:text-fluke-text"
              }`}
            >
              <MessageSquare size={15} />
              General Inquiry
            </button>
            <button
              type="button"
              onClick={() => setTab("support")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-sora text-sm transition-all duration-300 ${
                tab === "support"
                  ? "btn-primary"
                  : "text-fluke-muted hover:text-fluke-text"
              }`}
            >
              <LifeBuoy size={15} />
              Having an Issue? Get Support
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            {tab === "general" ? (
              sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-2xl p-16 text-center transition-all duration-300"
                  style={cardStyle}
                >
                  <CheckCircle size={56} className="text-fluke-yellow mx-auto mb-6" />
                  <h2 className="font-orbitron font-bold text-2xl text-fluke-text mb-3">Message Sent!</h2>
                  <p className="font-sora text-fluke-muted">
                    Thanks for reaching out, {form.name || "friend"}! We&apos;ll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="rounded-2xl p-8 space-y-5 transition-all duration-300"
                  style={cardStyle}
                >
                  {error ? (
                    <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                      {error}
                    </div>
                  ) : null}
                  {/* Row 1 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="font-orbitron text-[10px] tracking-widest text-fluke-yellow uppercase mb-2 block">Name *</label>
                      <input
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="w-full px-4 py-3 rounded-xl bg-fluke-surface border border-fluke-yellow/20 text-fluke-text font-sora text-sm placeholder:text-fluke-muted/50 focus:outline-none focus:border-fluke-yellow/60 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="font-orbitron text-[10px] tracking-widest text-fluke-yellow uppercase mb-2 block">Email *</label>
                      <input
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 rounded-xl bg-fluke-surface border border-fluke-yellow/20 text-fluke-text font-sora text-sm placeholder:text-fluke-muted/50 focus:outline-none focus:border-fluke-yellow/60 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="font-orbitron text-[10px] tracking-widest text-fluke-yellow uppercase mb-2 block">Company</label>
                      <input
                        name="company"
                        value={form.company}
                        onChange={handleChange}
                        placeholder="Studio / Company name"
                        className="w-full px-4 py-3 rounded-xl bg-fluke-surface border border-fluke-yellow/20 text-fluke-text font-sora text-sm placeholder:text-fluke-muted/50 focus:outline-none focus:border-fluke-yellow/60 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="font-orbitron text-[10px] tracking-widest text-fluke-yellow uppercase mb-2 block">Budget</label>
                      <select
                        name="budget"
                        value={form.budget}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-fluke-surface border border-fluke-yellow/20 text-fluke-text font-sora text-sm focus:outline-none focus:border-fluke-yellow/60 transition-colors"
                      >
                        <option value="">Select budget range</option>
                        {budgetRanges.map((b) => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Project type */}
                  <div>
                    <label className="font-orbitron text-[10px] tracking-widest text-fluke-yellow uppercase mb-2 block">Project Type</label>
                    <select
                      name="type"
                      value={form.type}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-fluke-surface border border-fluke-yellow/20 text-fluke-text font-sora text-sm focus:outline-none focus:border-fluke-yellow/60 transition-colors"
                    >
                      <option value="">Select project type</option>
                      {projectTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="font-orbitron text-[10px] tracking-widest text-fluke-yellow uppercase mb-2 block">Message *</label>
                    <textarea
                      name="message"
                      required
                      value={form.message}
                      onChange={handleChange}
                      rows={6}
                      placeholder="Tell us about your project, timeline, and any specific needs..."
                      className="w-full px-4 py-3 rounded-xl bg-fluke-surface border border-fluke-yellow/20 text-fluke-text font-sora text-sm placeholder:text-fluke-muted/50 focus:outline-none focus:border-fluke-yellow/60 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary w-full py-4 rounded-xl font-sora flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    <Send size={16} />
                    {submitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )
            ) : supportSent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl p-16 text-center transition-all duration-300"
                style={cardStyle}
              >
                <CheckCircle size={56} className="text-fluke-yellow mx-auto mb-6" />
                <h2 className="font-orbitron font-bold text-2xl text-fluke-text mb-3">Request Received!</h2>
                <p className="font-sora text-fluke-muted mb-6">
                  Thanks, {supportForm.name || "friend"} — our support team has been notified and a confirmation email is on its way to {supportForm.email || "you"}.
                </p>
                {supportTicket ? (
                  <div
                    className="inline-flex items-center gap-3 rounded-xl px-5 py-3 mx-auto"
                    style={{ backgroundColor: "var(--card-bg)", border: "1px solid var(--card-border)" }}
                  >
                    <div className="text-left">
                      <p className="font-sora text-[11px] text-fluke-muted uppercase tracking-widest mb-0.5">Ticket Number</p>
                      <p className="font-orbitron text-lg text-fluke-yellow font-bold">{supportTicket}</p>
                    </div>
                    <button
                      type="button"
                      onClick={copyTicket}
                      className="w-9 h-9 rounded-lg flex items-center justify-center border border-fluke-yellow/20 text-fluke-muted hover:text-fluke-yellow hover:border-fluke-yellow/40 transition-colors"
                      aria-label="Copy ticket number"
                    >
                      {supportCopied ? <Check size={15} /> : <Copy size={15} />}
                    </button>
                  </div>
                ) : null}
                <p className="font-sora text-xs text-fluke-muted mt-6">
                  Keep this ticket number handy — it's also in your confirmation email so you can track this request.
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSupportSubmit}
                className="rounded-2xl p-8 space-y-5 transition-all duration-300"
                style={cardStyle}
              >
                <div className="flex items-start gap-3 rounded-xl border border-fluke-yellow/15 bg-fluke-yellow/5 px-4 py-3">
                  <LifeBuoy size={18} className="text-fluke-yellow mt-0.5 flex-none" />
                  <p className="font-sora text-sm text-fluke-muted">
                    Having an issue with one of our services (account, billing, a game, or your application)? Tell us what's wrong and we'll email you a trackable support ticket.
                  </p>
                </div>

                {supportError ? (
                  <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                    {supportError}
                  </div>
                ) : null}

                {/* Row 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="font-orbitron text-[10px] tracking-widest text-fluke-yellow uppercase mb-2 block">Name *</label>
                    <input
                      name="name"
                      required
                      value={supportForm.name}
                      onChange={handleSupportChange}
                      placeholder="Your name"
                      className="w-full px-4 py-3 rounded-xl bg-fluke-surface border border-fluke-yellow/20 text-fluke-text font-sora text-sm placeholder:text-fluke-muted/50 focus:outline-none focus:border-fluke-yellow/60 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="font-orbitron text-[10px] tracking-widest text-fluke-yellow uppercase mb-2 block">Email *</label>
                    <input
                      name="email"
                      type="email"
                      required
                      value={supportForm.email}
                      onChange={handleSupportChange}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-xl bg-fluke-surface border border-fluke-yellow/20 text-fluke-text font-sora text-sm placeholder:text-fluke-muted/50 focus:outline-none focus:border-fluke-yellow/60 transition-colors"
                    />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="font-orbitron text-[10px] tracking-widest text-fluke-yellow uppercase mb-2 block">Issue Category</label>
                    <select
                      name="category"
                      value={supportForm.category}
                      onChange={handleSupportChange}
                      className="w-full px-4 py-3 rounded-xl bg-fluke-surface border border-fluke-yellow/20 text-fluke-text font-sora text-sm focus:outline-none focus:border-fluke-yellow/60 transition-colors"
                    >
                      <option value="">Select a category</option>
                      {supportCategories.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="font-orbitron text-[10px] tracking-widest text-fluke-yellow uppercase mb-2 block">Order / Account Reference</label>
                    <input
                      name="orderRef"
                      value={supportForm.orderRef}
                      onChange={handleSupportChange}
                      placeholder="Optional"
                      className="w-full px-4 py-3 rounded-xl bg-fluke-surface border border-fluke-yellow/20 text-fluke-text font-sora text-sm placeholder:text-fluke-muted/50 focus:outline-none focus:border-fluke-yellow/60 transition-colors"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="font-orbitron text-[10px] tracking-widest text-fluke-yellow uppercase mb-2 block">Describe the Issue *</label>
                  <textarea
                    name="message"
                    required
                    value={supportForm.message}
                    onChange={handleSupportChange}
                    rows={6}
                    placeholder="Tell us what's happening, when it started, and any steps you've already tried..."
                    className="w-full px-4 py-3 rounded-xl bg-fluke-surface border border-fluke-yellow/20 text-fluke-text font-sora text-sm placeholder:text-fluke-muted/50 focus:outline-none focus:border-fluke-yellow/60 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={supportSubmitting}
                  className="btn-primary w-full py-4 rounded-xl font-sora flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  <LifeBuoy size={16} />
                  {supportSubmitting ? "Submitting..." : "Submit Support Request"}
                </button>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="rounded-2xl p-6 transition-all duration-300" style={cardStyle}>
              <h3 className="font-orbitron text-xs tracking-widest text-fluke-yellow uppercase mb-5">Contact Info</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail size={16} className="text-fluke-yellow mt-0.5 flex-none" />
                  <div>
                    <p className="font-sora text-xs text-fluke-muted mb-0.5">Email</p>
                    {tab === "support" ? (
                      <a href="mailto:support@flukegamestudio.com" className="font-sora text-sm text-fluke-text hover:text-fluke-yellow transition-colors">
                        support@flukegamestudio.com
                      </a>
                    ) : (
                      <a href="mailto:hello@flukegames.studio" className="font-sora text-sm text-fluke-text hover:text-fluke-yellow transition-colors">
                        hello@flukegames.studio
                      </a>
                    )}
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-fluke-yellow mt-0.5 flex-none" />
                  <div>
                    <p className="font-sora text-xs text-fluke-muted mb-0.5">Location</p>
                    <p className="font-sora text-sm text-fluke-text">Chandigarh, India</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl p-6 transition-all duration-300" style={cardStyle}>
              <h3 className="font-orbitron text-xs tracking-widest text-fluke-yellow uppercase mb-3 flex items-center gap-2">
                <LifeBuoy size={13} className="text-fluke-yellow" />
                Need Support?
              </h3>
              <p className="font-sora text-sm text-fluke-muted mb-4">
                Already having an issue with a service, your account, or an application? Use the Support tab above — it's routed straight to our support inbox.
              </p>
              <a href="mailto:support@flukegamestudio.com" className="font-sora text-sm text-fluke-text hover:text-fluke-yellow transition-colors">
                support@flukegamestudio.com
              </a>
            </div>

            <div className="rounded-2xl p-6 transition-all duration-300" style={cardStyle}>
              <h3 className="font-orbitron text-xs tracking-widest text-fluke-yellow uppercase mb-3">Response Time</h3>
              <p className="font-sora text-sm text-fluke-muted">We typically respond within <span className="text-fluke-yellow">24 hours</span> on business days.</p>
            </div>

            <div className="rounded-2xl p-6 transition-all duration-300" style={cardStyle}>
              <h3 className="font-orbitron text-xs tracking-widest text-fluke-yellow uppercase mb-3" id="press">Press Kit</h3>
              <p className="font-sora text-sm text-fluke-muted mb-4">Journalists and content creators can request our official press kit.</p>
              <a href="mailto:press@flukegames.studio" className="btn-outline w-full py-2.5 text-sm rounded-lg font-sora text-center block">
                Request Press Kit
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
