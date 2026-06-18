"use client";

import Link from "next/link";
import { useState } from "react";
import { navigation, site } from "@/data/site";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="site-header">
      <nav className="nav-shell" aria-label="Primary navigation">
        <Link className="brand-mark" href="#home" onClick={() => setIsOpen(false)}>
          <span className="brand-symbol">EV</span>
          <span>{site.name}</span>
        </Link>

        <div className="desktop-nav">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>

        <a
          className="nav-cta"
          href={site.whatsappUrl}
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
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
              {item.label}
            </Link>
          ))}
          <a
            href={site.whatsappUrl}
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
