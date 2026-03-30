"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { projects } from "@/data";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-row",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative px-6 md:px-12 py-32 overflow-hidden">
      <div className="absolute top-0 left-6 md:left-12 right-6 md:right-12 h-px bg-white/5" />

      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-px bg-[#e7f8c8]" />
          <span className="text-[10px] tracking-[0.5em] uppercase text-[#e7f8c8]/70">Projekte</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] text-white leading-tight">
            Ausgewählte<br />
            <span className="text-[#e7f8c8]">Arbeiten.</span>
          </h2>
          <Link
            href="/portfolio"
            className="text-[11px] tracking-widest uppercase text-white/40 hover:text-[#e7f8c8] transition-colors flex items-center gap-2"
          >
            Alle Projekte <span>→</span>
          </Link>
        </div>

        {/* Project list */}
        <div className="divide-y divide-white/5">
          {projects.slice(0, 6).map((p, i) => (
            <Link
              key={p.slug}
              href={`/portfolio/${p.slug}`}
              className="project-row group flex items-center justify-between py-6 md:py-8 hover:px-4 transition-all duration-300"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="flex items-center gap-6">
                <span className="text-[10px] tracking-widest text-white/20 w-6">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-lg md:text-2xl font-bold text-white group-hover:text-[#e7f8c8] transition-colors duration-300">
                    {p.title}
                  </h3>
                  <p className="text-xs text-white/30 mt-1 hidden md:block">{p.subtitle}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <span className="hidden md:block text-[11px] tracking-widest uppercase text-white/30">
                  {p.year}
                </span>
                <div className="flex flex-wrap gap-2 hidden md:flex">
                  {p.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="text-[9px] tracking-widest uppercase text-white/20 border border-white/10 px-2 py-1">
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-[#e7f8c8] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
