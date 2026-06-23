import type { SanityClient, SanityDocument } from "sanity";
import { expertise } from "@/data/expertise";
import { processSteps } from "@/data/process";
import { projects } from "@/data/projects";
import { regulations } from "@/data/regulations";
import { navigation, site } from "@/data/site";
import { singletonDocumentIds } from "./lib/singletons";

type ExistingDocument = { _id: string; _type: string };

type SeedDocument = {
  _id: string;
  _type: string;
  [key: string]: unknown;
};

type SeedResult = {
  singletonsCreated: number;
  collectionsCreated: {
    projects: number;
    expertise: number;
    processSteps: number;
    regulations: number;
  };
  preservedSingletonTypes: string[];
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function portableText(value: string) {
  return [{
    _key: "seed-body",
    _type: "block",
    children: [{ _key: "seed-span", _type: "span", marks: [], text: value }],
    markDefs: [],
    style: "normal",
  }];
}

const fallbackValues = [
  { title: "Context", description: "Architecture shaped by site conditions, scale, climate, daily rhythm, and client priorities." },
  { title: "Clarity", description: "Plans are developed for comfort, circulation, efficiency, and long-term use." },
  { title: "Compliance", description: "Design work is prepared with coordination, approvals, and responsible practice in mind." },
];

const singletonSeeds: SeedDocument[] = [
  {
    _id: singletonDocumentIds.siteSettings,
    _type: "siteSettings",
    companyName: site.name,
    tagline: site.description,
    email: site.email,
    whatsappNumber: site.whatsappUrl.replace("https://wa.me/", ""),
    defaultSeoTitle: "EVARCH.ID - Architecture Studio & STRA-Verified Architect",
    defaultSeoDescription: "EVARCH.ID is an architecture studio for residential and commercial design, planning consultation, and regulation-aware architectural practice in Indonesia.",
  },
  {
    _id: singletonDocumentIds.homepage,
    _type: "homepage",
    heroEyebrow: "EVARCH.ID - Architecture Studio",
    heroTitle: "Architecture with clarity,\ncontext, and compliance.",
    heroSubtitle: site.description,
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
  {
    _id: singletonDocumentIds.studioAbout,
    _type: "about",
    heading: "Studio",
    body: portableText("EVARCH.ID works across residential, commercial, and interior architecture with a focus on proportion, context, buildability, and compliance."),
    values: fallbackValues.map((value, index) => ({ ...value, _key: `value-${index + 1}` })),
  },
  {
    _id: singletonDocumentIds.processContent,
    _type: "process",
    eyebrow: "Process",
    heading: "A disciplined sequence from first conversation to coordinated documents.",
    description: "Each stage is framed to reduce ambiguity before design coordination begins.",
  },
  {
    _id: singletonDocumentIds.straVerification,
    _type: "stra",
    heading: "STRA Verification",
    description: "EVARCH.ID supports transparent and professional architectural practice. Clients may verify architect registration through the official Dewan Arsitek Indonesia STRA Directory.",
    badgeText: "Official Directory Verification",
    verificationUrl: site.straUrl,
    buttonLabel: "Verify STRA Registration",
    note: "Verification through Dewan Arsitek Indonesia STRA Directory",
  },
  {
    _id: singletonDocumentIds.contactMap,
    _type: "contact",
    heading: "Start with a clear architectural brief.",
    description: "Discuss your site, brief, and project direction with EVARCH.ID before moving into design development.",
    whatsappNumber: site.whatsappUrl.replace("https://wa.me/", ""),
    whatsappButtonLabel: "Consult via WhatsApp",
    email: site.email,
    address: site.location,
  },
  {
    _id: singletonDocumentIds.footer,
    _type: "footer",
    shortDescription: "Architecture Studio",
    copyrightText: "Copyright 2026 EVARCH.ID",
    links: navigation.map((link, index) => ({
      _key: `footer-link-${index + 1}`,
      label: link.label,
      url: link.href,
    })),
  },
];

const projectSeeds: SeedDocument[] = projects.map((project, index) => ({
  _id: `seed-project-${slugify(project.title)}`,
  _type: "project",
  title: project.title,
  slug: { _type: "slug", current: slugify(project.title) },
  category: project.category,
  location: project.location,
  year: project.year,
  scope: project.scope?.split(", "),
  status: project.status,
  description: "Temporary concept portfolio item. Replace this copy and cover image with approved project information before final production.",
  featured: index === 0,
  showOnWebsite: true,
  order: index + 1,
}));

const expertiseSeeds: SeedDocument[] = expertise.map((item, index) => ({
  _id: `seed-expertise-${slugify(item.title)}`,
  _type: "expertise",
  title: item.title,
  description: item.description,
  showOnWebsite: true,
  order: index + 1,
}));

const processStepSeeds: SeedDocument[] = processSteps.map((step, index) => ({
  _id: `seed-process-${slugify(step.title)}`,
  _type: "processStep",
  title: step.title,
  description: step.description,
  showOnWebsite: true,
  order: index + 1,
}));

const regulationSeeds: SeedDocument[] = regulations.map((article, index) => ({
  _id: `seed-regulation-${slugify(article.title)}`,
  _type: "regulation",
  title: article.title,
  slug: { _type: "slug", current: slugify(article.title) },
  category: article.category,
  excerpt: article.description,
  readTime: article.readTime,
  publishedAt: `${article.date}-01-01T00:00:00.000Z`,
  showOnWebsite: true,
  order: index + 1,
}));

export async function seedEvarchContent(client: SanityClient): Promise<SeedResult> {
  const singletonTypes = singletonSeeds.map((document) => document._type);
  const [existingSingletons, projectCount, expertiseCount, processStepCount, regulationCount] = await Promise.all([
    client.fetch<ExistingDocument[]>("*[_type in $types]{_id, _type}", { types: singletonTypes }),
    client.fetch<number>('count(*[_type == "project"])'),
    client.fetch<number>('count(*[_type == "expertise"])'),
    client.fetch<number>('count(*[_type == "processStep"])'),
    client.fetch<number>('count(*[_type == "regulation"])'),
  ]);

  const existingSingletonTypes = new Set(existingSingletons.map((document) => document._type));
  const preservedSingletonTypes = singletonSeeds
    .filter((document) => existingSingletonTypes.has(document._type))
    .map((document) => document._type);

  let transaction = client.transaction();
  let singletonsCreated = 0;

  singletonSeeds.forEach((document) => {
    if (!existingSingletonTypes.has(document._type)) {
      transaction = transaction.createIfNotExists(document as SanityDocument);
      singletonsCreated += 1;
    }
  });

  const collectionsCreated = {
    projects: projectCount === 0 ? projectSeeds.length : 0,
    expertise: expertiseCount === 0 ? expertiseSeeds.length : 0,
    processSteps: processStepCount === 0 ? processStepSeeds.length : 0,
    regulations: regulationCount === 0 ? regulationSeeds.length : 0,
  };

  if (projectCount === 0) {
    projectSeeds.forEach((document) => {
      transaction = transaction.createIfNotExists(document as SanityDocument);
    });
  }

  if (expertiseCount === 0) {
    expertiseSeeds.forEach((document) => {
      transaction = transaction.createIfNotExists(document as SanityDocument);
    });
  }

  if (processStepCount === 0) {
    processStepSeeds.forEach((document) => {
      transaction = transaction.createIfNotExists(document as SanityDocument);
    });
  }

  if (regulationCount === 0) {
    regulationSeeds.forEach((document) => {
      transaction = transaction.createIfNotExists(document as SanityDocument);
    });
  }

  if (singletonsCreated || collectionsCreated.projects || collectionsCreated.expertise || collectionsCreated.processSteps || collectionsCreated.regulations) {
    await transaction.commit({ visibility: "sync" });
  }

  return { singletonsCreated, collectionsCreated, preservedSingletonTypes };
}
