import Link from "next/link";
import { navigation, site } from "@/data/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-container footer-grid">
        <div>
          <Link className="footer-brand" href="#home">
            {site.name}
          </Link>
          <p>Architecture Studio</p>
        </div>
        <div className="footer-links">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          <a href={site.straUrl} target="_blank" rel="noopener noreferrer">
            STRA Verification
          </a>
        </div>
      </div>
      <div className="site-container footer-bottom">
        <span>Copyright 2026 EVARCH.ID</span>
      </div>
    </footer>
  );
}
