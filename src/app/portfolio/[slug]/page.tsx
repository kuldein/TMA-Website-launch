import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { projects } from "@/data";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-0">
        <section className="px-6 md:px-12 py-24 max-w-5xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-3 mb-12 text-[10px] tracking-widest uppercase text-white/30">
            <Link href="/portfolio" className="hover:text-[#e7f8c8] transition-colors">
              Portfolio
            </Link>
            <span>/</span>
            <span className="text-white/60">{project.title}</span>
          </div>

          {/* Meta */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#e7f8c8]" />
            <span className="text-[10px] tracking-[0.5em] uppercase text-[#e7f8c8]/70">
              {project.category}
            </span>
          </div>

          <h1 className="font-display text-[clamp(2.5rem,7vw,6rem)] text-white leading-tight mb-6">
            {project.title}
          </h1>
          <p className="text-white/50 text-xl mb-16 max-w-2xl leading-relaxed">
            {project.subtitle}
          </p>

          {/* Image placeholder */}
          <div className="w-full aspect-video bg-[#111] border border-white/5 mb-16 flex items-center justify-center">
            <span className="text-white/10 text-sm tracking-widest uppercase">
              {project.title} — Bild folgt
            </span>
          </div>

          {/* Description */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
            <div>
              <h2 className="text-xs tracking-widest uppercase text-[#e7f8c8]/60 mb-4">Projekt</h2>
              <p className="text-white/60 leading-relaxed">{project.description}</p>
            </div>
            <div>
              <h2 className="text-xs tracking-widest uppercase text-[#e7f8c8]/60 mb-4">Ergebnisse</h2>
              <ul className="space-y-3">
                {project.results.map((r) => (
                  <li key={r} className="flex items-center gap-3 text-white/60">
                    <span className="w-1 h-1 bg-[#e7f8c8] rounded-full shrink-0" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tags + year */}
          <div className="flex flex-wrap items-center gap-4 pt-8 border-t border-white/5">
            <span className="text-xs text-white/20 tracking-widest">{project.year}</span>
            {project.tags.map((tag) => (
              <span key={tag} className="text-[9px] tracking-widest uppercase text-white/30 border border-white/10 px-3 py-1.5">
                {tag}
              </span>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-16 pt-8 border-t border-white/5">
            <Link href="/portfolio" className="text-[11px] tracking-widest uppercase text-white/30 hover:text-[#e7f8c8] transition-colors flex items-center gap-2">
              <span>←</span> Alle Projekte
            </Link>
            <Link href="/kontakt" className="btn-tma text-[11px]">
              Projekt starten
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
