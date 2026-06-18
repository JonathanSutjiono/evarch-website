import { site } from "@/data/site";

export function ContactCTA() {
  return (
    <section id="contact" className="contact-section section-pad">
      <div className="site-container contact-grid">
        <div>
          <p className="eyebrow">Contact</p>
          <h2>Start with a clear architectural brief.</h2>
        </div>
        <div className="contact-panel">
          <div className="contact-actions">
            <a
              className="button button-dark"
              href={site.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Consult via WhatsApp
            </a>
            <a
              className="button button-light"
              href={site.straUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Verify STRA
            </a>
          </div>
          <dl>
            <div>
              <dt>Location</dt>
              <dd>{site.location}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </dd>
            </div>
            <div>
              <dt>WhatsApp</dt>
              <dd>https://wa.me/62XXXXXXXXXXX</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
