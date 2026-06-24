import { defineField, defineType } from "sanity";

export const expertise = defineType({
  name: "expertise",
  title: "Keahlian / Expertise",
  type: "document",
  description: "Setiap item tampil sebagai area layanan pada section Expertise di halaman utama. Matikan Tampilkan di Website bila layanan belum ingin dipublikasikan tanpa menghapus datanya, lalu klik Publish.",
  fields: [
    defineField({ name: "title", title: "Nama keahlian", description: "Tampil sebagai judul area layanan pada section Expertise. Contoh: Residential Architecture. Klik Publish setelah mengubahnya.", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "description", title: "Deskripsi singkat", description: "Tampil di bawah nama keahlian. Jelaskan layanan dalam 1-2 kalimat yang mudah dipahami calon klien, lalu klik Publish.", type: "text", rows: 4 }),
    defineField({ name: "order", title: "Urutan Tampil", description: "Angka kecil tampil lebih dulu. Contoh: 1, 2, 3. Gunakan ini untuk mengatur urutan konten di website.", type: "number", initialValue: 100 }),
    defineField({ name: "showOnWebsite", title: "Tampilkan di Website", description: "Matikan jika konten ini belum ingin muncul di website. Data tetap tersimpan di CMS.", type: "boolean", initialValue: true }),
    defineField({ name: "published", title: "Status tampil lama", description: "Dipertahankan agar data lama tetap kompatibel. Gunakan Tampilkan di Website untuk mengatur visibilitas.", type: "boolean", initialValue: false, hidden: true }),
  ],
  orderings: [{ title: "Urutan Tampil", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "title", subtitle: "description", order: "order", showOnWebsite: "showOnWebsite" },
    prepare: ({ title, subtitle, order, showOnWebsite }) => ({
      title: title || "Keahlian tanpa nama",
      subtitle: [typeof order === "number" ? `Urutan ${order}` : null, showOnWebsite === false ? "Disembunyikan" : "Tampil di website", subtitle].filter(Boolean).join(" · "),
    }),
  },
});
