import { SectionHeader } from "@/components/SectionHeader";

export function StudioIntro() {
  return (
    <section id="studio" className="studio-section section-pad">
      <div className="site-container studio-grid">
        <SectionHeader
          eyebrow="Studio"
          title="Studio"
          description="EVARCH.ID works across residential, commercial, and interior architecture with a focus on proportion, context, buildability, and compliance."
        />

        <div className="studio-notes">
          <div>
            <span>01</span>
            <h3>Contextual Design</h3>
            <p>Architecture shaped by site conditions, scale, climate, daily rhythm, and client priorities.</p>
          </div>
          <div>
            <span>02</span>
            <h3>Functional Planning</h3>
            <p>Plans are developed for clarity, comfort, circulation, efficiency, and long-term use.</p>
          </div>
          <div>
            <span>03</span>
            <h3>Professional Documentation</h3>
            <p>Design work is prepared with coordination, approvals, and responsible practice in mind.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
