import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lenis from '@studio-freight/lenis';
import { LanguageProvider } from "./contexts/LanguageContext";
import { Navbar } from "./components/Navbar";
import { PartnersMarquee } from "./components/PartnersMarquee";
import { Hero } from "./components/Hero";
import { AboutSection } from "./components/AboutSection";
import { ServicesSection } from "./components/ServicesSection";
import { SolutionsSection } from "./components/SolutionsSection";
import { DistinguishesSection } from "./components/DistinguishesSection";
import { BackingSection } from "./components/BackingSection";
import { ContactForm } from "./components/ContactForm";
import { Footer } from "./components/Footer";
import { Toaster } from "./components/ui/sonner";
import "@/App.css";

const LandingPage = () => {
  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: false,
      smoothTouch: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white font-manrope" data-testid="landing-page">
      <Navbar />
      {/* Partners Marquee - Lo primero que se ve después del navbar */}
      <div className="pt-20 md:pt-28">
        <PartnersMarquee />
      </div>
      <main>
        <Hero />
        <AboutSection />
        <ServicesSection />
        <SolutionsSection />
        <DistinguishesSection />
        <BackingSection />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" />
    </LanguageProvider>
  );
}

export default App;
