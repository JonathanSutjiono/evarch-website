import { projects } from "@/data/projects";
import { SectionHeader } from "@/components/SectionHeader";

export function WorksGrid() {
  return (
    <section id="works" className="section-pad">
      <div className="site-container">
        <SectionHeader
          eyebrow="Selected Works"
          title="Quiet architecture shaped by site, brief, and proportion."
          description="A static preview of EVARCH.ID project typologies, ready for real project imagery when the portfolio assets are available."
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
