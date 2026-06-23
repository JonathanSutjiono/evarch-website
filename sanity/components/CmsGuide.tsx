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
          <li>Buka menu konten di sebelah kiri, ubah teks atau gambar, lalu klik Publish.</li>
          <li>Untuk mengganti gambar, buka field gambar, pilih gambar baru atau upload file baru, lalu Publish.</li>
          <li>Untuk menyembunyikan proyek, keahlian, tahapan proses, atau regulasi, matikan Tampilkan di Website lalu Publish.</li>
          <li>Untuk menghapus konten dummy permanen, buka dokumen, pilih menu titik tiga, lalu Delete. Konten tersebut tidak akan muncul kembali dari fallback.</li>
          <li>Atur Urutan Tampil dengan angka kecil terlebih dahulu, lalu Publish.</li>
        </ol>
        <p>Untuk seed dari terminal dengan token privat, ikuti panduan di <code>docs/sanity-seeding.md</code>.</p>
        <p>Cek hasilnya di <a href="https://evarch.id" target="_blank" rel="noopener noreferrer">evarch.id</a>.</p>
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
