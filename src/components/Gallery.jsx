import Img from "./Img";
import { gallery } from "../data";

// Six plates in an uneven grid: one large lead plate, the rest in two sizes.
const layout = [
  "md:col-span-7 md:row-span-2 aspect-[4/5] md:aspect-auto",
  "md:col-span-5 aspect-[4/3]",
  "md:col-span-5 aspect-[4/3]",
  "md:col-span-4 aspect-square",
  "md:col-span-4 aspect-square",
  "col-span-2 md:col-span-4 aspect-[16/10] md:aspect-square",
];
const sizes = [[1000, 1250], [800, 600], [800, 600], [700, 700], [700, 700], [800, 700]];

export default function Gallery() {
  return (
    <section id="gallery" className="mx-auto max-w-[1320px] scroll-mt-16 px-5 py-20 sm:px-8 md:py-28">
      <h2 className="display max-w-[14ch] text-5xl sm:text-7xl">From our kitchen</h2>
      <p className="mt-5 max-w-[30rem] text-lg text-ink-2">A few of the plates people come back for.</p>
      <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-12 md:gap-x-5 md:gap-y-10">
        {gallery.map((g, i) => (
          <li key={g.title} className={`${i === 0 ? "col-span-2" : ""} ${layout[i].split(" ").filter((c) => !c.includes("aspect")).join(" ")} flex flex-col`}>
            <figure className="group flex h-full flex-col">
              <div className={`relative flex-1 overflow-hidden bg-concrete-2 ${layout[i].split(" ").filter((c) => c.includes("aspect")).join(" ")}`}>
                <Img name={g.photo} w={sizes[i][0]} h={sizes[i][1]} sizes={i === 0 ? "(min-width: 768px) 56vw, 100vw" : "(min-width: 768px) 32vw, 50vw"} className="transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.03]" />
              </div>
              <figcaption className="mt-3 flex items-baseline gap-3 font-display text-lg font-bold [font-stretch:112%] sm:text-xl">
                {g.title}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
