import { site } from "@/data/site";

export function ContactCTA() {
  return (
    <section id="contact" className="contact-section section-pad">
      <div className="site-container contact-grid">
        <div>
          <p className="eyebrow">Contact</p>
          <h2>Start with a clear brief and a professional design conversation.</h2>
        </div>
        <div className="contact-panel">
          <a
            className="button button-dark"
            href={site.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Consult via WhatsApp
          </a>
          <dl>
            <div>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>{site.location}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
