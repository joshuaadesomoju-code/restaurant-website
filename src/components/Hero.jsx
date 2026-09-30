import Dish from "./Dish";
import { gallery, info } from "../data";

export default function Hero() {
  return (
    <section id="top" className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-10 md:grid-cols-2 md:pt-16">
      <div>
        <p className="font-medium uppercase tracking-[0.2em] text-pepper">{info.tagline} · Lekki</p>
        <h1 className="mt-4 font-display text-5xl font-bold leading-[1.02] text-palm sm:text-6xl">
          Smoke, spice and a cold glass of palm wine.
        </h1>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/80">
          Firewood jollof, suya off the grill and soups your grandmother would approve of, served in a garden in the heart of Lekki.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#book" className="rounded-full bg-pepper px-7 py-3.5 font-medium text-white hover:bg-pepper-dark">Book a table</a>
          <a href="#menu" className="rounded-full border-2 border-palm px-7 py-3 font-medium text-palm hover:bg-palm hover:text-cream">See the menu</a>
        </div>
      </div>
      <div className="relative mx-auto aspect-square w-full max-w-md">
        <div className="absolute inset-6 rounded-full bg-palm" />
        <Dish colors={gallery[0].colors} className="absolute inset-0 m-auto w-4/5 drop-shadow-xl" />
        <Dish colors={gallery[4].colors} seed={2} className="absolute -bottom-2 -right-2 w-1/3" />
        <Dish colors={gallery[1].colors} seed={1} className="absolute -left-2 top-4 w-1/3" />
      </div>
    </section>
  );
}
