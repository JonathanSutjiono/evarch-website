import { defineField, defineType } from "sanity";
import { ClientImageInput } from "../components/ClientImageInput";

export const stra = defineType({
  name: "stra",
  title: "Verifikasi STRA",
  type: "document",
  description: "Konten ini muncul pada section Verifikasi STRA di halaman utama. Setelah mengedit, klik Publish agar perubahan tampil di website.",
  fieldsets: [
    { name: "content", title: "Konten Section Verifikasi", options: { collapsible: true } },
    { name: "verification", title: "Link dan Tombol Verifikasi", options: { collapsible: true } },
    { name: "identity", title: "Badge dan Logo", options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    defineField({ name: "heading", title: "Judul STRA", description: "Muncul sebagai judul besar pada section Verifikasi STRA di halaman utama. Gunakan judul singkat, contoh: STRA Verification.", type: "string", fieldset: "content" }),
    defineField({ name: "description", title: "Deskripsi STRA", description: "Muncul di samping judul STRA. Jelaskan bahwa klien dapat melakukan verifikasi mandiri melalui direktori resmi.", type: "text", rows: 4, fieldset: "content" }),
    defineField({ name: "note", title: "Catatan verifikasi dan wording legal", description: "Muncul dekat badge dan logo. Gunakan wording faktual, contoh: Verification through Dewan Arsitek Indonesia STRA Directory. Jangan menulis klaim kerja sama resmi dengan DAI jika tidak ada hubungan resmi.", type: "text", rows: 3, fieldset: "content" }),
    defineField({ name: "verificationUrl", title: "Link Verifikasi STRA", description: "Tujuan tombol Verifikasi STRA. Gunakan URL direktori resmi Dewan Arsitek Indonesia, bukan link pihak ketiga.", type: "url", fieldset: "verification" }),
    defineField({ name: "buttonLabel", title: "Teks tombol Verifikasi", description: "Teks tombol utama pada section STRA. Contoh: Verify STRA Registration.", type: "string", fieldset: "verification" }),
    defineField({ name: "badgeText", title: "Teks badge STRA", description: "Muncul pada badge bulat STRA. Gunakan teks singkat, contoh: Official Directory Verification.", type: "string", fieldset: "identity" }),
    defineField({ name: "daiLogo", title: "Logo Dewan Arsitek Indonesia", description: "Logo ini tampil di bagian Verifikasi STRA sebagai referensi direktori resmi. Gunakan hanya aset yang memang disetujui. Untuk mengganti, upload logo baru. Untuk menghapus, klik Hapus gambar dari konten ini. Setelah selesai, klik Publish. Tampilan ini tidak menyatakan afiliasi EVARCH dengan DAI.", type: "image", options: { hotspot: true }, components: { input: ClientImageInput }, fieldset: "identity" }),
  ],
  preview: { prepare: () => ({ title: "Verifikasi STRA" }) },
});
