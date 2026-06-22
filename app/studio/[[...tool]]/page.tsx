import type { Metadata, Viewport } from "next";
import { isSanityConfigured } from "@/sanity/lib/client";
import { StudioClient } from "./StudioClient";

export const metadata: Metadata = {
  title: "EVARCH.ID CMS",
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
          <p>EVARCH.ID CMS</p>
          <h1>Sanity configuration required</h1>
          <span>
            Add NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, and
            NEXT_PUBLIC_SANITY_API_VERSION to your environment, then restart the development server.
          </span>
        </div>
      </main>
    );
  }

  return <StudioClient />;
}
