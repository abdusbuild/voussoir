/**
 * The brand arch: a semicircular top over a square bottom, 3:4. The vertical
 * radius is 37.5% of the height (= half the width at 3:4), so the top is an
 * exact semicircle. Static — no hover zoom or arch-specific animation.
 *
 * `outline` draws a hairline arch 12px outside the image, behind it, like a
 * drawn construction line. It uses oversized pixel radii, which the browser
 * scales down to half the width, so it stays a true semicircle concentric
 * with the image. Reserved for the founder portraits.
 *
 * `sketch` multiplies an off-white pencil sheet onto the page colour, as in
 * Visual. Never for colour photography.
 */
export default function ArchFrame({
  src,
  alt,
  className = "",
  outline = false,
  sketch = false,
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  outline?: boolean;
  sketch?: boolean;
  priority?: boolean;
}) {
  return (
    <div className={`relative isolate ${className}`}>
      {outline && (
        <div
          aria-hidden="true"
          className="absolute -inset-3 -z-10 border border-line rounded-t-[9999px]"
        />
      )}
      <div
        className={`relative aspect-[3/4] w-full overflow-hidden ${
          sketch ? "bg-paper" : "bg-paper-soft"
        }`}
        style={{ borderRadius: "50% 50% 0 0 / 37.5% 37.5% 0 0" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          className={`absolute inset-0 h-full w-full object-cover ${
            sketch ? "mix-blend-multiply" : ""
          }`}
        />
      </div>
    </div>
  );
}
