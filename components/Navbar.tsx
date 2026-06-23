"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { navigation, site } from "@/data/site";

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
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const visibleNavigation = navigation.filter((item) => !hiddenAnchors.includes(item.href));

  useEffect(() => {
    const updateHeader = () => setIsScrolled(window.scrollY > 32);

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  return (
    <header className={`site-header ${isScrolled || isOpen ? "is-scrolled" : ""}`}>
      <nav className="nav-shell" aria-label="Primary navigation">
        <Link className="brand-mark" href="#home" onClick={() => setIsOpen(false)}>
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
          {visibleNavigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
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
          {visibleNavigation.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
              {item.label}
            </Link>
          ))}
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
