import { projects } from "@/data/projects";
import { SectionHeader } from "@/components/SectionHeader";

export function WorksGrid() {
  return (
    <section id="works" className="section-pad">
      <div className="site-container">
        <SectionHeader
          eyebrow="Selected Works"
          title="Selected Works"
          description="A portfolio-first preview of residential, commercial, and renovation work shaped through proportion, context, and clear architectural intent."
        />

        <div className="works-grid">
          {projects.map((project, index) => (
            <article className="project-card" key={project.title}>
              <div className={`project-image project-image-${(index % 3) + 1}`}>
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className="project-meta">
                <p>{project.category}</p>
                <p>{project.year}</p>
              </div>
              <h3>{project.title}</h3>
              <p className="project-location">{project.location}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
