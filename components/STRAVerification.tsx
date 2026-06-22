import Image from "next/image";
import { site } from "@/data/site";
import { SectionHeader } from "@/components/SectionHeader";
import { fallbackContent, type ResolvedHomeContent } from "@/sanity/lib/fallback";

function ShieldCheckIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="shield-icon">
      <path d="M12 3.2 18.5 6v5.1c0 4.1-2.6 7.7-6.5 9.1-3.9-1.4-6.5-5-6.5-9.1V6L12 3.2Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="button-icon">
      <path d="M12 3.4a8.5 8.5 0 0 0-7.3 12.8L3.8 20l3.9-1A8.5 8.5 0 1 0 12 3.4Z" />
      <path d="M9.3 8.2c-.2-.4-.4-.4-.6-.4h-.5c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.2.3 2 3.1 4.9 4.2 2.4.9 2.9.7 3.4.7.5 0 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.4l-1.8-.9c-.3-.1-.5-.2-.7.2-.2.3-.8.9-1 1.1-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.6c.2-.2.2-.3.3-.5.1-.2.1-.4 0-.6l-.7-1.7Z" />
    </svg>
  );
}

type STRAVerificationProps = {
  content?: ResolvedHomeContent["stra"];
  whatsappUrl?: string;
};

export function STRAVerification({
  content = fallbackContent.stra,
  whatsappUrl = site.whatsappUrl,
}: STRAVerificationProps) {
  return (
    <section id="stra" className="stra-section section-pad">
      <div className="site-container stra-grid">
        <SectionHeader
          eyebrow="Licensed Architect Verification"
          title={content.heading}
          description={content.description}
        />

        <div className="stra-panel">
          <div className="stra-badge">
            <ShieldCheckIcon />
            <div>
              <strong>Registered Architect Verification</strong>
              <span>
                {content.note}
              </span>
            </div>
          </div>
          <div className="stra-actions">
            <a
              className="button button-dark"
              href={content.verificationUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {content.buttonLabel}
            </a>
            <a
              className="button button-light"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon />
              Consult via WhatsApp
            </a>
          </div>
          <div className="stra-seal-wrap">
            <div className="stra-identity-row">
              <div
                className="stra-seal"
                aria-label="STRA Registered Architect Official Directory Verification"
              >
                <span>STRA</span>
                <strong>Registered Architect</strong>
                <small>{content.badgeText}</small>
              </div>
              <div className="dai-logo-card">
                <Image
                  src={content.daiLogoUrl}
                  alt="Dewan Arsitek Indonesia logo"
                  width={1024}
                  height={595}
                  sizes="(max-width: 600px) 70vw, 220px"
                  className="dai-logo-image"
                />
                <p>{content.note}</p>
              </div>
            </div>
          </div>
          <p className="stra-disclaimer">
            Directory access is provided for independent registration verification. No organizational affiliation is implied.
          </p>
        </div>
      </div>
    </section>
  );
}
