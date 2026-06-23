import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Proyek / Works",
  type: "document",
  description: "Data ini muncul di bagian Works / Projects. Untuk menyembunyikan proyek dummy tanpa menghapusnya, matikan Tampilkan di Website lalu klik Publish. Untuk menghapus permanen, buka menu titik tiga dokumen dan pilih Delete.",
  fieldsets: [
    { name: "main", title: "Informasi Proyek", options: { collapsible: true } },
    { name: "visual", title: "Gambar Proyek", options: { collapsible: true } },
    { name: "publishing", title: "Tampilan dan Publikasi", options: { collapsible: true, collapsed: true } },
    { name: "seo", title: "SEO (opsional)", options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    defineField({ name: "title", title: "Nama Proyek", description: "Muncul sebagai judul pada section Works dan kartu proyek. Gunakan nama singkat yang mudah dikenali.", type: "string", validation: (rule) => rule.required(), fieldset: "main" }),
    defineField({ name: "category", title: "Kategori Proyek", description: "Muncul sebagai metadata di Works. Contoh: Residential, Commercial, Interior, atau Renovation.", type: "string", fieldset: "main" }),
    defineField({ name: "location", title: "Lokasi Proyek", description: "Muncul di bawah nama proyek pada section Works. Contoh: Serpong, Tangerang.", type: "string", fieldset: "main" }),
    defineField({ name: "year", title: "Tahun", description: "Muncul sebagai metadata proyek. Gunakan tahun empat digit, contoh: 2026.", type: "string", fieldset: "main" }),
    defineField({ name: "scope", title: "Lingkup pekerjaan", description: "Muncul pada detail proyek. Tambahkan setiap lingkup sebagai item terpisah, contoh: Architectural Design.", type: "array", of: [{ type: "string" }], fieldset: "main" }),
    defineField({ name: "status", title: "Status proyek", description: "Muncul pada detail proyek. Contoh: Concept Design, Ongoing, Completed, atau Sample Work.", type: "string", fieldset: "main" }),
    defineField({ name: "description", title: "Deskripsi singkat proyek", description: "Ringkasan untuk halaman/detail proyek. Gunakan 1-2 paragraf singkat dan jangan membuat klaim yang belum disetujui klien.", type: "text", rows: 5, fieldset: "main" }),
    defineField({ name: "coverImage", title: "Gambar cover proyek", description: "Gambar ini muncul di kartu proyek pada bagian Works. Gunakan gambar landscape yang bersih. Rekomendasi: minimal 1200 px lebar, rasio 4:3 atau 16:9, ukuran ideal di bawah 2-3 MB. Untuk mengganti gambar, upload gambar baru lalu klik Publish; untuk menghapus gambar, buka field ini lalu pilih Remove/Unset asset.", type: "image", options: { hotspot: true }, fieldset: "visual" }),
    defineField({ name: "gallery", title: "Galeri gambar proyek", description: "Upload beberapa gambar berkualitas baik. Jika file sangat besar, website tetap akan menampilkan versi yang dioptimasi, tetapi upload bisa lebih lama. Gunakan urutan yang membantu menceritakan proyek; landscape lebih aman untuk tampilan website. Untuk menghapus gambar, pilih gambar lalu Remove/Unset asset.", type: "array", of: [{ type: "image", options: { hotspot: true } }], fieldset: "visual" }),
    defineField({ name: "showOnWebsite", title: "Tampilkan di Website", description: "Matikan jika proyek ini belum ingin muncul di website tanpa harus menghapus datanya. Setelah mengubah pilihan ini, klik Publish.", type: "boolean", initialValue: true, fieldset: "publishing" }),
    defineField({ name: "featured", title: "Tampilkan sebagai proyek unggulan", description: "Nyalakan bila proyek perlu diprioritaskan dalam pilihan konten di masa depan.", type: "boolean", initialValue: false, fieldset: "publishing" }),
    defineField({ name: "order", title: "Urutan tampil", description: "Angka lebih kecil tampil lebih dulu pada Works. Contoh: 1, 2, 3.", type: "number", initialValue: 100, fieldset: "publishing" }),
    defineField({ name: "published", title: "Status tampil lama", description: "Dipertahankan agar data lama tetap kompatibel. Gunakan Tampilkan di Website untuk mengatur visibilitas proyek baru dan lama.", type: "boolean", initialValue: false, fieldset: "publishing", hidden: true }),
    defineField({ name: "slug", title: "Alamat halaman proyek", description: "Dibuat dari Nama Proyek untuk URL halaman. Klik Generate setelah nama proyek diisi.", type: "slug", options: { source: "title", maxLength: 96 }, validation: (rule) => rule.required(), fieldset: "publishing" }),
    defineField({ name: "seoTitle", title: "Judul SEO proyek", description: "Opsional. Digunakan saat halaman proyek muncul di Google. Jika kosong, Nama Proyek akan dipakai.", type: "string", fieldset: "seo" }),
    defineField({ name: "seoDescription", title: "Deskripsi SEO proyek", description: "Opsional. Ringkasan singkat untuk mesin pencari, idealnya 140-160 karakter.", type: "text", rows: 3, fieldset: "seo" }),
  ],
  orderings: [{ title: "Urutan tampil", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "category", media: "coverImage" } },
});
