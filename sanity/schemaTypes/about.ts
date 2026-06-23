import { defineArrayMember, defineField, defineType } from "sanity";

export const about = defineType({
  name: "about",
  title: "Studio / Tentang EVARCH",
  type: "document",
  description: "Konten ini muncul pada section Studio di halaman utama. Setelah mengedit, klik Publish agar perubahan tampil di website.",
  fieldsets: [
    { name: "content", title: "Konten Section Studio", options: { collapsible: true } },
    { name: "principles", title: "Prinsip Desain", options: { collapsible: true } },
    { name: "visual", title: "Gambar Studio (opsional)", options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    defineField({ name: "heading", title: "Judul section Studio", description: "Muncul sebagai judul pada section Studio di halaman utama. Gunakan judul pendek dan jelas.", type: "string", fieldset: "content" }),
    defineField({ name: "body", title: "Deskripsi studio", description: "Muncul sebagai pengantar section Studio. Jelaskan pendekatan EVARCH dalam 1-2 paragraf yang mudah dipahami calon klien.", type: "array", of: [defineArrayMember({ type: "block" })], fieldset: "content" }),
    defineField({
      name: "values",
      title: "Prinsip desain",
      description: "Muncul sebagai tiga prinsip desain, misalnya Context, Clarity, dan Compliance. Gunakan judul singkat dan penjelasan 1-2 kalimat untuk tiap prinsip.",
      type: "array",
      fieldset: "principles",
      of: [defineArrayMember({ type: "object", fields: [
        defineField({ name: "title", title: "Nama prinsip", description: "Muncul sebagai judul besar, contoh: Context.", type: "string" }),
        defineField({ name: "description", title: "Penjelasan prinsip", description: "Muncul di bawah nama prinsip. Gunakan bahasa singkat, konkret, dan mudah dipahami.", type: "text", rows: 3 }),
      ] })],
    }),
    defineField({ name: "image", title: "Gambar Studio", description: "Disiapkan sebagai aset visual Studio. Gunakan gambar arsitektur landscape yang bersih; field ini belum menjadi fokus tampilan halaman utama saat ini.", type: "image", options: { hotspot: true }, fieldset: "visual" }),
  ],
  preview: { prepare: () => ({ title: "Studio / Tentang EVARCH" }) },
});
