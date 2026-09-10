import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import SmoothScroll from "@/components/site/SmoothScroll";
import TransitionProvider from "@/components/site/TransitionProvider";
import Cursor from "@/components/site/Cursor";
import { site } from "@/lib/content";

const switzer = localFont({
  src: [
    { path: "../fonts/Switzer-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/Switzer-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/Switzer-Semibold.woff2", weight: "600", style: "normal" },
    { path: "../fonts/Switzer-Extrabold.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-switzer",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Motion The Agency | Motion graphics, animation and design agency",
    template: "%s | Motion The Agency",
  },
  description:
    "Specialist motion graphics and design agency. Video, 2D and 3D animation, sizzle reels and UI design for tech and SaaS brands, with a free sample to start.",
  // Redesign preview: keep it out of search so it never competes with motiontheagency.com.
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    siteName: "Motion The Agency",
    title: "Motion The Agency | Redesign preview",
    description: "Home, Services and Sizzle Reel pages, rebuilt with a custom-coded stack.",
  },
};

export const viewport: Viewport = {
  themeColor: "#080610",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={switzer.variable}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-void"
          style={{ zIndex: "var(--z-loader)" }}
        >
          Skip to content
        </a>
        <SmoothScroll />
        <TransitionProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </TransitionProvider>
        <Cursor />
      </body>
    </html>
  );
}
