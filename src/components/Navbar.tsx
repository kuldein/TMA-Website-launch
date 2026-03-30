"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import TMALogo from "@/components/TMALogo";

const links = [
  { href: "/ueber-uns", label: "Über uns" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/kunden", label: "Kunden" },
  { href: "/game", label: "Game" },
  { href: "/blog", label: "Blog" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    if (!menuRef.current) return;
    if (open) {
      gsap.fromTo(menuRef.current, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: .4, ease: "power3.out" });
      gsap.fromTo(".m-link", { opacity: 0, x: -24 }, { opacity: 1, x: 0, duration: .4, stagger: .05, ease: "power3.out", delay: .1 });
    }
  }, [open]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[200]"
        style={{
          padding: "0 clamp(24px,5vw,80px)",
          height: "72px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "background .4s, border-color .4s",
          background: scrolled ? "rgba(6,6,6,.92)" : "transparent",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,.06)" : "1px solid transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
        }}>

        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
          <TMALogo variant="light" height={22} />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link key={l.href} href={l.href}
              style={{ fontSize: "11px", fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase",
                color: "rgba(255,255,255,.4)", textDecoration: "none", transition: "color .3s" }}
              className="hover:text-[#e7f8c8]">{l.label}</Link>
          ))}
        </div>

        {/* CTA */}
        <Link href="/kontakt" className="hidden md:inline-flex btn" style={{ padding: "12px 28px", fontSize: "10px" }}>
          Projekt starten
        </Link>

        {/* Hamburger */}
        <button onClick={() => setOpen(!open)} className="md:hidden flex flex-col gap-1.5 p-2"
          style={{ background: "none", border: "none", cursor: "none" }}>
          <span style={{ display: "block", width: "24px", height: "1px", background: "#e7f8c8",
            transition: "transform .3s", transform: open ? "rotate(45deg) translate(0, 8px)" : "none" }} />
          <span style={{ display: "block", width: "24px", height: "1px", background: "#e7f8c8",
            transition: "opacity .3s", opacity: open ? 0 : 1 }} />
          <span style={{ display: "block", width: "24px", height: "1px", background: "#e7f8c8",
            transition: "transform .3s", transform: open ? "rotate(-45deg) translate(0, -8px)" : "none" }} />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div ref={menuRef} className="fixed inset-0 z-[199]"
          style={{ background: "#060606", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 clamp(24px,8vw,80px)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "32px", marginBottom: "48px" }}>
            {[{ href: "/", label: "Home" }, ...links, { href: "/kontakt", label: "Kontakt" }].map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="m-link"
                style={{ fontSize: "clamp(2.5rem,8vw,5rem)", fontWeight: 900, letterSpacing: "-.04em",
                  textTransform: "uppercase", color: "rgba(255,255,255,.7)", textDecoration: "none", transition: "color .3s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#e7f8c8")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,.7)")}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
