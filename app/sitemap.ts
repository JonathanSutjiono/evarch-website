import type { MetadataRoute } from "next";
import { projects as staticProjects } from "@/data/projects";
import { regulations as staticRegulations } from "@/data/regulations";
import { absoluteUrl } from "@/lib/site";
import { projectSlugsQuery, regulationSlugsQuery } from "@/sanity/lib/queries";
import { sanityFetchResult } from "@/sanity/lib/serverFetch";

type SlugRecord = {
  slug: string;
  _updatedAt?: string;
};

async function getPublicSlugs(query: string, fallback: SlugRecord[], tag: string) {
  const result = await sanityFetchResult<SlugRecord[]>(query, {}, { tags: [tag] });

  if (result.status === "success") {
    return result.data ?? [];
  }

  return fallback;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projectSlugs, regulationSlugs] = await Promise.all([
    getPublicSlugs(
      projectSlugsQuery,
      staticProjects.flatMap((project) => (project.slug ? [{ slug: project.slug }] : [])),
      "projects",
    ),
    getPublicSlugs(
      regulationSlugsQuery,
      staticRegulations.flatMap((article) => (article.slug ? [{ slug: article.slug }] : [])),
      "regulations",
    ),
  ]);

  return [
    {
      url: absoluteUrl("/"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...projectSlugs.map((item) => ({
      url: absoluteUrl(`/works/${item.slug}`),
      lastModified: item._updatedAt ? new Date(item._updatedAt) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.72,
    })),
    ...regulationSlugs.map((item) => ({
      url: absoluteUrl(`/regulation/${item.slug}`),
      lastModified: item._updatedAt ? new Date(item._updatedAt) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.64,
    })),
  ];
}
