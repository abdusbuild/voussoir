import type { Metadata } from "next";
import { Crimson_Pro, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RevealObserver from "@/components/RevealObserver";
import { site } from "@/config/site";

// Serif — headings and body copy; italic only for occasional emphasis.
// Crimson Pro at light weight as a free stand-in for Plantin Light (the
// licensed serif used on heatherwick.com). Variable, so the full axis loads.
const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-serif",
});

// Sans — nav, buttons, form controls and labels. Variable.
const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

// Runs before paint: turns on the scroll-reveal CSS only when it can work
// (see RevealObserver). Without JS the class is never added, so every
// element stays visible.
const revealInitScript = `try{if("IntersectionObserver"in window&&!matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.classList.add("js-reveal")}catch(e){}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: {
    template: `%s | ${site.name}`,
    default: `${site.name} | Architecture & Interior Design, Noida`,
  },
  description:
    "Architecture and interior design practice in Noida, creating considered spaces through form, material and detail. Built on balance. Defined by intent.",
  applicationName: site.name,
  // Stop mobile Safari auto-linking phone numbers; the real ones are explicit links.
  formatDetection: { telephone: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-IN"
      className={`${crimsonPro.variable} ${hankenGrotesk.variable}`}
      // The inline script adds `js-reveal` to this element before hydration.
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: revealInitScript }} />
      </head>
      <body className="font-serif antialiased">
        <RevealObserver />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
