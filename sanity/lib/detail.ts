import type { SanityImageSource } from "@sanity/image-url";
import { projects as staticProjects, type Project } from "@/data/projects";
import { regulations as staticRegulations, type RegulationArticle } from "@/data/regulations";
import { getOptimizedImageUrl } from "@/sanity/lib/image";
import type { SanityFetchResult } from "@/sanity/lib/serverFetch";

type ImageValue = SanityImageSource & { alt?: string };

export type ProjectDetail = Project & {
  gallery?: Array<{ image: string; alt: string }>;
  seoTitle?: string;
  seoDescription?: string;
  updatedAt?: string;
};

export type RegulationDetail = RegulationArticle & {
  content?: unknown[];
  image?: string;
  imageAlt?: string;
  seoTitle?: string;
  seoDescription?: string;
  updatedAt?: string;
};

export type CmsProjectDetail = {
  _updatedAt?: string;
  title?: string;
  slug?: string;
  category?: string;
  location?: string;
  year?: string;
  scope?: string[];
  status?: string;
  description?: string;
  coverImage?: ImageValue;
  gallery?: ImageValue[];
  seoTitle?: string;
  seoDescription?: string;
};

export type CmsRegulationDetail = {
  _updatedAt?: string;
  title?: string;
  slug?: string;
  category?: string;
  excerpt?: string;
  content?: unknown[];
  coverImage?: ImageValue;
  readTime?: string;
  publishedAt?: string;
  seoTitle?: string;
  seoDescription?: string;
};

function shouldUseStaticFallback(status: SanityFetchResult<unknown>["status"]) {
  return status === "unconfigured" || status === "error";
}

export function resolveProjectDetail(
  result: SanityFetchResult<CmsProjectDetail>,
  slug: string,
): ProjectDetail | null {
  if (result.data?.title) {
    const title = result.data.title.trim();
    const image = getOptimizedImageUrl(result.data.coverImage, {
      width: 1800,
      height: 1200,
      quality: 82,
    });
    const staticMatch = staticProjects.find((project) => project.slug === slug || project.title === title);

    return {
      title,
      slug: result.data.slug || slug,
      category: result.data.category?.trim(),
      location: result.data.location?.trim(),
      year: result.data.year?.trim(),
      scope: result.data.scope?.filter(Boolean).join(", "),
      status: result.data.status?.trim(),
      description: result.data.description?.trim() || staticMatch?.description,
      image: image || staticMatch?.image,
      imageAlt: result.data.coverImage?.alt?.trim() || staticMatch?.imageAlt || `Architecture project image for ${title}.`,
      gallery: result.data.gallery
        ?.map((item, index) => {
          const galleryImage = getOptimizedImageUrl(item, {
            width: 1200,
            height: 900,
            quality: 80,
          });

          return galleryImage
            ? {
                image: galleryImage,
                alt: item.alt?.trim() || `${title} gallery image ${index + 1}`,
              }
            : null;
        })
        .filter((item): item is { image: string; alt: string } => Boolean(item)),
      seoTitle: result.data.seoTitle?.trim(),
      seoDescription: result.data.seoDescription?.trim(),
      updatedAt: result.data._updatedAt,
    };
  }

  if (!shouldUseStaticFallback(result.status)) return null;

  return staticProjects.find((project) => project.slug === slug) || null;
}

export function resolveRegulationDetail(
  result: SanityFetchResult<CmsRegulationDetail>,
  slug: string,
): RegulationDetail | null {
  if (result.data?.title) {
    const title = result.data.title.trim();
    const image = getOptimizedImageUrl(result.data.coverImage, {
      width: 1600,
      height: 900,
      quality: 82,
    });
    const staticMatch = staticRegulations.find((article) => article.slug === slug || article.title === title);

    return {
      title,
      slug: result.data.slug || slug,
      category: result.data.category?.trim() || staticMatch?.category || "",
      date: result.data.publishedAt?.slice(0, 4) || staticMatch?.date || "",
      description: result.data.excerpt?.trim() || staticMatch?.description || "",
      readTime: result.data.readTime?.trim() || staticMatch?.readTime || "",
      content: result.data.content,
      image: image || undefined,
      imageAlt: result.data.coverImage?.alt?.trim() || `Editorial architecture image for ${title}.`,
      seoTitle: result.data.seoTitle?.trim(),
      seoDescription: result.data.seoDescription?.trim(),
      updatedAt: result.data._updatedAt,
    };
  }

  if (!shouldUseStaticFallback(result.status)) return null;

  return staticRegulations.find((article) => article.slug === slug) || null;
}
