# EVARCH.ID CMS Setup

The public website is designed to remain fully usable without Sanity. Until Sanity is connected and populated, every section renders the existing static EVARCH.ID content and temporary presentation images.

Use Node.js 22 LTS for local Studio work and Vercel deployment. Sanity 6 requires Node.js 20.19 or newer.

## 1. Create or connect a Sanity project

1. Create a project at [sanity.io/manage](https://www.sanity.io/manage), or select an existing client-owned project.
2. Create or confirm a dataset named `production`.
3. Copy the project ID from the Sanity project settings.
4. In the Sanity CORS settings, add:
   - `http://localhost:3000` for local Studio access.
   - The Vercel preview URL used by the CMS branch.
   - `https://evarch.id` after preview testing is approved.
5. Allow credentials for Studio origins. The public frontend uses read-only public queries and does not require a write token.

## 2. Environment variables

Add these values to `.env.local`:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-06-22
```

Do not add a Sanity write token to browser-exposed environment variables. The public website does not need one.

## 3. Run locally

```bash
npm install
npm run dev
```

Open:

- Website: `http://localhost:3000`
- Studio: `http://localhost:3000/studio`

If the required variables are missing, `/studio` displays a setup message and the public website continues using fallback content.

## 4. Client editing scope

The Studio navigation is organized as:

1. Site Settings
2. Homepage
3. Works / Projects
4. Studio / About
5. Expertise
6. STRA Verification
7. Regulation
8. Contact & Map
9. Footer

The client can edit company branding, homepage copy and image, projects, project galleries, Studio copy, expertise, STRA copy and DAI logo, regulation articles, contact details, WhatsApp, Google Maps URLs, social links, and footer content.

Layout structure, spacing, animation logic, responsive behavior, and theme tokens remain controlled by code.

## 5. Content publishing

- Projects, expertise items, and regulation articles must have `Published` enabled before they appear publicly.
- Projects are ordered by `Featured` first, then `Display Order`.
- Expertise items use `Display Order`.
- Empty CMS sections fall back to the existing static content.
- Missing CMS images fall back to the current EVARCH presentation images.

## 6. Google Maps

The Contact document supports:

- A Google Maps URL used for the external location button.
- A secure Google Maps embed URL beginning with `https://www.google.com/maps/embed` or `https://maps.google.com/maps/embed`.
- Latitude and longitude stored for future map integrations.

If the embed URL is absent or invalid, no iframe is rendered and the page continues normally.

## 7. Vercel preview setup

1. Push the CMS branch to GitHub.
2. Add all three `NEXT_PUBLIC_SANITY_*` variables to the Vercel Preview environment.
3. Redeploy the preview branch.
4. Add the generated Vercel preview domain to Sanity CORS with credentials enabled.
5. Test public fallback behavior, Studio editing, image rendering, links, maps, and mobile layouts.
6. Only after approval, add the variables to Vercel Production and connect the production domain.

## 8. Fallback behavior

Fallback content is centralized in `sanity/lib/fallback.ts`. It is used when:

- Environment variables are missing.
- Sanity is unreachable or a query fails.
- A singleton document is empty.
- A list has no published items.
- A CMS image is missing.

This prevents an empty CMS from blanking or visually breaking the public website.

## Branch safety warning

Do not merge this integration into `main` before the Vercel preview has been tested with the client-owned Sanity project, dataset, CORS origins, published sample content, and all required environment variables.
