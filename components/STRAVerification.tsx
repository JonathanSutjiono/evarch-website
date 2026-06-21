import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import { site } from "@/data/site";
import { SectionHeader } from "@/components/SectionHeader";

const clientLogoCandidates = [
  {
    file: "stra-logo.png",
    src: "/logo/stra-logo.png",
    alt: "Client-provided STRA logo",
  },
  {
    file: "iai-logo.png",
    src: "/logo/iai-logo.png",
    alt: "Client-provided IAI logo",
  },
];

function getClientProvidedLogo() {
  return clientLogoCandidates.find(({ file }) =>
    existsSync(join(process.cwd(), "public", "logo", file)),
  );
}

function ShieldCheckIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="shield-icon">
      <path d="M12 3.2 18.5 6v5.1c0 4.1-2.6 7.7-6.5 9.1-3.9-1.4-6.5-5-6.5-9.1V6L12 3.2Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function STRAVerification() {
  const clientLogo = getClientProvidedLogo();

  return (
    <section id="stra" className="stra-section section-pad">
      <div className="site-container stra-grid">
        <SectionHeader
          eyebrow="Licensed Architect Verification"
          title="STRA Verification"
          description="EVARCH.ID supports transparent and professional architectural practice. Clients may verify architect registration through the official Dewan Arsitek Indonesia STRA Directory."
        />

        <div className="stra-panel">
          <div className="stra-seal-wrap">
            {clientLogo ? (
              <div className="stra-client-logo">
                <Image
                  src={clientLogo.src}
                  alt={clientLogo.alt}
                  width={220}
                  height={220}
                  className="stra-logo-image"
                />
              </div>
            ) : (
              <div
                className="stra-seal"
                aria-label="STRA Registered Architect Official Directory Verification"
              >
                <span>STRA</span>
                <strong>Registered Architect</strong>
                <small>Official Directory Verification</small>
              </div>
            )}
          </div>
          <div className="stra-badge">
            <ShieldCheckIcon />
            <div>
              <strong>Licensed Architect Verification</strong>
              <span>
                Verification is performed through the official Dewan Arsitek Indonesia STRA Directory.
              </span>
            </div>
          </div>
          <p className="stra-disclaimer">
            Directory access is provided for independent registration verification. No organizational affiliation is implied.
          </p>
          <div className="stra-actions">
            <a
              className="button button-dark"
              href={site.straUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Verify STRA Registration
            </a>
            <a
              className="button button-light"
              href={site.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Consult via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
