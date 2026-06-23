import Link from "next/link";
import Image from "next/image";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { site } from "@/data/site";
import { fallbackContent, type ResolvedHomeContent } from "@/sanity/lib/fallback";

type HeroProps = {
  content?: ResolvedHomeContent["homepage"];
  whatsappUrl?: string;
  hasWorks?: boolean;
};

export function Hero({
  content = fallbackContent.homepage,
  whatsappUrl = site.whatsappUrl,
  hasWorks = true,
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
        quality={82}
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
            {hasWorks || content.primaryButtonLink !== "#works" ? (
              <Link className="button button-dark" href={content.primaryButtonLink}>
                {content.primaryButtonLabel}
              </Link>
            ) : null}
            <a
              className="button button-light"
              href={content.secondaryButtonLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {content.secondaryButtonLabel}
            </a>
            <a
              className="button button-text button-whatsapp"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon />
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
      <a className="hero-scroll-indicator" href="#studio" aria-label="Scroll to studio">
        <span>Scroll to explore</span>
      </a>
    </section>
  );
}
