import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/site";
import { fallbackContent, type ResolvedHomeContent } from "@/sanity/lib/fallback";

type HeroProps = {
  content?: ResolvedHomeContent["homepage"];
  whatsappUrl?: string;
};

export function Hero({
  content = fallbackContent.homepage,
  whatsappUrl = site.whatsappUrl,
}: HeroProps) {
  const titleLines = content.heroTitle.split("\n").filter(Boolean);

  return (
    <section id="home" className="hero-section section-pad">
      <Image
        src={content.heroImageUrl}
        alt={content.heroImageAlt}
        fill
        sizes="100vw"
        className="hero-background-image"
        priority
      />
      <div className="hero-background-overlay" aria-hidden="true" />
      <div className="hero-background-grid" aria-hidden="true" />

      <div className="site-container hero-content">
        <div className="hero-copy">
          <p className="eyebrow">{content.heroEyebrow}</p>
          <h1>
            {titleLines.map((line) => <span key={line}>{line}</span>)}
          </h1>
          <p className="hero-lede">{content.heroSubtitle}</p>
          <div className="hero-actions">
            <Link className="button button-dark" href={content.primaryButtonLink}>
              {content.primaryButtonLabel}
            </Link>
            <a
              className="button button-light"
              href={content.secondaryButtonLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {content.secondaryButtonLabel}
            </a>
            <a
              className="button button-text"
              href={whatsappUrl}
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
