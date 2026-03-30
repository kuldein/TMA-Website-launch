"use client";

import { useEffect, useRef } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { use } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { projects } from "@/data";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  params: Promise<{ slug: string }>;
}

export default function ProjectPage({ params }: Props) {
  const { slug } = use(params);
  const project = projects.find((p) => p.slug === slug);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!project) return;
    const ctx = gsap.context(() => {
      // Breadcrumb
      gsap.fromTo(".proj-breadcrumb", { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out", delay: 0.2 });

      // Hero title
      gsap.fromTo(".proj-line", { yPercent: 120, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: "power4.out", delay: 0.4 });

      gsap.fromTo(".proj-sub", { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 0.8 });

      // Horizontal rule
      gsap.fromTo(".proj-rule", { scaleX: 0 },
        { scaleX: 1, duration: 1.4, ease: "power4.out", delay: 0.5 });

      // Image parallax
      gsap.to(".proj-image-inner", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: ".proj-image-wrap",
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // Result tags bounce in
      gsap.fromTo(".result-tag", { opacity: 0, y: 30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)",
          scrollTrigger: { trigger: ".results-section", start: "top 80%" }
        });

      // Description
      gsap.fromTo(".proj-desc", { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: ".proj-desc", start: "top 85%" }
        });

      // Next project
      gsap.fromTo(".next-project", { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: ".next-project", start: "top 85%" }
        });

    }, ref);
    return () => ctx.revert();
  }, [project]);

  if (!project) {
    notFound();
    return null;
  }

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <>
      <Navbar />
      <main ref={ref} style={{ paddingTop: "120px", paddingBottom: 0 }}>

        {/* Hero */}
        <section style={{ padding: "clamp(40px,6vh,80px) clamp(24px,5vw,80px)", maxWidth: "1400px", margin: "0 auto" }}>
          {/* Breadcrumb */}
          <div className="proj-breadcrumb" style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "48px", fontSize: "10px", letterSpacing: "0.4em", textTransform: "uppercase" }}>
            <Link href="/portfolio" style={{ color: "rgba(242,242,242,0.3)", textDecoration: "none", transition: "color 0.3s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#e7f8c8"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(242,242,242,0.3)"; }}
            >
              Portfolio
            </Link>
            <span style={{ color: "rgba(242,242,242,0.2)" }}>/</span>
            <span style={{ color: "rgba(242,242,242,0.6)" }}>{project.title}</span>
          </div>

          {/* Category label */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
            <div style={{ width: "32px", height: "1px", background: "#e7f8c8" }} />
            <span className="label" style={{ color: "rgba(231,248,200,0.6)", fontSize: "9px" }}>{project.category}</span>
          </div>

          {/* Title */}
          <h1 className="display" style={{ fontSize: "clamp(2.5rem,8vw,8rem)", marginBottom: "24px" }}>
            <div style={{ overflow: "hidden" }}>
              <span className="proj-line block">{project.title}</span>
            </div>
          </h1>

          <p className="proj-sub" style={{ fontSize: "clamp(14px,1.3vw,20px)", color: "rgba(242,242,242,0.45)", lineHeight: 1.7, maxWidth: "600px", marginBottom: "60px" }}>
            {project.subtitle}
          </p>

          {/* Year + tags */}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px", marginBottom: "60px" }}>
            <span style={{ fontSize: "11px", color: "rgba(231,248,200,0.4)", letterSpacing: "0.3em", border: "1px solid rgba(231,248,200,0.2)", padding: "6px 12px" }}>
              {project.year}
            </span>
            {project.tags.map((tag) => (
              <span key={tag} style={{
                fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase",
                color: "rgba(242,242,242,0.3)", border: "1px solid rgba(255,255,255,0.08)", padding: "6px 12px",
              }}>{tag}</span>
            ))}
          </div>
        </section>

        {/* Full-width image */}
        <div className="proj-image-wrap" style={{ width: "100%", height: "clamp(300px,50vw,600px)", overflow: "hidden", position: "relative" }}>
          <div className="proj-image-inner" style={{
            width: "100%", height: "120%", position: "absolute", top: "-10%",
            background: "linear-gradient(135deg, #0f0f0f 0%, #111 30%, #0a0a0a 60%, #131308 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontSize: "clamp(1rem,2vw,1.2rem)", letterSpacing: "0.5em", textTransform: "uppercase", color: "rgba(231,248,200,0.06)", fontWeight: 900 }}>
              {project.title} — Visual
            </span>
            {/* Grid lines overlay */}
            <div style={{
              position: "absolute", inset: 0,
              backgroundImage: "linear-gradient(rgba(231,248,200,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(231,248,200,0.02) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }} />
          </div>
        </div>

        {/* Content */}
        <section style={{ padding: "clamp(60px,8vh,100px) clamp(24px,5vw,80px)", maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", gap: "clamp(40px,5vw,80px)" }}>

            {/* Description */}
            <div className="proj-desc">
              <div className="label" style={{ color: "rgba(231,248,200,0.5)", marginBottom: "20px" }}>Projekt</div>
              <div style={{ width: "100%", height: "1px", background: "rgba(255,255,255,0.08)", marginBottom: "24px" }} />
              <p style={{ color: "rgba(242,242,242,0.55)", lineHeight: 1.8, fontSize: "15px" }}>
                {project.description}
              </p>
            </div>

            {/* Results */}
            <div className="results-section">
              <div className="label" style={{ color: "rgba(231,248,200,0.5)", marginBottom: "20px" }}>Ergebnisse</div>
              <div style={{ width: "100%", height: "1px", background: "rgba(255,255,255,0.08)", marginBottom: "24px" }} />
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {project.results.map((r) => (
                  <div key={r} className="result-tag" style={{
                    display: "flex", alignItems: "center", gap: "16px",
                    padding: "16px 20px",
                    border: "1px solid rgba(231,248,200,0.12)",
                    background: "rgba(231,248,200,0.02)",
                    color: "rgba(242,242,242,0.7)",
                    fontSize: "14px",
                  }}>
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#e7f8c8", flexShrink: 0 }} />
                    {r}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Next project */}
        <div className="next-project" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "clamp(40px,6vh,80px) clamp(24px,5vw,80px)" }}>
          <div style={{ maxWidth: "1400px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "24px" }}>
            <Link href="/portfolio" style={{
              fontSize: "11px", letterSpacing: "0.35em", textTransform: "uppercase",
              color: "rgba(242,242,242,0.3)", textDecoration: "none", transition: "color 0.3s",
              display: "flex", alignItems: "center", gap: "12px",
            }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#e7f8c8"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(242,242,242,0.3)"; }}
            >
              ← Alle Projekte
            </Link>

            <Link href={`/portfolio/${nextProject.slug}`} style={{ textDecoration: "none" }}
              onMouseEnter={(e) => {
                const title = (e.currentTarget as HTMLAnchorElement).querySelector(".next-title") as HTMLElement;
                const arrow = (e.currentTarget as HTMLAnchorElement).querySelector(".next-arrow") as HTMLElement;
                if (title) title.style.color = "#e7f8c8";
                if (arrow) arrow.style.transform = "translateX(8px)";
              }}
              onMouseLeave={(e) => {
                const title = (e.currentTarget as HTMLAnchorElement).querySelector(".next-title") as HTMLElement;
                const arrow = (e.currentTarget as HTMLAnchorElement).querySelector(".next-arrow") as HTMLElement;
                if (title) title.style.color = "#f2f2f2";
                if (arrow) arrow.style.transform = "translateX(0)";
              }}
            >
              <div className="label" style={{ color: "rgba(231,248,200,0.4)", marginBottom: "8px" }}>Nächstes Projekt</div>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <span className="next-title" style={{ fontSize: "clamp(1.2rem,2.5vw,2.5rem)", fontWeight: 900, color: "#f2f2f2", letterSpacing: "-0.03em", transition: "color 0.3s" }}>
                  {nextProject.title}
                </span>
                <span className="next-arrow" style={{ fontSize: "24px", color: "#e7f8c8", transition: "transform 0.3s ease" }}>→</span>
              </div>
            </Link>
          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}
