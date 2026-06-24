"use client";

import { useState } from "react";
import { useClient } from "sanity";
import { seedEvarchContent } from "../seedContent";

export function CmsGuide() {
  const client = useClient({ apiVersion: "2025-02-07" });
  const [isSeeding, setIsSeeding] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);

  async function handleSeed() {
    setIsSeeding(true);
    setMessage(null);
    setHasError(false);

    try {
      const result = await seedEvarchContent(client);
      const totalCollections = result.collectionsCreated.projects + result.collectionsCreated.expertise + result.collectionsCreated.processSteps + result.collectionsCreated.regulations;
      setMessage(
        result.singletonsCreated || totalCollections
          ? `Selesai: ${result.singletonsCreated} konten utama dan ${totalCollections} item contoh ditambahkan. Buka dokumen lalu klik Publish bila Anda membuat perubahan.`
          : "Tidak ada data yang ditambahkan. Konten yang sudah ada tetap dipertahankan.",
      );
    } catch {
      setHasError(true);
      setMessage("Konten belum dapat disiapkan. Pastikan Anda memiliki akses Editor atau Administrator, lalu coba lagi.");
    } finally {
      setIsSeeding(false);
    }
  }

  return (
    <main className="cms-guide">
      <header>
        <p className="cms-guide-kicker">EVARCH.ID Content Editor</p>
        <h1>Panduan CMS</h1>
        <p>Edit konten di Studio, lalu klik Publish agar perubahan tampil di website. Draft hanya terlihat di Studio sampai dipublikasikan.</p>
      </header>

      <section className="cms-guide-workflow" aria-labelledby="cms-guide-workflow-title">
        <div>
          <p className="cms-guide-kicker">Alur aman setiap perubahan</p>
          <h2 id="cms-guide-workflow-title">Edit, periksa, lalu Publish.</h2>
        </div>
        <ol>
          <li><strong>1. Edit</strong><span>Ubah teks, urutan, visibilitas, atau gambar pada dokumen yang sesuai.</span></li>
          <li><strong>2. Periksa</strong><span>Baca ulang nomor WhatsApp, link, nama proyek, dan gambar sebelum dipublikasikan.</span></li>
          <li><strong>3. Publish</strong><span>Klik Publish agar versi Draft menjadi konten yang terlihat di website.</span></li>
        </ol>
      </section>

      <section className="cms-guide-seed" aria-labelledby="cms-guide-seed-title">
        <h2 id="cms-guide-seed-title">Mulai dari konten website saat ini</h2>
        <p>Tombol ini menambahkan konten contoh yang sedang terlihat di website hanya bila dokumen atau koleksinya masih kosong. Konten yang sudah ada tidak akan ditimpa atau diduplikasi.</p>
        <button type="button" onClick={handleSeed} disabled={isSeeding}>
          {isSeeding ? "Menyiapkan konten..." : "Isi CMS dari Konten Website Saat Ini"}
        </button>
        {message ? <p className={hasError ? "is-error" : "is-success"} role="status">{message}</p> : null}
      </section>

      <section aria-labelledby="cms-guide-steps-title">
        <h2 id="cms-guide-steps-title">Cara mengelola konten</h2>
        <ol>
          <li>Buka menu konten di sebelah kiri, ubah teks atau gambar, lalu klik Publish agar perubahan tampil di website.</li>
          <li>Draft adalah perubahan yang masih tersimpan di Studio. Published adalah versi yang sudah dapat dilihat pengunjung di website.</li>
          <li>Untuk mengganti gambar, buka field gambar, pilih gambar baru atau upload file baru, lalu Publish.</li>
          <li>Untuk menyembunyikan proyek, keahlian, tahapan proses, atau regulasi, matikan Tampilkan di Website lalu Publish.</li>
          <li>Untuk menghapus konten dummy permanen, buka dokumen, pilih menu titik tiga, lalu Delete. Konten tersebut tidak akan muncul kembali dari fallback.</li>
          <li>Atur Urutan Tampil dengan angka kecil terlebih dahulu, lalu Publish.</li>
          <li>Jangan menghapus konten penting tanpa memastikan ada versi cadangan atau konten pengganti yang siap dipublikasikan.</li>
        </ol>
        <p>Sebelum Publish, cek ulang nama proyek, nomor WhatsApp, email, dan link. Untuk STRA, jangan mengubah wording legal atau link direktori menjadi klaim afiliasi organisasi.</p>
        <p>Untuk seed dari terminal dengan token privat, ikuti panduan di <code>docs/sanity-seeding.md</code>.</p>
        <p>Cek hasilnya di <a href="https://evarch.id" target="_blank" rel="noopener noreferrer">evarch.id</a>.</p>
      </section>

      <section aria-labelledby="cms-guide-location-title">
        <h2 id="cms-guide-location-title">Konten Muncul di Mana?</h2>
        <ol>
          <li>Halaman Utama mengatur Hero dan judul beberapa section di beranda.</li>
          <li>Hero adalah tampilan pertama saat website dibuka. Works adalah daftar proyek yang dapat disusun, disembunyikan, atau dihapus satu per satu.</li>
          <li>Studio / Tentang EVARCH mengatur narasi Studio serta tiga prinsip desain.</li>
          <li>Proyek / Works, Keahlian, Tahapan Proses, dan Regulasi adalah daftar item yang dapat diatur urutannya atau disembunyikan.</li>
          <li>Verifikasi STRA mengatur informasi verifikasi mandiri. Kontak dan Peta serta Footer Website mengatur informasi kontak publik.</li>
        </ol>
        <p>Untuk wording STRA, gunakan kalimat faktual tentang verifikasi mandiri melalui Direktori STRA Dewan Arsitek Indonesia. Jangan menulis klaim afiliasi organisasi bila tidak ada hubungan resmi.</p>
      </section>

      <section aria-labelledby="cms-guide-images-title">
        <h2 id="cms-guide-images-title">Mengganti atau Menghapus Gambar</h2>
        <ol>
          <li>Buka dokumen yang ingin diubah, lalu cari field gambar yang sesuai.</li>
          <li>Preview dengan label Gambar yang sedang digunakan menunjukkan aset yang aktif untuk konten tersebut.</li>
          <li>Untuk mengganti, gunakan kontrol upload atau pilih aset lain di bawah preview. Atur crop atau hotspot bila diperlukan.</li>
          <li>Untuk menghapus dari konten ini, klik Hapus gambar dari konten ini. Tindakan ini hanya melepas gambar dari dokumen, bukan menghapus file asli dari library media.</li>
          <li>Klik Publish agar perubahan tampil di website.</li>
        </ol>
        <p>Untuk cover proyek, gunakan gambar landscape minimal 1200px lebar. Untuk Hero, gunakan gambar landscape 16:9 minimal 1920px lebar.</p>
      </section>
    </main>
  );
}
