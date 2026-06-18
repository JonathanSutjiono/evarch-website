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

// Temporary stock images. Replace with real client project photos before final production.
export const projects: Project[] = [
  {
    title: "House in Serpong",
    category: "Residential",
    location: "Tangerang Selatan",
    year: "2026",
    scope: "Concept Design, Space Planning, Design Development",
    status: "Concept Portfolio",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2200&q=85",
    imageAlt:
      "Temporary image of a modern tropical residence used as EVARCH project placeholder.",
  },
  {
    title: "Residence in Kelapa Gading",
    category: "Residential",
    location: "North Jakarta",
    year: "2025",
    scope: "Residential Architecture, Facade Study, Spatial Planning",
    status: "Sample Work",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=2200&q=85",
    imageAlt:
      "Temporary image of a clean modern urban residence used as EVARCH project placeholder.",
  },
  {
    title: "Villa in Bali",
    category: "Hospitality Residential",
    location: "Bali",
    year: "2025",
    scope: "Villa Concept, Open Living Planning, Material Direction",
    status: "Concept Portfolio",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=85",
    imageAlt:
      "Temporary image of a tropical villa with pool and warm daylight used as EVARCH project placeholder.",
  },
  {
    title: "Office in Menteng",
    category: "Commercial",
    location: "Central Jakarta",
    year: "2024",
    scope: "Commercial Architecture, Workspace Planning, Design Development",
    status: "Sample Work",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2200&q=85",
    imageAlt:
      "Temporary image of a refined modern office workspace used as EVARCH project placeholder.",
  },
  {
    title: "Commercial Space in Jakarta",
    category: "Retail",
    location: "Jakarta",
    year: "2024",
    scope: "Commercial Planning, Facade Direction, Customer Flow Study",
    status: "Concept Portfolio",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2200&q=85",
    imageAlt:
      "Temporary image of a contemporary commercial building used as EVARCH project placeholder.",
  },
  {
    title: "Private House Renovation",
    category: "Renovation",
    location: "Jakarta",
    year: "2023",
    scope: "Interior Architecture, Renovation Planning, Detail Coordination",
    status: "Sample Work",
    image:
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=2200&q=85",
    imageAlt:
      "Temporary image of a minimal modern renovated interior used as EVARCH project placeholder.",
  },
];
