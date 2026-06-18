import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://evarch.id"),
  title: {
    default: "EVARCH.ID | Architecture Studio",
    template: "%s | EVARCH.ID",
  },
  description:
    "EVARCH.ID is an architecture studio for residential, commercial, planning, consultation, and regulation-aware architectural design.",
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
    title: "EVARCH.ID | Architecture Studio",
    description:
      "Architecture with clarity, context, and compliance for residential and commercial projects.",
    url: "https://evarch.id",
    siteName: "EVARCH.ID",
    locale: "en_ID",
    type: "website",
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
      <body className="min-h-full">{children}</body>
    </html>
  );
}
