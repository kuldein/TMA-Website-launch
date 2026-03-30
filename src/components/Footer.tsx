import Link from "next/link";
import TMALogo from "@/components/TMALogo";

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,.05)", padding: "clamp(48px,8vw,96px) clamp(24px,5vw,80px) 40px" }}>
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
          <div style={{ maxWidth: "320px" }}>
            <TMALogo variant="light" height={24} />
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,.3)", marginTop: "20px", lineHeight: 1.8 }}>
              Marketing-Tech-Agentur für nachhaltiges Markenwachstum. Strategie, Kreativität, Performance.
            </p>
          </div>
          <div className="flex flex-wrap gap-12">
            {[
              { title: "Agentur", links: [["Über uns", "/ueber-uns"], ["Portfolio", "/portfolio"], ["Kunden", "/kunden"]] },
              { title: "Services", links: [["Blog", "/blog"], ["Game", "/game"], ["Kontakt", "/kontakt"]] },
            ].map((col) => (
              <div key={col.title}>
                <div className="label mb-5">{col.title}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  {col.links.map(([label, href]) => (
                    <Link key={href} href={href}
                      style={{ fontSize: "13px", color: "rgba(255,255,255,.35)", textDecoration: "none", transition: "color .3s" }}
                      className="hover:text-[#e7f8c8]">{label}</Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,.05)", paddingTop: "24px", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "12px" }}>
          <span style={{ fontSize: "11px", color: "rgba(255,255,255,.2)", letterSpacing: ".08em" }}>
            © {new Date().getFullYear()} The Modesty Argument
          </span>
          <div style={{ display: "flex", gap: "24px" }}>
            {[["Impressum", "/impressum"], ["Datenschutz", "/datenschutz"]].map(([l, h]) => (
              <Link key={h} href={h} style={{ fontSize: "11px", color: "rgba(255,255,255,.2)", textDecoration: "none", letterSpacing: ".08em", transition: "color .3s" }}
                className="hover:text-white/50">{l}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
