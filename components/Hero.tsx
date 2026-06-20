import Link from "next/link";
import { site } from "@/data/site";

export function Hero() {
  return (
    <section id="home" className="hero-section section-pad">
      <div className="site-container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">EVARCH.ID - Architecture Studio</p>
          <h1>
            <span>Architecture</span>
            <span>with clarity,</span>
            <span>context, and</span>
            <span>compliance.</span>
          </h1>
          <p className="hero-lede">{site.description}</p>
          <div className="hero-actions">
            <Link className="button button-dark" href="#works">
              View Works
            </Link>
            <a
              className="button button-light"
              href={site.straUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Verify STRA
            </a>
            <a
              className="button button-text"
              href={site.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Consult via WhatsApp
            </a>
          </div>
          <div className="hero-meta" aria-label="Studio services">
            <span>Jakarta, Indonesia</span>
            <span>Residential / Commercial</span>
            <span>Planning Consultation</span>
            <span>STRA Verification</span>
          </div>
        </div>

        <div className="hero-visual" aria-label="Architectural massing study">
          <div className="hero-plane hero-plane-a" />
          <div className="hero-plane hero-plane-b" />
          <div className="hero-plane hero-plane-c" />
          <div className="hero-visual-caption">Context / Plan / Compliance</div>
        </div>
      </div>
      <a className="hero-scroll-indicator" href="#works" aria-label="Scroll to selected works">
        <span>Scroll to explore</span>
      </a>
    </section>
  );
}
