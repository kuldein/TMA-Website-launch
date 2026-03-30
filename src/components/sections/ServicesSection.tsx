"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "@/data";

gsap.registerPlugin(ScrollTrigger);

export default function ServicesSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".svc-head", { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 75%" } });

      gsap.fromTo(".svc-card", { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: .8, stagger: .1, ease: "power3.out",
          scrollTrigger: { trigger: ".svc-grid", start: "top 80%" } });

      // Number count on hover for each card
      document.querySelectorAll(".svc-card").forEach((card) => {
        const line = card.querySelector(".svc-line") as HTMLElement;
        card.addEventListener("mouseenter", () => {
          gsap.to(line, { scaleX: 1, duration: .4, ease: "power2.out" });
          gsap.to(card, { y: -8, duration: .4, ease: "power2.out" });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(line, { scaleX: 0, duration: .3, ease: "power2.in" });
          gsap.to(card, { y: 0, duration: .4, ease: "power2.out" });
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden"
      style={{ padding: "clamp(60px,10vw,160px) clamp(24px,5vw,80px)" }}>

      <div className="absolute top-0 left-[5%] right-[5%] h-px bg-white/[.05]" />

      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="svc-head flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="line-green" />
              <span className="label">Leistungen</span>
            </div>
            <h2 className="display" style={{ fontSize: "clamp(2.5rem,7vw,7rem)" }}>
              Was wir<br /><span style={{ color: "#e7f8c8" }}>für dich tun.</span>
            </h2>
          </div>
          <p className="text-white/35 max-w-xs leading-relaxed" style={{ fontSize: "15px" }}>
            Wir verbinden Strategie, Kreativität und datengetriebene Umsetzung, um Marken nachhaltig wachsen zu lassen.
          </p>
        </div>

        {/* Grid */}
        <div className="svc-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: "1px", background: "rgba(255,255,255,.05)" }}>
          {services.map((s, i) => (
            <div key={s.id} className="svc-card bg-[#060606] hover:bg-[#0e0e0e] transition-colors duration-500"
              style={{ padding: "clamp(32px,3vw,48px)", cursor: "none" }}>
              <div className="flex justify-between items-start mb-8">
                <span style={{ fontSize: "32px", color: "rgba(231,248,200,.25)" }}>{s.icon}</span>
                <span className="label" style={{ color: "rgba(255,255,255,.15)" }}>{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#f2f2f2", marginBottom: "12px", letterSpacing: "-.02em" }}>
                {s.title}
              </h3>
              <p style={{ fontSize: "14px", color: "rgba(255,255,255,.35)", lineHeight: 1.7 }}>{s.desc}</p>
              <div className="svc-line" style={{ height: "1px", background: "#e7f8c8", marginTop: "32px", transform: "scaleX(0)", transformOrigin: "left" }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
