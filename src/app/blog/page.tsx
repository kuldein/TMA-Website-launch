import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Placeholder posts — will come from Sanity CMS later
const posts = [
  {
    slug: "digitale-praesenz-2025",
    title: "Digitale Präsenz 2025: Was Marken jetzt wissen müssen",
    excerpt: "Der digitale Markt verändert sich schneller als je zuvor. Wir zeigen, worauf es 2025 ankommt.",
    date: "2025-01-15",
    category: "Strategie",
    readTime: "5 min",
  },
  {
    slug: "performance-marketing-basics",
    title: "Performance Marketing: Von null auf messbare Ergebnisse",
    excerpt: "Wie datengetriebene Kampagnen Reichweite in echte Ergebnisse verwandeln.",
    date: "2025-02-01",
    category: "Performance",
    readTime: "7 min",
  },
  {
    slug: "social-media-community",
    title: "Community-Aufbau: Warum Follower allein nicht reichen",
    excerpt: "Eine starke Community ist mehr als Zahlen. Wir erklären, wie du echte Bindungen schaffst.",
    date: "2025-02-20",
    category: "Social Media",
    readTime: "4 min",
  },
];

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-0">
        <section className="px-6 md:px-12 py-24 max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-[#e7f8c8]" />
            <span className="text-[10px] tracking-[0.5em] uppercase text-[#e7f8c8]/70">Blog</span>
          </div>
          <h1 className="font-display text-[clamp(3rem,8vw,7rem)] text-white leading-tight mb-16">
            Insights &<br />
            <span className="text-[#e7f8c8]">Perspektiven.</span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-[#0a0a0a] p-8 hover:bg-[#0d0d0d] transition-colors duration-500 relative overflow-hidden"
              >
                {/* Placeholder image */}
                <div className="w-full aspect-video bg-[#111] border border-white/5 mb-6 flex items-center justify-center group-hover:border-[#e7f8c8]/20 transition-colors">
                  <span className="text-white/10 text-[10px] tracking-widest uppercase">{post.category}</span>
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10px] tracking-widest uppercase text-[#e7f8c8]/50">{post.category}</span>
                  <span className="text-white/20">·</span>
                  <span className="text-[10px] text-white/30">{post.readTime}</span>
                </div>
                <h2 className="text-lg font-bold text-white mb-3 group-hover:text-[#e7f8c8] transition-colors leading-snug">
                  {post.title}
                </h2>
                <p className="text-sm text-white/40 leading-relaxed mb-6">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-white/20 tracking-widest">
                    {new Date(post.date).toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" })}
                  </span>
                  <span className="text-[#e7f8c8] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-px bg-[#e7f8c8] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
