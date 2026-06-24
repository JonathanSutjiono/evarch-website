import { defineArrayMember, defineField, defineType } from "sanity";
import { ClientImageInput } from "../components/ClientImageInput";

export const about = defineType({
  name: "about",
  title: "Studio / Tentang EVARCH",
  type: "document",
  description: "Konten ini mengatur section Studio di halaman utama, termasuk judul, pernyataan pengantar, dan tiga prinsip desain. Setelah mengedit, klik Publish agar perubahan tampil di website.",
  fieldsets: [
    { name: "content", title: "Konten Utama Section Studio", options: { collapsible: true } },
    { name: "principles", title: "Prinsip Desain yang Tampil di Website", options: { collapsible: true } },
    { name: "visual", title: "Gambar Website (opsional)", options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    defineField({ name: "heading", title: "Judul besar Studio", description: "Tampil sebagai judul besar pada section Studio di halaman utama. Gunakan judul pendek dan jelas, lalu klik Publish agar perubahan tampil.", type: "string", fieldset: "content" }),
    defineField({ name: "body", title: "Pernyataan pengantar Studio", description: "Tampil sebagai paragraf pengantar di sebelah kanan judul Studio. Jelaskan pendekatan EVARCH dalam 1-2 paragraf yang mudah dipahami calon klien. Setelah mengubah teks, klik Publish.", type: "array", of: [defineArrayMember({ type: "block" })], fieldset: "content" }),
    defineField({
      name: "values",
      title: "Tiga prinsip desain",
      description: "Tiga item ini tampil sebagai panel Context, Clarity, dan Compliance pada section Studio. Gunakan judul singkat dan penjelasan 1-2 kalimat untuk tiap prinsip, lalu klik Publish.",
      type: "array",
      fieldset: "principles",
      of: [defineArrayMember({ type: "object", fields: [
        defineField({ name: "title", title: "Nama prinsip", description: "Tampil sebagai judul besar pada panel prinsip, contoh: Context. Gunakan satu kata atau frasa singkat, lalu klik Publish.", type: "string" }),
        defineField({ name: "description", title: "Penjelasan prinsip", description: "Tampil di bawah nama prinsip. Gunakan bahasa singkat, konkret, dan mudah dipahami calon klien, lalu klik Publish.", type: "text", rows: 3 }),
      ] })],
    }),
    defineField({ name: "image", title: "Gambar Studio", description: "Disiapkan sebagai aset visual Studio untuk penggunaan tampilan berikutnya. Gunakan gambar arsitektur landscape yang bersih. Untuk mengganti atau menghapus gambar dari dokumen ini, gunakan kontrol gambar lalu klik Publish.", type: "image", options: { hotspot: true }, components: { input: ClientImageInput }, fieldset: "visual" }),
  ],
  preview: { prepare: () => ({ title: "Studio / Tentang EVARCH" }) },
});
