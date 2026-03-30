"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main timeline
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(".h-line", { yPercent: 120, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.2, stagger: 0.08 })
        .fromTo(".h-sub", { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: .8 }, "-=.6")
        .fromTo(".h-cta", { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: .6, stagger: .1 }, "-=.4")
        .fromTo(".h-stat", { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: .5, stagger: .06 }, "-=.3")
        .fromTo(".h-label", { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: .5 }, 0.2);

      // Slow parallax on scroll
      gsap.to(".h-bg-word", {
        yPercent: 40,
        ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: 2 },
      });

      // Counter animation
      document.querySelectorAll(".count-up").forEach((el) => {
        const target = parseInt(el.getAttribute("data-target") ?? "0");
        const suffix = el.getAttribute("data-suffix") ?? "";
        const obj = { val: 0 };
        gsap.fromTo(obj, { val: 0 }, { val: target, duration: 2, ease: "power2.out",
          onUpdate: () => { el.textContent = Math.round(obj.val) + suffix; }
        });
      });

    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col justify-end overflow-hidden grid-bg"
      style={{ paddingBottom: "8vh", paddingLeft: "clamp(24px,5vw,80px)", paddingRight: "clamp(24px,5vw,80px)", paddingTop: "120px" }}>

      {/* Giant BG word */}
      <div className="h-bg-word absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="display text-white/[0.025]" style={{ fontSize: "clamp(8rem,22vw,22rem)" }}>TMA</span>
      </div>

      {/* Green dots */}
      <div className="absolute top-48 right-[15%] w-1.5 h-1.5 rounded-full bg-[#e7f8c8]" style={{ animation: "pulse 2s infinite" }} />
      <div className="absolute top-60 right-[18%] w-1 h-1 rounded-full bg-[#e7f8c8]/40" />
      <div className="absolute top-80 left-[10%] w-1 h-1 rounded-full bg-[#e7f8c8]/20" />

      {/* Vertical line accent */}
      <div className="absolute top-32 right-[8%] h-32 w-px bg-gradient-to-b from-transparent via-[#e7f8c8]/30 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto w-full">

        {/* Label */}
        <div className="h-label flex items-center gap-4 mb-8">
          <span className="line-green" />
          <span className="label">Marketing Tech Agentur — Berlin</span>
        </div>

        {/* Headline */}
        <h1 className="display mb-10" style={{ fontSize: "clamp(3.5rem,11vw,10.5rem)" }}>
          <div style={{ overflow: "hidden" }}>
            <span className="h-line block glitch" data-text="Wir bauen">Wir bauen</span>
          </div>
          <div style={{ overflow: "hidden" }}>
            <span className="h-line block" style={{ color: "#e7f8c8" }}>Marken</span>
          </div>
          <div style={{ overflow: "hidden" }}>
            <span className="h-line block text-white/80">die wachsen.</span>
          </div>
        </h1>

        {/* Sub + CTA row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div>
            <p className="h-sub text-white/40 leading-relaxed max-w-md" style={{ fontSize: "clamp(14px,1.2vw,18px)" }}>
              Strategie, Kreativität und datengetriebene Umsetzung —<br />
              messbar, skalierbar und mit klarer Wirkung.
            </p>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/portfolio" className="h-cta btn">Portfolio →</Link>
            <Link href="/kontakt" className="h-cta btn-ghost">Projekt starten ↗</Link>
          </div>
        </div>

        {/* Stats */}
        <div className="h-stat flex flex-wrap gap-12 mt-16 pt-8 border-t border-white/[.06]">
          {[
            { val: 20, suffix: "+", label: "Projekte" },
            { val: 15, suffix: "+", label: "Kunden" },
            { val: 6,  suffix: "",  label: "Leistungen" },
            { val: 3,  suffix: "+", label: "Jahre" },
          ].map((s) => (
            <div key={s.label}>
              <div className="display text-[#e7f8c8]" style={{ fontSize: "clamp(2rem,4vw,3.5rem)" }}>
                <span className="count-up" data-target={s.val} data-suffix={s.suffix}>{s.val}{s.suffix}</span>
              </div>
              <div className="label mt-2 text-white/30">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <div className="w-px h-16 bg-gradient-to-b from-[#e7f8c8]/50 to-transparent" style={{ animation: "pulse 2s infinite" }} />
        <span className="label" style={{ fontSize: "8px", letterSpacing: ".6em" }}>SCROLL</span>
      </div>
    </section>
  );
}
