"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

type FloatingWhatsAppProps = { whatsappUrl?: string };

export function FloatingWhatsApp({ whatsappUrl = site.whatsappUrl }: FloatingWhatsAppProps) {
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [isCompactViewport, setIsCompactViewport] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("home");
    const compactViewport = window.matchMedia("(max-width: 860px)");
    const updateViewport = () => setIsCompactViewport(compactViewport.matches);

    updateViewport();
    compactViewport.addEventListener("change", updateViewport);

    if (!hero) {
      return () => compactViewport.removeEventListener("change", updateViewport);
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsHeroVisible(entry.isIntersecting),
      { threshold: 0.12 },
    );

    observer.observe(hero);

    return () => {
      compactViewport.removeEventListener("change", updateViewport);
      observer.disconnect();
    };
  }, []);

  const hideDuringHero = isCompactViewport && isHeroVisible;

  return (
    <a
      className={`floating-whatsapp${hideDuringHero ? " is-hidden-during-hero" : ""}`}
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Consult via WhatsApp"
      aria-hidden={hideDuringHero || undefined}
      tabIndex={hideDuringHero ? -1 : undefined}
    >
      <WhatsAppIcon className="whatsapp-icon-floating" />
    </a>
  );
}
