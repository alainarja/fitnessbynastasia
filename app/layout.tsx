import type { Metadata, Viewport } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/components/SiteChrome";
import { LocaleProvider } from "@/components/LocaleProvider";
import { Analytics } from "@/components/Analytics";
import { site } from "@/content/site";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  variable: "--font-playfair",
});

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.baseUrl),
  title: {
    default: "Fitness by Nastasia | Strength and health coaching for women",
    template: "%s | Fitness by Nastasia",
  },
  description:
    "Online and in person coaching for women who want to move without pain, get stronger, and feel good. Health first, never restriction. Get the free guide.",
  applicationName: site.brandName,
  authors: [{ name: "Nastasia" }],
  keywords: [
    "online fitness coach for women",
    "strength coaching",
    "personal trainer Lebanon",
    "women's strength training",
    "health first coaching",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.brandName,
    title: "Fitness by Nastasia | Strength and health coaching for women",
    description:
      "Online and in person coaching for women. Get stronger, fuel your training, and feel good in your body.",
    url: site.baseUrl,
    locale: "en_US",
    // og:image is auto-generated from app/opengraph-image.tsx
  },
  twitter: {
    card: "summary_large_image",
    title: "Fitness by Nastasia",
    description: "Strength and health coaching for women. Health first, never restriction.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f1e8d9",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning className={`${playfair.variable} ${manrope.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <LocaleProvider>
          <SiteChrome>{children}</SiteChrome>
        </LocaleProvider>
        <div className="grain-overlay" aria-hidden />
        <Analytics />
      </body>
    </html>
  );
}
