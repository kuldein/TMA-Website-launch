"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".cta-txt", { opacity: 0, y: 60, scale: .96 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power4.out",
          scrollTrigger: { trigger: ref.current, start: "top 75%" } });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden grid-bg"
      style={{ padding: "clamp(80px,14vw,200px) clamp(24px,5vw,80px)" }}>

      <div className="absolute top-0 left-[5%] right-[5%] h-px bg-white/[.05]" />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(231,248,200,.04), transparent)" }} />

      <div className="cta-txt max-w-[1400px] mx-auto text-center">
        <div className="flex items-center justify-center gap-4 mb-10">
          <span className="line-green" />
          <span className="label">Kontakt</span>
          <span className="line-green" />
        </div>

        <h2 className="display glitch" data-text="Lass uns etwas Großes bauen."
          style={{ fontSize: "clamp(2.5rem,8vw,8rem)", color: "#f2f2f2", marginBottom: "32px" }}>
          Lass uns etwas<br /><span style={{ color: "#e7f8c8" }}>Großes bauen.</span>
        </h2>

        <p style={{ fontSize: "17px", color: "rgba(255,255,255,.35)", maxWidth: "480px", margin: "0 auto 48px", lineHeight: 1.7 }}>
          Du hast eine Idee. Wir haben die Strategie und die Tools, um sie zur Realität zu machen.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <Link href="/kontakt" className="btn">Projekt starten →</Link>
          <Link href="/portfolio" className="btn-ghost">Portfolio ansehen</Link>
        </div>

        <p style={{ marginTop: "48px", fontSize: "12px", color: "rgba(255,255,255,.2)", letterSpacing: ".1em" }}>
          Oder direkt:{" "}
          <a href="mailto:hello@themodestyargument.de"
            style={{ color: "rgba(231,248,200,.4)", textDecoration: "none" }}
            className="hover:text-[#e7f8c8] transition-colors">
            hello@themodestyargument.de
          </a>
        </p>
      </div>
    </section>
  );
}
