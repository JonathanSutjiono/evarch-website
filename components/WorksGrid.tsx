"use client";

import { SectionHeader } from "@/components/SectionHeader";
import Image from "next/image";
import { useRef } from "react";
import { fallbackContent, type ResolvedHomeContent } from "@/sanity/lib/fallback";

type WorksGridProps = {
  projects?: ResolvedHomeContent["projects"];
  title?: string;
  subtitle?: string;
};

export function WorksGrid({
  projects = fallbackContent.projects,
  title = fallbackContent.homepage.selectedWorksTitle,
  subtitle = fallbackContent.homepage.selectedWorksSubtitle,
}: WorksGridProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  if (!projects.length) {
    return null;
  }

  function scrollWorks(direction: "previous" | "next") {
    const scroller = scrollerRef.current;

    if (!scroller) {
      return;
    }

    const distance = scroller.clientWidth * 0.86;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    scroller.scrollBy({
      left: direction === "next" ? distance : -distance,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }

  return (
    <section id="works" className="works-section section-pad">
      <div className="site-container">
        <div className="works-kicker" aria-hidden="true">
          <span>Selected Works</span>
          <span>Residential / Commercial / Interior Architecture</span>
        </div>

        <SectionHeader
          eyebrow="Selected Works"
          title={title}
          description={subtitle}
        />
      </div>

      <div className="works-showcase" aria-label="Selected works project carousel">
        <div className="works-showcase-top site-container">
          <p>Scroll / Drag to explore works</p>
          <div className="works-controls" aria-label="Project navigation controls">
            <button type="button" onClick={() => scrollWorks("previous")} aria-label="Previous project">
              Prev
            </button>
            <button type="button" onClick={() => scrollWorks("next")} aria-label="Next project">
              Next
            </button>
          </div>
        </div>

        <div className="works-track" ref={scrollerRef}>
          {projects.map((project, index) => (
            <article className="project-card" key={project.title}>
              <div className={`project-image project-image-${index + 1}`}>
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
                    fill
                    sizes="(max-width: 1302px) 86vw, 1120px"
                    className="project-photo"
                    quality={80}
                  />
                ) : null}
                <span>
                  {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                </span>
              </div>
              <div className="project-content">
                <div>
                  <h3>{project.title}</h3>
                  {project.location ? <p className="project-location">{project.location}</p> : null}
                </div>
                <div className="project-info">
                  <div className="project-meta">
                    {project.category ? <p>{project.category}</p> : null}
                    {project.year ? <p>{project.year}</p> : null}
                  </div>
                  <div className="project-detail">
                    {project.scope ? <p><span>Scope</span>{project.scope}</p> : null}
                    {project.status ? <p><span>Status</span>{project.status}</p> : null}
                  </div>
                  <a className="project-link" href="#contact" aria-label={`Discuss ${project.title}`}>
                    View Project
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
