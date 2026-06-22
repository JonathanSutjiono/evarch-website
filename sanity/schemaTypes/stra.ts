import { defineField, defineType } from "sanity";

export const stra = defineType({
  name: "stra",
  title: "STRA Verification",
  type: "document",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
    defineField({ name: "badgeText", title: "Badge Text", type: "string" }),
    defineField({ name: "daiLogo", title: "DAI Logo", type: "image" }),
    defineField({ name: "verificationUrl", title: "Verification URL", type: "url" }),
    defineField({ name: "buttonLabel", title: "Button Label", type: "string" }),
    defineField({ name: "note", title: "Note", type: "text", rows: 3 }),
  ],
  preview: { prepare: () => ({ title: "STRA Verification" }) },
});
