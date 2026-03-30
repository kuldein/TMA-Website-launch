"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import TMALogo from "@/components/TMALogo";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/ueber-uns", label: "Über uns" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/kunden", label: "Kunden" },
  { href: "/game", label: "Game" },
  { href: "/blog", label: "Blog" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuRef.current) return;
    if (open) {
      gsap.fromTo(
        menuRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
      );
      gsap.fromTo(
        ".menu-link",
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.06, ease: "power3.out", delay: 0.1 }
      );
    }
  }, [open]);

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-[100] px-6 md:px-12 py-5 flex items-center justify-between transition-all duration-500 ${
          scrolled ? "bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5" : ""
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <TMALogo variant="light" height={28} className="opacity-80 group-hover:opacity-100 transition-opacity" />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-medium tracking-widest uppercase text-white/50 hover:text-[#e7f8c8] transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <Link
          href="/kontakt"
          className="hidden md:inline-flex btn-tma text-[11px]"
        >
          Projekt starten
        </Link>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Menü"
        >
          <span className={`block w-6 h-px bg-[#e7f8c8] transition-all duration-300 ${open ? "rotate-45 translate-y-2.5" : ""}`} />
          <span className={`block w-6 h-px bg-[#e7f8c8] transition-all duration-300 ${open ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-px bg-[#e7f8c8] transition-all duration-300 ${open ? "-rotate-45 -translate-y-2.5" : ""}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          ref={menuRef}
          className="fixed inset-0 z-[99] bg-[#0a0a0a] flex flex-col justify-center px-10"
        >
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="menu-link text-4xl font-black uppercase tracking-tight text-white/80 hover:text-[#e7f8c8] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <Link
            href="/kontakt"
            onClick={() => setOpen(false)}
            className="menu-link btn-tma mt-12 self-start"
          >
            Projekt starten
          </Link>
        </div>
      )}
    </>
  );
}
