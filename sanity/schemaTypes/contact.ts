import { defineField, defineType } from "sanity";

export const contact = defineType({
  name: "contact",
  title: "Contact & Map",
  type: "document",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
    defineField({ name: "whatsappNumber", title: "WhatsApp Number", type: "string" }),
    defineField({ name: "whatsappButtonLabel", title: "WhatsApp Button Label", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string", validation: (rule) => rule.email() }),
    defineField({ name: "address", title: "Address", type: "text", rows: 3 }),
    defineField({ name: "googleMapsUrl", title: "Google Maps URL", type: "url" }),
    defineField({ name: "googleMapsEmbedUrl", title: "Google Maps Embed URL", type: "url", description: "Use an official Google Maps embed URL." }),
    defineField({ name: "latitude", title: "Latitude", type: "number" }),
    defineField({ name: "longitude", title: "Longitude", type: "number" }),
    defineField({ name: "instagramUrl", title: "Instagram URL", type: "url" }),
    defineField({ name: "linkedinUrl", title: "LinkedIn URL", type: "url" }),
  ],
  preview: { prepare: () => ({ title: "Contact & Map" }) },
});
