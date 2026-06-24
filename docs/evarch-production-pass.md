# EVARCH.ID Production Pass

## Area yang Disiapkan

- Public frontend memakai App Router, metadata Next, `next/image`, dan struktur section editorial yang tetap mempertahankan arah visual EVARCH.ID.
- `/studio` tetap dipertahankan sebagai Sanity Studio client-facing CMS.
- Konten list seperti Works, Expertise, Process, dan Regulation tetap memakai `showOnWebsite` dan `order`.
- Detail route baru tersedia untuk `/works/[slug]` dan `/regulation/[slug]` ketika slug tersedia.

## Environment

Gunakan `.env.example` sebagai referensi:

- `NEXT_PUBLIC_SITE_URL`: domain publik, default produksi `https://evarch.id`.
- `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SANITY_API_VERSION`: konfigurasi public Sanity.
- `SANITY_API_READ_TOKEN`: token read server-side untuk Draft Mode.
- `SANITY_API_WRITE_TOKEN`: token write untuk seed/migration script.
- `SANITY_REVALIDATE_SECRET`: secret webhook revalidation.
- `SANITY_PREVIEW_SECRET`: secret untuk membuka Draft Mode.
- `NEXT_PUBLIC_ENABLE_VERCEL_INSIGHTS`: opsional. Biarkan `false` secara lokal; di Vercel analytics aktif otomatis melalui env `VERCEL=1`.

Jangan pernah memakai prefix `NEXT_PUBLIC_` untuk token rahasia.

## Runtime

Project ini menargetkan Node.js `>=22.12.0` karena `sanity@6` mensyaratkan versi tersebut. Atur Node version yang sama di Vercel/project runtime sebelum domain production disambungkan.

## Revalidation Webhook

Endpoint:

```txt
POST /api/revalidate?secret=SANITY_REVALIDATE_SECRET
```

Payload Sanity minimal:

```json
{
  "_type": "project",
  "slug": { "current": "house-in-serpong" }
}
```

Route akan merevalidasi homepage, sitemap, dan detail path bila type/slug tersedia.

## Draft Mode

Aktifkan preview:

```txt
/api/draft?secret=SANITY_PREVIEW_SECRET&path=/
```

Untuk preview detail:

```txt
/api/draft?secret=SANITY_PREVIEW_SECRET&type=project&slug=house-in-serpong
```

Nonaktifkan:

```txt
/api/draft/disable?path=/
```

## Migration

Untuk backfill slug, urutan, dan visibilitas:

```bash
npm run migrate:content
```

Alt text gambar tidak diisi otomatis karena harus ditulis manusia agar akurat. Studio memberi warning agar editor melengkapinya.

## Quality Commands

```bash
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```

Jika Playwright browser belum tersedia:

```bash
npx playwright install chromium
```
