"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cta-content",
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative px-6 md:px-12 py-40 overflow-hidden">
      <div className="absolute top-0 left-6 md:left-12 right-6 md:right-12 h-px bg-white/5" />

      {/* Background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(231,248,200,0.04)_0%,_transparent_70%)] pointer-events-none" />

      <div className="cta-content max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-8 h-px bg-[#e7f8c8]" />
          <span className="text-[10px] tracking-[0.5em] uppercase text-[#e7f8c8]/70">Kontakt</span>
          <div className="w-8 h-px bg-[#e7f8c8]" />
        </div>

        <h2 className="font-display text-[clamp(3rem,8vw,7rem)] text-white leading-tight mb-6">
          Lass uns etwas
          <br />
          <span className="text-[#e7f8c8] glitch" data-text="Großes bauen.">
            Großes bauen.
          </span>
        </h2>

        <p className="text-white/40 text-lg mb-12 max-w-lg mx-auto leading-relaxed">
          Du hast eine Idee. Wir haben die Strategie und die Tools, um sie zur Realität zu machen.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/kontakt" className="btn-tma">
            Projekt starten →
          </Link>
          <Link
            href="/portfolio"
            className="text-[13px] font-semibold tracking-widest uppercase text-white/30 hover:text-[#e7f8c8] transition-colors flex items-center justify-center gap-2"
          >
            Portfolio ansehen
          </Link>
        </div>

        {/* Contact hint */}
        <p className="text-white/20 text-xs mt-12 tracking-widest">
          Oder schreib uns direkt:{" "}
          <a
            href="mailto:hello@themodestyargument.de"
            className="text-[#e7f8c8]/50 hover:text-[#e7f8c8] transition-colors"
          >
            hello@themodestyargument.de
          </a>
        </p>
      </div>
    </section>
  );
}
