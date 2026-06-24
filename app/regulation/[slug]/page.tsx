import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import { PortableText } from "@portabletext/react";
import type { ComponentProps } from "react";
import { ContactCTA } from "@/components/ContactCTA";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { regulations as staticRegulations } from "@/data/regulations";
import { absoluteUrl, siteUrl } from "@/lib/site";
import { resolveRegulationDetail, type CmsRegulationDetail } from "@/sanity/lib/detail";
import { resolveHomeContent, type CmsHomeResponse } from "@/sanity/lib/fallback";
import { homePageQuery, regulationBySlugQuery, regulationSlugsQuery } from "@/sanity/lib/queries";
import { sanityFetchResult, serverSanityFetch } from "@/sanity/lib/serverFetch";

type PageProps = {
  params: Promise<{ slug: string }>;
};

type PortableTextValue = ComponentProps<typeof PortableText>["value"];

async function getChromeContent(draft = false) {
  const data = await serverSanityFetch<CmsHomeResponse>(homePageQuery, {}, {
    draft,
    tags: ["home", "site-settings", "contact", "footer", "stra"],
  });

  return resolveHomeContent(data);
}

async function getRegulation(slug: string, draft = false) {
  const result = await sanityFetchResult<CmsRegulationDetail>(regulationBySlugQuery, { slug }, {
    draft,
    tags: ["regulations"],
  });

  return resolveRegulationDetail(result, slug);
}

export async function generateStaticParams() {
  const result = await sanityFetchResult<Array<{ slug: string }>>(regulationSlugsQuery, {}, { tags: ["regulations"] });

  if (result.status === "success") {
    return (result.data ?? []).map((item) => ({ slug: item.slug }));
  }

  return staticRegulations.flatMap((article) => (article.slug ? [{ slug: article.slug }] : []));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getRegulation(slug);

  if (!article) {
    return { title: "Regulation Article Not Found" };
  }

  const title = article.seoTitle || `${article.title} - EVARCH.ID`;
  const description = article.seoDescription || article.description;

  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(`/regulation/${slug}`) },
    openGraph: {
      title,
      description,
      url: absoluteUrl(`/regulation/${slug}`),
      siteName: "EVARCH.ID",
      type: "article",
      publishedTime: article.date ? `${article.date}-01-01T00:00:00.000Z` : undefined,
      images: article.image ? [{ url: article.image, alt: article.imageAlt }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: article.image ? [article.image] : undefined,
    },
  };
}

export default async function RegulationPage({ params }: PageProps) {
  const { slug } = await params;
  const { isEnabled } = await draftMode();
  const [content, article] = await Promise.all([
    getChromeContent(isEnabled),
    getRegulation(slug, isEnabled),
  ]);

  if (!article) {
    notFound();
  }

  const publishedDate = article.date ? `${article.date}-01-01T00:00:00.000Z` : undefined;

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <Navbar
        companyName={content.site.companyName}
        logoUrl={content.site.logoUrl}
        logoMarkUrl={content.site.logoMarkUrl}
        whatsappUrl={content.site.whatsappUrl}
      />
      <main id="main-content" className="detail-page" tabIndex={-1}>
        <article>
          <section className="detail-hero detail-article-hero">
            {article.image ? (
              <Image
                src={article.image}
                alt={article.imageAlt || article.title}
                fill
                sizes="100vw"
                className="detail-hero-image"
                priority
                quality={82}
              />
            ) : null}
            <div className="detail-hero-overlay" aria-hidden="true" />
            <div className="site-container detail-hero-content">
              <Link href="/#regulation" className="detail-back-link">
                Back to regulation
              </Link>
              <p className="eyebrow">{article.category || "Regulation"}</p>
              <h1>{article.title}</h1>
              <p className="detail-lede">{article.description}</p>
              <dl className="detail-meta">
                {article.date ? <div><dt>Published</dt><dd>{article.date}</dd></div> : null}
                {article.readTime ? <div><dt>Read time</dt><dd>{article.readTime}</dd></div> : null}
              </dl>
            </div>
          </section>

          <section className="detail-section section-pad">
            <div className="site-container detail-grid">
              <div>
                <p className="eyebrow">Editorial Note</p>
                <h2>Professional context for better early project decisions.</h2>
              </div>
              <div className="detail-panel detail-rich-text">
                {article.content?.length ? (
                  <PortableText value={article.content as PortableTextValue} />
                ) : (
                  <p>{article.description}</p>
                )}
                <p className="detail-note">
                  This content is informational and does not replace project-specific legal, permit, or professional consultation.
                </p>
              </div>
            </div>
          </section>
        </article>

        <ContactCTA content={content.contact} verificationUrl={content.stra.verificationUrl} />
      </main>
      <Footer content={content.footer} companyName={content.site.companyName} verificationUrl={content.stra.verificationUrl} />
      <FloatingWhatsApp whatsappUrl={content.site.whatsappUrl} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Article",
              headline: article.title,
              description: article.description,
              datePublished: publishedDate,
              dateModified: article.updatedAt || publishedDate,
              image: article.image ? [article.image] : undefined,
              author: { "@type": "Organization", name: "EVARCH.ID", url: siteUrl },
              publisher: { "@type": "Organization", name: "EVARCH.ID", url: siteUrl },
              mainEntityOfPage: absoluteUrl(`/regulation/${slug}`),
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
                { "@type": "ListItem", position: 2, name: "Regulation", item: absoluteUrl("/#regulation") },
                { "@type": "ListItem", position: 3, name: article.title, item: absoluteUrl(`/regulation/${slug}`) },
              ],
            },
          ]),
        }}
      />
    </>
  );
}
