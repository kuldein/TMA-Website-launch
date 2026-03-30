"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { projects } from "@/data";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const allTags = ["Alle", ...Array.from(new Set(projects.flatMap((p) => p.tags)))];

export default function PortfolioPage() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState("Alle");

  const filtered = active === "Alle" ? projects : projects.filter((p) => p.tags.includes(active));

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".port-line", { yPercent: 120, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: "power4.out", delay: 0.2 });

      gsap.fromTo(".port-label", { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out", delay: 0.3 });

      gsap.fromTo(".port-filters", { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.6 });

      gsap.fromTo(".port-row", { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: "power4.out",
          scrollTrigger: { trigger: ".port-list", start: "top 85%" }
        });

    }, ref);
    return () => ctx.revert();
  }, []);

  // Re-animate rows when filter changes
  useEffect(() => {
    gsap.fromTo(".port-row", { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.06, ease: "power3.out" });
  }, [active]);

  return (
    <>
      <Navbar />
      <main ref={ref} style={{ paddingTop: "120px", paddingBottom: 0 }}>

        {/* Hero */}
        <section style={{ padding: "clamp(40px,6vh,80px) clamp(24px,5vw,80px)", maxWidth: "1400px", margin: "0 auto" }}>
          <div className="port-label" style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "32px" }}>
            <div style={{ width: "32px", height: "1px", background: "#e7f8c8" }} />
            <span className="label" style={{ color: "rgba(231,248,200,0.7)" }}>Portfolio</span>
          </div>

          <h1 className="display" style={{ fontSize: "clamp(3rem,10vw,10rem)", marginBottom: "48px" }}>
            <div style={{ overflow: "hidden" }}>
              <span className="port-line block">Unsere</span>
            </div>
            <div style={{ overflow: "hidden" }}>
              <span className="port-line block" style={{ color: "#e7f8c8" }}>Arbeiten.</span>
            </div>
          </h1>

          {/* Filter buttons */}
          <div className="port-filters" style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "60px" }}>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActive(tag)}
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  padding: "10px 20px",
                  border: `1px solid ${active === tag ? "#e7f8c8" : "rgba(255,255,255,0.1)"}`,
                  background: active === tag ? "#e7f8c8" : "transparent",
                  color: active === tag ? "#060606" : "rgba(242,242,242,0.4)",
                  cursor: "pointer",
                  fontWeight: active === tag ? 700 : 400,
                  transition: "all 0.3s ease",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  if (active !== tag) {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(231,248,200,0.5)";
                    (e.currentTarget as HTMLButtonElement).style.color = "#e7f8c8";
                  }
                }}
                onMouseLeave={(e) => {
                  if (active !== tag) {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.1)";
                    (e.currentTarget as HTMLButtonElement).style.color = "rgba(242,242,242,0.4)";
                  }
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </section>

        {/* Project Rows */}
        <div className="port-list" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", maxWidth: "1400px", margin: "0 auto", padding: "0 clamp(24px,5vw,80px)" }}>
          {filtered.map((p, i) => (
            <Link
              key={p.slug}
              href={`/portfolio/${p.slug}`}
              className="port-row"
              style={{
                display: "flex",
                alignItems: "center",
                padding: "clamp(24px,3vh,40px) 0",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                textDecoration: "none",
                position: "relative",
                overflow: "hidden",
                cursor: "pointer",
                gap: "24px",
              }}
              onMouseEnter={(e) => {
                const overlay = e.currentTarget.querySelector(".row-overlay") as HTMLElement;
                const arrow = e.currentTarget.querySelector(".row-arrow") as HTMLElement;
                const title = e.currentTarget.querySelector(".row-title") as HTMLElement;
                if (overlay) overlay.style.transform = "scaleX(1)";
                if (arrow) { arrow.style.opacity = "1"; arrow.style.transform = "translateX(8px)"; }
                if (title) title.style.transform = "translateX(16px)";
              }}
              onMouseLeave={(e) => {
                const overlay = e.currentTarget.querySelector(".row-overlay") as HTMLElement;
                const arrow = e.currentTarget.querySelector(".row-arrow") as HTMLElement;
                const title = e.currentTarget.querySelector(".row-title") as HTMLElement;
                if (overlay) overlay.style.transform = "scaleX(0)";
                if (arrow) { arrow.style.opacity = "0"; arrow.style.transform = "translateX(0)"; }
                if (title) title.style.transform = "translateX(0)";
              }}
            >
              {/* Colored overlay slides in from left */}
              <div className="row-overlay" style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(90deg, rgba(231,248,200,0.04), transparent)",
                transform: "scaleX(0)", transformOrigin: "left",
                transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1)",
                pointerEvents: "none",
              }} />

              {/* Number */}
              <span style={{
                fontSize: "clamp(2rem,4vw,4rem)",
                fontWeight: 900,
                color: "rgba(231,248,200,0.08)",
                letterSpacing: "-0.04em",
                lineHeight: 1,
                minWidth: "80px",
                fontFamily: "Helvetica Neue, sans-serif",
                flexShrink: 0,
              }}>
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Category */}
              <span className="label" style={{
                color: "rgba(231,248,200,0.4)",
                fontSize: "9px",
                minWidth: "140px",
                flexShrink: 0,
                display: "none",
              }} data-desktop="true">
                {p.category}
              </span>

              {/* Title block */}
              <div style={{ flex: 1 }}>
                <div className="row-title" style={{ transition: "transform 0.4s cubic-bezier(0.4,0,0.2,1)" }}>
                  <h2 style={{
                    fontSize: "clamp(1.2rem,2.5vw,2.2rem)",
                    fontWeight: 900,
                    color: "#f2f2f2",
                    letterSpacing: "-0.03em",
                    lineHeight: 1.1,
                    marginBottom: "6px",
                  }}>
                    {p.title}
                  </h2>
                  <p style={{ fontSize: "13px", color: "rgba(242,242,242,0.35)", lineHeight: 1.5 }}>
                    {p.subtitle}
                  </p>
                </div>
              </div>

              {/* Tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", flexShrink: 0, maxWidth: "200px" }}>
                {p.tags.slice(0, 2).map((tag) => (
                  <span key={tag} style={{
                    fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase",
                    color: "rgba(242,242,242,0.25)", border: "1px solid rgba(255,255,255,0.08)", padding: "4px 8px",
                  }}>{tag}</span>
                ))}
              </div>

              {/* Year */}
              <span style={{ fontSize: "11px", color: "rgba(242,242,242,0.2)", letterSpacing: "0.2em", flexShrink: 0 }}>
                {p.year}
              </span>

              {/* Arrow */}
              <span className="row-arrow" style={{
                fontSize: "24px", color: "#e7f8c8", opacity: 0,
                transition: "opacity 0.3s, transform 0.4s cubic-bezier(0.4,0,0.2,1)",
                flexShrink: 0,
              }}>→</span>
            </Link>
          ))}
        </div>

        {/* View all CTA */}
        <div style={{ padding: "60px clamp(24px,5vw,80px)", maxWidth: "1400px", margin: "0 auto", display: "flex", alignItems: "center", gap: "24px" }}>
          <div style={{ height: "1px", flex: 1, background: "rgba(255,255,255,0.06)" }} />
          <Link href="/kontakt" style={{
            display: "flex", alignItems: "center", gap: "12px",
            fontSize: "11px", letterSpacing: "0.35em", textTransform: "uppercase",
            color: "rgba(231,248,200,0.6)", textDecoration: "none", transition: "color 0.3s",
          }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#e7f8c8"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(231,248,200,0.6)"; }}
          >
            <span>Projekt starten</span>
            <span style={{ fontSize: "20px", transition: "transform 0.3s" }}>↗</span>
          </Link>
        </div>

      </main>
      <Footer />
    </>
  );
}
