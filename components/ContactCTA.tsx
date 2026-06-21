import { site } from "@/data/site";

export function ContactCTA() {
  return (
    <section id="contact" className="contact-section section-pad">
      <div className="site-container contact-grid">
        <div>
          <p className="eyebrow">Contact</p>
          <h2>Start with a clear architectural brief.</h2>
          <p className="contact-copy">
            Discuss your site, brief, and project direction with EVARCH.ID before moving into design development.
          </p>
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
              href={site.straUrl}
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
              <dd>
                <a href={site.whatsappUrl} target="_blank" rel="noopener noreferrer">
                  Open WhatsApp consultation
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
