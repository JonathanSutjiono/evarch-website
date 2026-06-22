import type { SanityImageSource } from "@sanity/image-url";
import { expertise as staticExpertise, type Expertise } from "@/data/expertise";
import { projects as staticProjects, type Project } from "@/data/projects";
import { regulations as staticRegulations, type RegulationArticle } from "@/data/regulations";
import { navigation, site } from "@/data/site";
import { urlForImage } from "./image";

type ImageValue = SanityImageSource & { alt?: string };

export type CmsHomeResponse = {
  siteSettings?: {
    companyName?: string;
    logo?: ImageValue;
    logoMark?: ImageValue;
    favicon?: ImageValue;
    tagline?: string;
    defaultSeoTitle?: string;
    defaultSeoDescription?: string;
    defaultOgImage?: ImageValue;
    instagramUrl?: string;
    linkedinUrl?: string;
    whatsappNumber?: string;
    email?: string;
  };
  homepage?: {
    heroEyebrow?: string;
    heroTitle?: string;
    heroSubtitle?: string;
    heroImage?: ImageValue;
    primaryButtonLabel?: string;
    primaryButtonLink?: string;
    secondaryButtonLabel?: string;
    secondaryButtonLink?: string;
    introTitle?: string;
    introText?: string;
    selectedWorksTitle?: string;
    selectedWorksSubtitle?: string;
    studioTitle?: string;
    studioText?: string;
    expertiseTitle?: string;
    expertiseSubtitle?: string;
    contactTitle?: string;
    contactSubtitle?: string;
  };
  projects?: Array<{
    _id: string;
    title?: string;
    category?: string;
    location?: string;
    year?: string;
    scope?: string[];
    status?: string;
    coverImage?: ImageValue;
  }>;
  about?: {
    heading?: string;
    bodyText?: string;
    values?: Array<{ title?: string; description?: string }>;
  };
  expertise?: Array<{ _id: string; title?: string; description?: string }>;
  stra?: {
    heading?: string;
    description?: string;
    badgeText?: string;
    daiLogo?: ImageValue;
    verificationUrl?: string;
    buttonLabel?: string;
    note?: string;
  };
  regulations?: Array<{
    _id: string;
    title?: string;
    category?: string;
    excerpt?: string;
    readTime?: string;
    publishedAt?: string;
  }>;
  contact?: {
    heading?: string;
    description?: string;
    whatsappNumber?: string;
    whatsappButtonLabel?: string;
    email?: string;
    address?: string;
    googleMapsUrl?: string;
    googleMapsEmbedUrl?: string;
    latitude?: number;
    longitude?: number;
    instagramUrl?: string;
    linkedinUrl?: string;
  };
  footer?: {
    shortDescription?: string;
    copyrightText?: string;
    links?: Array<{ label?: string; url?: string }>;
  };
};

const fallbackValues = [
  { title: "Context", description: "Architecture shaped by site conditions, scale, climate, daily rhythm, and client priorities." },
  { title: "Clarity", description: "Plans are developed for comfort, circulation, efficiency, and long-term use." },
  { title: "Compliance", description: "Design work is prepared with coordination, approvals, and responsible practice in mind." },
];

export const fallbackContent = {
  site: {
    companyName: site.name,
    logoUrl: null as string | null,
    logoMarkUrl: null as string | null,
    tagline: site.description,
    email: site.email,
    whatsappUrl: site.whatsappUrl,
    instagramUrl: null as string | null,
    linkedinUrl: null as string | null,
  },
  homepage: {
    heroEyebrow: "EVARCH.ID - Architecture Studio",
    heroTitle: "Architecture with clarity,\ncontext, and compliance.",
    heroSubtitle: site.description,
    heroImageUrl: site.heroImage,
    heroImageAlt: site.heroImageAlt,
    primaryButtonLabel: "View Works",
    primaryButtonLink: "#works",
    secondaryButtonLabel: "Verify STRA",
    secondaryButtonLink: site.straUrl,
    selectedWorksTitle: "Selected Works",
    selectedWorksSubtitle: "A portfolio-first preview of residential, commercial, and renovation work shaped through proportion, context, and clear architectural intent.",
    studioTitle: "Studio",
    studioText: "EVARCH.ID works across residential, commercial, and interior architecture with a focus on proportion, context, buildability, and compliance.",
    expertiseTitle: "Expertise",
    expertiseSubtitle: "Refined architectural services organized as clear scopes, from early planning to design development and documentation.",
    contactTitle: "Start with a clear architectural brief.",
    contactSubtitle: "Discuss your site, brief, and project direction with EVARCH.ID before moving into design development.",
  },
  projects: staticProjects,
  about: { title: "Studio", text: "EVARCH.ID works across residential, commercial, and interior architecture with a focus on proportion, context, buildability, and compliance.", values: fallbackValues },
  expertise: staticExpertise,
  stra: {
    heading: "STRA Verification",
    description: "EVARCH.ID supports transparent and professional architectural practice. Clients may verify architect registration through the official Dewan Arsitek Indonesia STRA Directory.",
    badgeText: "Official Directory Verification",
    daiLogoUrl: "/logo/dai-logo-full.jpeg",
    verificationUrl: site.straUrl,
    buttonLabel: "Verify STRA Registration",
    note: "Verification through Dewan Arsitek Indonesia STRA Directory",
  },
  regulations: staticRegulations,
  contact: {
    heading: "Start with a clear architectural brief.",
    description: "Discuss your site, brief, and project direction with EVARCH.ID before moving into design development.",
    whatsappUrl: site.whatsappUrl,
    whatsappButtonLabel: "Consult via WhatsApp",
    email: site.email,
    address: site.location,
    googleMapsUrl: null as string | null,
    googleMapsEmbedUrl: null as string | null,
    latitude: null as number | null,
    longitude: null as number | null,
  },
  footer: {
    shortDescription: "Architecture Studio",
    copyrightText: "Copyright 2026 EVARCH.ID",
    links: navigation,
  },
};

function valueOrFallback(value: string | null | undefined, fallback: string) {
  return value?.trim() || fallback;
}

function whatsappUrl(number: string | undefined, fallback: string) {
  const digits = number?.replace(/\D/g, "");
  return digits ? `https://wa.me/${digits}` : fallback;
}

export function resolveHomeContent(data: CmsHomeResponse | null | undefined) {
  if (!data) return fallbackContent;

  const settings = data.siteSettings;
  const home = data.homepage;
  const cmsProjects = data.projects?.length
    ? data.projects.map((item, index): Project => {
        const fallback = staticProjects[index % staticProjects.length];
        return {
          title: valueOrFallback(item.title, fallback.title),
          category: valueOrFallback(item.category, fallback.category),
          location: valueOrFallback(item.location, fallback.location),
          year: valueOrFallback(item.year, fallback.year),
          scope: item.scope?.filter(Boolean).join(", ") || fallback.scope,
          status: valueOrFallback(item.status, fallback.status),
          image: urlForImage(item.coverImage, 2200) || fallback.image,
          imageAlt: item.title ? `Architecture project image for ${item.title}.` : fallback.imageAlt,
        };
      })
    : staticProjects;

  const cmsExpertise: Expertise[] = data.expertise?.length
    ? data.expertise.map((item, index) => ({
        title: valueOrFallback(item.title, staticExpertise[index % staticExpertise.length].title),
        description: valueOrFallback(item.description, staticExpertise[index % staticExpertise.length].description),
      }))
    : staticExpertise;

  const cmsRegulations: RegulationArticle[] = data.regulations?.length
    ? data.regulations.map((item, index) => ({
        category: valueOrFallback(item.category, staticRegulations[index % staticRegulations.length].category),
        date: item.publishedAt?.slice(0, 4) || staticRegulations[index % staticRegulations.length].date,
        title: valueOrFallback(item.title, staticRegulations[index % staticRegulations.length].title),
        description: valueOrFallback(item.excerpt, staticRegulations[index % staticRegulations.length].description),
        readTime: valueOrFallback(item.readTime, staticRegulations[index % staticRegulations.length].readTime),
      }))
    : staticRegulations;

  const aboutValues = data.about?.values?.filter((item) => item.title || item.description);
  const resolvedWhatsapp = whatsappUrl(data.contact?.whatsappNumber || settings?.whatsappNumber, site.whatsappUrl);

  return {
    site: {
      companyName: valueOrFallback(settings?.companyName, site.name),
      logoUrl: urlForImage(settings?.logo, 420),
      logoMarkUrl: urlForImage(settings?.logoMark, 120),
      tagline: valueOrFallback(settings?.tagline, site.description),
      email: valueOrFallback(data.contact?.email || settings?.email, site.email),
      whatsappUrl: resolvedWhatsapp,
      instagramUrl: data.contact?.instagramUrl || settings?.instagramUrl || null,
      linkedinUrl: data.contact?.linkedinUrl || settings?.linkedinUrl || null,
    },
    homepage: {
      ...fallbackContent.homepage,
      heroEyebrow: valueOrFallback(home?.heroEyebrow, fallbackContent.homepage.heroEyebrow),
      heroTitle: valueOrFallback(home?.heroTitle, fallbackContent.homepage.heroTitle),
      heroSubtitle: valueOrFallback(home?.heroSubtitle, fallbackContent.homepage.heroSubtitle),
      heroImageUrl: urlForImage(home?.heroImage, 2400) || site.heroImage,
      primaryButtonLabel: valueOrFallback(home?.primaryButtonLabel, fallbackContent.homepage.primaryButtonLabel),
      primaryButtonLink: valueOrFallback(home?.primaryButtonLink, fallbackContent.homepage.primaryButtonLink),
      secondaryButtonLabel: valueOrFallback(home?.secondaryButtonLabel, fallbackContent.homepage.secondaryButtonLabel),
      secondaryButtonLink: valueOrFallback(home?.secondaryButtonLink, fallbackContent.homepage.secondaryButtonLink),
      selectedWorksTitle: valueOrFallback(home?.selectedWorksTitle, fallbackContent.homepage.selectedWorksTitle),
      selectedWorksSubtitle: valueOrFallback(home?.selectedWorksSubtitle, fallbackContent.homepage.selectedWorksSubtitle),
      studioTitle: valueOrFallback(home?.studioTitle, fallbackContent.homepage.studioTitle),
      studioText: valueOrFallback(home?.studioText, fallbackContent.homepage.studioText),
      expertiseTitle: valueOrFallback(home?.expertiseTitle, fallbackContent.homepage.expertiseTitle),
      expertiseSubtitle: valueOrFallback(home?.expertiseSubtitle, fallbackContent.homepage.expertiseSubtitle),
      contactTitle: valueOrFallback(home?.contactTitle, fallbackContent.homepage.contactTitle),
      contactSubtitle: valueOrFallback(home?.contactSubtitle, fallbackContent.homepage.contactSubtitle),
    },
    projects: cmsProjects,
    about: {
      title: valueOrFallback(data.about?.heading || home?.studioTitle, fallbackContent.about.title),
      text: valueOrFallback(data.about?.bodyText || home?.studioText, fallbackContent.about.text),
      values: aboutValues?.length
        ? aboutValues.map((item, index) => ({
            title: valueOrFallback(item.title, fallbackValues[index % fallbackValues.length].title),
            description: valueOrFallback(item.description, fallbackValues[index % fallbackValues.length].description),
          }))
        : fallbackValues,
    },
    expertise: cmsExpertise,
    stra: {
      heading: valueOrFallback(data.stra?.heading, fallbackContent.stra.heading),
      description: valueOrFallback(data.stra?.description, fallbackContent.stra.description),
      badgeText: valueOrFallback(data.stra?.badgeText, fallbackContent.stra.badgeText),
      daiLogoUrl: urlForImage(data.stra?.daiLogo, 600) || fallbackContent.stra.daiLogoUrl,
      verificationUrl: valueOrFallback(data.stra?.verificationUrl, site.straUrl),
      buttonLabel: valueOrFallback(data.stra?.buttonLabel, fallbackContent.stra.buttonLabel),
      note: valueOrFallback(data.stra?.note, fallbackContent.stra.note),
    },
    regulations: cmsRegulations,
    contact: {
      heading: valueOrFallback(data.contact?.heading || home?.contactTitle, fallbackContent.contact.heading),
      description: valueOrFallback(data.contact?.description || home?.contactSubtitle, fallbackContent.contact.description),
      whatsappUrl: resolvedWhatsapp,
      whatsappButtonLabel: valueOrFallback(data.contact?.whatsappButtonLabel, fallbackContent.contact.whatsappButtonLabel),
      email: valueOrFallback(data.contact?.email || settings?.email, site.email),
      address: valueOrFallback(data.contact?.address, site.location),
      googleMapsUrl: data.contact?.googleMapsUrl || null,
      googleMapsEmbedUrl: data.contact?.googleMapsEmbedUrl || null,
      latitude: data.contact?.latitude ?? null,
      longitude: data.contact?.longitude ?? null,
    },
    footer: {
      shortDescription: valueOrFallback(data.footer?.shortDescription, fallbackContent.footer.shortDescription),
      copyrightText: valueOrFallback(data.footer?.copyrightText, fallbackContent.footer.copyrightText),
      links: [
        ...(data.footer?.links?.length
          ? data.footer.links
              .filter((item) => item.label && item.url)
              .map((item) => ({ label: item.label!, href: item.url! }))
          : navigation),
        ...((data.contact?.instagramUrl || settings?.instagramUrl)
          ? [{ label: "Instagram", href: (data.contact?.instagramUrl || settings?.instagramUrl)! }]
          : []),
        ...((data.contact?.linkedinUrl || settings?.linkedinUrl)
          ? [{ label: "LinkedIn", href: (data.contact?.linkedinUrl || settings?.linkedinUrl)! }]
          : []),
      ],
    },
  };
}

export type ResolvedHomeContent = ReturnType<typeof resolveHomeContent>;
