"use client";
import { clients } from "@/data";

export default function ClientsMarquee() {
  const doubled = [...clients, ...clients, ...clients];
  return (
    <div className="relative overflow-hidden" style={{ borderTop: "1px solid rgba(255,255,255,.05)", borderBottom: "1px solid rgba(255,255,255,.05)", padding: "24px 0" }}>
      <div className="absolute left-0 top-0 bottom-0 w-24 pointer-events-none z-10"
        style={{ background: "linear-gradient(to right, #060606, transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 pointer-events-none z-10"
        style={{ background: "linear-gradient(to left, #060606, transparent)" }} />
      <div className="marquee">
        {doubled.map((c, i) => (
          <div key={i} className="flex items-center" style={{ gap: "48px", paddingRight: "48px" }}>
            <span style={{ fontSize: "11px", letterSpacing: ".4em", textTransform: "uppercase", color: "rgba(255,255,255,.2)", whiteSpace: "nowrap" }}>{c}</span>
            <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "rgba(231,248,200,.2)", flexShrink: 0 }} />
          </div>
        ))}
      </div>
    </div>
  );
}
