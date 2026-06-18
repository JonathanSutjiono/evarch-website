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
          <p>Architecture, consultation, and regulation-aware design practice.</p>
        </div>
        <div className="footer-links">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
