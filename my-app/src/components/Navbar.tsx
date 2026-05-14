import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/lib/ThemeContext";
import { useCustomerAuth } from "../auth/CustomerAuthContext";
import CustomerSignupModal from "./CustomerSignupModal";

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
  const [signupOpen, setSignupOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { session, logout } = useCustomerAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-[999] transition-all duration-500 ${
          scrolled
            ? "bg-fluke-bg/90 backdrop-blur-xl border-none"
            : "bg-transparent"
        }`}
      >
        <div className="w-full px-6 sm:px-12 flex items-center justify-between h-20">
          {/* Logo - Extreme Left */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative w-14 h-14">
              <img
                src="/logo.png"
                alt="Fluke Game Studio"
                className="w-full h-full object-contain group-hover:drop-shadow-[0_0_15px_#F5C542] transition-all duration-300"
              />
            </div>
            <span className="font-orbitron font-bold text-2xl tracking-[0.1em] text-fluke-text group-hover:text-fluke-yellow transition-colors duration-300">
              FLUKE
            </span>
          </Link>

          {/* Desktop links & CTA - Extreme Right */}
          <div className="hidden lg:flex items-center h-full">
            <div className="glass relative flex items-center gap-10 pl-24 pr-12 h-20 rounded-bl-[60px] border-l border-b border-fluke-yellow/40 shadow-[0_10px_50px_rgba(245,197,66,0.15)] transition-all duration-500 hover:border-fluke-yellow/60 group/nav -mr-12">
              {/* Highlight Glow Accent */}
              <div className="absolute top-0 left-[5%] right-0 h-[2px] bg-gradient-to-r from-fluke-yellow via-fluke-yellow/30 to-transparent shadow-[0_0_15px_#F5C542]" />
              
              <div className="flex items-center gap-10">
                {navLinks.filter(link => link.label !== "Contact").map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="relative font-sora text-sm font-semibold tracking-wide text-fluke-muted hover:text-fluke-yellow transition-colors duration-300 group"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-fluke-yellow group-hover:w-full transition-all duration-300 shadow-[0_0_8px_#F5C542]" />
                  </Link>
                ))}
              </div>

              <div className="flex items-center gap-5 ml-6">
                <button
                  onClick={toggleTheme}
                  aria-label="Toggle theme"
                  className="w-10 h-10 flex items-center justify-center rounded-xl border border-fluke-yellow/20 text-fluke-muted hover:text-fluke-yellow hover:border-fluke-yellow/60 transition-all duration-300 bg-white/5 hover:bg-fluke-yellow/5"
                >
                  {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                </button>
                
                <Link
                  to={session ? "/download" : "/login"}
                  className="btn-primary px-8 py-3 rounded-xl text-sm font-bold font-sora shadow-[0_0_20px_rgba(245,197,76,0.25)] hover:shadow-[0_0_35px_rgba(245,197,76,0.45)] transition-all duration-300"
                >
                  {session ? "My Library" : "Customer Login"}
                </Link>

                {!session ? (
                  <button
                    onClick={() => setSignupOpen(true)}
                    className="btn-outline px-4 py-3 rounded-xl text-sm font-bold font-sora"
                  >
                    Sign Up
                  </button>
                ) : (
                  <button
                    onClick={logout}
                    className="btn-outline px-4 py-3 rounded-xl text-sm font-bold font-sora"
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>
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
              to={session ? "/download" : "/login"} 
              onClick={() => setMenuOpen(false)} 
              className="btn-primary px-5 py-3 rounded-lg text-center font-sora mt-4"
            >
              {session ? "My Library" : "Customer Login"}
            </Link>

            {!session ? (
              <button
                onClick={() => {
                  setMenuOpen(false);
                  setSignupOpen(true);
                }}
                className="btn-outline px-5 py-3 rounded-lg text-center font-sora"
              >
                Sign Up
              </button>
            ) : (
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="btn-outline px-5 py-3 rounded-lg text-center font-sora"
              >
                Logout
              </button>
            )}
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
      <CustomerSignupModal open={signupOpen} onClose={() => setSignupOpen(false)} />
    </>
  );
}
