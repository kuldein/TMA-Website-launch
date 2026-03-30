"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { projects } from "@/data";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".prj-head", { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 80%" } });

      gsap.fromTo(".prj-row", { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: .6, stagger: .07, ease: "power3.out",
          scrollTrigger: { trigger: ".prj-list", start: "top 80%" } });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden"
      style={{ padding: "clamp(60px,10vw,160px) clamp(24px,5vw,80px)" }}>

      <div className="absolute top-0 left-[5%] right-[5%] h-px bg-white/[.05]" />

      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="prj-head flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="line-green" />
              <span className="label">Projekte</span>
            </div>
            <h2 className="display" style={{ fontSize: "clamp(2.5rem,7vw,7rem)" }}>
              Ausgewählte<br /><span style={{ color: "#e7f8c8" }}>Arbeiten.</span>
            </h2>
          </div>
          <Link href="/portfolio" className="btn-ghost">Alle Projekte →</Link>
        </div>

        {/* List */}
        <div className="prj-list" style={{ borderTop: "1px solid rgba(255,255,255,.05)" }}>
          {projects.slice(0, 6).map((p, i) => (
            <Link key={p.slug} href={`/portfolio/${p.slug}`} className="prj-row group block"
              style={{ borderBottom: "1px solid rgba(255,255,255,.05)", textDecoration: "none" }}>
              <div className="flex items-center justify-between group-hover:bg-white/[.02] transition-colors duration-300"
                style={{ padding: "28px 0", gap: "24px" }}>
                <div className="flex items-center gap-8">
                  <span className="label" style={{ color: "rgba(255,255,255,.15)", minWidth: "28px" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <div className="font-bold text-white group-hover:text-[#e7f8c8] transition-colors duration-300"
                      style={{ fontSize: "clamp(18px,2.5vw,28px)", letterSpacing: "-.02em" }}>
                      {p.title}
                    </div>
                    <div className="hidden md:block label mt-1 text-white/30">{p.subtitle}</div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <span className="hidden md:block label text-white/25">{p.year}</span>
                  <div className="hidden md:flex gap-2">
                    {p.tags.slice(0, 2).map((t) => (
                      <span key={t} style={{ fontSize: "9px", letterSpacing: ".1em", textTransform: "uppercase",
                        color: "rgba(255,255,255,.2)", border: "1px solid rgba(255,255,255,.08)", padding: "4px 10px" }}>{t}</span>
                    ))}
                  </div>
                  <span className="text-[#e7f8c8] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ fontSize: "20px" }}>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
