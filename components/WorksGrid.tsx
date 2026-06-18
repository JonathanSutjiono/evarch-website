"use client";

import { projects } from "@/data/projects";
import { SectionHeader } from "@/components/SectionHeader";
import Image from "next/image";
import { useRef } from "react";

export function WorksGrid() {
  const scrollerRef = useRef<HTMLDivElement>(null);

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
          title="Selected Works"
          description="A portfolio-first preview of residential, commercial, and renovation work shaped through proportion, context, and clear architectural intent."
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
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  fill
                  sizes="(max-width: 860px) 86vw, 86vw"
                  className="project-photo"
                  priority={index === 0}
                />
                <span>
                  {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                </span>
                <div className="project-image-caption" aria-hidden="true">
                  Temporary preview image
                </div>
              </div>
              <div className="project-content">
                <div>
                  <h3>{project.title}</h3>
                  <p className="project-location">{project.location}</p>
                </div>
                <div className="project-info">
                  <div className="project-meta">
                    <p>{project.category}</p>
                    <p>{project.year}</p>
                  </div>
                  <div className="project-detail">
                    <p>
                      <span>Scope</span>
                      {project.scope}
                    </p>
                    <p>
                      <span>Status</span>
                      {project.status}
                    </p>
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
