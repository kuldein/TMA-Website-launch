import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import NoiseOverlay from "@/components/NoiseOverlay";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "The Modesty Argument — Marketing Tech Agentur",
  description:
    "TMA ist eine Marketing-Tech-Agentur, die Strategie, Kreativität und datengetriebene Umsetzung verbindet, um Marken nachhaltig wachsen zu lassen.",
  keywords: [
    "Marketing Agentur",
    "The Modesty Argument",
    "TMA",
    "Digital Marketing",
    "Performance Marketing",
    "Social Media",
    "Website Entwicklung",
    "Branding",
  ],
  openGraph: {
    title: "The Modesty Argument — Marketing Tech Agentur",
    description:
      "Strategie, Kreativität und datengetriebene Umsetzung für nachhaltiges Markenwachstum.",
    type: "website",
    locale: "de_DE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#0a0a0a] text-[#f0f0f0]">
        <CustomCursor />
        <NoiseOverlay />
        {children}
      </body>
    </html>
  );
}
