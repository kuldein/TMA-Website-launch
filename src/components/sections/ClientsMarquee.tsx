"use client";

import { clients } from "@/data";

export default function ClientsMarquee() {
  const doubled = [...clients, ...clients];

  return (
    <section className="relative py-16 overflow-hidden border-y border-white/5">
      <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

      <div className="flex">
        <div className="marquee-track flex items-center gap-16 whitespace-nowrap">
          {doubled.map((client, i) => (
            <span
              key={i}
              className="text-[11px] tracking-[0.4em] uppercase text-white/20 hover:text-[#e7f8c8] transition-colors duration-300 flex items-center gap-16"
            >
              {client}
              <span className="w-1 h-1 bg-[#e7f8c8]/20 rounded-full inline-block" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
