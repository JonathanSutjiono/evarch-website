import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-02-07";
const token = process.env.SANITY_API_WRITE_TOKEN;

const missingEnvironment = [
  ["NEXT_PUBLIC_SANITY_PROJECT_ID", projectId],
  ["NEXT_PUBLIC_SANITY_DATASET", dataset],
  ["SANITY_API_WRITE_TOKEN", token],
].filter(([, value]) => !value).map(([name]) => name);

if (missingEnvironment.length) {
  console.error(`Missing required environment variables: ${missingEnvironment.join(", ")}`);
  console.error("Add them to .env.local, then run npm run seed:sanity again.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

const site = {
  name: "EVARCH.ID",
  description: "An architecture studio delivering thoughtful residential and commercial design through professional standards, contextual planning, and regulation-aware practice.",
  email: "hello@evarch.id",
  location: "Jakarta, Indonesia",
  whatsappNumber: "62XXXXXXXXXXX",
  straUrl: "https://appv2.dewanarsitek.id/direktoristra",
};

const navigation = [
  { label: "Studio", href: "#studio" },
  { label: "Works", href: "#works" },
  { label: "Expertise", href: "#expertise" },
  { label: "Regulation", href: "#regulation" },
  { label: "STRA", href: "#stra" },
  { label: "Contact", href: "#contact" },
];

const projects = [
  { title: "House in Serpong", category: "Residential Architecture", location: "Serpong, Tangerang", year: "2024", scope: "Concept Design, Space Planning, Design Development", status: "Concept Portfolio" },
  { title: "Residence in Kelapa Gading", category: "Residential Architecture", location: "Kelapa Gading, Jakarta", year: "2025", scope: "Facade Concept, Spatial Planning, Documentation", status: "Concept Portfolio" },
  { title: "Villa in Bali", category: "Villa Architecture", location: "Bali", year: "2024", scope: "Tropical Concept, Interior Architecture, Planning", status: "Concept Portfolio" },
  { title: "Office in Menteng", category: "Commercial Architecture", location: "Menteng, Jakarta", year: "2025", scope: "Office Planning, Facade Direction, Interior Architecture", status: "Concept Portfolio" },
  { title: "Commercial Space in Jakarta", category: "Commercial Architecture", location: "Jakarta", year: "2025", scope: "Retail Planning, Brand Space, Design Development", status: "Concept Portfolio" },
  { title: "Private House Renovation", category: "Renovation / Interior Architecture", location: "Jakarta", year: "2024", scope: "Renovation Concept, Interior Planning, Space Optimization", status: "Concept Portfolio" },
];

const expertise = [
  { title: "Residential Architecture", description: "Tailored homes shaped around daily routines, site potential, privacy, light, and long-term comfort." },
  { title: "Commercial Architecture", description: "Clear, efficient spaces for offices, retail, and mixed-use environments with a credible public presence." },
  { title: "Interior Architecture", description: "Interior planning, spatial atmosphere, material direction, and detailing aligned with the architecture." },
  { title: "Planning & Consultation", description: "Early-stage guidance for project feasibility, spatial strategy, scope clarity, and design direction." },
  { title: "Regulation-Aware Design", description: "Design thinking informed by building approvals, documentation needs, and professional standards." },
  { title: "Site & Space Optimization", description: "Practical spatial studies that improve circulation, massing, daylight, and usable area." },
];

const processSteps = [
  { title: "Consultation", description: "Understand goals, budget direction, timeline, and decision priorities." },
  { title: "Site & Brief Analysis", description: "Review context, constraints, opportunities, and project requirements." },
  { title: "Concept Direction", description: "Develop the architectural idea, spatial organization, and design character." },
  { title: "Design Development", description: "Refine plans, facade, materials, dimensions, and technical coordination." },
  { title: "Documentation", description: "Prepare clear design documents for communication, review, and coordination." },
  { title: "Coordination", description: "Support alignment between client intent, consultants, and execution teams." },
];

const regulations = [
  { category: "STRA", date: "2026", title: "Understanding STRA for Architectural Services", description: "A concise introduction to architect registration and why transparent verification matters for clients.", readTime: "4 min read" },
  { category: "PBG / IMB", date: "2026", title: "PBG/IMB Considerations Before Building", description: "Key planning questions to review before design development, documentation, and permit coordination.", readTime: "5 min read" },
  { category: "Professional Practice", date: "2026", title: "Architect, Contractor, and Interior Designer: What's the Difference?", description: "A practical overview of professional roles so project responsibilities are clear from the beginning.", readTime: "6 min read" },
];

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function portableText(value) {
  return [{
    _key: "seed-body",
    _type: "block",
    children: [{ _key: "seed-span", _type: "span", marks: [], text: value }],
    markDefs: [],
    style: "normal",
  }];
}

const singletonSeeds = [
  {
    _id: "siteSettings",
    _type: "siteSettings",
    companyName: site.name,
    tagline: site.description,
    email: site.email,
    whatsappNumber: site.whatsappNumber,
    defaultSeoTitle: "EVARCH.ID - Architecture Studio & STRA-Verified Architect",
    defaultSeoDescription: "EVARCH.ID is an architecture studio for residential and commercial design, planning consultation, and regulation-aware architectural practice in Indonesia.",
  },
  {
    _id: "homepage",
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
    _id: "studioAbout",
    _type: "about",
    heading: "Studio",
    body: portableText("EVARCH.ID works across residential, commercial, and interior architecture with a focus on proportion, context, buildability, and compliance."),
    values: [
      { _key: "value-1", title: "Context", description: "Architecture shaped by site conditions, scale, climate, daily rhythm, and client priorities." },
      { _key: "value-2", title: "Clarity", description: "Plans are developed for comfort, circulation, efficiency, and long-term use." },
      { _key: "value-3", title: "Compliance", description: "Design work is prepared with coordination, approvals, and responsible practice in mind." },
    ],
  },
  {
    _id: "processContent",
    _type: "process",
    eyebrow: "Process",
    heading: "A disciplined sequence from first conversation to coordinated documents.",
    description: "Each stage is framed to reduce ambiguity before design coordination begins.",
  },
  {
    _id: "straVerification",
    _type: "stra",
    heading: "STRA Verification",
    description: "EVARCH.ID supports transparent and professional architectural practice. Clients may verify architect registration through the official Dewan Arsitek Indonesia STRA Directory.",
    badgeText: "Official Directory Verification",
    verificationUrl: site.straUrl,
    buttonLabel: "Verify STRA Registration",
    note: "Verification through Dewan Arsitek Indonesia STRA Directory",
  },
  {
    _id: "contactMap",
    _type: "contact",
    heading: "Start with a clear architectural brief.",
    description: "Discuss your site, brief, and project direction with EVARCH.ID before moving into design development.",
    whatsappNumber: site.whatsappNumber,
    whatsappButtonLabel: "Consult via WhatsApp",
    email: site.email,
    address: site.location,
  },
  {
    _id: "footer",
    _type: "footer",
    shortDescription: "Architecture Studio",
    copyrightText: "Copyright 2026 EVARCH.ID",
    links: navigation.map((link, index) => ({ _key: `footer-link-${index + 1}`, label: link.label, url: link.href })),
  },
];

const projectSeeds = projects.map((project, index) => ({
  _id: `seed-project-${slugify(project.title)}`,
  _type: "project",
  title: project.title,
  slug: { _type: "slug", current: slugify(project.title) },
  category: project.category,
  location: project.location,
  year: project.year,
  scope: project.scope.split(", "),
  status: project.status,
  description: "Temporary concept portfolio item. Replace this copy and cover image with approved project information before final production.",
  featured: index === 0,
  showOnWebsite: true,
  order: index + 1,
}));

const expertiseSeeds = expertise.map((item, index) => ({
  _id: `seed-expertise-${slugify(item.title)}`,
  _type: "expertise",
  ...item,
  showOnWebsite: true,
  order: index + 1,
}));

const processStepSeeds = processSteps.map((step, index) => ({
  _id: `seed-process-${slugify(step.title)}`,
  _type: "processStep",
  ...step,
  showOnWebsite: true,
  order: index + 1,
}));

const regulationSeeds = regulations.map((article, index) => ({
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

async function seed() {
  const singletonTypes = singletonSeeds.map((document) => document._type);
  const [existingSingletons, projectCount, expertiseCount, processStepCount, regulationCount] = await Promise.all([
    client.fetch("*[_type in $types]{_id, _type}", { types: singletonTypes }),
    client.fetch('count(*[_type == "project"])'),
    client.fetch('count(*[_type == "expertise"])'),
    client.fetch('count(*[_type == "processStep"])'),
    client.fetch('count(*[_type == "regulation"])'),
  ]);

  const existingSingletonTypes = new Set(existingSingletons.map((document) => document._type));
  let transaction = client.transaction();
  const createdSingletons = [];

  singletonSeeds.forEach((document) => {
    if (!existingSingletonTypes.has(document._type)) {
      transaction = transaction.createIfNotExists(document);
      createdSingletons.push(document._type);
    }
  });

  const collections = [
    { label: "projects", count: projectCount, documents: projectSeeds },
    { label: "expertise", count: expertiseCount, documents: expertiseSeeds },
    { label: "process steps", count: processStepCount, documents: processStepSeeds },
    { label: "regulations", count: regulationCount, documents: regulationSeeds },
  ];
  const createdCollections = [];
  const skippedCollections = [];

  collections.forEach(({ label, count, documents }) => {
    if (count === 0) {
      documents.forEach((document) => {
        transaction = transaction.createIfNotExists(document);
      });
      createdCollections.push(`${label}: ${documents.length}`);
    } else {
      skippedCollections.push(`${label}: already contains ${count}`);
    }
  });

  if (createdSingletons.length || createdCollections.length) {
    await transaction.commit({ visibility: "sync" });
  }

  console.log("\nSanity seed summary");
  console.log(`Singletons created: ${createdSingletons.length ? createdSingletons.join(", ") : "none"}`);
  console.log(`Singletons preserved: ${singletonSeeds.filter((document) => existingSingletonTypes.has(document._type)).map((document) => document._type).join(", ") || "none"}`);
  console.log(`Collections created: ${createdCollections.length ? createdCollections.join(" | ") : "none"}`);
  console.log(`Collections skipped: ${skippedCollections.length ? skippedCollections.join(" | ") : "none"}`);
  console.log("Open /studio to review the seeded documents.");
}

seed().catch((error) => {
  console.error("Sanity seed failed:", error.message || error);
  process.exitCode = 1;
});
