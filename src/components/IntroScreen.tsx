"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useRouter } from "next/navigation";
import TMALogo from "@/components/TMALogo";

export default function IntroScreen({ onEnter }: { onEnter: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(".i-logo", { opacity: 0, scale: .85 }, { opacity: 1, scale: 1, duration: 1 }, .4)
      .fromTo(".i-line", { scaleX: 0 }, { scaleX: 1, duration: .8, stagger: .1 }, .8)
      .fromTo(".i-btn", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .5, stagger: .08 }, 1.2)
      .fromTo(".i-year", { opacity: 0 }, { opacity: 1, duration: .6 }, 1.4);
  }, []);

  const exit = (dest: "site" | "game") => {
    gsap.to(ref.current, { opacity: 0, scale: .97, duration: .7, ease: "power3.inOut",
      onComplete: () => dest === "game" ? router.push("/game") : onEnter() });
  };

  return (
    <div ref={ref} className="fixed inset-0 z-[300] flex items-center justify-center grid-bg"
      style={{ background: "#060606" }}>

      {/* Corner lines */}
      <div className="i-line absolute top-6 left-6 w-12 h-px" style={{ background: "rgba(231,248,200,.3)", transformOrigin: "left" }} />
      <div className="i-line absolute top-6 left-6 w-px h-12" style={{ background: "rgba(231,248,200,.3)", transformOrigin: "top" }} />
      <div className="i-line absolute top-6 right-6 w-12 h-px" style={{ background: "rgba(231,248,200,.3)", transformOrigin: "right" }} />
      <div className="i-line absolute top-6 right-6 w-px h-12" style={{ background: "rgba(231,248,200,.3)", transformOrigin: "top" }} />
      <div className="i-line absolute bottom-6 left-6 w-12 h-px" style={{ background: "rgba(231,248,200,.3)", transformOrigin: "left" }} />
      <div className="i-line absolute bottom-6 left-6 w-px h-12" style={{ background: "rgba(231,248,200,.3)", transformOrigin: "bottom" }} />
      <div className="i-line absolute bottom-6 right-6 w-12 h-px" style={{ background: "rgba(231,248,200,.3)", transformOrigin: "right" }} />
      <div className="i-line absolute bottom-6 right-6 w-px h-12" style={{ background: "rgba(231,248,200,.3)", transformOrigin: "bottom" }} />

      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(231,248,200,.05), transparent)" }} />

      {/* Center logo */}
      <div className="i-logo flex flex-col items-center gap-6">
        <TMALogo variant="light" height={48} />
        <div style={{ height: "1px", width: "60px", background: "rgba(231,248,200,.2)" }} />
        <p className="label" style={{ color: "rgba(255,255,255,.3)" }}>2025 — Marketing Tech</p>
      </div>

      {/* LEFT — Game */}
      <button onClick={() => exit("game")} className="i-btn group"
        style={{ position: "absolute", left: "clamp(24px,5vw,64px)", top: "50%", transform: "translateY(-50%)",
          background: "none", border: "none", cursor: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
        <span className="label" style={{ color: "rgba(255,255,255,.3)", transition: "color .3s" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#e7f8c8")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,.3)")}>Game</span>
        <div style={{ width: "1px", height: "60px", background: "rgba(255,255,255,.1)" }} />
        <div style={{ width: "6px", height: "6px", border: "1px solid rgba(255,255,255,.3)", transform: "rotate(45deg)" }} />
      </button>

      {/* RIGHT — Enter */}
      <button onClick={() => exit("site")} className="i-btn group"
        style={{ position: "absolute", right: "clamp(24px,5vw,64px)", top: "50%", transform: "translateY(-50%)",
          background: "none", border: "none", cursor: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
        <span className="label" style={{ color: "rgba(255,255,255,.3)", transition: "color .3s" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#e7f8c8")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,.3)")}>Enter</span>
        <div style={{ width: "1px", height: "60px", background: "rgba(255,255,255,.1)" }} />
        <div style={{ width: "6px", height: "6px", border: "1px solid rgba(255,255,255,.3)", transform: "rotate(45deg)" }} />
      </button>

      {/* Skip */}
      <button onClick={() => exit("site")} className="i-btn"
        style={{ position: "absolute", bottom: "clamp(24px,4vw,48px)", right: "clamp(24px,5vw,64px)",
          background: "none", border: "none", cursor: "none",
          fontSize: "10px", letterSpacing: ".4em", textTransform: "uppercase", color: "rgba(255,255,255,.2)",
          display: "flex", alignItems: "center", gap: "8px", transition: "color .3s" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#e7f8c8")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,.2)")}>
        Überspringen →
      </button>

      {/* Year */}
      <div className="i-year" style={{ position: "absolute", bottom: "clamp(24px,4vw,48px)", left: "clamp(24px,5vw,64px)",
        fontSize: "10px", letterSpacing: ".4em", color: "rgba(255,255,255,.15)" }}>
        © 2025
      </div>
    </div>
  );
}

