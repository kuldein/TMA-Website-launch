import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { clients, industries, projects } from "@/data";

export default function KundenPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-0">
        {/* Hero */}
        <section className="px-6 md:px-12 py-24 max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-[#e7f8c8]" />
            <span className="text-[10px] tracking-[0.5em] uppercase text-[#e7f8c8]/70">Kunden</span>
          </div>
          <h1 className="font-display text-[clamp(3rem,8vw,7rem)] text-white leading-tight mb-8">
            Marken, denen<br />
            <span className="text-[#e7f8c8]">wir vertrauen.</span>
          </h1>
          <p className="text-white/40 text-xl max-w-xl leading-relaxed">
            Wir arbeiten branchenübergreifend und bringen tiefgehende Expertise in ausgewählten Märkten mit.
          </p>
        </section>

        {/* Client logo grid */}
        <section className="px-6 md:px-12 py-16 border-t border-white/5">
          <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-px bg-white/5">
            {clients.map((client) => (
              <div
                key={client}
                className="bg-[#0a0a0a] aspect-square flex items-center justify-center p-6 hover:bg-[#111] transition-colors group"
              >
                {/* Logo placeholder */}
                <span className="text-[10px] tracking-widest uppercase text-center text-white/20 group-hover:text-[#e7f8c8]/60 transition-colors leading-relaxed">
                  {client}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Industries */}
        <section className="px-6 md:px-12 py-24 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#e7f8c8]" />
              <span className="text-[10px] tracking-[0.5em] uppercase text-[#e7f8c8]/70">Branchen</span>
            </div>
            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] text-white mb-12">
              Wo wir Expertise haben.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
              {industries.map((ind) => (
                <div key={ind.name} className="bg-[#0a0a0a] p-8 hover:bg-[#0d0d0d] transition-colors">
                  <h3 className="text-sm font-bold text-[#e7f8c8] mb-4">{ind.name}</h3>
                  <div className="flex flex-wrap gap-2">
                    {ind.clients.map((c) => (
                      <span key={c} className="text-[10px] tracking-widest text-white/30 border border-white/5 px-2 py-1">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial CTA */}
        <section className="px-6 md:px-12 py-24 border-t border-white/5 text-center">
          <div className="max-w-2xl mx-auto">
            <p className="font-display text-[clamp(1.5rem,4vw,3rem)] text-white mb-8 leading-tight">
              &quot;Wir entwickeln nicht nur Strategien — wir bauen Marken, die wachsen.&quot;
            </p>
            <div className="flex items-center justify-center gap-3">
              <div className="w-8 h-px bg-[#e7f8c8]/40" />
              <span className="text-[10px] tracking-widest uppercase text-white/30">The Modesty Argument</span>
              <div className="w-8 h-px bg-[#e7f8c8]/40" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
