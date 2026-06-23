import { defineField, defineType } from "sanity";

export const process = defineType({
  name: "process",
  title: "Proses Kerja",
  type: "document",
  description: "Konten ini mengatur judul section Process di halaman utama. Tahapan proses dikelola satu per satu melalui menu Tahapan Proses. Setelah mengedit, klik Publish agar perubahan tampil di website.",
  fieldsets: [
    { name: "heading", title: "Judul Section", options: { collapsible: true } },
  ],
  fields: [
    defineField({ name: "eyebrow", title: "Label kecil", description: "Muncul di atas judul besar section. Contoh: Process.", type: "string", fieldset: "heading" }),
    defineField({ name: "heading", title: "Judul utama", description: "Muncul sebagai judul besar section Process. Gunakan kalimat yang ringkas dan mudah dipahami calon klien.", type: "text", rows: 3, fieldset: "heading" }),
    defineField({ name: "description", title: "Deskripsi pendek", description: "Muncul di bawah judul utama untuk menjelaskan alur kerja EVARCH. Idealnya 1-2 kalimat.", type: "text", rows: 3, fieldset: "heading" }),
  ],
  preview: { prepare: () => ({ title: "Proses Kerja" }) },
});
