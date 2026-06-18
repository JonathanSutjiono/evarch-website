import { SectionHeader } from "@/components/SectionHeader";

export function StudioIntro() {
  return (
    <section id="studio" className="studio-section section-pad">
      <div className="site-container studio-grid">
        <SectionHeader
          eyebrow="Studio Profile"
          title="A measured studio for residential, commercial, and consultation work."
          description="EVARCH.ID approaches architecture as a balance between spatial clarity, client intent, site context, and the professional responsibilities behind every building."
        />

        <div className="studio-notes">
          <div>
            <span>01</span>
            <p>Design decisions are developed through proportion, material restraint, and practical coordination.</p>
          </div>
          <div>
            <span>02</span>
            <p>Each project begins with a clear brief, regulation awareness, and a realistic path from concept to documentation.</p>
          </div>
          <div>
            <span>03</span>
            <p>The studio supports clients who need credible design advice before committing to a build.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
