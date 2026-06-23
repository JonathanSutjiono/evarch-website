import { defineArrayMember, defineField, defineType } from "sanity";

export const regulation = defineType({
  name: "regulation",
  title: "Regulasi / Pengetahuan",
  type: "document",
  description: "Konten ini muncul pada section Regulation. Gunakan Tampilkan di Website untuk menyembunyikan artikel draft atau contoh tanpa menghapusnya.",
  fieldsets: [
    { name: "main", title: "Konten Regulasi", options: { collapsible: true } },
    { name: "publishing", title: "Publikasi", options: { collapsible: true, collapsed: true } },
    { name: "seo", title: "SEO (opsional)", options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    defineField({ name: "title", title: "Judul regulasi", description: "Muncul sebagai judul artikel pada section Regulation. Gunakan judul yang jelas dan mudah dipahami, bukan istilah legal yang terlalu panjang.", type: "string", validation: (rule) => rule.required(), fieldset: "main" }),
    defineField({ name: "category", title: "Kategori", description: "Muncul sebagai label artikel. Contoh: STRA, PBG / IMB, atau Professional Practice.", type: "string", fieldset: "main" }),
    defineField({ name: "excerpt", title: "Ringkasan", description: "Muncul di bawah judul pada section Regulation. Ringkas isi artikel dalam 1-2 kalimat.", type: "text", rows: 4, fieldset: "main" }),
    defineField({ name: "content", title: "Isi artikel", description: "Isi lengkap artikel regulasi atau pengetahuan. Gunakan paragraf pendek, heading jelas, dan gambar hanya bila benar-benar membantu.", type: "array", of: [defineArrayMember({ type: "block" }), defineArrayMember({ type: "image", options: { hotspot: true } })], fieldset: "main" }),
    defineField({ name: "coverImage", title: "Gambar cover artikel", description: "Opsional. Gunakan gambar arsitektur landscape yang relevan dan tajam, idealnya minimal 1200 px lebar dan di bawah 2-3 MB. Website akan menampilkan versi yang dioptimasi. Hindari foto blur atau gambar situs konstruksi yang tidak rapi.", type: "image", options: { hotspot: true }, fieldset: "main" }),
    defineField({ name: "readTime", title: "Estimasi waktu baca", description: "Muncul sebagai metadata artikel. Contoh: 4 min read.", type: "string", fieldset: "main" }),
    defineField({ name: "publishedAt", title: "Tanggal publikasi", description: "Digunakan untuk urutan konten Regulation. Pilih tanggal saat artikel siap ditampilkan.", type: "datetime", fieldset: "publishing" }),
    defineField({ name: "showOnWebsite", title: "Tampilkan di Website", description: "Matikan jika artikel ini belum ingin muncul di website tanpa harus menghapus datanya. Klik Publish setelah mengubah pilihan ini.", type: "boolean", initialValue: true, fieldset: "publishing" }),
    defineField({ name: "published", title: "Status tampil lama", description: "Dipertahankan agar data lama tetap kompatibel. Gunakan Tampilkan di Website untuk mengatur visibilitas.", type: "boolean", initialValue: false, fieldset: "publishing", hidden: true }),
    defineField({ name: "slug", title: "Alamat artikel", description: "Dibuat dari Judul regulasi untuk URL halaman. Klik Generate setelah judul diisi.", type: "slug", options: { source: "title", maxLength: 96 }, validation: (rule) => rule.required(), fieldset: "publishing" }),
    defineField({ name: "seoTitle", title: "Judul SEO", description: "Opsional. Judul untuk Google; jika kosong, Judul regulasi akan digunakan.", type: "string", fieldset: "seo" }),
    defineField({ name: "seoDescription", title: "Deskripsi SEO", description: "Opsional. Ringkasan untuk mesin pencari, idealnya 140-160 karakter.", type: "text", rows: 3, fieldset: "seo" }),
  ],
  preview: { select: { title: "title", subtitle: "category", media: "coverImage" } },
});
