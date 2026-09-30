import Dish from "./Dish";
import { gallery } from "../data";

export default function Gallery() {
  return (
    <section id="gallery" className="mx-auto max-w-6xl px-5 py-20">
      <h2 className="font-display text-4xl font-bold text-palm sm:text-5xl">From our kitchen</h2>
      <p className="mt-3 max-w-lg text-ink/70">A few of the plates people come back for.</p>
      <ul className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
        {gallery.map((g, i) => (
          <li key={g.title} className="group rounded-3xl bg-sand/60 p-6 transition-colors hover:bg-sand">
            <Dish colors={g.colors} seed={i} className="mx-auto w-full max-w-56 transition-transform duration-300 group-hover:rotate-6" />
            <p className="mt-4 text-center font-display text-lg font-semibold text-palm">{g.title}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
