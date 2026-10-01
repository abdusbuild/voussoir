import { readFileSync } from "node:fs";
import path from "node:path";
import { getImageProps } from "next/image";

export type GallerySlide = {
  src: string;
  alt: string;
  width: number;
  height: number;
  srcSet: { src: string; width: number; height: number }[];
  // Shown by the lightbox only when present. Alt text is never used as a caption.
  description?: string;
};

// Largest width requested from the image optimizer for the lightbox.
const MAX_WIDTH = 2048;

// Pixel size of a WebP in /public, read from its header at build time so the
// lightbox can size and zoom each slide before it loads.
export function webpSize(src: string) {
  const buf = readFileSync(path.join(process.cwd(), "public", src));
  const chunk = buf.toString("ascii", 12, 16);
  if (chunk === "VP8X") {
    return { width: 1 + buf.readUIntLE(24, 3), height: 1 + buf.readUIntLE(27, 3) };
  }
  if (chunk === "VP8 ") {
    return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
  }
  if (chunk === "VP8L") {
    const bits = buf.readUInt32LE(21);
    return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
  }
  throw new Error(`Not a WebP image: ${src}`);
}

// Full-size slides for the lightbox: optimizer URLs at each device size below
// the original's width (capped at 2048w), plus the original file itself.
export function gallerySlides(images: { src: string; alt: string; caption?: string }[]) {
  return images.map(({ src, alt, caption }): GallerySlide => {
    const { width, height } = webpSize(src);
    const { props } = getImageProps({ src, alt: "", fill: true, sizes: "100vw" });
    const srcSet = (props.srcSet ?? "")
      .split(", ")
      .map((entry) => {
        const [url, descriptor] = entry.split(" ");
        const w = parseInt(descriptor, 10);
        return { src: url, width: w, height: Math.round((height * w) / width) };
      })
      .filter((s) => s.width < width && s.width <= MAX_WIDTH);
    srcSet.push({ src, width, height });
    return { src, alt, width, height, srcSet, ...(caption && { description: caption }) };
  });
}
