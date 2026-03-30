"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useRouter } from "next/navigation";

interface Props {
  onEnter: () => void;
}

export default function IntroScreen({ onEnter }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Animate in
    const tl = gsap.timeline();
    tl.fromTo(
      ".intro-btn",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.15, duration: 0.6, ease: "power3.out", delay: 0.8 }
    );
    tl.fromTo(
      ".intro-logo",
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" },
      0.3
    );
  }, []);

  const handleExit = (dest: "site" | "game") => {
    gsap.to(containerRef.current, {
      opacity: 0,
      scale: 0.98,
      duration: 0.6,
      ease: "power3.inOut",
      onComplete: () => {
        if (dest === "game") {
          router.push("/game");
        } else {
          onEnter();
        }
      },
    });
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[200] bg-[#0a0a0a] flex items-center justify-center overflow-hidden"
    >
      {/* Background video / placeholder */}
      <div className="absolute inset-0">
        {/* Placeholder gradient until real video is dropped in */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0a0a0a]" />
        {/* Animated grid lines */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(#e7f8c8 1px, transparent 1px), linear-gradient(90deg, #e7f8c8 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        {/* Radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(231,248,200,0.06)_0%,_transparent_70%)]" />
      </div>

      {/* Center logo */}
      <div className="intro-logo relative z-10 text-center pointer-events-none select-none">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="w-14 h-14 border-2 border-[#e7f8c8] flex items-center justify-center">
            <span className="text-[#e7f8c8] text-xl font-black">TMA</span>
          </div>
        </div>
        <p className="text-[10px] tracking-[0.5em] uppercase text-white/30">
          The Modesty Argument
        </p>
      </div>

      {/* LEFT — Game button */}
      <button
        onClick={() => handleExit("game")}
        className="intro-btn absolute left-8 bottom-1/2 translate-y-1/2 md:left-16 flex flex-col items-center gap-3 group"
      >
        <span className="text-[10px] tracking-[0.4em] uppercase text-white/30 group-hover:text-[#e7f8c8] transition-colors">
          Game
        </span>
        <div className="w-px h-16 bg-white/10 group-hover:bg-[#e7f8c8]/50 transition-colors" />
        <div className="w-2 h-2 border border-white/30 group-hover:border-[#e7f8c8] rotate-45 transition-colors" />
      </button>

      {/* RIGHT — Enter site button */}
      <button
        onClick={() => handleExit("site")}
        className="intro-btn absolute right-8 bottom-1/2 translate-y-1/2 md:right-16 flex flex-col items-center gap-3 group"
      >
        <span className="text-[10px] tracking-[0.4em] uppercase text-white/30 group-hover:text-[#e7f8c8] transition-colors">
          Enter
        </span>
        <div className="w-px h-16 bg-white/10 group-hover:bg-[#e7f8c8]/50 transition-colors" />
        <div className="w-2 h-2 border border-white/30 group-hover:border-[#e7f8c8] rotate-45 transition-colors" />
      </button>

      {/* BOTTOM RIGHT — Skip */}
      <button
        onClick={() => handleExit("site")}
        className="intro-btn absolute bottom-8 right-8 md:bottom-12 md:right-12 text-[10px] tracking-[0.35em] uppercase text-white/20 hover:text-[#e7f8c8] transition-colors flex items-center gap-2"
      >
        <span>Überspringen</span>
        <span className="text-[#e7f8c8]">→</span>
      </button>

      {/* BOTTOM LEFT — Scroll hint */}
      <div className="intro-btn absolute bottom-8 left-8 md:bottom-12 md:left-12 text-[10px] tracking-[0.35em] uppercase text-white/15 flex items-center gap-2">
        <div className="w-6 h-px bg-white/15" />
        <span>2025</span>
      </div>
    </div>
  );
}
