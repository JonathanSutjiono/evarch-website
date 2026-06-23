import { defineArrayMember, defineField, defineType } from "sanity";

export const footer = defineType({
  name: "footer",
  title: "Footer Website",
  type: "document",
  description: "Konten ini muncul di bagian paling bawah website. Setelah mengedit, klik Publish agar perubahan tampil di website.",
  fields: [
    defineField({ name: "shortDescription", title: "Teks footer", description: "Muncul di bagian bawah website, di bawah nama EVARCH. Gunakan deskripsi studio yang sangat singkat, 1-2 baris.", type: "text", rows: 3 }),
    defineField({ name: "copyrightText", title: "Teks copyright", description: "Muncul paling bawah pada footer. Contoh: Copyright 2026 EVARCH.ID.", type: "string" }),
    defineField({
      name: "links",
      title: "Link footer",
      description: "Link navigasi yang muncul di footer. Gunakan label singkat dan URL atau anchor section yang benar, contoh: #studio.",
      type: "array",
      of: [defineArrayMember({ type: "object", fields: [
        defineField({ name: "label", title: "Nama link", description: "Teks yang dilihat pengunjung, contoh: Studio.", type: "string" }),
        defineField({ name: "url", title: "Tujuan link", description: "Gunakan anchor seperti #studio untuk section di halaman utama, atau URL lengkap untuk link eksternal.", type: "string" }),
      ] })],
    }),
  ],
  preview: { prepare: () => ({ title: "Footer Website" }) },
});
