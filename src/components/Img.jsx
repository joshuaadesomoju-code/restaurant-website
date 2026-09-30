import { photo, photos } from "../data";

// Photograph with responsive sizes. `name` is a key in `photos`.
export default function Img({ name, w, h, sizes = "100vw", className = "", eager = false }) {
  const p = photos[name];
  const { src, srcSet } = photo(p.id, w, h);
  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      width={w}
      height={h}
      alt={p.alt}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : undefined}
      decoding="async"
      className={`block h-full w-full object-cover ${className}`}
    />
  );
}
