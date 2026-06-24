"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { navigation, site } from "@/data/site";
import { normalizeAnchorHref } from "@/lib/site";

type NavbarProps = {
  companyName?: string;
  logoUrl?: string | null;
  logoMarkUrl?: string | null;
  whatsappUrl?: string;
  hiddenAnchors?: string[];
};

export function Navbar({
  companyName = site.name,
  logoUrl = null,
  logoMarkUrl = null,
  whatsappUrl = site.whatsappUrl,
  hiddenAnchors = [],
}: NavbarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeAnchor, setActiveAnchor] = useState("#home");
  const visibleNavigation = useMemo(
    () => navigation.filter((item) => !hiddenAnchors.includes(item.href)),
    [hiddenAnchors],
  );

  useEffect(() => {
    const updateHeader = () => setIsScrolled(window.scrollY > 32);

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const anchors = ["#home", ...visibleNavigation.map((item) => item.href)];
    const sections = anchors
      .map((href) => document.getElementById(href.replace("#", "")))
      .filter((element): element is HTMLElement => Boolean(element));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target.id) {
          setActiveAnchor(`#${visibleEntry.target.id}`);
        }
      },
      {
        rootMargin: "-34% 0px -48% 0px",
        threshold: [0.08, 0.18, 0.32],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [pathname, visibleNavigation]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const brandHref = pathname === "/" ? "#home" : "/#home";

  return (
    <header className={`site-header ${isScrolled || isOpen ? "is-scrolled" : ""}`}>
      <nav className="nav-shell" aria-label="Primary navigation">
        <Link className="brand-mark" href={brandHref} onClick={() => setIsOpen(false)}>
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt={`${companyName} logo`}
              width={180}
              height={48}
              sizes="180px"
              className="brand-logo"
              quality={82}
              priority
            />
          ) : (
            <>
              <span className="brand-symbol">
                {logoMarkUrl ? (
                  <Image
                    src={logoMarkUrl}
                    alt=""
                    width={38}
                    height={38}
                    sizes="38px"
                    className="brand-logo-mark"
                    quality={80}
                  />
                ) : (
                  "EV"
                )}
              </span>
              <span>{companyName}</span>
            </>
          )}
        </Link>

        <div className="desktop-nav">
          {visibleNavigation.map((item) => {
            const isActive = pathname === "/" && activeAnchor === item.href;

            return (
              <Link
                key={item.href}
                href={normalizeAnchorHref(item.href, pathname)}
                aria-current={isActive ? "location" : undefined}
                data-active={isActive || undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <a
          className="nav-cta"
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Consult
        </a>

        <button
          className="menu-button"
          type="button"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setIsOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </nav>

      {isOpen ? (
        <div id="mobile-navigation" className="mobile-nav">
          {visibleNavigation.map((item) => {
            const isActive = pathname === "/" && activeAnchor === item.href;

            return (
              <Link
                key={item.href}
                href={normalizeAnchorHref(item.href, pathname)}
                aria-current={isActive ? "location" : undefined}
                data-active={isActive || undefined}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
          >
            Consult
          </a>
        </div>
      ) : null}
    </header>
  );
}
