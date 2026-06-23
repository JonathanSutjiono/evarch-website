import { defineField, defineType } from "sanity";

export const expertise = defineType({
  name: "expertise",
  title: "Keahlian / Expertise",
  type: "document",
  description: "Setiap item muncul sebagai area layanan pada section Expertise. Matikan Tampilkan di Website bila layanan belum ingin dipublikasikan tanpa menghapus datanya.",
  fields: [
    defineField({ name: "title", title: "Nama keahlian", description: "Muncul sebagai judul area layanan pada section Expertise. Contoh: Residential Architecture.", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "description", title: "Deskripsi singkat", description: "Muncul di bawah nama keahlian. Jelaskan layanan dalam 1-2 kalimat yang mudah dipahami calon klien.", type: "text", rows: 4 }),
    defineField({ name: "order", title: "Urutan Tampil", description: "Angka kecil tampil lebih dulu. Contoh: 1, 2, 3. Gunakan ini untuk mengatur urutan konten di website.", type: "number", initialValue: 100 }),
    defineField({ name: "showOnWebsite", title: "Tampilkan di Website", description: "Matikan jika konten ini belum ingin muncul di website. Data tetap tersimpan di CMS.", type: "boolean", initialValue: true }),
    defineField({ name: "published", title: "Status tampil lama", description: "Dipertahankan agar data lama tetap kompatibel. Gunakan Tampilkan di Website untuk mengatur visibilitas.", type: "boolean", initialValue: false, hidden: true }),
  ],
  orderings: [{ title: "Urutan Tampil", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "title", subtitle: "description", showOnWebsite: "showOnWebsite" },
    prepare: ({ title, subtitle, showOnWebsite }) => ({
      title: title || "Keahlian tanpa nama",
      subtitle: [showOnWebsite === false ? "Disembunyikan" : "Tampil di website", subtitle].filter(Boolean).join(" · "),
    }),
  },
});
