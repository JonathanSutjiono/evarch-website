import { defineArrayMember, defineField, defineType } from "sanity";

export const footer = defineType({
  name: "footer",
  title: "Footer",
  type: "document",
  fields: [
    defineField({ name: "shortDescription", title: "Short Description", type: "text", rows: 3 }),
    defineField({ name: "copyrightText", title: "Copyright Text", type: "string" }),
    defineField({
      name: "links",
      title: "Footer Links",
      type: "array",
      of: [defineArrayMember({ type: "object", fields: [
        defineField({ name: "label", title: "Label", type: "string" }),
        defineField({ name: "url", title: "URL", type: "string" }),
      ] })],
    }),
  ],
  preview: { prepare: () => ({ title: "Footer" }) },
});
