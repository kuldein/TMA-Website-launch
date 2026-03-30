"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { clients, industries } from "@/data";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { val: 20, suffix: "+", label: "Projekte" },
  { val: 15, suffix: "+", label: "Kunden" },
  { val: 3,  suffix: "+", label: "Jahre" },
  { val: 6,  suffix: "",  label: "Leistungen" },
];

export default function KundenPage() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero lines
      gsap.fromTo(".kd-line", { yPercent: 120, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: "power4.out", delay: 0.2 });

      gsap.fromTo(".kd-sub", { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 0.7 });

      // Client logos staggered fade in
      gsap.fromTo(".client-logo", { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: "power3.out",
          scrollTrigger: { trigger: ".clients-grid", start: "top 85%" }
        });

      // Trust numbers count up
      document.querySelectorAll(".stat-count").forEach((el) => {
        const target = parseInt(el.getAttribute("data-target") ?? "0");
        const suffix = el.getAttribute("data-suffix") ?? "";
        const obj = { val: 0 };
        ScrollTrigger.create({
          trigger: ".trust-section",
          start: "top 80%",
          once: true,
          onEnter: () => {
            gsap.fromTo(obj, { val: 0 }, {
              val: target, duration: 2, ease: "power2.out",
              onUpdate: () => { el.textContent = Math.round(obj.val) + suffix; }
            });
          }
        });
      });

      // Trust numbers reveal
      gsap.fromTo(".trust-stat", { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power4.out",
          scrollTrigger: { trigger: ".trust-section", start: "top 80%" }
        });

      // Industry tags
      gsap.fromTo(".ind-tag", { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.5, stagger: 0.04, ease: "back.out(1.7)",
          scrollTrigger: { trigger: ".ind-tags-wrap", start: "top 85%" }
        });

      // Section headings
      gsap.fromTo(".kd-heading", { yPercent: 80, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1, ease: "power4.out",
          scrollTrigger: { trigger: ".kd-heading", start: "top 85%" }
        });

    }, ref);
    return () => ctx.revert();
  }, []);

  // Collect all unique industry tags
  const allIndustryTags = Array.from(new Set(industries.map((i) => i.name)));

  return (
    <>
      <Navbar />
      <main ref={ref} style={{ paddingTop: "120px", paddingBottom: 0 }}>

        {/* Hero */}
        <section style={{ padding: "clamp(40px,6vh,80px) clamp(24px,5vw,80px)", maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "32px" }}>
            <div style={{ width: "32px", height: "1px", background: "#e7f8c8" }} />
            <span className="label" style={{ color: "rgba(231,248,200,0.7)" }}>Kunden</span>
          </div>

          <h1 className="display" style={{ fontSize: "clamp(3rem,9vw,9rem)", marginBottom: "32px" }}>
            <div style={{ overflow: "hidden" }}>
              <span className="kd-line block">Marken, denen</span>
            </div>
            <div style={{ overflow: "hidden" }}>
              <span className="kd-line block" style={{ color: "#e7f8c8" }}>wir vertrauen.</span>
            </div>
          </h1>

          <p className="kd-sub" style={{ color: "rgba(242,242,242,0.4)", fontSize: "clamp(14px,1.3vw,20px)", lineHeight: 1.7, maxWidth: "520px" }}>
            Wir arbeiten branchenübergreifend und bringen tiefgehende Expertise in ausgewählten Märkten mit.
          </p>
        </section>

        {/* Client Logos Grid */}
        <section style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "clamp(40px,6vh,80px) clamp(24px,5vw,80px)" }}>
          <div className="clients-grid" style={{
            maxWidth: "1400px", margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: "2px",
            background: "rgba(255,255,255,0.04)",
          }}>
            {clients.map((client) => (
              <div key={client} className="client-logo" style={{
                background: "#0a0a0a",
                aspectRatio: "3/2",
                display: "flex", alignItems: "center", justifyContent: "center",
                padding: "24px 16px",
                cursor: "default",
                position: "relative",
                overflow: "hidden",
                transition: "background 0.3s",
              }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = "#0f0f0f";
                  const text = (e.currentTarget as HTMLDivElement).querySelector(".client-name") as HTMLElement;
                  if (text) text.style.color = "rgba(231,248,200,0.8)";
                  const glow = (e.currentTarget as HTMLDivElement).querySelector(".client-glow") as HTMLElement;
                  if (glow) glow.style.opacity = "1";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = "#0a0a0a";
                  const text = (e.currentTarget as HTMLDivElement).querySelector(".client-name") as HTMLElement;
                  if (text) text.style.color = "rgba(242,242,242,0.2)";
                  const glow = (e.currentTarget as HTMLDivElement).querySelector(".client-glow") as HTMLElement;
                  if (glow) glow.style.opacity = "0";
                }}
              >
                <div className="client-glow" style={{
                  position: "absolute", inset: 0,
                  background: "radial-gradient(ellipse at center, rgba(231,248,200,0.04), transparent 70%)",
                  opacity: 0, transition: "opacity 0.4s",
                  pointerEvents: "none",
                }} />
                <span className="client-name" style={{
                  fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase",
                  textAlign: "center", color: "rgba(242,242,242,0.2)",
                  lineHeight: 1.5, fontWeight: 700, transition: "color 0.3s",
                  position: "relative", zIndex: 1,
                }}>
                  {client}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Trust Numbers */}
        <section className="trust-section" style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "clamp(60px,8vh,120px) clamp(24px,5vw,80px)", background: "#030303" }}>
          <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "60px" }}>
              <div style={{ width: "32px", height: "1px", background: "#e7f8c8" }} />
              <span className="label" style={{ color: "rgba(231,248,200,0.7)" }}>Zahlen</span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px,1fr))", gap: "2px", background: "rgba(255,255,255,0.04)" }}>
              {stats.map((s) => (
                <div key={s.label} className="trust-stat" style={{
                  background: "#030303",
                  padding: "clamp(32px,4vw,56px)",
                  textAlign: "center",
                }}>
                  <div className="display" style={{ fontSize: "clamp(3rem,6vw,6rem)", color: "#e7f8c8", lineHeight: 1 }}>
                    <span className="stat-count" data-target={s.val} data-suffix={s.suffix}>
                      {s.val}{s.suffix}
                    </span>
                  </div>
                  <div className="label" style={{ color: "rgba(242,242,242,0.3)", marginTop: "12px" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industry Tags */}
        <section style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "clamp(60px,8vh,120px) clamp(24px,5vw,80px)" }}>
          <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
              <div style={{ width: "32px", height: "1px", background: "#e7f8c8" }} />
              <span className="label" style={{ color: "rgba(231,248,200,0.7)" }}>Branchen</span>
            </div>

            <div style={{ overflow: "hidden", marginBottom: "48px" }}>
              <h2 className="kd-heading display" style={{ fontSize: "clamp(2rem,5vw,5rem)" }}>
                Wo wir Expertise haben.
              </h2>
            </div>

            <div className="ind-tags-wrap" style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              {allIndustryTags.map((tag) => (
                <span key={tag} className="ind-tag" style={{
                  fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase",
                  color: "rgba(242,242,242,0.4)", border: "1px solid rgba(255,255,255,0.08)", padding: "12px 20px",
                  cursor: "default", transition: "all 0.3s",
                  background: "transparent",
                }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLSpanElement).style.borderColor = "rgba(231,248,200,0.4)";
                    (e.currentTarget as HTMLSpanElement).style.color = "#e7f8c8";
                    (e.currentTarget as HTMLSpanElement).style.background = "rgba(231,248,200,0.03)";
                    (e.currentTarget as HTMLSpanElement).style.boxShadow = "0 0 20px rgba(231,248,200,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLSpanElement).style.borderColor = "rgba(255,255,255,0.08)";
                    (e.currentTarget as HTMLSpanElement).style.color = "rgba(242,242,242,0.4)";
                    (e.currentTarget as HTMLSpanElement).style.background = "transparent";
                    (e.currentTarget as HTMLSpanElement).style.boxShadow = "none";
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Industries detailed */}
            <div style={{ marginTop: "60px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              {industries.map((ind, i) => (
                <div key={ind.name} style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "24px 0", display: "flex", flexWrap: "wrap", gap: "20px", alignItems: "center" }}>
                  <div style={{ minWidth: "280px" }}>
                    <span style={{ fontSize: "9px", color: "rgba(231,248,200,0.3)", letterSpacing: "0.3em" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#e7f8c8", marginTop: "4px" }}>{ind.name}</h3>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", flex: 1 }}>
                    {ind.clients.map((c) => (
                      <span key={c} style={{
                        fontSize: "10px", letterSpacing: "0.15em", color: "rgba(242,242,242,0.3)",
                        border: "1px solid rgba(255,255,255,0.05)", padding: "4px 10px",
                      }}>{c}</span>
                    ))}
                  </div>
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
