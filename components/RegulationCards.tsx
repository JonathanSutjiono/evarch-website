import { regulations } from "@/data/regulations";
import { SectionHeader } from "@/components/SectionHeader";

export function RegulationCards() {
  return (
    <section id="regulation" className="regulation-section section-pad">
      <div className="site-container">
        <SectionHeader
          eyebrow="Regulation"
          title="Regulation"
          description="Notes on architectural compliance, professional practice, and building preparation."
        />

        <div className="regulation-grid">
          {regulations.map((article, index) => (
            <article className="regulation-card" key={article.title}>
              <div className="article-meta">
                <span>{article.category}</span>
                <span>{article.date}</span>
                <span>{article.readTime}</span>
              </div>
              <div className="article-copy">
                <h3>{article.title}</h3>
                <p>{article.description}</p>
              </div>
              <span className="article-arrow" aria-hidden="true">-&gt;</span>
              <span className="article-number">{String(index + 1).padStart(2, "0")}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
