import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Pengaturan Website",
  type: "document",
  description: "Pengaturan ini dipakai secara global di website, termasuk navigasi, SEO, dan kontak utama. Setelah mengedit, klik Publish agar perubahan tampil di website.",
  fieldsets: [
    { name: "identity", title: "Identitas Website", options: { collapsible: true } },
    { name: "contact", title: "Kontak Utama", options: { collapsible: true } },
    { name: "seo", title: "SEO dan Tampilan Saat Dibagikan", options: { collapsible: true, collapsed: true } },
    { name: "social", title: "Media Sosial", options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    defineField({ name: "companyName", title: "Nama website / studio", description: "Nama yang tampil pada navigasi dan metadata website. Contoh: EVARCH.ID.", type: "string", fieldset: "identity" }),
    defineField({ name: "logo", title: "Logo utama", description: "Logo yang tampil pada header website. Gunakan file horizontal dengan ruang kosong yang cukup di sekeliling logo. File PNG atau SVG ringan paling aman; tidak perlu mengunggah file sangat besar.", type: "image", options: { hotspot: true }, fieldset: "identity" }),
    defineField({ name: "logoMark", title: "Logo simbol (opsional)", description: "Digunakan bila versi simbol/logo pendek diperlukan. Unggah file persegi atau mendekati persegi.", type: "image", options: { hotspot: true }, fieldset: "identity" }),
    defineField({ name: "favicon", title: "Ikon browser", description: "Ikon kecil pada tab browser. Gunakan gambar persegi, minimal 96 x 96 px.", type: "image", fieldset: "identity" }),
    defineField({ name: "tagline", title: "Deskripsi singkat studio", description: "Ringkasan tentang EVARCH untuk penggunaan global di website. Idealnya 1 kalimat.", type: "string", fieldset: "identity" }),
    defineField({ name: "whatsappNumber", title: "Nomor WhatsApp utama", description: "Digunakan untuk tombol konsultasi di website, termasuk tombol WhatsApp pada section STRA. Gunakan kode negara tanpa tanda +, contoh: 6281234567890.", type: "string", fieldset: "contact" }),
    defineField({ name: "email", title: "Email utama", description: "Email yang tampil pada section Contact dan dipakai untuk kontak publik.", type: "string", validation: (rule) => rule.email(), fieldset: "contact" }),
    defineField({ name: "defaultSeoTitle", title: "Judul SEO default", description: "Judul saat halaman dibuka di Google atau dibagikan. Gunakan nama studio dan layanan utama, idealnya di bawah 60 karakter.", type: "string", fieldset: "seo" }),
    defineField({ name: "defaultSeoDescription", title: "Deskripsi SEO default", description: "Ringkasan untuk mesin pencari dan preview link. Idealnya 140-160 karakter dan mudah dipahami calon klien.", type: "text", rows: 3, fieldset: "seo" }),
    defineField({ name: "defaultOgImage", title: "Gambar saat link dibagikan", description: "Gambar yang tampil saat link EVARCH dibagikan ke WhatsApp atau media sosial. Gunakan gambar landscape berkualitas tinggi, ideal 1200 x 630 px dan di bawah 2 MB.", type: "image", options: { hotspot: true }, fieldset: "seo" }),
    defineField({ name: "instagramUrl", title: "Link Instagram", description: "URL lengkap akun Instagram EVARCH. Ini memengaruhi link sosial di website.", type: "url", fieldset: "social" }),
    defineField({ name: "linkedinUrl", title: "Link LinkedIn", description: "URL lengkap halaman LinkedIn EVARCH. Ini memengaruhi link sosial di website.", type: "url", fieldset: "social" }),
  ],
  preview: { prepare: () => ({ title: "Pengaturan Website" }) },
});
