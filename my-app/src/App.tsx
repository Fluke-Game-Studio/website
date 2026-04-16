import { useEffect, useLayoutEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingPublicAIChat from './components/FloatingPublicAIChat';
import { ThemeProvider } from './lib/ThemeContext';

import Home from './pages/Home';
import Games from './pages/Games';
import GameDetail from './pages/GameDetail';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import PortfolioDetail from './pages/PortfolioDetail';
import Devlogs from './pages/Devlogs';
import Contact from './pages/Contact';
import About from './pages/About';
import Careers from './pages/Careers';
import CareersApply from './pages/CareersApply';
import TeamMember from './pages/TeamMember';
import NotFound from './pages/NotFound';

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/games" element={<PageWrapper><Games /></PageWrapper>} />
        <Route path="/games/:slug" element={<PageWrapper><GameDetail /></PageWrapper>} />
        <Route path="/services" element={<PageWrapper><Services /></PageWrapper>} />
        <Route path="/portfolio" element={<PageWrapper><Portfolio /></PageWrapper>} />
        <Route path="/portfolio/:id" element={<PageWrapper><PortfolioDetail /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
        <Route path="/about/team/:memberName" element={<PageWrapper><TeamMember /></PageWrapper>} />
        <Route path="/devlogs" element={<PageWrapper><Devlogs /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
        <Route path="/careers" element={<PageWrapper><Careers /></PageWrapper>} />
        <Route path="/careers/apply" element={<PageWrapper><CareersApply /></PageWrapper>} />
        <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

const scrollPositions = new Map<string, number>();

function ScrollToTop() {
  const { pathname } = useLocation();
  const prevPathnameRef = useRef<string>('');

  useLayoutEffect(() => {
    // Save scroll position of previous page
    if (prevPathnameRef.current && prevPathnameRef.current !== pathname) {
      scrollPositions.set(prevPathnameRef.current, window.scrollY);
    }

    // Restore scroll position if we've been to this page before, otherwise scroll to top
    const savedPosition = scrollPositions.get(pathname);
    if (savedPosition !== undefined) {
      window.scrollTo({ top: savedPosition, behavior: 'instant' });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
    
    prevPathnameRef.current = pathname;
  }, [pathname]);

  return null;
}

function App() {
  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="bg-grid flex-grow flex flex-col min-h-[90vh]">
            <AnimatedRoutes />
          </main>
          <Footer />
          <FloatingPublicAIChat />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
