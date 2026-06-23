"use client";

import { createImageUrlBuilder } from "@sanity/image-url";
import { PatchEvent, type ImageInputProps, type ObjectInputProps, unset, useClient } from "sanity";

type ImageValue = {
  asset?: {
    _ref?: string;
  };
};

/**
 * Keeps Sanity's full image input while making the active asset easier to identify.
 * Unset only removes the image reference from this document; it never deletes the asset.
 */
export function ClientImageInput(props: ObjectInputProps) {
  // Schema field definitions expose the general object-input type; the native image
  // renderer receives the image-specific variant at runtime.
  const imageProps = props as unknown as ImageInputProps;
  const client = useClient({ apiVersion: "2025-02-07" });
  const value = imageProps.value as ImageValue | undefined;
  const hasImage = Boolean(value?.asset?._ref);
  const imageUrl = hasImage
    ? createImageUrlBuilder(client)
        .image(value as NonNullable<typeof imageProps.value>)
        .width(960)
        .height(540)
        .fit("crop")
        .auto("format")
        .quality(82)
        .url()
    : null;

  function handleUnset() {
    imageProps.onChange(PatchEvent.from(unset()));
  }

  return (
    <div className="client-image-input">
      {imageUrl ? (
        <div className="client-image-input-preview">
          {/* Sanity Studio previews this authenticated CDN asset directly; Next Image is not available inside this custom Studio input. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageUrl} alt="Gambar yang sedang digunakan" />
          <div className="client-image-input-preview-copy">
            <strong>Gambar yang sedang digunakan</strong>
            <span>Gunakan kontrol di bawah untuk mengganti, mengatur crop, atau hotspot gambar.</span>
            <button type="button" onClick={handleUnset}>
              Hapus gambar dari konten ini
            </button>
          </div>
        </div>
      ) : (
        <p className="client-image-input-empty">Belum ada gambar yang dipilih untuk konten ini.</p>
      )}

      {imageProps.renderDefault(imageProps)}
    </div>
  );
}
