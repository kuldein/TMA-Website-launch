"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { industries, team } from "@/data";

gsap.registerPlugin(ScrollTrigger);

export default function UeberUnsPage() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".fade-up",
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 80%" },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <Navbar />
      <main ref={ref} className="pt-32 pb-0">
        {/* Hero */}
        <section className="px-6 md:px-12 py-24 max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-6 fade-up">
            <div className="w-8 h-px bg-[#e7f8c8]" />
            <span className="text-[10px] tracking-[0.5em] uppercase text-[#e7f8c8]/70">Über uns</span>
          </div>
          <h1 className="font-display text-[clamp(3rem,8vw,7rem)] text-white leading-tight mb-8 fade-up">
            Wir sind<br />
            <span className="text-[#e7f8c8]">The Modesty</span><br />
            Argument.
          </h1>
          <p className="text-white/50 text-xl max-w-2xl leading-relaxed fade-up">
            Eine Marketing-Tech-Agentur, die Strategie, Kreativität und datengetriebene Umsetzung verbindet, um Marken nachhaltig wachsen zu lassen — messbar, skalierbar und mit klarer Wirkung.
          </p>
        </section>

        {/* Values */}
        <section className="px-6 md:px-12 py-24 border-t border-white/5 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Strategie first.", desc: "Wir denken bevor wir handeln. Jede Kampagne beginnt mit einem klaren Ziel und einem durchdachten Plan." },
              { title: "Daten treiben.", desc: "Wir optimieren kontinuierlich auf Basis echter Daten, nicht Bauchgefühl." },
              { title: "Wachstum zählt.", desc: "Unser Erfolg misst sich am Erfolg unserer Kunden. Punkt." },
            ].map((v) => (
              <div key={v.title} className="fade-up">
                <h3 className="text-2xl font-black text-[#e7f8c8] mb-4">{v.title}</h3>
                <p className="text-white/40 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="px-6 md:px-12 py-24 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-4 fade-up">
              <div className="w-8 h-px bg-[#e7f8c8]" />
              <span className="text-[10px] tracking-[0.5em] uppercase text-[#e7f8c8]/70">Team</span>
            </div>
            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] text-white mb-16 fade-up">
              Die Menschen<br />
              <span className="text-[#e7f8c8]">hinter TMA.</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {team.map((member, i) => (
                <div key={i} className="fade-up group">
                  <div className="aspect-square bg-[#111] border border-white/5 mb-4 overflow-hidden flex items-center justify-center group-hover:border-[#e7f8c8]/30 transition-colors">
                    <span className="text-white/20 text-4xl font-black">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="font-bold text-white text-sm">{member.name}</h3>
                  <p className="text-white/40 text-xs mt-1 tracking-widest uppercase">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industries */}
        <section className="px-6 md:px-12 py-24 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-4 fade-up">
              <div className="w-8 h-px bg-[#e7f8c8]" />
              <span className="text-[10px] tracking-[0.5em] uppercase text-[#e7f8c8]/70">Branchen</span>
            </div>
            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] text-white mb-12 fade-up">
              Wo wir tätig sind.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
              {industries.map((ind) => (
                <div key={ind.name} className="fade-up bg-[#0a0a0a] p-6 hover:bg-[#111] transition-colors">
                  <h3 className="text-sm font-bold text-[#e7f8c8] mb-3">{ind.name}</h3>
                  <p className="text-xs text-white/30 leading-relaxed">{ind.clients.join(" · ")}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
