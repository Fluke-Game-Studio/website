import { useEffect, useLayoutEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingPublicAIChat from './components/FloatingPublicAIChat';
import { ThemeProvider } from './lib/ThemeContext';
import { AIAssistantProvider } from './context/AIAssistantContext';

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

const scrollPositions = new Map<string, number>();

function PageWrapper({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  
  useLayoutEffect(() => {
    // Restore scroll position when new page mounts
    const savedPosition = scrollPositions.get(pathname);
    window.scrollTo({ 
      top: savedPosition ?? 0, 
      behavior: 'instant' 
    });
  }, [pathname]);

  useLayoutEffect(() => {
    // Save scroll position when the current page instance unmounts
    return () => {
      scrollPositions.set(pathname, window.scrollY);
    };
  }, [pathname]);

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



function App() {
  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <ThemeProvider>
      <AIAssistantProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="bg-grid flex-grow flex flex-col min-h-[90vh]">
              <AnimatedRoutes />
            </main>
            <Footer />
            <FloatingPublicAIChat />
          </div>
        </Router>
      </AIAssistantProvider>
    </ThemeProvider>
  );
}

export default App;
