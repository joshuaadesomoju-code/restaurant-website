import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Menu from "./components/Menu";
import Gallery from "./components/Gallery";
import Visit from "./components/Visit";
import { info } from "./data";

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Menu />
        <Gallery />
        <Visit />
      </main>
      <footer className="bg-palm-dark text-cream/70">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-4 px-5 py-8 text-sm">
          <p>© {new Date().getFullYear()} {info.name}. A fictional restaurant made for a portfolio demo.</p>
          <p>
            Designed &amp; built by{" "}
            <a className="underline hover:text-cream" href="https://joshua-adesomoju.vercel.app" target="_blank" rel="noreferrer">Joshua Adesomoju</a>
          </p>
        </div>
      </footer>
    </>
  );
}
