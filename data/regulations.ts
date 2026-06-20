export type RegulationArticle = {
  category: string;
  date: string;
  title: string;
  description: string;
  readTime: string;
};

export const regulations: RegulationArticle[] = [
  {
    category: "STRA",
    date: "2026",
    title: "Understanding STRA for Architectural Services",
    description:
      "A concise introduction to architect registration and why transparent verification matters for clients.",
    readTime: "4 min read",
  },
  {
    category: "PBG / IMB",
    date: "2026",
    title: "PBG/IMB Considerations Before Building",
    description:
      "Key planning questions to review before design development, documentation, and permit coordination.",
    readTime: "5 min read",
  },
  {
    category: "Professional Practice",
    date: "2026",
    title: "Architect, Contractor, and Interior Designer: What's the Difference?",
    description:
      "A practical overview of professional roles so project responsibilities are clear from the beginning.",
    readTime: "6 min read",
  },
];
