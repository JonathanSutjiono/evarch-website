import { expertise } from "@/data/expertise";
import { SectionHeader } from "@/components/SectionHeader";
import { fallbackContent, type ResolvedHomeContent } from "@/sanity/lib/fallback";

type ExpertiseGridProps = {
  items?: ResolvedHomeContent["expertise"];
  title?: string;
  subtitle?: string;
};

export function ExpertiseGrid({
  items = expertise,
  title = fallbackContent.homepage.expertiseTitle,
  subtitle = fallbackContent.homepage.expertiseSubtitle,
}: ExpertiseGridProps) {
  if (!items.length) {
    return null;
  }

  return (
    <section id="expertise" className="section-pad">
      <div className="site-container">
        <SectionHeader
          eyebrow="Expertise"
          title={title}
          description={subtitle}
        />

        <div className="expertise-grid">
          {items.map((item, index) => (
            <article className="expertise-card" key={item.title}>
              <span className="expertise-index">{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
