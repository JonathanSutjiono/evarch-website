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
  title: "EVARCH.ID Content Editor",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Konten EVARCH.ID")
          .items([
            singletonItem(S, "Pengaturan Website", "siteSettings", "siteSettings"),
            singletonItem(S, "Halaman Utama", "homepage", "homepage"),
            S.documentTypeListItem("project").title("Proyek / Works"),
            singletonItem(S, "Studio / Tentang EVARCH", "about", "about"),
            S.documentTypeListItem("expertise").title("Keahlian / Expertise"),
            singletonItem(S, "Verifikasi STRA", "stra", "stra"),
            S.documentTypeListItem("regulation").title("Regulasi / Pengetahuan"),
            singletonItem(S, "Kontak dan Peta", "contact", "contact"),
            singletonItem(S, "Footer Website", "footer", "footer"),
          ]),
    }),
  ],
  schema: { types: schemaTypes },
});
