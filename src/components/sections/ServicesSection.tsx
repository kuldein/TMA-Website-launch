"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "@/data";

gsap.registerPlugin(ScrollTrigger);

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".service-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
      gsap.fromTo(
        ".section-label",
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative px-6 md:px-12 py-32 overflow-hidden">
      {/* Divider line */}
      <div className="absolute top-0 left-6 md:left-12 right-6 md:right-12 h-px bg-white/5" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="section-label flex items-center gap-3 mb-4">
          <div className="w-8 h-px bg-[#e7f8c8]" />
          <span className="text-[10px] tracking-[0.5em] uppercase text-[#e7f8c8]/70">Leistungen</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <h2 className="section-label font-display text-[clamp(2.5rem,6vw,5rem)] text-white leading-tight">
            Was wir<br />
            <span className="text-[#e7f8c8]">für dich tun.</span>
          </h2>
          <p className="section-label text-white/40 text-sm max-w-sm leading-relaxed">
            Wir verbinden Strategie, Kreativität und datengetriebene Umsetzung, um Marken nachhaltig wachsen zu lassen.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          {services.map((s, i) => (
            <div
              key={s.id}
              className="service-card bg-[#0a0a0a] p-8 group hover:bg-[#111] transition-colors duration-500 relative overflow-hidden"
            >
              {/* Hover accent */}
              <div className="absolute bottom-0 left-0 w-full h-px bg-[#e7f8c8] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

              <div className="flex items-start justify-between mb-6">
                <span className="text-3xl text-[#e7f8c8]/30 group-hover:text-[#e7f8c8]/80 transition-colors duration-300">
                  {s.icon}
                </span>
                <span className="text-[10px] tracking-widest text-white/20">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[#e7f8c8] transition-colors duration-300">
                {s.title}
              </h3>
              <p className="text-sm text-white/40 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
