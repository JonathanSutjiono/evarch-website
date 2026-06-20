export type Project = {
  title: string;
  category: string;
  location: string;
  year: string;
  scope: string;
  status: string;
  image: string;
  imageAlt: string;
};

// Temporary presentation images. Replace with real EVARCH project photos before final production.
export const projects: Project[] = [
  {
    title: "House in Serpong",
    category: "Residential Architecture",
    location: "Serpong, Tangerang",
    year: "2024",
    scope: "Concept Design, Space Planning, Design Development",
    status: "Concept Portfolio",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2200&q=85",
    imageAlt:
      "Temporary presentation image of a modern tropical residence for EVARCH project preview.",
  },
  {
    title: "Residence in Kelapa Gading",
    category: "Residential Architecture",
    location: "Kelapa Gading, Jakarta",
    year: "2025",
    scope: "Facade Concept, Spatial Planning, Documentation",
    status: "Concept Portfolio",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=2200&q=85",
    imageAlt:
      "Temporary presentation image of a modern urban residence facade for EVARCH project preview.",
  },
  {
    title: "Villa in Bali",
    category: "Villa Architecture",
    location: "Bali",
    year: "2024",
    scope: "Tropical Concept, Interior Architecture, Planning",
    status: "Concept Portfolio",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=85",
    imageAlt:
      "Temporary presentation image of a tropical villa with pool for EVARCH project preview.",
  },
  {
    title: "Office in Menteng",
    category: "Commercial Architecture",
    location: "Menteng, Jakarta",
    year: "2025",
    scope: "Office Planning, Facade Direction, Interior Architecture",
    status: "Concept Portfolio",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2200&q=85",
    imageAlt:
      "Temporary presentation image of a modern office architecture concept for EVARCH project preview.",
  },
  {
    title: "Commercial Space in Jakarta",
    category: "Commercial Architecture",
    location: "Jakarta",
    year: "2025",
    scope: "Retail Planning, Brand Space, Design Development",
    status: "Concept Portfolio",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2200&q=85",
    imageAlt:
      "Temporary presentation image of a contemporary commercial architecture concept for EVARCH project preview.",
  },
  {
    title: "Private House Renovation",
    category: "Renovation / Interior Architecture",
    location: "Jakarta",
    year: "2024",
    scope: "Renovation Concept, Interior Planning, Space Optimization",
    status: "Concept Portfolio",
    image:
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=2200&q=85",
    imageAlt:
      "Temporary presentation image of a modern home renovation concept for EVARCH project preview.",
  },
];
