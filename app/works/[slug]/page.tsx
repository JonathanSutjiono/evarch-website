import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import { ContactCTA } from "@/components/ContactCTA";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { projects as staticProjects } from "@/data/projects";
import { absoluteUrl, siteUrl } from "@/lib/site";
import { resolveProjectDetail, type CmsProjectDetail } from "@/sanity/lib/detail";
import { resolveHomeContent, type CmsHomeResponse } from "@/sanity/lib/fallback";
import { homePageQuery, projectBySlugQuery, projectSlugsQuery } from "@/sanity/lib/queries";
import { sanityFetchResult, serverSanityFetch } from "@/sanity/lib/serverFetch";

type PageProps = {
  params: Promise<{ slug: string }>;
};

async function getChromeContent(draft = false) {
  const data = await serverSanityFetch<CmsHomeResponse>(homePageQuery, {}, {
    draft,
    tags: ["home", "site-settings", "contact", "footer", "stra"],
  });

  return resolveHomeContent(data);
}

async function getProject(slug: string, draft = false) {
  const result = await sanityFetchResult<CmsProjectDetail>(projectBySlugQuery, { slug }, {
    draft,
    tags: ["projects"],
  });

  return resolveProjectDetail(result, slug);
}

export async function generateStaticParams() {
  const result = await sanityFetchResult<Array<{ slug: string }>>(projectSlugsQuery, {}, { tags: ["projects"] });

  if (result.status === "success") {
    return (result.data ?? []).map((item) => ({ slug: item.slug }));
  }

  return staticProjects.flatMap((project) => (project.slug ? [{ slug: project.slug }] : []));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  const title = project.seoTitle || `${project.title} - EVARCH.ID`;
  const description = project.seoDescription || project.description || `${project.title} by EVARCH.ID.`;

  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(`/works/${slug}`) },
    openGraph: {
      title,
      description,
      url: absoluteUrl(`/works/${slug}`),
      siteName: "EVARCH.ID",
      type: "article",
      images: project.image ? [{ url: project.image, alt: project.imageAlt }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: project.image ? [project.image] : undefined,
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const { isEnabled } = await draftMode();
  const [content, project] = await Promise.all([
    getChromeContent(isEnabled),
    getProject(slug, isEnabled),
  ]);

  if (!project) {
    notFound();
  }

  const scopeItems = project.scope?.split(",").map((item) => item.trim()).filter(Boolean) ?? [];

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
        <section className="detail-hero detail-project-hero">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.imageAlt}
              fill
              sizes="100vw"
              className="detail-hero-image"
              priority
              quality={82}
            />
          ) : null}
          <div className="detail-hero-overlay" aria-hidden="true" />
          <div className="site-container detail-hero-content">
            <Link href="/#works" className="detail-back-link">
              Back to works
            </Link>
            <p className="eyebrow">{project.category || "Project"}</p>
            <h1>{project.title}</h1>
            {project.description ? <p className="detail-lede">{project.description}</p> : null}
            <dl className="detail-meta">
              {project.location ? <div><dt>Location</dt><dd>{project.location}</dd></div> : null}
              {project.year ? <div><dt>Year</dt><dd>{project.year}</dd></div> : null}
              {project.status ? <div><dt>Status</dt><dd>{project.status}</dd></div> : null}
            </dl>
          </div>
        </section>

        <section className="detail-section section-pad">
          <div className="site-container detail-grid">
            <div>
              <p className="eyebrow">Project Scope</p>
              <h2>Project information prepared for architectural review.</h2>
            </div>
            <div className="detail-panel">
              {scopeItems.length ? (
                <ul className="detail-list">
                  {scopeItems.map((item) => <li key={item}>{item}</li>)}
                </ul>
              ) : (
                <p>Project scope can be updated from the EVARCH.ID CMS before final publication.</p>
              )}
              <p className="detail-note">
                Temporary/sample project content should be replaced with approved project information and real EVARCH project photography before final production claims are made.
              </p>
            </div>
          </div>
        </section>

        {project.gallery?.length ? (
          <section className="detail-gallery site-container" aria-label={`${project.title} gallery`}>
            {project.gallery.map((item) => (
              <div className="detail-gallery-image" key={item.image}>
                <Image src={item.image} alt={item.alt} fill sizes="(max-width: 860px) 100vw, 50vw" quality={80} />
              </div>
            ))}
          </section>
        ) : null}

        <ContactCTA content={content.contact} verificationUrl={content.stra.verificationUrl} />
      </main>
      <Footer content={content.footer} companyName={content.site.companyName} verificationUrl={content.stra.verificationUrl} />
      <FloatingWhatsApp whatsappUrl={content.site.whatsappUrl} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
              { "@type": "ListItem", position: 2, name: "Works", item: absoluteUrl("/#works") },
              { "@type": "ListItem", position: 3, name: project.title, item: absoluteUrl(`/works/${slug}`) },
            ],
          }),
        }}
      />
    </>
  );
}
