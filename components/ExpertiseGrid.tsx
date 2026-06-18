import { expertise } from "@/data/expertise";
import { SectionHeader } from "@/components/SectionHeader";

export function ExpertiseGrid() {
  return (
    <section id="expertise" className="section-pad">
      <div className="site-container">
        <SectionHeader
          eyebrow="Expertise"
          title="Architecture services with calm structure and clear deliverables."
          description="From private homes to commercial environments, EVARCH.ID helps define the right scope before the design becomes complex."
        />

        <div className="expertise-grid">
          {expertise.map((item) => (
            <article className="expertise-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
