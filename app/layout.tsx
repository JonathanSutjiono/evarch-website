import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Geist, Geist_Mono } from "next/font/google";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const enableVercelInsights =
  process.env.VERCEL === "1" || process.env.NEXT_PUBLIC_ENABLE_VERCEL_INSIGHTS === "true";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "EVARCH.ID - Architecture Studio & STRA-Verified Architect",
    template: "%s | EVARCH.ID",
  },
  description:
    "EVARCH.ID is an architecture studio for residential and commercial design, planning consultation, and regulation-aware architectural practice in Indonesia.",
  keywords: [
    "EVARCH.ID",
    "architecture studio Jakarta",
    "residential architecture",
    "commercial architecture",
    "STRA architect",
    "architecture consultation",
  ],
  authors: [{ name: "EVARCH.ID" }],
  openGraph: {
    title: "EVARCH.ID - Architecture Studio & STRA-Verified Architect",
    description:
      "Residential and commercial architecture, planning consultation, and regulation-aware architectural practice in Indonesia.",
    url: siteUrl,
    siteName: "EVARCH.ID",
    locale: "en_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EVARCH.ID - Architecture Studio & STRA-Verified Architect",
    description:
      "Residential and commercial architecture, planning consultation, and regulation-aware architectural practice in Indonesia.",
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        {children}
        {enableVercelInsights ? (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        ) : null}
      </body>
    </html>
  );
}
