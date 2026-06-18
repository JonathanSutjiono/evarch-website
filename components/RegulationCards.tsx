import { regulations } from "@/data/regulations";
import { SectionHeader } from "@/components/SectionHeader";

export function RegulationCards() {
  return (
    <section id="regulation" className="regulation-section section-pad">
      <div className="site-container">
        <SectionHeader
          eyebrow="Regulation"
          title="Useful notes for clients before design and construction decisions."
          description="Short static primers that frame architectural service, building approval, and project role expectations."
        />

        <div className="regulation-grid">
          {regulations.map((article, index) => (
            <article className="regulation-card" key={article.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{article.title}</h3>
              <p>{article.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
