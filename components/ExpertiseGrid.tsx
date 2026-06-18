import { expertise } from "@/data/expertise";
import { SectionHeader } from "@/components/SectionHeader";

export function ExpertiseGrid() {
  return (
    <section id="expertise" className="section-pad">
      <div className="site-container">
        <SectionHeader
          eyebrow="Expertise"
          title="Expertise"
          description="Refined architectural services organized as clear scopes, from early planning to design development and documentation."
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
