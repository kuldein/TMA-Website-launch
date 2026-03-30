"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { projects } from "@/data";

const allTags = ["Alle", ...Array.from(new Set(projects.flatMap((p) => p.tags)))];

export default function PortfolioPage() {
  const [active, setActive] = useState("Alle");

  const filtered = active === "Alle" ? projects : projects.filter((p) => p.tags.includes(active));

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-0">
        <section className="px-6 md:px-12 py-24 max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-[#e7f8c8]" />
            <span className="text-[10px] tracking-[0.5em] uppercase text-[#e7f8c8]/70">Portfolio</span>
          </div>
          <h1 className="font-display text-[clamp(3rem,8vw,7rem)] text-white leading-tight mb-12">
            Unsere<br />
            <span className="text-[#e7f8c8]">Arbeiten.</span>
          </h1>

          {/* Filter */}
          <div className="flex flex-wrap gap-3 mb-16">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActive(tag)}
                className={`text-[11px] tracking-widest uppercase px-4 py-2 border transition-all duration-300 ${
                  active === tag
                    ? "border-[#e7f8c8] bg-[#e7f8c8] text-[#0a0a0a]"
                    : "border-white/10 text-white/40 hover:border-[#e7f8c8]/50 hover:text-[#e7f8c8]"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
            {filtered.map((p, i) => (
              <Link
                key={p.slug}
                href={`/portfolio/${p.slug}`}
                className="group bg-[#0a0a0a] p-8 md:p-12 hover:bg-[#0d0d0d] transition-colors duration-500 relative overflow-hidden"
              >
                {/* Number */}
                <span className="text-[10px] tracking-widest text-white/15 mb-6 block">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Placeholder image area */}
                <div className="w-full aspect-video bg-[#111] border border-white/5 mb-6 overflow-hidden flex items-center justify-center group-hover:border-[#e7f8c8]/20 transition-colors">
                  <span className="text-white/10 text-xs tracking-widest uppercase">
                    {p.title}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-white group-hover:text-[#e7f8c8] transition-colors mb-2">
                      {p.title}
                    </h2>
                    <p className="text-sm text-white/40">{p.subtitle}</p>
                  </div>
                  <span className="text-[#e7f8c8] opacity-0 group-hover:opacity-100 transition-opacity text-xl mt-1">
                    →
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {p.tags.map((tag) => (
                    <span key={tag} className="text-[9px] tracking-widest uppercase text-white/20 border border-white/10 px-2 py-1">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Hover border */}
                <div className="absolute bottom-0 left-0 w-full h-px bg-[#e7f8c8] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
