import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Menu from "./components/Menu";
import Gallery from "./components/Gallery";
import Garden from "./components/Garden";
import Visit from "./components/Visit";
import { info, photos } from "./data";

export default function App() {
  const credits = [...new Set(Object.values(photos).map((p) => p.by))].join(", ");
  return (
    <>
      <a href="#menu" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-plaster focus:px-4 focus:py-2">
        Skip to menu
      </a>
      <Nav />
      <main>
        <Hero />
        <Menu />
        <Gallery />
        <Garden />
        <Visit />
      </main>
      <footer className="bg-leaf-deep text-leaf-ink">
        <div className="mx-auto max-w-[1320px] px-5 pb-10 pt-16 sm:px-8">
          <p className="display text-[11vw] leading-[0.9] text-white md:text-[7.5vw] xl:text-[6.5rem]">{info.name}</p>
          <div className="mt-12 grid gap-6 border-t border-white/15 pt-8 text-sm md:grid-cols-[1fr_auto] md:items-end">
            <div className="space-y-2">
              <p>© {new Date().getFullYear()} {info.name}. A fictional restaurant made for a portfolio demo; bookings are not real.</p>
              <p className="text-leaf-ink/75">
                Photos from <a className="underline hover:text-white" href="https://unsplash.com" target="_blank" rel="noreferrer">Unsplash</a> by {credits}.
              </p>
            </div>
            <p>
              Designed &amp; built by{" "}
              <a className="font-semibold text-white underline underline-offset-4" href="https://joshua-adesomoju.vercel.app" target="_blank" rel="noreferrer">Joshua Adesomoju</a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
