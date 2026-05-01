import { useState } from "react";
import { Link } from "react-router-dom";
import { Github, Twitter, Instagram, Youtube, Twitch, Mail, CheckCircle } from "lucide-react";

const footerLinks = {
  Studio: [
    { label: "About Us", href: "/about" },
    { label: "Team", href: "/about#team" },
    { label: "Latest News", href: "/devlogs" },
    { label: "Careers", href: "/careers" },
  ],
  Games: [
    { label: "All Games", href: "/games" },
    { label: "Coming Soon", href: "/games#upcoming" },
    { label: "Portfolio", href: "/portfolio" },
  ],
  Services: [
    { label: "Game Development", href: "/services" },
    { label: "3D Art & Animation", href: "/services#art" },
    { label: "Sound Design", href: "/services#sound" },
    { label: "Web Development", href: "/services#web" },
  ],
  Contact: [
    { label: "Start a Project", href: "/contact" },
    { label: "General Inquiry", href: "/contact" },
    { label: "Press Kit", href: "/contact#press" },
  ],
};

const socials = [
  { icon: Twitter, href: "https://x.com/flukgames", label: "Twitter" },
  { icon: Instagram, href: "https://www.instagram.com/fluke.games/", label: "Instagram" },
  { icon: Youtube, href: "https://www.youtube.com/@FlukGames", label: "YouTube" },
  { icon: Twitch, href: "https://discord.gg/xDQPgXkj5X", label: "Discord" }, // Using Twitch icon for Discord as a fallback if Lucide doesn't have it, or I can use a generic icon
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setSubscribeStatus("loading");
    // Simulate API call
    setTimeout(() => {
      setSubscribeStatus("success");
      setEmail("");
      // Reset back to idle after a few seconds
      setTimeout(() => setSubscribeStatus("idle"), 4000);
    }, 1200);
  };

  return (
    <footer className="bg-fluke-surface border-t border-fluke-yellow/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="relative w-12 h-12">
                <img src="/logo.png" alt="Fluke" className="w-full h-full object-contain" />
              </div>
              <span className="font-orbitron font-bold text-xl text-fluke-text">FLUKE</span>
            </Link>
            <p className="font-sora text-sm text-fluke-muted leading-relaxed mb-6 max-w-xs">
              Crafting Games, Worlds & Digital Experiences. An indie game studio pushing the boundaries of creativity.
            </p>
            {/* Socials */}
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-fluke-bg border border-fluke-yellow/10 flex items-center justify-center text-fluke-muted hover:text-fluke-yellow hover:border-fluke-yellow/40 hover:bg-fluke-yellow/5 transition-all duration-300"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-orbitron text-xs font-semibold text-fluke-yellow tracking-widest mb-4 uppercase">
                {category}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="font-sora text-sm text-fluke-muted hover:text-fluke-yellow transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="border-t border-b border-fluke-yellow/10 py-8 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-orbitron font-bold text-base text-fluke-text mb-1">
                Stay in the Loop
              </h3>
              <p className="font-sora text-sm text-fluke-muted">
                Game updates, dev insights and behind the scenes drops.
              </p>
            </div>
            <form className="flex gap-3 w-full md:w-auto" onSubmit={handleSubscribe}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                disabled={subscribeStatus !== "idle"}
                className="flex-1 md:w-64 px-4 py-2.5 rounded-lg bg-fluke-bg border border-fluke-yellow/20 text-fluke-text text-sm font-sora placeholder:text-fluke-muted/60 focus:outline-none focus:border-fluke-yellow/60 transition-colors disabled:opacity-50"
              />
              <button 
                type="submit"
                disabled={subscribeStatus !== "idle"}
                className={`px-5 py-2.5 rounded-lg text-sm font-sora whitespace-nowrap transition-all duration-300 flex items-center justify-center gap-2 ${
                  subscribeStatus === "success" 
                    ? "bg-green-500/20 text-green-400 border border-green-500/30" 
                    : "btn-primary disabled:opacity-75"
                }`}
                style={subscribeStatus === "success" ? { boxShadow: "0 0 20px rgba(34, 197, 94, 0.2)" } : {}}
              >
                {subscribeStatus === "idle" && "Subscribe"}
                {subscribeStatus === "loading" && "Sending..."}
                {subscribeStatus === "success" && (
                  <>
                    <CheckCircle size={16} className="animate-pulse" />
                    Subscribed!
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4 text-xs text-fluke-muted/60 font-sora">
          <span>© 2026 Fluke Game Studio. All rights reserved.</span>
          <div className="flex items-center gap-2">
            <Mail size={12} />
            <a href="mailto:hello@flukegames.studio" className="hover:text-fluke-yellow transition-colors">
              hello@flukegames.studio
            </a>
          </div>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-fluke-yellow transition-colors">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-fluke-yellow transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
