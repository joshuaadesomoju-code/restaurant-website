import { useState } from "react";
import { info } from "../data";

const links = [["#menu", "Menu"], ["#gallery", "Gallery"], ["#visit", "Visit"]];

export default function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <a href="#top" className="font-display text-xl font-bold text-palm">{info.name}</a>
        <nav className="hidden items-center gap-8 text-sm font-medium sm:flex">
          {links.map(([href, label]) => <a key={href} href={href} className="hover:text-pepper">{label}</a>)}
          <a href="#book" className="rounded-full bg-pepper px-5 py-2.5 text-white hover:bg-pepper-dark">Book a table</a>
        </nav>
        <button type="button" className="sm:hidden" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-label="Menu">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>
      {open && (
        <nav className="flex flex-col gap-1 border-t border-sand px-5 pb-4 sm:hidden">
          {[...links, ["#book", "Book a table"]].map(([href, label]) => (
            <a key={href} href={href} onClick={() => setOpen(false)} className="py-2 font-medium">{label}</a>
          ))}
        </nav>
      )}
    </header>
  );
}
