"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function KontaktPage() {
  const ref = useRef<HTMLDivElement>(null);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "", service: "" });
  const [focused, setFocused] = useState<string | null>(null);

  const services = ["Strategie & Beratung", "Creative & Design", "Content & Copy", "Performance Marketing", "Social Media", "Video & Produktion"];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero glitch heading
      gsap.fromTo(".kk-line", { yPercent: 120, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: "power4.out", delay: 0.2 });

      gsap.fromTo(".kk-label", { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out", delay: 0.3 });

      // Horizontal line
      gsap.fromTo(".kk-rule", { scaleX: 0 },
        { scaleX: 1, duration: 1.4, ease: "power4.out", delay: 0.5 });

      // Form fields
      gsap.fromTo(".form-field", { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power3.out",
          scrollTrigger: { trigger: ".contact-form", start: "top 85%" }
        });

      // Info lines
      gsap.fromTo(".info-item", { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 0.7, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: ".contact-info", start: "top 85%" }
        });

      // Animated decorative lines on right side
      gsap.fromTo(".info-line", { scaleY: 0 },
        { scaleY: 1, duration: 1.2, stagger: 0.15, ease: "power4.out",
          scrollTrigger: { trigger: ".contact-info", start: "top 80%" }
        });

    }, ref);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate send
    await new Promise((r) => setTimeout(r, 1800));
    setLoading(false);
    setSent(true);
  };

  const inputStyle = (name: string) => ({
    width: "100%",
    background: focused === name ? "rgba(231,248,200,0.03)" : "rgba(0,0,0,0.4)",
    border: `1px solid ${focused === name ? "rgba(231,248,200,0.5)" : "rgba(255,255,255,0.08)"}`,
    color: "#f2f2f2",
    padding: "16px 20px",
    fontSize: "14px",
    outline: "none",
    transition: "all 0.3s",
    boxShadow: focused === name ? "0 0 20px rgba(231,248,200,0.06)" : "none",
    fontFamily: "Helvetica Neue, sans-serif",
  } as React.CSSProperties);

  const labelStyle = (name: string) => ({
    fontSize: "9px",
    letterSpacing: "0.4em",
    textTransform: "uppercase" as const,
    color: focused === name || form[name as keyof typeof form] ? "rgba(231,248,200,0.7)" : "rgba(242,242,242,0.3)",
    display: "block",
    marginBottom: "8px",
    transition: "color 0.3s, transform 0.3s",
    transform: focused === name || form[name as keyof typeof form] ? "translateY(-2px)" : "translateY(0)",
  });

  return (
    <>
      <Navbar />
      <main ref={ref} style={{ paddingTop: "120px", paddingBottom: 0 }}>

        {/* Hero */}
        <section style={{ padding: "clamp(40px,6vh,80px) clamp(24px,5vw,80px)", maxWidth: "1400px", margin: "0 auto" }}>
          <div className="kk-label" style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "32px" }}>
            <div style={{ width: "32px", height: "1px", background: "#e7f8c8" }} />
            <span className="label" style={{ color: "rgba(231,248,200,0.7)" }}>Kontakt</span>
          </div>

          <h1 className="display" style={{ fontSize: "clamp(3.5rem,10vw,10rem)", marginBottom: "0" }}>
            <div style={{ overflow: "hidden" }}>
              <span className="kk-line block glitch" data-text="Reden">Reden</span>
            </div>
            <div style={{ overflow: "hidden" }}>
              <span className="kk-line block" style={{ color: "#e7f8c8" }}>wir.</span>
            </div>
          </h1>
        </section>

        {/* Divider */}
        <div style={{ padding: "0 clamp(24px,5vw,80px)", maxWidth: "1400px", margin: "0 auto" }}>
          <div className="kk-rule" style={{ height: "1px", background: "rgba(255,255,255,0.06)", transformOrigin: "left" }} />
        </div>

        {/* Main grid */}
        <section style={{ padding: "clamp(60px,8vh,100px) clamp(24px,5vw,80px)", maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px,1fr))", gap: "clamp(40px,6vw,100px)" }}>

            {/* Form */}
            <div className="contact-form">
              {sent ? (
                <div style={{ border: "1px solid rgba(231,248,200,0.2)", padding: "48px", position: "relative", overflow: "hidden" }}>
                  <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                    background: "linear-gradient(90deg, #e7f8c8, rgba(231,248,200,0.3), transparent)",
                  }} />
                  <div style={{ width: "32px", height: "1px", background: "#e7f8c8", marginBottom: "24px" }} />
                  <h2 style={{ fontSize: "clamp(1.5rem,3vw,2.5rem)", fontWeight: 900, color: "#e7f8c8", marginBottom: "12px", letterSpacing: "-0.03em" }}>
                    Nachricht erhalten!
                  </h2>
                  <p style={{ color: "rgba(242,242,242,0.45)", lineHeight: 1.7 }}>
                    Wir melden uns innerhalb von 24 Stunden. Freuen uns auf das Gespräch.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                  <div className="form-field" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px", marginBottom: "2px" }}>
                    <div style={{ padding: "0" }}>
                      <label htmlFor="kk-name" style={labelStyle("name")}>Name *</label>
                      <input
                        id="kk-name"
                        required
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        onFocus={() => setFocused("name")}
                        onBlur={() => setFocused(null)}
                        style={inputStyle("name")}
                        placeholder="Max Mustermann"
                      />
                    </div>
                    <div>
                      <label htmlFor="kk-email" style={labelStyle("email")}>E-Mail *</label>
                      <input
                        id="kk-email"
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        onFocus={() => setFocused("email")}
                        onBlur={() => setFocused(null)}
                        style={inputStyle("email")}
                        placeholder="max@firma.de"
                      />
                    </div>
                  </div>

                  <div className="form-field" style={{ marginBottom: "2px" }}>
                    <label htmlFor="kk-company" style={labelStyle("company")}>Unternehmen</label>
                    <input
                      id="kk-company"
                      type="text"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      onFocus={() => setFocused("company")}
                      onBlur={() => setFocused(null)}
                      style={inputStyle("company")}
                      placeholder="Firma GmbH"
                    />
                  </div>

                  <div className="form-field" style={{ marginBottom: "2px" }}>
                    <label htmlFor="kk-service" style={labelStyle("service")}>Leistung</label>
                    <select
                      id="kk-service"
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      onFocus={() => setFocused("service")}
                      onBlur={() => setFocused(null)}
                      style={{ ...inputStyle("service"), color: form.service ? "#f2f2f2" : "rgba(242,242,242,0.3)" }}
                    >
                      <option value="" style={{ background: "#0a0a0a" }}>Leistung auswählen...</option>
                      {services.map((s) => (
                        <option key={s} value={s} style={{ background: "#0a0a0a" }}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-field" style={{ marginBottom: "24px" }}>
                    <label htmlFor="kk-message" style={labelStyle("message")}>Nachricht *</label>
                    <textarea
                      id="kk-message"
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused(null)}
                      rows={5}
                      style={{ ...inputStyle("message"), resize: "none" }}
                      placeholder="Erzähl uns von deinem Projekt..."
                    />
                  </div>

                  <div className="form-field">
                    <button
                      type="submit"
                      disabled={loading}
                      style={{
                        width: "100%", padding: "18px 32px",
                        background: loading ? "transparent" : "#e7f8c8",
                        border: "1px solid rgba(231,248,200,0.5)",
                        color: loading ? "rgba(231,248,200,0.6)" : "#060606",
                        fontSize: "11px", letterSpacing: "0.35em", textTransform: "uppercase",
                        fontWeight: 700, cursor: loading ? "not-allowed" : "pointer",
                        transition: "all 0.4s", fontFamily: "inherit",
                        display: "flex", alignItems: "center", justifyContent: "center", gap: "12px",
                        boxShadow: loading ? "none" : "0 0 40px rgba(231,248,200,0.15)",
                      }}
                      onMouseEnter={(e) => {
                        if (!loading) {
                          (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 60px rgba(231,248,200,0.25)";
                          (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!loading) {
                          (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 40px rgba(231,248,200,0.15)";
                          (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                        }
                      }}
                    >
                      {loading ? (
                        <>
                          <span style={{ display: "inline-block", width: "16px", height: "16px", border: "2px solid rgba(231,248,200,0.3)", borderTopColor: "#e7f8c8", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                          Sende...
                        </>
                      ) : (
                        <>Nachricht senden →</>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Contact info */}
            <div className="contact-info" style={{ display: "flex", flexDirection: "column", gap: "40px" }}>

              {/* Animated decorative line */}
              <div style={{ position: "relative", paddingLeft: "24px" }}>
                <div className="info-line" style={{
                  position: "absolute", left: 0, top: 0, bottom: 0,
                  width: "1px", background: "linear-gradient(to bottom, #e7f8c8, rgba(231,248,200,0.1))",
                  transformOrigin: "top",
                }} />

                <div className="info-item" style={{ marginBottom: "40px" }}>
                  <div className="label" style={{ color: "rgba(231,248,200,0.5)", marginBottom: "12px" }}>E-Mail</div>
                  <a href="mailto:hello@themodestyargument.de" style={{
                    color: "#f2f2f2", textDecoration: "none",
                    fontSize: "clamp(14px,1.5vw,18px)", fontWeight: 500,
                    transition: "color 0.3s",
                    display: "block",
                  }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#e7f8c8"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#f2f2f2"; }}
                  >
                    hello@themodestyargument.de
                  </a>
                </div>

                <div className="info-item" style={{ marginBottom: "40px" }}>
                  <div className="label" style={{ color: "rgba(231,248,200,0.5)", marginBottom: "12px" }}>Website</div>
                  <a href="https://themodestyargument.de" target="_blank" rel="noreferrer" style={{
                    color: "#f2f2f2", textDecoration: "none",
                    fontSize: "clamp(14px,1.5vw,18px)", fontWeight: 500,
                    transition: "color 0.3s",
                  }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#e7f8c8"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#f2f2f2"; }}
                  >
                    themodestyargument.de ↗
                  </a>
                </div>

                <div className="info-item">
                  <div className="label" style={{ color: "rgba(231,248,200,0.5)", marginBottom: "20px" }}>Leistungen</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {services.map((s, i) => (
                      <div key={s} style={{
                        display: "flex", alignItems: "center", gap: "16px",
                        color: "rgba(242,242,242,0.4)", fontSize: "14px",
                        padding: "10px 0",
                        borderBottom: i < services.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                        transition: "color 0.3s",
                        cursor: "default",
                      }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.color = "#e7f8c8"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.color = "rgba(242,242,242,0.4)"; }}
                      >
                        <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "rgba(231,248,200,0.4)", flexShrink: 0 }} />
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        <style>{`
          @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        `}</style>

      </main>
      <Footer />
    </>
  );
}
