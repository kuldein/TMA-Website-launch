"use client";

import { useState, useEffect } from "react";
import IntroScreen from "@/components/IntroScreen";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ClientsMarquee from "@/components/sections/ClientsMarquee";
import CTASection from "@/components/sections/CTASection";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const seen = sessionStorage.getItem("tma-intro-seen");
    if (seen) setShowIntro(false);
  }, []);

  const handleEnter = () => {
    sessionStorage.setItem("tma-intro-seen", "1");
    setShowIntro(false);
  };

  if (!mounted) return null;

  return (
    <>
      {showIntro && <IntroScreen onEnter={handleEnter} />}
      <div
        className={`transition-opacity duration-700 ${
          showIntro ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <Navbar />
        <main>
          <HeroSection />
          <ClientsMarquee />
          <ServicesSection />
          <ProjectsSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </>
  );
}
