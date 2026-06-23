import { defineConfig } from "sanity";
import { structureTool, type StructureBuilder } from "sanity/structure";
import { CmsGuide } from "./sanity/components/CmsGuide";
import { singletonDocumentIds } from "./sanity/lib/singletons";
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
            singletonItem(S, "Pengaturan Website", "siteSettings", singletonDocumentIds.siteSettings),
            singletonItem(S, "Halaman Utama", "homepage", singletonDocumentIds.homepage),
            S.documentTypeListItem("project").title("Proyek / Works"),
            S.documentTypeListItem("about").title("Studio / Tentang EVARCH"),
            S.documentTypeListItem("expertise").title("Keahlian / Expertise"),
            S.documentTypeListItem("process").title("Judul Process"),
            S.documentTypeListItem("processStep").title("Tahapan Proses"),
            S.documentTypeListItem("stra").title("Verifikasi STRA"),
            S.documentTypeListItem("regulation").title("Regulasi / Pengetahuan"),
            S.documentTypeListItem("contact").title("Kontak dan Peta"),
            singletonItem(S, "Footer Website", "footer", singletonDocumentIds.footer),
            S.listItem()
              .title("Panduan CMS")
              .child(S.component(CmsGuide).title("Panduan CMS")),
          ]),
    }),
  ],
  schema: { types: schemaTypes },
});
