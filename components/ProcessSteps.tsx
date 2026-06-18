import { processSteps } from "@/data/process";
import { SectionHeader } from "@/components/SectionHeader";

export function ProcessSteps() {
  return (
    <section className="section-pad">
      <div className="site-container">
        <SectionHeader
          eyebrow="Process"
          title="A disciplined sequence from first conversation to coordinated documents."
        />

        <ol className="process-list">
          {processSteps.map((step, index) => (
            <li key={step.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
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
