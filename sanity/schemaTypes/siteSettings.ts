import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "companyName", title: "Company Name", type: "string" }),
    defineField({ name: "logo", title: "Company Logo", type: "image", options: { hotspot: true } }),
    defineField({ name: "logoMark", title: "Logo Mark", type: "image", options: { hotspot: true } }),
    defineField({ name: "favicon", title: "Favicon", type: "image" }),
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    defineField({ name: "defaultSeoTitle", title: "Default SEO Title", type: "string" }),
    defineField({ name: "defaultSeoDescription", title: "Default SEO Description", type: "text", rows: 3 }),
    defineField({ name: "defaultOgImage", title: "Default Social Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "instagramUrl", title: "Instagram URL", type: "url" }),
    defineField({ name: "linkedinUrl", title: "LinkedIn URL", type: "url" }),
    defineField({ name: "whatsappNumber", title: "WhatsApp Number", type: "string", description: "Include country code, for example 6281234567890." }),
    defineField({ name: "email", title: "Email", type: "string", validation: (rule) => rule.email() }),
  ],
  preview: { prepare: () => ({ title: "Site Settings" }) },
});
