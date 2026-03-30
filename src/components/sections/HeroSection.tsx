"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.fromTo(
        ".hero-line",
        { y: "110%", opacity: 0 },
        { y: "0%", opacity: 1, stagger: 0.12, duration: 1, ease: "power4.out" }
      )
        .fromTo(
          ".hero-sub",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.4"
        )
        .fromTo(
          ".hero-cta",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: "power3.out" },
          "-=0.3"
        );

      // Parallax
      gsap.to(".hero-bg-text", {
        y: 120,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-end pb-24 px-6 md:px-12 overflow-hidden pt-32"
    >
      {/* Background giant text */}
      <div className="hero-bg-text absolute top-0 left-0 right-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-[20vw] font-black text-white/[0.02] leading-none tracking-tighter whitespace-nowrap">
          TMA
        </span>
      </div>

      {/* Green dot accent */}
      <div className="absolute top-40 right-12 md:right-24 w-2 h-2 bg-[#e7f8c8] rounded-full animate-pulse" />
      <div className="absolute top-52 right-16 md:right-32 w-1 h-1 bg-[#e7f8c8]/40 rounded-full" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Label */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-px bg-[#e7f8c8]" />
          <span className="text-[10px] tracking-[0.5em] uppercase text-[#e7f8c8]/70">
            Marketing Tech Agentur
          </span>
        </div>

        {/* Headline */}
        <h1
          ref={headRef}
          className="font-display text-[clamp(3rem,10vw,9rem)] text-white mb-8"
        >
          <div className="overflow-hidden">
            <span className="hero-line block glitch" data-text="Wir bauen">
              Wir bauen
            </span>
          </div>
          <div className="overflow-hidden">
            <span className="hero-line block text-[#e7f8c8]">Marken, die</span>
          </div>
          <div className="overflow-hidden">
            <span className="hero-line block">wachsen.</span>
          </div>
        </h1>

        {/* Subline */}
        <p className="hero-sub text-white/40 text-base md:text-lg max-w-xl leading-relaxed mb-12">
          Strategie, Kreativität und datengetriebene Umsetzung — messbar, skalierbar und mit klarer Wirkung.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4">
          <Link href="/portfolio" className="hero-cta btn-tma">
            Portfolio entdecken
          </Link>
          <Link
            href="/kontakt"
            className="hero-cta text-[13px] font-semibold tracking-widest uppercase text-white/40 hover:text-[#e7f8c8] transition-colors flex items-center gap-2"
          >
            Projekt starten <span>→</span>
          </Link>
        </div>

        {/* Stats */}
        <div className="hero-cta flex flex-wrap gap-12 mt-16 pt-12 border-t border-white/5">
          {[
            { num: "20+", label: "Projekte" },
            { num: "15+", label: "Kunden" },
            { num: "6", label: "Leistungen" },
            { num: "∞", label: "Ambitionen" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-black text-[#e7f8c8]">{s.num}</div>
              <div className="text-[10px] tracking-widest uppercase text-white/30 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="w-px h-12 bg-gradient-to-b from-[#e7f8c8]/40 to-transparent animate-pulse" />
        <span className="text-[9px] tracking-widest uppercase text-white/20">Scroll</span>
      </div>
    </section>
  );
}
