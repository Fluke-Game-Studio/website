import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingPublicAIChat from './components/FloatingPublicAIChat';
import { ThemeProvider } from './lib/ThemeContext';
import Home from './pages/Home';
import Games from './pages/Games';
import GameDetail from './pages/GameDetail';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Devlogs from './pages/Devlogs';
import Contact from './pages/Contact';
import About from './pages/About';
import Careers from './pages/Careers';
import CareersApply from './pages/CareersApply';
import TeamMember from './pages/TeamMember';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Navbar />
        <main className="bg-grid min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/games" element={<Games />} />
            <Route path="/games/:slug" element={<GameDetail />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/about" element={<About />} />
            <Route path="/about/team/:memberName" element={<TeamMember />} />
            <Route path="/devlogs" element={<Devlogs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/careers/apply" element={<CareersApply />} />
          </Routes>
        </main>
        <Footer />
        <FloatingPublicAIChat />
      </Router>
    </ThemeProvider>
  );
}

export default App;
