import { defineField, defineType } from "sanity";
import { ClientImageInput } from "../components/ClientImageInput";

export const project = defineType({
  name: "project",
  title: "Proyek / Works",
  type: "document",
  description: "Data ini muncul di bagian Works / Projects. Untuk menyembunyikan proyek dummy tanpa menghapusnya, matikan Tampilkan di Website lalu klik Publish. Untuk menghapus permanen, buka menu titik tiga dokumen dan pilih Delete.",
  fieldsets: [
    { name: "main", title: "Konten Utama Proyek", options: { collapsible: true } },
    { name: "visual", title: "Gambar yang Tampil di Website", options: { collapsible: true } },
    { name: "publishing", title: "Pengaturan Tampilan dan Urutan", options: { collapsible: true, collapsed: true } },
    { name: "seo", title: "Pengaturan SEO dan Share Link", options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    defineField({ name: "title", title: "Nama Proyek", description: "Tampil sebagai judul pada section Works dan kartu proyek. Gunakan nama singkat yang mudah dikenali, lalu klik Publish.", type: "string", validation: (rule) => rule.required(), fieldset: "main" }),
    defineField({ name: "category", title: "Kategori Proyek", description: "Muncul sebagai metadata di Works. Contoh: Residential, Commercial, Interior, atau Renovation.", type: "string", fieldset: "main" }),
    defineField({ name: "location", title: "Lokasi Proyek", description: "Muncul di bawah nama proyek pada section Works. Contoh: Serpong, Tangerang.", type: "string", fieldset: "main" }),
    defineField({ name: "year", title: "Tahun", description: "Muncul sebagai metadata proyek. Gunakan tahun empat digit, contoh: 2026.", type: "string", fieldset: "main" }),
    defineField({ name: "scope", title: "Lingkup pekerjaan", description: "Muncul pada detail proyek. Tambahkan setiap lingkup sebagai item terpisah, contoh: Architectural Design, lalu klik Publish.", type: "array", of: [{ type: "string" }], fieldset: "main" }),
    defineField({ name: "status", title: "Status proyek", description: "Muncul pada detail proyek. Contoh: Concept Design, Ongoing, Completed, atau Sample Work. Gunakan status faktual, lalu klik Publish.", type: "string", fieldset: "main" }),
    defineField({ name: "description", title: "Deskripsi singkat proyek", description: "Ringkasan untuk halaman/detail proyek. Gunakan 1-2 paragraf singkat, jangan membuat klaim yang belum disetujui klien, lalu klik Publish.", type: "text", rows: 5, fieldset: "main" }),
    defineField({ name: "coverImage", title: "Gambar cover proyek", description: "Gambar ini tampil sebagai gambar utama di daftar proyek dan halaman detail. Untuk mengganti, upload gambar baru. Untuk menghapus, klik tombol Hapus gambar dari konten ini. Gunakan landscape minimal 1200px lebar. Setelah selesai, klik Publish.", type: "image", options: { hotspot: true }, components: { input: ClientImageInput }, fieldset: "visual" }),
    defineField({ name: "gallery", title: "Galeri gambar proyek", description: "Gambar-gambar ini tampil di bagian galeri proyek. Upload beberapa gambar berkualitas baik. Jika file sangat besar, website tetap menampilkan versi yang dioptimasi, tetapi upload bisa lebih lama. Untuk mengganti atau menghapus gambar, gunakan kontrol pada setiap gambar lalu klik Publish.", type: "array", of: [{ type: "image", options: { hotspot: true }, components: { input: ClientImageInput } }], fieldset: "visual" }),
    defineField({ name: "showOnWebsite", title: "Tampilkan di Website", description: "Matikan jika proyek belum ingin muncul di website. Data tetap tersimpan di CMS dan dapat ditampilkan lagi kapan saja setelah klik Publish.", type: "boolean", initialValue: true, fieldset: "publishing" }),
    defineField({ name: "featured", title: "Tampilkan sebagai proyek unggulan", description: "Nyalakan bila proyek perlu diprioritaskan dalam pilihan konten di masa depan.", type: "boolean", initialValue: false, fieldset: "publishing" }),
    defineField({ name: "order", title: "Urutan Tampil", description: "Angka kecil tampil lebih dulu. Contoh: 1, 2, 3. Gunakan ini untuk mengatur urutan konten di website.", type: "number", initialValue: 100, fieldset: "publishing" }),
    defineField({ name: "published", title: "Status tampil lama", description: "Dipertahankan agar data lama tetap kompatibel. Gunakan Tampilkan di Website untuk mengatur visibilitas proyek baru dan lama.", type: "boolean", initialValue: false, fieldset: "publishing", hidden: true }),
    defineField({ name: "slug", title: "Alamat halaman proyek", description: "Dibuat dari Nama Proyek untuk URL halaman. Klik Generate setelah nama proyek diisi.", type: "slug", options: { source: "title", maxLength: 96 }, validation: (rule) => rule.required(), fieldset: "publishing" }),
    defineField({ name: "seoTitle", title: "Judul SEO proyek", description: "Opsional. Digunakan saat halaman proyek muncul di Google. Jika kosong, Nama Proyek akan dipakai.", type: "string", fieldset: "seo" }),
    defineField({ name: "seoDescription", title: "Deskripsi SEO proyek", description: "Opsional. Ringkasan singkat untuk mesin pencari, idealnya 140-160 karakter.", type: "text", rows: 3, fieldset: "seo" }),
  ],
  orderings: [{ title: "Urutan Tampil", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "title", category: "category", location: "location", year: "year", order: "order", showOnWebsite: "showOnWebsite", media: "coverImage" },
    prepare: ({ title, category, location, year, order, showOnWebsite, media }) => ({
      title: title || "Proyek tanpa nama",
      subtitle: [[category, location, year].filter(Boolean).join(" · "), typeof order === "number" ? `Urutan ${order}` : null, showOnWebsite === false ? "Disembunyikan" : "Tampil di website"].filter(Boolean).join(" · "),
      media,
    }),
  },
});
