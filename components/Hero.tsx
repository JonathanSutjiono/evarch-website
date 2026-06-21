import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/site";

export function Hero() {
  return (
    <section id="home" className="hero-section section-pad">
      <Image
        src={site.heroImage}
        alt={site.heroImageAlt}
        fill
        sizes="100vw"
        className="hero-background-image"
        priority
      />
      <div className="hero-background-overlay" aria-hidden="true" />
      <div className="hero-background-grid" aria-hidden="true" />

      <div className="site-container hero-content">
        <div className="hero-copy">
          <p className="eyebrow">EVARCH.ID - Architecture Studio</p>
          <h1>
            <span>Architecture with clarity,</span>
            <span>context, and compliance.</span>
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
      </div>
      <a className="hero-scroll-indicator" href="#works" aria-label="Scroll to selected works">
        <span>Scroll to explore</span>
      </a>
    </section>
  );
}
