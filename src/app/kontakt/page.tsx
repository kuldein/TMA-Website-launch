"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function KontaktPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "", service: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: connect to backend / email service
    setSent(true);
  };

  const services = ["Strategie & Beratung", "Creative & Design", "Content & Copy", "Performance Marketing", "Social Media", "Video & Produktion"];

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-0">
        <section className="px-6 md:px-12 py-24 max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-[#e7f8c8]" />
            <span className="text-[10px] tracking-[0.5em] uppercase text-[#e7f8c8]/70">Kontakt</span>
          </div>
          <h1 className="font-display text-[clamp(3rem,8vw,7rem)] text-white leading-tight mb-16">
            Lass uns<br />
            <span className="text-[#e7f8c8]">reden.</span>
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Form */}
            <div>
              {sent ? (
                <div className="border border-[#e7f8c8]/20 p-8">
                  <div className="w-8 h-px bg-[#e7f8c8] mb-6" />
                  <h2 className="text-2xl font-bold text-[#e7f8c8] mb-3">Nachricht erhalten!</h2>
                  <p className="text-white/50">
                    Wir melden uns innerhalb von 24 Stunden bei dir. Freuen uns auf das Gespräch.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] tracking-widest uppercase text-white/40 block mb-2">Name *</label>
                      <input
                        required
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full bg-transparent border border-white/10 text-white px-4 py-3 text-sm outline-none focus:border-[#e7f8c8]/50 placeholder:text-white/15 transition-colors"
                        placeholder="Max Mustermann"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] tracking-widest uppercase text-white/40 block mb-2">E-Mail *</label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full bg-transparent border border-white/10 text-white px-4 py-3 text-sm outline-none focus:border-[#e7f8c8]/50 placeholder:text-white/15 transition-colors"
                        placeholder="max@firma.de"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] tracking-widest uppercase text-white/40 block mb-2">Unternehmen</label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      className="w-full bg-transparent border border-white/10 text-white px-4 py-3 text-sm outline-none focus:border-[#e7f8c8]/50 placeholder:text-white/15 transition-colors"
                      placeholder="Firma GmbH"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] tracking-widest uppercase text-white/40 block mb-2">Leistung</label>
                    <select
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      className="w-full bg-[#0a0a0a] border border-white/10 text-white/60 px-4 py-3 text-sm outline-none focus:border-[#e7f8c8]/50 transition-colors"
                    >
                      <option value="">Leistung auswählen...</option>
                      {services.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] tracking-widest uppercase text-white/40 block mb-2">Nachricht *</label>
                    <textarea
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      rows={5}
                      className="w-full bg-transparent border border-white/10 text-white px-4 py-3 text-sm outline-none focus:border-[#e7f8c8]/50 placeholder:text-white/15 transition-colors resize-none"
                      placeholder="Erzähl uns von deinem Projekt..."
                    />
                  </div>
                  <button type="submit" className="btn-tma w-full justify-center">
                    Nachricht senden →
                  </button>
                </form>
              )}
            </div>

            {/* Info */}
            <div className="space-y-12">
              <div>
                <h2 className="text-xs tracking-widest uppercase text-[#e7f8c8]/60 mb-4">E-Mail</h2>
                <a href="mailto:hello@themodestyargument.de" className="text-white hover:text-[#e7f8c8] transition-colors">
                  hello@themodestyargument.de
                </a>
              </div>
              <div>
                <h2 className="text-xs tracking-widest uppercase text-[#e7f8c8]/60 mb-4">Website</h2>
                <a href="https://themodestyargument.de" target="_blank" rel="noreferrer" className="text-white hover:text-[#e7f8c8] transition-colors">
                  themodestyargument.de
                </a>
              </div>
              <div>
                <h2 className="text-xs tracking-widest uppercase text-[#e7f8c8]/60 mb-6">Leistungen</h2>
                <div className="space-y-2">
                  {services.map((s) => (
                    <div key={s} className="flex items-center gap-3 text-white/40 text-sm">
                      <span className="w-1 h-1 bg-[#e7f8c8]/40 rounded-full shrink-0" />
                      {s}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
