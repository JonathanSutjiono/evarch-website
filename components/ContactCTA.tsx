import { site } from "@/data/site";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { fallbackContent, type ResolvedHomeContent } from "@/sanity/lib/fallback";

type ContactCTAProps = {
  content?: ResolvedHomeContent["contact"];
  verificationUrl?: string;
};

function safeMapEmbedUrl(value: string | null) {
  if (!value) return null;

  try {
    const url = new URL(value);
    const isGoogleHost = url.hostname === "www.google.com" || url.hostname === "maps.google.com";
    return url.protocol === "https:" && isGoogleHost && url.pathname.startsWith("/maps/embed")
      ? url.toString()
      : null;
  } catch {
    return null;
  }
}

export function ContactCTA({
  content = fallbackContent.contact,
  verificationUrl = site.straUrl,
}: ContactCTAProps) {
  const mapEmbedUrl = safeMapEmbedUrl(content.googleMapsEmbedUrl);

  return (
    <section id="contact" className="contact-section section-pad">
      <div className="site-container contact-grid">
        <div>
          <p className="eyebrow">Contact</p>
          <h2>{content.heading}</h2>
          <p className="contact-copy">{content.description}</p>
        </div>
        <div className="contact-panel">
          <div className="contact-actions">
            <a
              className="button button-dark button-whatsapp"
              href={content.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon />
              {content.whatsappButtonLabel}
            </a>
            <a
              className="button button-light"
              href={verificationUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Verify STRA Registration
            </a>
          </div>
          <div className="contact-credential">
            <div className="contact-credential-mark" aria-hidden="true">
              <span>STRA</span>
              <small>Registered</small>
            </div>
            <div className="contact-credential-copy">
              <p>Licensed Practice</p>
              <strong>Architect registration verification available</strong>
              <span>Official verification is completed through the Dewan Arsitek Indonesia directory.</span>
            </div>
            <a
              href={verificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open official STRA directory"
            >
              -&gt;
            </a>
          </div>
          <dl>
            <div>
              <dt>Location</dt>
              <dd>{content.address}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${content.email}`}>{content.email}</a>
              </dd>
            </div>
            <div>
              <dt>WhatsApp</dt>
              <dd>
                <a href={content.whatsappUrl} target="_blank" rel="noopener noreferrer">
                  Open WhatsApp consultation
                </a>
              </dd>
            </div>
          </dl>
          {content.googleMapsUrl ? (
            <a className="contact-map-link" href={content.googleMapsUrl} target="_blank" rel="noopener noreferrer">
              Open location in Google Maps
            </a>
          ) : null}
        </div>
      </div>
      {mapEmbedUrl ? (
        <div className="site-container contact-map">
          <iframe
            src={mapEmbedUrl}
            title="EVARCH.ID location map"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      ) : null}
    </section>
  );
}
