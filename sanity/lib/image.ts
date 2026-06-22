import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { isSanityConfigured, sanityDataset, sanityProjectId } from "./client";

const builder = isSanityConfigured
  ? createImageUrlBuilder({ projectId: sanityProjectId!, dataset: sanityDataset })
  : null;

export function urlForImage(source: SanityImageSource | null | undefined, width = 1800) {
  if (!builder || !source) return null;

  try {
    return builder.image(source).width(width).quality(88).auto("format").url();
  } catch {
    return null;
  }
}
