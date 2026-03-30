"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

const posts = [
  {
    slug: "digitale-praesenz-2025",
    title: "Digitale Präsenz 2025: Was Marken jetzt wissen müssen",
    excerpt: "Der digitale Markt verändert sich schneller als je zuvor. Wir zeigen, worauf es 2025 ankommt.",
    date: "2025-01-15",
    category: "Strategie",
    readTime: 5,
  },
  {
    slug: "performance-marketing-basics",
    title: "Performance Marketing: Von null auf messbare Ergebnisse",
    excerpt: "Wie datengetriebene Kampagnen Reichweite in echte Ergebnisse verwandeln.",
    date: "2025-02-01",
    category: "Performance",
    readTime: 7,
  },
  {
    slug: "social-media-community",
    title: "Community-Aufbau: Warum Follower allein nicht reichen",
    excerpt: "Eine starke Community ist mehr als Zahlen. Wir erklären, wie du echte Bindungen schaffst.",
    date: "2025-02-20",
    category: "Social Media",
    readTime: 4,
  },
];

export default function BlogPage() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero lines
      gsap.fromTo(".blog-line", { yPercent: 120, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: "power4.out", delay: 0.2 });

      gsap.fromTo(".blog-label", { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out", delay: 0.3 });

      // Cards
      gsap.fromTo(".blog-card", { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power4.out",
          scrollTrigger: { trigger: ".blog-grid", start: "top 85%" }
        });

    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <Navbar />
      <main ref={ref} style={{ paddingTop: "120px", paddingBottom: 0 }}>

        {/* Hero */}
        <section style={{ padding: "clamp(40px,6vh,80px) clamp(24px,5vw,80px)", maxWidth: "1400px", margin: "0 auto" }}>
          <div className="blog-label" style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "32px" }}>
            <div style={{ width: "32px", height: "1px", background: "#e7f8c8" }} />
            <span className="label" style={{ color: "rgba(231,248,200,0.7)" }}>Blog</span>
          </div>

          <h1 className="display" style={{ fontSize: "clamp(3rem,9vw,9rem)", marginBottom: "48px" }}>
            <div style={{ overflow: "hidden" }}>
              <span className="blog-line block">Insights &amp;</span>
            </div>
            <div style={{ overflow: "hidden" }}>
              <span className="blog-line block" style={{ color: "#e7f8c8" }}>Perspektiven.</span>
            </div>
          </h1>
        </section>

        {/* Cards grid */}
        <section style={{ padding: "0 clamp(24px,5vw,80px) clamp(60px,8vh,120px)", maxWidth: "1400px", margin: "0 auto" }}>
          <div className="blog-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px,1fr))",
            gap: "2px",
            background: "rgba(255,255,255,0.04)",
          }}>
            {posts.map((post, i) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-card" style={{
                display: "block",
                background: "#0a0a0a",
                padding: "clamp(28px,3vw,44px)",
                textDecoration: "none",
                position: "relative",
                overflow: "hidden",
                cursor: "pointer",
              }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "#0f0f0f";
                  const img = (e.currentTarget as HTMLAnchorElement).querySelector(".blog-img") as HTMLElement;
                  const title = (e.currentTarget as HTMLAnchorElement).querySelector(".blog-title") as HTMLElement;
                  const line = (e.currentTarget as HTMLAnchorElement).querySelector(".blog-bottom-line") as HTMLElement;
                  if (img) img.style.transform = "scale(1.03)";
                  if (title) title.style.transform = "translateY(-4px)";
                  if (line) line.style.transform = "scaleX(1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "#0a0a0a";
                  const img = (e.currentTarget as HTMLAnchorElement).querySelector(".blog-img") as HTMLElement;
                  const title = (e.currentTarget as HTMLAnchorElement).querySelector(".blog-title") as HTMLElement;
                  const line = (e.currentTarget as HTMLAnchorElement).querySelector(".blog-bottom-line") as HTMLElement;
                  if (img) img.style.transform = "scale(1)";
                  if (title) title.style.transform = "translateY(0)";
                  if (line) line.style.transform = "scaleX(0)";
                }}
              >
                {/* Image area with animated gradient */}
                <div style={{ width: "100%", aspectRatio: "16/9", overflow: "hidden", marginBottom: "24px", position: "relative" }}>
                  <div className="blog-img" style={{
                    width: "100%", height: "100%",
                    background: `linear-gradient(135deg,
                      hsl(${80 + i * 30}, 20%, 8%) 0%,
                      hsl(${80 + i * 30}, 30%, 6%) 50%,
                      hsl(${80 + i * 30}, 15%, 5%) 100%)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    border: "1px solid rgba(255,255,255,0.04)",
                    transition: "transform 0.6s cubic-bezier(0.4,0,0.2,1)",
                    position: "relative",
                  }}>
                    {/* Animated gradient overlay */}
                    <div style={{
                      position: "absolute", inset: 0,
                      background: `linear-gradient(135deg, rgba(231,248,200,0.03) 0%, transparent 50%, rgba(231,248,200,0.02) 100%)`,
                      animation: `gradShift${i} 6s ease-in-out infinite alternate`,
                    }} />
                    <span style={{
                      fontSize: "9px", letterSpacing: "0.4em", textTransform: "uppercase",
                      color: "rgba(231,248,200,0.1)", position: "relative",
                    }}>{post.category}</span>
                  </div>
                </div>

                {/* Meta */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                  <span style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(231,248,200,0.5)" }}>
                    {post.category}
                  </span>
                  <span style={{ color: "rgba(255,255,255,0.15)", fontSize: "10px" }}>·</span>
                  <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "10px", color: "rgba(242,242,242,0.3)" }}>
                    <span style={{ display: "inline-block", width: "16px", height: "1px", background: "rgba(231,248,200,0.3)" }} />
                    {post.readTime} min
                  </span>
                </div>

                {/* Title */}
                <div style={{ overflow: "hidden", marginBottom: "12px" }}>
                  <h2 className="blog-title" style={{
                    fontSize: "clamp(1rem,1.5vw,1.2rem)", fontWeight: 700,
                    color: "#f2f2f2", lineHeight: 1.3, letterSpacing: "-0.02em",
                    transition: "transform 0.4s cubic-bezier(0.4,0,0.2,1), color 0.3s",
                  }}>
                    {post.title}
                  </h2>
                </div>

                <p style={{ fontSize: "13px", color: "rgba(242,242,242,0.35)", lineHeight: 1.7, marginBottom: "24px" }}>
                  {post.excerpt}
                </p>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "10px", color: "rgba(242,242,242,0.2)", letterSpacing: "0.1em" }}>
                    {new Date(post.date).toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" })}
                  </span>
                  <span style={{ fontSize: "16px", color: "#e7f8c8", opacity: 0.6 }}>→</span>
                </div>

                {/* Bottom line */}
                <div className="blog-bottom-line" style={{
                  position: "absolute", bottom: 0, left: 0, right: 0, height: "1px",
                  background: "#e7f8c8", transform: "scaleX(0)", transformOrigin: "left",
                  transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1)",
                }} />
              </Link>
            ))}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "clamp(60px,8vh,100px) clamp(24px,5vw,80px)", textAlign: "center" }}>
          <div style={{ maxWidth: "600px", margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", marginBottom: "24px" }}>
              <div style={{ height: "1px", width: "40px", background: "rgba(231,248,200,0.3)" }} />
              <span className="label" style={{ color: "rgba(231,248,200,0.5)" }}>Mehr Insights</span>
              <div style={{ height: "1px", width: "40px", background: "rgba(231,248,200,0.3)" }} />
            </div>
            <p className="display" style={{ fontSize: "clamp(1.5rem,4vw,3rem)", marginBottom: "32px", color: "#f2f2f2" }}>
              Bleib auf dem Laufenden.
            </p>
            <Link href="/kontakt" className="btn" style={{ display: "inline-flex" }}>
              Kontakt aufnehmen →
            </Link>
          </div>
        </section>

        <style>{`
          @keyframes gradShift0 { from { opacity: 0.8; } to { opacity: 1.2; } }
          @keyframes gradShift1 { from { opacity: 1; } to { opacity: 0.7; } }
          @keyframes gradShift2 { from { opacity: 0.9; } to { opacity: 1.1; } }
        `}</style>

      </main>
      <Footer />
    </>
  );
}
