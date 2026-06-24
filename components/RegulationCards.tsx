import { regulations } from "@/data/regulations";
import { SectionHeader } from "@/components/SectionHeader";
import type { ResolvedHomeContent } from "@/sanity/lib/fallback";

type RegulationCardsProps = {
  items?: ResolvedHomeContent["regulations"];
};

export function RegulationCards({ items = regulations }: RegulationCardsProps) {
  if (!items.length) {
    return null;
  }

  return (
    <section id="regulation" className="regulation-section section-pad">
      <div className="site-container">
        <SectionHeader
          eyebrow="Regulation"
          title="Regulation"
          description="Notes on architectural compliance, professional practice, and building preparation."
        />

        <div className="regulation-grid">
          {items.map((article, index) => (
            <article className="regulation-card" key={article.title}>
              <div className="article-meta">
                {article.category ? <span>{article.category}</span> : null}
                {article.date ? <span>{article.date}</span> : null}
                {article.readTime ? <span>{article.readTime}</span> : null}
              </div>
              <div className="article-copy">
                <h3>{article.title}</h3>
                {article.description ? <p>{article.description}</p> : null}
              </div>
              <span className="article-number">{String(index + 1).padStart(2, "0")}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
