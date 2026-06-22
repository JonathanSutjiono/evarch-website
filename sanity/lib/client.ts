import { createClient } from "next-sanity";

export const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const sanityDataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const sanityApiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION;

export const isSanityConfigured = Boolean(
  sanityProjectId && process.env.NEXT_PUBLIC_SANITY_DATASET && sanityApiVersion,
);

export const sanityClient = isSanityConfigured
  ? createClient({
      projectId: sanityProjectId!,
      dataset: sanityDataset,
      apiVersion: sanityApiVersion!,
      useCdn: true,
      perspective: "published",
    })
  : null;

export async function safeSanityFetch<T>(query: string, params: Record<string, unknown> = {}) {
  if (!sanityClient) return null;

  try {
    return await sanityClient.fetch<T>(query, params, {
      next: { revalidate: 60 },
    });
  } catch (error) {
    console.error("Sanity content fetch failed; static fallback content will be used.", error);
    return null;
  }
}
