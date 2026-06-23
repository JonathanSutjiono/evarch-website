import type { Metadata, Viewport } from "next";
import { isSanityConfigured } from "@/sanity/lib/client";
import { StudioClient } from "./StudioClient";

export const metadata: Metadata = {
  title: "EVARCH.ID Content Editor",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <main className="studio-setup-page">
        <div className="studio-setup-panel">
          <p>EVARCH.ID Content Editor</p>
          <h1>Konfigurasi Sanity diperlukan</h1>
          <span>
            Tambahkan NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET,
            dan NEXT_PUBLIC_SANITY_API_VERSION ke environment, lalu mulai ulang
            development server.
          </span>
        </div>
      </main>
    );
  }

  return <StudioClient />;
}
