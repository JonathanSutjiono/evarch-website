import Link from "next/link";
import { site } from "@/data/site";

export function Hero() {
  return (
    <section id="home" className="hero-section section-pad">
      <div className="site-container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Architecture Studio / Jakarta</p>
          <h1>{site.headline}</h1>
          <p className="hero-lede">{site.description}</p>
          <div className="hero-actions">
            <Link className="button button-dark" href="#works">
              View Works
            </Link>
            <a
              className="button button-light"
              href={site.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Consult via WhatsApp
            </a>
          </div>
          <a
            className="trust-link"
            href={site.straUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Verify STRA Registration
          </a>
        </div>

        <div className="hero-visual" aria-label="Architectural massing study">
          <div className="hero-plane hero-plane-a" />
          <div className="hero-plane hero-plane-b" />
          <div className="hero-plane hero-plane-c" />
          <div className="hero-visual-caption">
            <span>Residential</span>
            <span>Commercial</span>
            <span>Planning</span>
          </div>
        </div>
      </div>
    </section>
  );
}
