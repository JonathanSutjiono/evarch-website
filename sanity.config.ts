import { defineConfig } from "sanity";
import { structureTool, type StructureBuilder } from "sanity/structure";
import { CmsGuide } from "./sanity/components/CmsGuide";
import { StudioLogo } from "./sanity/components/StudioLogo";
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
  title: "EVARCH.ID CMS",
  logo: StudioLogo,
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Konten Website EVARCH.ID")
          .items([
            singletonItem(S, "Pengaturan Website", "siteSettings", singletonDocumentIds.siteSettings),
            singletonItem(S, "Halaman Utama", "homepage", singletonDocumentIds.homepage),
            S.documentTypeListItem("about").title("Studio / Tentang EVARCH"),
            S.divider(),
            S.documentTypeListItem("project").title("Proyek yang Tampil / Works"),
            S.documentTypeListItem("expertise").title("Keahlian yang Tampil / Expertise"),
            S.documentTypeListItem("process").title("Judul dan Pengantar Process"),
            S.documentTypeListItem("processStep").title("Tahapan Proses"),
            S.documentTypeListItem("regulation").title("Regulasi / Pengetahuan"),
            S.divider(),
            S.documentTypeListItem("stra").title("Verifikasi STRA"),
            S.documentTypeListItem("contact").title("Kontak dan Peta"),
            singletonItem(S, "Footer Website", "footer", singletonDocumentIds.footer),
            S.divider(),
            S.listItem()
              .title("Panduan CMS")
              .child(S.component(CmsGuide).title("Panduan CMS")),
          ]),
    }),
  ],
  schema: { types: schemaTypes },
});
