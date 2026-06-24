import { defineField, defineType } from "sanity";

export const process = defineType({
  name: "process",
  title: "Proses Kerja",
  type: "document",
  description: "Konten ini mengatur judul dan pengantar section Process di halaman utama. Tahapan proses dikelola satu per satu melalui menu Tahapan Proses. Setelah mengedit, klik Publish agar perubahan tampil di website.",
  fieldsets: [
    { name: "heading", title: "Judul dan Pengantar Section Process", options: { collapsible: true } },
  ],
  fields: [
    defineField({ name: "eyebrow", title: "Label kecil", description: "Tampil di atas judul besar section. Contoh: Process. Klik Publish setelah mengubahnya.", type: "string", fieldset: "heading" }),
    defineField({ name: "heading", title: "Judul utama", description: "Tampil sebagai judul besar section Process. Gunakan kalimat ringkas yang mudah dipahami calon klien, lalu klik Publish.", type: "text", rows: 3, fieldset: "heading" }),
    defineField({ name: "description", title: "Deskripsi pendek", description: "Tampil di bawah judul utama untuk menjelaskan alur kerja EVARCH. Idealnya 1-2 kalimat, lalu klik Publish.", type: "text", rows: 3, fieldset: "heading" }),
  ],
  preview: { prepare: () => ({ title: "Proses Kerja" }) },
});
