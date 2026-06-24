import { createClient } from "next-sanity";
import { sanityApiVersion, sanityDataset, sanityProjectId } from "./client";

type FetchStatus = "success" | "unconfigured" | "error";

type ServerFetchOptions = {
  draft?: boolean;
  revalidate?: number;
  tags?: string[];
};

export type SanityFetchResult<T> = {
  data: T | null;
  status: FetchStatus;
};

function getServerClient(draft = false) {
  if (!sanityProjectId || !sanityDataset || !sanityApiVersion) return null;

  const token = process.env.SANITY_API_READ_TOKEN;

  return createClient({
    projectId: sanityProjectId,
    dataset: sanityDataset,
    apiVersion: sanityApiVersion,
    useCdn: !draft,
    perspective: draft && token ? "drafts" : "published",
    token: draft ? token : undefined,
  });
}

export async function sanityFetchResult<T>(
  query: string,
  params: Record<string, unknown> = {},
  options: ServerFetchOptions = {},
): Promise<SanityFetchResult<T>> {
  const client = getServerClient(options.draft);

  if (!client) {
    return { data: null, status: "unconfigured" };
  }

  try {
    const data = await client.fetch<T>(query, params, {
      next: {
        revalidate: options.draft ? 0 : options.revalidate ?? 60,
        tags: options.tags,
      },
    });

    return { data, status: "success" };
  } catch (error) {
    console.error("Sanity content fetch failed.", error);
    return { data: null, status: "error" };
  }
}

export async function serverSanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  options: ServerFetchOptions = {},
) {
  const result = await sanityFetchResult<T>(query, params, options);
  return result.data;
}
