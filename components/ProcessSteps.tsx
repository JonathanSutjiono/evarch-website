import { processSteps } from "@/data/process";
import { SectionHeader } from "@/components/SectionHeader";

export function ProcessSteps() {
  return (
    <section className="process-section section-pad">
      <div className="site-container">
        <SectionHeader
          eyebrow="Process"
          title="A disciplined sequence from first conversation to coordinated documents."
          description="Each stage is framed to reduce ambiguity before design coordination begins."
        />

        <ol className="process-list">
          {processSteps.map((step, index) => (
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
