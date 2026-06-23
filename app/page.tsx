import type { Metadata } from "next";
import { ContactCTA } from "@/components/ContactCTA";
import { ExpertiseGrid } from "@/components/ExpertiseGrid";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { ProcessSteps } from "@/components/ProcessSteps";
import { RegulationCards } from "@/components/RegulationCards";
import { Reveal } from "@/components/Reveal";
import { STRAVerification } from "@/components/STRAVerification";
import { StudioIntro } from "@/components/StudioIntro";
import { WorksGrid } from "@/components/WorksGrid";
import { safeSanityFetch } from "@/sanity/lib/client";
import { resolveHomeContent, type CmsHomeResponse } from "@/sanity/lib/fallback";
import { getOptimizedImageUrl } from "@/sanity/lib/image";
import { homePageQuery, siteSettingsQuery } from "@/sanity/lib/queries";

type CmsSiteSettings = NonNullable<CmsHomeResponse["siteSettings"]>;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await safeSanityFetch<CmsSiteSettings>(siteSettingsQuery);
  const title = settings?.defaultSeoTitle || "EVARCH.ID - Architecture Studio & STRA-Verified Architect";
  const description = settings?.defaultSeoDescription ||
    "EVARCH.ID is an architecture studio for residential and commercial design, planning consultation, and regulation-aware architectural practice in Indonesia.";
  const ogImage = getOptimizedImageUrl(settings?.defaultOgImage, {
    width: 1200,
    height: 630,
    quality: 82,
  });
  const favicon = getOptimizedImageUrl(settings?.favicon, { width: 96, quality: 82 });

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: "https://evarch.id",
      siteName: "EVARCH.ID",
      type: "website",
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    icons: favicon ? { icon: favicon } : undefined,
  };
}

export default async function Home() {
  const sanityData = await safeSanityFetch<CmsHomeResponse>(homePageQuery);
  const content = resolveHomeContent(sanityData);
  const hiddenAnchors = [
    ...(content.projects.length ? [] : ["#works"]),
    ...(content.expertise.length ? [] : ["#expertise"]),
    ...(content.regulations.length ? [] : ["#regulation"]),
  ];

  return (
    <>
      <Navbar
        companyName={content.site.companyName}
        logoUrl={content.site.logoUrl}
        logoMarkUrl={content.site.logoMarkUrl}
        whatsappUrl={content.site.whatsappUrl}
        hiddenAnchors={hiddenAnchors}
      />
      <main>
        <Hero
          content={content.homepage}
          whatsappUrl={content.site.whatsappUrl}
          hasWorks={content.projects.length > 0}
        />
        <Reveal className="reveal-immediate">
          <StudioIntro content={content.about} />
        </Reveal>
        <Reveal>
          <WorksGrid
            projects={content.projects}
            title={content.homepage.selectedWorksTitle}
            subtitle={content.homepage.selectedWorksSubtitle}
          />
        </Reveal>
        <Reveal>
          <ExpertiseGrid
            items={content.expertise}
            title={content.homepage.expertiseTitle}
            subtitle={content.homepage.expertiseSubtitle}
          />
        </Reveal>
        <Reveal>
          <ProcessSteps content={content.process} />
        </Reveal>
        <Reveal>
          <STRAVerification content={content.stra} whatsappUrl={content.site.whatsappUrl} />
        </Reveal>
        <Reveal>
          <RegulationCards items={content.regulations} />
        </Reveal>
        <Reveal>
          <ContactCTA content={content.contact} verificationUrl={content.stra.verificationUrl} />
        </Reveal>
      </main>
      <Footer
        content={content.footer}
        companyName={content.site.companyName}
        verificationUrl={content.stra.verificationUrl}
        hiddenAnchors={hiddenAnchors}
      />
      <FloatingWhatsApp whatsappUrl={content.site.whatsappUrl} />
    </>
  );
}
