import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/5 px-6 md:px-12 py-12 mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 border border-[#e7f8c8] flex items-center justify-center">
                <span className="text-[#e7f8c8] text-xs font-black">TMA</span>
              </div>
              <span className="text-xs font-semibold tracking-widest uppercase text-white/50">
                The Modesty Argument
              </span>
            </div>
            <p className="text-xs text-white/30 max-w-xs">
              Marketing-Tech-Agentur für nachhaltige Markenwachstum. Strategie, Kreativität, Performance.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row gap-8 text-xs tracking-widest uppercase">
            <div className="flex flex-col gap-3 text-white/40">
              <Link href="/ueber-uns" className="hover:text-[#e7f8c8] transition-colors">Über uns</Link>
              <Link href="/portfolio" className="hover:text-[#e7f8c8] transition-colors">Portfolio</Link>
              <Link href="/kunden" className="hover:text-[#e7f8c8] transition-colors">Kunden</Link>
            </div>
            <div className="flex flex-col gap-3 text-white/40">
              <Link href="/blog" className="hover:text-[#e7f8c8] transition-colors">Blog</Link>
              <Link href="/game" className="hover:text-[#e7f8c8] transition-colors">Game</Link>
              <Link href="/kontakt" className="hover:text-[#e7f8c8] transition-colors">Kontakt</Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-white/20 tracking-widest uppercase">
          <span>© {year} The Modesty Argument. Alle Rechte vorbehalten.</span>
          <div className="flex gap-6">
            <Link href="/impressum" className="hover:text-white/50 transition-colors">Impressum</Link>
            <Link href="/datenschutz" className="hover:text-white/50 transition-colors">Datenschutz</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
