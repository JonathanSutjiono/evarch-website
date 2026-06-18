import { site } from "@/data/site";
import { SectionHeader } from "@/components/SectionHeader";

function ShieldCheckIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="shield-icon">
      <path d="M12 3.2 18.5 6v5.1c0 4.1-2.6 7.7-6.5 9.1-3.9-1.4-6.5-5-6.5-9.1V6L12 3.2Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function STRAVerification() {
  return (
    <section id="stra" className="stra-section section-pad">
      <div className="site-container stra-grid">
        <SectionHeader
          eyebrow="Licensed Architect Verification"
          title="Transparent professional practice starts with verifiable registration."
          description="EVARCH.ID supports transparent and professional architectural practice. Clients may verify architect registration through the official Dewan Arsitek Indonesia STRA Directory."
        />

        <div className="stra-panel">
          <div className="stra-badge">
            <ShieldCheckIcon />
            <div>
              <strong>STRA Registered Architect</strong>
              <span>Verification available through Dewan Arsitek Indonesia</span>
            </div>
          </div>
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
