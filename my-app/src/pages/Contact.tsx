import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Send, CheckCircle } from "lucide-react";
import { submitPublicContact } from "@/services/publicIntakeService";

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

export default function ContactPage() {
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

  return (
    <div className="min-h-screen bg-fluke-bg pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-orbitron text-xs tracking-[0.4em] text-fluke-yellow uppercase mb-3">
            Get In Touch
          </p>
          <h1 className="font-bebas text-6xl sm:text-8xl text-fluke-text mb-4">Contact Us</h1>
          <p className="font-sora text-fluke-muted max-w-xl mx-auto">
            Have a project in mind? Tell us about it and we&apos;ll get back to you within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl p-16 text-center transition-all duration-300"
                style={{
                  backgroundColor: 'var(--card-bg)',
                  border: '1px solid var(--card-border)',
                  boxShadow: 'var(--card-shadow)',
                }}
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
                style={{
                  backgroundColor: 'var(--card-bg)',
                  border: '1px solid var(--card-border)',
                  boxShadow: 'var(--card-shadow)',
                }}
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
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div 
              className="rounded-2xl p-6 transition-all duration-300"
              style={{
                backgroundColor: 'var(--card-bg)',
                border: '1px solid var(--card-border)',
                boxShadow: 'var(--card-shadow)',
              }}
            >
              <h3 className="font-orbitron text-xs tracking-widest text-fluke-yellow uppercase mb-5">Contact Info</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail size={16} className="text-fluke-yellow mt-0.5 flex-none" />
                  <div>
                    <p className="font-sora text-xs text-fluke-muted mb-0.5">Email</p>
                    <a href="mailto:hello@flukegames.studio" className="font-sora text-sm text-fluke-text hover:text-fluke-yellow transition-colors">
                      hello@flukegames.studio
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-fluke-yellow mt-0.5 flex-none" />
                  <div>
                    <p className="font-sora text-xs text-fluke-muted mb-0.5">Location</p>
                    <p className="font-sora text-sm text-fluke-text">Remote · Worldwide</p>
                  </div>
                </div>
              </div>
            </div>

            <div 
              className="rounded-2xl p-6 transition-all duration-300"
              style={{
                backgroundColor: 'var(--card-bg)',
                border: '1px solid var(--card-border)',
                boxShadow: 'var(--card-shadow)',
              }}
            >
              <h3 className="font-orbitron text-xs tracking-widest text-fluke-yellow uppercase mb-3">Response Time</h3>
              <p className="font-sora text-sm text-fluke-muted">We typically respond within <span className="text-fluke-yellow">24 hours</span> on business days.</p>
            </div>

            <div 
              className="rounded-2xl p-6 transition-all duration-300"
              style={{
                backgroundColor: 'var(--card-bg)',
                border: '1px solid var(--card-border)',
                boxShadow: 'var(--card-shadow)',
              }}
            >
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
