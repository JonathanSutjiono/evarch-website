import { SectionHeader } from "@/components/SectionHeader";
import { fallbackContent, type ResolvedHomeContent } from "@/sanity/lib/fallback";

type ProcessStepsProps = {
  content?: ResolvedHomeContent["process"];
};

export function ProcessSteps({
  content = fallbackContent.process,
}: ProcessStepsProps) {
  if (!content.steps.length) {
    return null;
  }

  return (
    <section className="process-section section-pad">
      <div className="site-container">
        <SectionHeader
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
        />

        <ol className="process-list">
          {content.steps.map((step, index) => (
            <li key={step.title}>
              <div className="process-index">
                <small>Stage</small>
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
