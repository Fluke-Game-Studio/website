import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/lib/ThemeContext";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Games", href: "/games" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Latest News", href: "/devlogs" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-[999] transition-all duration-500 ${
          scrolled
            ? "glass border-b border-fluke-yellow/10 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10">
              <img
                src="/logo.png"
                alt="Fluke Game Studio"
                className="w-full h-full object-contain group-hover:drop-shadow-[0_0_12px_#F5C542] transition-all duration-300"
              />
            </div>
            <span className="font-orbitron font-bold text-lg tracking-wider text-fluke-text group-hover:text-fluke-yellow transition-colors duration-300">
              FLUKE
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.filter(link => link.label !== "Contact").map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="relative font-sora text-sm text-fluke-muted hover:text-fluke-yellow transition-colors duration-300 group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-fluke-yellow group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Theme Toggle + CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-fluke-yellow/20 text-fluke-muted hover:text-fluke-yellow hover:border-fluke-yellow/50 transition-all duration-200"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <Link
              to="/contact"
              className="btn-primary px-5 py-2.5 rounded-lg text-sm font-sora"
            >
              Work With Us
            </Link>
          </div>

          {/* Mobile hamburger */}
          <div className="flex gap-2 items-center lg:hidden">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-fluke-yellow/20 text-fluke-muted hover:text-fluke-yellow transition-all duration-200"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              className="text-fluke-text hover:text-fluke-yellow transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35 }}
            className="fixed inset-y-0 right-0 w-72 z-50 glass border-l border-fluke-yellow/10 flex flex-col pt-24 px-8 gap-6"
          >
            <button
              className="absolute top-5 right-5 text-fluke-muted hover:text-fluke-yellow transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              <X size={24} />
            </button>
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Link
                  to={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-sora text-lg text-fluke-muted hover:text-fluke-yellow transition-colors duration-300 block"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="btn-primary px-5 py-3 rounded-lg text-center font-sora mt-4"
            >
              Work With Us
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}
