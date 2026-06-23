import Link from "next/link";
import { site } from "@/data/site";
import { fallbackContent, type ResolvedHomeContent } from "@/sanity/lib/fallback";

type FooterProps = {
  content?: ResolvedHomeContent["footer"];
  companyName?: string;
  verificationUrl?: string;
  hiddenAnchors?: string[];
};

export function Footer({
  content = fallbackContent.footer,
  companyName = site.name,
  verificationUrl = site.straUrl,
  hiddenAnchors = [],
}: FooterProps) {
  const visibleLinks = content.links.filter((item) => !hiddenAnchors.includes(item.href));

  return (
    <footer className="site-footer">
      <div className="site-container footer-grid">
        <div>
          <Link className="footer-brand" href="#home">
            {companyName}
          </Link>
          <p>{content.shortDescription}</p>
        </div>
        <div className="footer-links">
          {visibleLinks.map((item) =>
            item.href.startsWith("http") ? (
              <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer">
                {item.label}
              </a>
            ) : (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ),
          )}
          <a href={verificationUrl} target="_blank" rel="noopener noreferrer">
            STRA Verification
          </a>
        </div>
      </div>
      <div className="site-container footer-bottom">
        <span>{content.copyrightText}</span>
      </div>
    </footer>
  );
}
