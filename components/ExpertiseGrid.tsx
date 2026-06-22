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
  return (
    <section id="expertise" className="section-pad">
      <div className="site-container">
        <SectionHeader
          eyebrow="Expertise"
          title={title}
          description={subtitle}
        />

        <div className="expertise-grid">
          {items.map((item) => (
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
