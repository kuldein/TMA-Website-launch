import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BlogPostPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-0">
        <section className="px-6 md:px-12 py-24 max-w-3xl mx-auto">
          <Link href="/blog" className="text-[10px] tracking-widest uppercase text-white/30 hover:text-[#e7f8c8] transition-colors flex items-center gap-2 mb-12">
            <span>←</span> Alle Artikel
          </Link>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-[#e7f8c8]" />
            <span className="text-[10px] tracking-widest uppercase text-[#e7f8c8]/70">Blog</span>
          </div>
          <p className="text-white/40 text-center mt-24">
            Dieser Artikel wird über das Admin-Panel (Sanity CMS) gepflegt.<br />
            <span className="text-[#e7f8c8]/50">Content folgt nach CMS-Setup.</span>
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
