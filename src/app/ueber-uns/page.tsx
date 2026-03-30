"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { industries, team } from "@/data";

gsap.registerPlugin(ScrollTrigger);

export default function UeberUnsPage() {
  const ref = useRef<HTMLDivElement>(null);
  const [openIndustry, setOpenIndustry] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero heading lines
      gsap.fromTo(".uu-line", { yPercent: 120, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: "power4.out", delay: 0.2 });

      gsap.fromTo(".uu-est", { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 1, ease: "power3.out", delay: 0.8 });

      gsap.fromTo(".uu-sub", { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 1 });

      // Horizontal lines
      gsap.fromTo(".h-line-rule", { scaleX: 0 },
        { scaleX: 1, duration: 1.2, ease: "power4.out",
          scrollTrigger: { trigger: ".h-line-rule", start: "top 80%" }
        });

      // Values cards
      gsap.fromTo(".value-card", { opacity: 0, y: 60, clipPath: "inset(100% 0 0 0)" },
        { opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)", duration: 0.9, stagger: 0.15, ease: "power4.out",
          scrollTrigger: { trigger: ".values-section", start: "top 80%" }
        });

      // Team cards
      gsap.fromTo(".team-card", { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power4.out",
          scrollTrigger: { trigger: ".team-section", start: "top 80%" }
        });

      // Industry items
      gsap.fromTo(".industry-item", { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.7, stagger: 0.08, ease: "power3.out",
          scrollTrigger: { trigger: ".industries-section", start: "top 80%" }
        });

      // Section headings
      gsap.fromTo(".section-heading", { yPercent: 80, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1, ease: "power4.out", stagger: 0.1,
          scrollTrigger: { trigger: ".section-heading", start: "top 85%" }
        });

      // Marquee
      gsap.to(".marquee-inner", {
        xPercent: -50,
        ease: "none",
        duration: 15,
        repeat: -1,
      });

      // Est number glitch trigger
      gsap.fromTo(".est-number", { opacity: 0, scale: 1.3 },
        { opacity: 1, scale: 1, duration: 1, ease: "elastic.out(1, 0.5)", delay: 1.2 });

    }, ref);
    return () => ctx.revert();
  }, []);

  const values = [
    { icon: "◎", title: "Strategie first.", desc: "Wir denken bevor wir handeln. Jede Kampagne beginnt mit einem klaren Ziel und einem durchdachten Plan, der auf echten Daten basiert." },
    { icon: "◈", title: "Daten treiben.", desc: "Wir optimieren kontinuierlich auf Basis echter Daten, nicht Bauchgefühl. Jede Entscheidung ist messbar und nachvollziehbar." },
    { icon: "◉", title: "Wachstum zählt.", desc: "Unser Erfolg misst sich am Erfolg unserer Kunden. Wir bauen langfristige Partnerschaften, keine kurzfristigen Projekte. Punkt." },
  ];

  return (
    <>
      <Navbar />
      <main ref={ref} style={{ paddingTop: "120px", paddingBottom: 0 }}>

        {/* Hero Section */}
        <section style={{ padding: "clamp(40px,6vh,80px) clamp(24px,5vw,80px)", maxWidth: "1400px", margin: "0 auto", position: "relative" }}>

          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "32px" }}>
            <div style={{ width: "32px", height: "1px", background: "#e7f8c8" }} />
            <span className="label" style={{ color: "rgba(231,248,200,0.7)" }}>Über uns</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "40px" }}>
            <div style={{ flex: 1, minWidth: "280px" }}>
              <h1 className="display" style={{ fontSize: "clamp(3rem,9vw,9rem)", marginBottom: "32px" }}>
                <div style={{ overflow: "hidden" }}>
                  <span className="uu-line block">Wir sind</span>
                </div>
                <div style={{ overflow: "hidden" }}>
                  <span className="uu-line block" style={{ color: "#e7f8c8" }}>The Modesty</span>
                </div>
                <div style={{ overflow: "hidden" }}>
                  <span className="uu-line block">Argument.</span>
                </div>
              </h1>
              <p className="uu-sub" style={{ color: "rgba(242,242,242,0.45)", fontSize: "clamp(14px,1.3vw,18px)", lineHeight: 1.7, maxWidth: "520px" }}>
                Eine Marketing-Tech-Agentur, die Strategie, Kreativität und datengetriebene Umsetzung verbindet — messbar, skalierbar und mit klarer Wirkung.
              </p>
            </div>

            {/* Est. 2022 */}
            <div className="uu-est" style={{ textAlign: "right" }}>
              <div className="est-number glitch display" data-text="2022"
                style={{ fontSize: "clamp(4rem,10vw,10rem)", color: "rgba(231,248,200,0.08)", lineHeight: 1 }}>
                2022
              </div>
              <div className="label" style={{ color: "rgba(231,248,200,0.4)", marginTop: "8px" }}>Est.</div>
            </div>
          </div>
        </section>

        {/* Marquee */}
        <div style={{ overflow: "hidden", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "16px 0", background: "#060606" }}>
          <div className="marquee-inner" style={{ display: "flex", whiteSpace: "nowrap", willChange: "transform" }}>
            {[...Array(6)].map((_, i) => (
              <span key={i} style={{ fontSize: "13px", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(231,248,200,0.3)", fontWeight: 700, marginRight: 0 }}>
                STRATEGIE • KREATIVITÄT • PERFORMANCE • WACHSTUM • BERLIN • DATA-DRIVEN • &nbsp;
              </span>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <section className="values-section" style={{ padding: "clamp(60px,8vh,120px) clamp(24px,5vw,80px)", maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
            <div style={{ width: "32px", height: "1px", background: "#e7f8c8" }} />
            <span className="label" style={{ color: "rgba(231,248,200,0.7)" }}>Was uns antreibt</span>
          </div>

          <div style={{ overflow: "hidden", marginBottom: "60px" }}>
            <h2 className="section-heading display" style={{ fontSize: "clamp(2rem,5vw,5rem)" }}>
              Unsere Werte.
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", gap: "2px", background: "rgba(255,255,255,0.05)" }}>
            {values.map((v, i) => (
              <div key={i} className="value-card" style={{
                background: "#0a0a0a",
                padding: "clamp(32px,4vw,56px)",
                position: "relative",
                overflow: "hidden",
                cursor: "default",
                transition: "background 0.4s",
              }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = "#0f0f0f"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = "#0a0a0a"; }}
              >
                <div style={{ fontSize: "32px", color: "#e7f8c8", marginBottom: "24px", opacity: 0.7 }}>{v.icon}</div>
                <h3 style={{ fontSize: "clamp(1.2rem,2vw,1.6rem)", fontWeight: 900, color: "#e7f8c8", marginBottom: "16px", letterSpacing: "-0.02em" }}>
                  {v.title}
                </h3>
                <p style={{ color: "rgba(242,242,242,0.4)", lineHeight: 1.7, fontSize: "14px" }}>{v.desc}</p>
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0, height: "2px",
                  background: "linear-gradient(90deg, #e7f8c8, transparent)",
                  transform: "scaleX(0)", transformOrigin: "left",
                  transition: "transform 0.5s ease",
                }} className="value-line" />
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="team-section" style={{ padding: "clamp(60px,8vh,120px) clamp(24px,5vw,80px)", borderTop: "1px solid rgba(255,255,255,0.05)", background: "#030303" }}>
          <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
              <div style={{ width: "32px", height: "1px", background: "#e7f8c8" }} />
              <span className="label" style={{ color: "rgba(231,248,200,0.7)" }}>Team</span>
            </div>
            <div style={{ overflow: "hidden", marginBottom: "60px" }}>
              <h2 className="section-heading display" style={{ fontSize: "clamp(2rem,5vw,5rem)" }}>
                Die Menschen<br /><span style={{ color: "#e7f8c8" }}>hinter TMA.</span>
              </h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))", gap: "24px" }}>
              {team.map((member, i) => (
                <div key={i} className="team-card" style={{ cursor: "default" }}>
                  <div style={{
                    aspectRatio: "1",
                    background: `linear-gradient(135deg, #111 0%, #0a0a0a 50%, #1a1a0f 100%)`,
                    border: "1px solid rgba(255,255,255,0.05)",
                    marginBottom: "16px",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    transition: "border-color 0.3s, filter 0.5s",
                    filter: "grayscale(1)",
                  }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.filter = "grayscale(0)";
                      (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(231,248,200,0.3)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.filter = "grayscale(1)";
                      (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.05)";
                    }}
                  >
                    <span style={{ fontSize: "4rem", fontWeight: 900, color: "rgba(231,248,200,0.1)", fontFamily: "Helvetica Neue, sans-serif" }}>
                      {member.name.charAt(0)}
                    </span>
                    <div style={{
                      position: "absolute", inset: 0,
                      background: "linear-gradient(135deg, rgba(231,248,200,0.03), transparent)",
                    }} />
                  </div>
                  <h3 style={{ fontWeight: 700, color: "#f2f2f2", fontSize: "14px", marginBottom: "4px" }}>{member.name}</h3>
                  <p className="label" style={{ color: "rgba(242,242,242,0.35)", fontSize: "10px" }}>{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industries Accordion */}
        <section className="industries-section" style={{ padding: "clamp(60px,8vh,120px) clamp(24px,5vw,80px)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
              <div style={{ width: "32px", height: "1px", background: "#e7f8c8" }} />
              <span className="label" style={{ color: "rgba(231,248,200,0.7)" }}>Branchen</span>
            </div>
            <div style={{ overflow: "hidden", marginBottom: "60px" }}>
              <h2 className="section-heading display" style={{ fontSize: "clamp(2rem,5vw,5rem)" }}>
                Wo wir tätig sind.
              </h2>
            </div>

            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              {industries.map((ind, i) => (
                <div key={ind.name} className="industry-item"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", overflow: "hidden" }}>
                  <button
                    onClick={() => setOpenIndustry(openIndustry === i ? null : i)}
                    style={{
                      width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "24px 0", background: "transparent", border: "none", cursor: "pointer",
                      color: openIndustry === i ? "#e7f8c8" : "#f2f2f2",
                      transition: "color 0.3s",
                    }}
                    onMouseEnter={(e) => { if (openIndustry !== i) (e.currentTarget as HTMLButtonElement).style.color = "rgba(231,248,200,0.7)"; }}
                    onMouseLeave={(e) => { if (openIndustry !== i) (e.currentTarget as HTMLButtonElement).style.color = "#f2f2f2"; }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
                      <span style={{ fontSize: "11px", color: "rgba(231,248,200,0.3)", fontFamily: "Helvetica Neue", letterSpacing: "0.1em" }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span style={{ fontSize: "clamp(1rem,2vw,1.4rem)", fontWeight: 700, letterSpacing: "-0.02em" }}>
                        {ind.name}
                      </span>
                    </div>
                    <span style={{ fontSize: "20px", transform: openIndustry === i ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.3s ease", color: "#e7f8c8" }}>
                      +
                    </span>
                  </button>

                  <div style={{
                    maxHeight: openIndustry === i ? "200px" : "0",
                    overflow: "hidden",
                    transition: "max-height 0.5s cubic-bezier(0.4,0,0.2,1)",
                  }}>
                    <div style={{ paddingBottom: "24px", paddingLeft: "52px" }}>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                        {ind.clients.map((c) => (
                          <span key={c} style={{
                            fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase",
                            color: "rgba(242,242,242,0.4)", border: "1px solid rgba(231,248,200,0.15)",
                            padding: "6px 12px",
                          }}>{c}</span>
                        ))}
                      </div>
                    </div>
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
