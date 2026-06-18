export type RegulationArticle = {
  category: string;
  title: string;
  description: string;
  readTime: string;
};

export const regulations: RegulationArticle[] = [
  {
    category: "Professional Practice",
    title: "Understanding STRA for Architectural Services",
    description:
      "A concise introduction to architect registration and why transparent verification matters for clients.",
    readTime: "4 min read",
  },
  {
    category: "Building Preparation",
    title: "PBG/IMB Considerations Before Building",
    description:
      "Key planning questions to review before design development, documentation, and permit coordination.",
    readTime: "5 min read",
  },
  {
    category: "Project Roles",
    title: "Architect, Contractor, and Interior Designer: What's the Difference?",
    description:
      "A practical overview of professional roles so project responsibilities are clear from the beginning.",
    readTime: "6 min read",
  },
];
