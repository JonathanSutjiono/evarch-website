import { defineArrayMember, defineField, defineType } from "sanity";

export const about = defineType({
  name: "about",
  title: "Studio / About",
  type: "document",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({ name: "body", title: "Body", type: "array", of: [defineArrayMember({ type: "block" })] }),
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
    defineField({
      name: "values",
      title: "Values",
      type: "array",
      of: [defineArrayMember({ type: "object", fields: [
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
      ] })],
    }),
  ],
  preview: { prepare: () => ({ title: "Studio / About" }) },
});
