import { defineField, defineType } from "sanity";

export const contact = defineType({
  name: "contact",
  title: "Kontak dan Peta",
  type: "document",
  fieldsets: [
    { name: "content", title: "Konten Section Contact", options: { collapsible: true } },
    { name: "contact", title: "Kontak Utama", options: { collapsible: true } },
    { name: "map", title: "Lokasi dan Google Maps", options: { collapsible: true, collapsed: true } },
    { name: "social", title: "Media Sosial (opsional)", options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    defineField({ name: "heading", title: "Judul kontak", description: "Muncul sebagai judul besar pada section Contact di akhir halaman utama. Gunakan ajakan konsultasi yang jelas dan singkat.", type: "string", fieldset: "content" }),
    defineField({ name: "description", title: "Deskripsi kontak", description: "Muncul di bawah judul Contact. Jelaskan singkat hal yang dapat didiskusikan calon klien, idealnya 1-2 kalimat.", type: "text", rows: 4, fieldset: "content" }),
    defineField({ name: "whatsappNumber", title: "Nomor WhatsApp", description: "Digunakan untuk tombol konsultasi pada section Contact. Gunakan kode negara tanpa tanda +, contoh: 6281234567890. Jika kosong, website memakai nomor WhatsApp utama dari Pengaturan Website.", type: "string", fieldset: "contact" }),
    defineField({ name: "whatsappButtonLabel", title: "Teks tombol WhatsApp", description: "Teks tombol konsultasi pada section Contact. Gunakan 2-4 kata, contoh: Consult via WhatsApp.", type: "string", fieldset: "contact" }),
    defineField({ name: "email", title: "Email", description: "Muncul sebagai alamat email publik pada section Contact. Jika kosong, website memakai email utama dari Pengaturan Website.", type: "string", validation: (rule) => rule.email(), fieldset: "contact" }),
    defineField({ name: "address", title: "Alamat / lokasi", description: "Muncul sebagai lokasi pada section Contact. Gunakan format singkat yang nyaman dibaca, contoh: Jakarta, Indonesia.", type: "text", rows: 3, fieldset: "map" }),
    defineField({ name: "googleMapsUrl", title: "Link Google Maps", description: "URL lengkap untuk tombol Open location in Google Maps. Salin link lokasi langsung dari Google Maps.", type: "url", fieldset: "map" }),
    defineField({ name: "googleMapsEmbedUrl", title: "Link embed Google Maps", description: "Opsional. Gunakan URL resmi Google Maps yang diawali https://www.google.com/maps/embed agar peta dapat tampil di website.", type: "url", fieldset: "map" }),
    defineField({ name: "latitude", title: "Latitude", description: "Opsional. Koordinat lokasi untuk kebutuhan peta di masa depan.", type: "number", fieldset: "map" }),
    defineField({ name: "longitude", title: "Longitude", description: "Opsional. Koordinat lokasi untuk kebutuhan peta di masa depan.", type: "number", fieldset: "map" }),
    defineField({ name: "instagramUrl", title: "Link Instagram", description: "URL lengkap akun Instagram untuk link sosial pada section Contact.", type: "url", fieldset: "social" }),
    defineField({ name: "linkedinUrl", title: "Link LinkedIn", description: "URL lengkap halaman LinkedIn untuk link sosial pada section Contact.", type: "url", fieldset: "social" }),
  ],
  preview: { prepare: () => ({ title: "Kontak dan Peta" }) },
});
