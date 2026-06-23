import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { isSanityConfigured, sanityDataset, sanityProjectId } from "./client";

const builder = isSanityConfigured
  ? createImageUrlBuilder({ projectId: sanityProjectId!, dataset: sanityDataset })
  : null;

type OptimizedImageOptions = {
  width: number;
  height?: number;
  quality?: number;
  fit?: "crop" | "max";
};

function roundedPositiveNumber(value: number) {
  return Number.isFinite(value) && value > 0 ? Math.round(value) : null;
}

export function getOptimizedImageUrl(
  source: SanityImageSource | null | undefined,
  options: OptimizedImageOptions,
) {
  if (!builder || !source) return null;

  const width = roundedPositiveNumber(options.width);
  const height = options.height ? roundedPositiveNumber(options.height) : null;

  if (!width || (options.height && !height)) return null;

  try {
    const image = builder
      .image(source)
      .width(width)
      .quality(Math.min(Math.max(Math.round(options.quality ?? 80), 1), 100))
      .auto("format");

    if (height) {
      return image
        .height(height)
        .fit(options.fit ?? "crop")
        .url();
    }

    return image.fit(options.fit ?? "max").url();
  } catch {
    return null;
  }
}

export function urlForImage(source: SanityImageSource | null | undefined, width = 1800) {
  return getOptimizedImageUrl(source, { width, quality: 82, fit: "max" });
}
