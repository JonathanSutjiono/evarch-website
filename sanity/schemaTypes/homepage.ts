import { defineField, defineType } from "sanity";

export const homepage = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({ name: "heroEyebrow", title: "Hero Eyebrow", type: "string" }),
    defineField({ name: "heroTitle", title: "Hero Title", type: "text", rows: 3 }),
    defineField({ name: "heroSubtitle", title: "Hero Subtitle", type: "text", rows: 3 }),
    defineField({ name: "heroImage", title: "Hero Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "primaryButtonLabel", title: "Primary Button Label", type: "string" }),
    defineField({ name: "primaryButtonLink", title: "Primary Button Link", type: "string" }),
    defineField({ name: "secondaryButtonLabel", title: "Secondary Button Label", type: "string" }),
    defineField({ name: "secondaryButtonLink", title: "Secondary Button Link", type: "string" }),
    defineField({ name: "introTitle", title: "Intro Title", type: "string" }),
    defineField({ name: "introText", title: "Intro Text", type: "text", rows: 4 }),
    defineField({ name: "selectedWorksTitle", title: "Selected Works Title", type: "string" }),
    defineField({ name: "selectedWorksSubtitle", title: "Selected Works Subtitle", type: "text", rows: 3 }),
    defineField({ name: "studioTitle", title: "Studio Title", type: "string" }),
    defineField({ name: "studioText", title: "Studio Text", type: "text", rows: 4 }),
    defineField({ name: "expertiseTitle", title: "Expertise Title", type: "string" }),
    defineField({ name: "expertiseSubtitle", title: "Expertise Subtitle", type: "text", rows: 3 }),
    defineField({ name: "contactTitle", title: "Contact Title", type: "string" }),
    defineField({ name: "contactSubtitle", title: "Contact Subtitle", type: "text", rows: 3 }),
  ],
  preview: { prepare: () => ({ title: "Homepage" }) },
});
