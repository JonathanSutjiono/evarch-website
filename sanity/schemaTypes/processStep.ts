import { defineField, defineType } from "sanity";

export const processStep = defineType({
  name: "processStep",
  title: "Tahapan Proses",
  type: "document",
  description: "Setiap dokumen muncul sebagai satu tahapan pada section Process di halaman utama. Ubah, sembunyikan, atau hapus contoh satu per satu, lalu klik Publish agar perubahan tampil di website.",
  fields: [
    defineField({ name: "title", title: "Nama Tahap", description: "Muncul sebagai judul tahapan. Contoh: Consultation atau Design Development.", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "description", title: "Penjelasan Tahap", description: "Muncul di bawah nama tahap. Gunakan 1 kalimat yang jelas untuk calon klien.", type: "text", rows: 3 }),
    defineField({ name: "order", title: "Urutan Tampil", description: "Angka kecil tampil lebih dulu. Contoh: 1, 2, 3. Gunakan ini untuk mengatur urutan konten di website.", type: "number", initialValue: 100 }),
    defineField({ name: "showOnWebsite", title: "Tampilkan di Website", description: "Matikan jika konten ini belum ingin muncul di website. Data tetap tersimpan di CMS.", type: "boolean", initialValue: true }),
  ],
  orderings: [{ title: "Urutan Tampil", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "title", subtitle: "description", showOnWebsite: "showOnWebsite" },
    prepare: ({ title, subtitle, showOnWebsite }) => ({
      title: title || "Tahapan tanpa nama",
      subtitle: [showOnWebsite === false ? "Disembunyikan" : "Tampil di website", subtitle].filter(Boolean).join(" · "),
    }),
  },
});
