import { SectionHeader } from "@/components/SectionHeader";
import { fallbackContent, type ResolvedHomeContent } from "@/sanity/lib/fallback";

type StudioIntroProps = {
  content?: ResolvedHomeContent["about"];
};

export function StudioIntro({ content = fallbackContent.about }: StudioIntroProps) {
  return (
    <section id="studio" className="studio-section section-pad">
      <div className="site-container">
        <SectionHeader
          eyebrow="Studio"
          title={content.title}
          description={content.text}
        />

        <div className="studio-notes">
          {content.values.map((value, index) => (
            <article key={`${value.title}-${index}`}>
              <div className="studio-principle-meta">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <small>Design principle</small>
              </div>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </article>
          ))}
        </div>
        <div className="studio-capabilities">
          <p>Practice areas</p>
          <div className="studio-labels" aria-label="Studio service areas">
            <span>Residential</span>
            <span>Commercial</span>
            <span>Planning</span>
            <span>Documentation</span>
          </div>
        </div>
      </div>
    </section>
  );
}
