import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackgroundCanvas from './components/BackgroundCanvas';
import HomePage from './pages/HomePage';
import CareersPage from './pages/CareersPage';
import CareerApplyPage from './pages/CareerApplyPage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import WipPage from './pages/WipPage';
import QbgPage from './pages/QbgPage';
import PavanPage from './pages/PavanPage';
import ShowcasePage from './pages/ShowcasePage';

function Layout() {
  const location = useLocation();
  const hideBackground = ['/login', '/pavan', '/home'].includes(location.pathname);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/careers/apply" element={<CareerApplyPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/wip" element={<WipPage />} />
        <Route path="/queenbeegame" element={<QbgPage />} />
        <Route path="/pavan" element={<PavanPage />} />
        <Route path="/showcase" element={<ShowcasePage />} />
      </Routes>
      {!hideBackground && <BackgroundCanvas />}
      <Footer />
    </>
  );
}

export default function App() {
  return <Layout />;
}
