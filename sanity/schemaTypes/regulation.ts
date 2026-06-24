import { defineArrayMember, defineField, defineType } from "sanity";
import { ClientImageInput } from "../components/ClientImageInput";

export const regulation = defineType({
  name: "regulation",
  title: "Regulasi / Pengetahuan",
  type: "document",
  description: "Konten ini muncul pada section Regulation. Gunakan Tampilkan di Website untuk menyembunyikan artikel draft atau contoh tanpa menghapusnya.",
  fieldsets: [
    { name: "main", title: "Konten Regulasi yang Tampil di Website", options: { collapsible: true } },
    { name: "publishing", title: "Pengaturan Tampilan dan Urutan", options: { collapsible: true, collapsed: true } },
    { name: "seo", title: "Pengaturan SEO dan Share Link", options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    defineField({ name: "title", title: "Judul regulasi", description: "Tampil sebagai judul artikel pada section Regulation. Gunakan judul yang jelas dan mudah dipahami, bukan istilah legal yang terlalu panjang. Klik Publish setelah mengubahnya.", type: "string", validation: (rule) => rule.required(), fieldset: "main" }),
    defineField({ name: "category", title: "Kategori", description: "Tampil sebagai label artikel. Contoh: STRA, PBG / IMB, atau Professional Practice.", type: "string", fieldset: "main" }),
    defineField({ name: "excerpt", title: "Ringkasan", description: "Tampil di bawah judul pada section Regulation. Ringkas isi artikel dalam 1-2 kalimat, lalu klik Publish.", type: "text", rows: 4, fieldset: "main" }),
    defineField({ name: "content", title: "Isi artikel", description: "Isi lengkap artikel regulasi atau pengetahuan. Gunakan paragraf pendek, heading jelas, dan gambar hanya bila benar-benar membantu.", type: "array", of: [defineArrayMember({ type: "block" }), defineArrayMember({ type: "image", options: { hotspot: true }, components: { input: ClientImageInput } })], fieldset: "main" }),
    defineField({ name: "coverImage", title: "Gambar cover artikel", description: "Opsional. Disiapkan untuk tampilan visual artikel Regulation bila digunakan. Gunakan gambar arsitektur landscape yang relevan dan tajam, idealnya minimal 1200px lebar. Setelah mengganti atau menghapus gambar, klik Publish.", type: "image", options: { hotspot: true }, components: { input: ClientImageInput }, fieldset: "main" }),
    defineField({ name: "readTime", title: "Estimasi waktu baca", description: "Muncul sebagai metadata artikel. Contoh: 4 min read.", type: "string", fieldset: "main" }),
    defineField({ name: "publishedAt", title: "Tanggal publikasi", description: "Digunakan untuk urutan konten Regulation. Pilih tanggal saat artikel siap ditampilkan.", type: "datetime", fieldset: "publishing" }),
    defineField({ name: "order", title: "Urutan Tampil", description: "Angka kecil tampil lebih dulu. Contoh: 1, 2, 3. Gunakan ini untuk mengatur urutan konten di website.", type: "number", initialValue: 100, fieldset: "publishing" }),
    defineField({ name: "showOnWebsite", title: "Tampilkan di Website", description: "Matikan jika konten ini belum ingin muncul di website. Data tetap tersimpan di CMS.", type: "boolean", initialValue: true, fieldset: "publishing" }),
    defineField({ name: "published", title: "Status tampil lama", description: "Dipertahankan agar data lama tetap kompatibel. Gunakan Tampilkan di Website untuk mengatur visibilitas.", type: "boolean", initialValue: false, fieldset: "publishing", hidden: true }),
    defineField({ name: "slug", title: "Alamat artikel", description: "Dibuat dari Judul regulasi untuk URL halaman. Klik Generate setelah judul diisi.", type: "slug", options: { source: "title", maxLength: 96 }, validation: (rule) => rule.required(), fieldset: "publishing" }),
    defineField({ name: "seoTitle", title: "Judul SEO", description: "Opsional. Judul untuk Google; jika kosong, Judul regulasi akan digunakan.", type: "string", fieldset: "seo" }),
    defineField({ name: "seoDescription", title: "Deskripsi SEO", description: "Opsional. Ringkasan untuk mesin pencari, idealnya 140-160 karakter.", type: "text", rows: 3, fieldset: "seo" }),
  ],
  orderings: [{ title: "Urutan Tampil", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "title", category: "category", order: "order", showOnWebsite: "showOnWebsite", media: "coverImage" },
    prepare: ({ title, category, order, showOnWebsite, media }) => ({
      title: title || "Regulasi tanpa judul",
      subtitle: [category, typeof order === "number" ? `Urutan ${order}` : null, showOnWebsite === false ? "Disembunyikan" : "Tampil di website"].filter(Boolean).join(" · "),
      media,
    }),
  },
});
