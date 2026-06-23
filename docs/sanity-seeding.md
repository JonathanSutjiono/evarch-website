# Seeding Sanity Content

Use this once to create editable Sanity documents from the current EVARCH.ID fallback content. The script is idempotent: it does not overwrite singleton documents and only adds sample collections when that collection is empty.

1. In the Sanity dashboard, create a token with write access for this dataset.
2. Add it to `.env.local` only:

```bash
SANITY_API_WRITE_TOKEN=your_write_token_here
```

3. Keep the existing `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, and `NEXT_PUBLIC_SANITY_API_VERSION` values in `.env.local`.
4. Run:

```bash
npm run seed:sanity
```

5. Open `/studio` and confirm the documents appear under Pengaturan Website, Halaman Utama, Proyek / Works, Keahlian / Expertise, Tahapan Proses, Regulasi / Pengetahuan, and the other singleton sections.

Do not commit `.env.local` or the write token. The token is only read by the terminal script and is never imported by the public website. Remove it after seeding if it is no longer needed.
