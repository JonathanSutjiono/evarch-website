import { defineConfig } from "sanity";
import { structureTool, type StructureBuilder } from "sanity/structure";
import { schemaTypes } from "./sanity/schemaTypes";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "missing-project-id";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

const singletonItem = (
  S: StructureBuilder,
  title: string,
  schemaType: string,
  documentId: string,
) =>
  S.listItem()
    .title(title)
    .child(S.document().schemaType(schemaType).documentId(documentId).title(title));

export default defineConfig({
  name: "default",
  title: "EVARCH.ID CMS",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("EVARCH.ID Content")
          .items([
            singletonItem(S, "Site Settings", "siteSettings", "siteSettings"),
            singletonItem(S, "Homepage", "homepage", "homepage"),
            S.documentTypeListItem("project").title("Works / Projects"),
            singletonItem(S, "Studio / About", "about", "about"),
            S.documentTypeListItem("expertise").title("Expertise"),
            singletonItem(S, "STRA Verification", "stra", "stra"),
            S.documentTypeListItem("regulation").title("Regulation"),
            singletonItem(S, "Contact & Map", "contact", "contact"),
            singletonItem(S, "Footer", "footer", "footer"),
          ]),
    }),
  ],
  schema: { types: schemaTypes },
});
