import { defineField, defineType } from "sanity";

export const expertise = defineType({
  name: "expertise",
  title: "Expertise",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
    defineField({ name: "order", title: "Display Order", type: "number", initialValue: 100 }),
    defineField({ name: "published", title: "Published", type: "boolean", initialValue: false }),
  ],
  orderings: [{ title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "description" } },
});
