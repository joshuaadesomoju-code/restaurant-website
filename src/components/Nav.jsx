import { useEffect, useState } from "react";
import { List, X } from "@phosphor-icons/react";
import { info } from "../data";

const links = [["#menu", "Menu"], ["#gallery", "Kitchen"], ["#visit", "Visit"]];

export default function Nav() {
  const [open, setOpen] = useState(false);

  // Lock page scroll and close on Escape while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-concrete/92 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between px-5 sm:px-8">
        <a href="#top" translate="no" className="font-display text-[1.05rem] font-extrabold uppercase tracking-[-0.01em] [font-stretch:125%]">
          {info.name}
        </a>
        <nav aria-label="Main" className="hidden items-center gap-9 text-[0.95rem] font-medium md:flex">
          {links.map(([href, label]) => (
            <a key={href} href={href} className="underline-offset-[6px] decoration-2 hover:underline">{label}</a>
          ))}
          <a href="#book" className="btn btn-pepper !py-2.5">Book a table</a>
        </nav>
        <button
          type="button"
          className="-mr-2 grid h-11 w-11 place-items-center md:hidden"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Open menu"
        >
          <List size={26} weight="bold" />
        </button>
      </div>

      {open && (
        <div id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 z-50 flex flex-col overscroll-contain bg-leaf-deep text-leaf-ink md:hidden">
          <div className="flex h-16 items-center justify-between px-5">
            <span className="font-display font-extrabold uppercase [font-stretch:125%]">{info.name}</span>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="-mr-2 grid h-11 w-11 place-items-center" autoFocus>
              <X size={26} weight="bold" />
            </button>
          </div>
          <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center gap-2 px-5">
            {links.map(([href, label], i) => (
              <a key={href} href={href} onClick={() => setOpen(false)} className="reveal display py-2 text-5xl text-white" style={{ "--i": i }}>
                {label}
              </a>
            ))}
          </nav>
          <div className="space-y-4 px-5 pb-10">
            <a href="#book" onClick={() => setOpen(false)} className="btn btn-pepper w-full justify-center">Book a table</a>
            <p className="text-sm text-leaf-ink/80">{info.address}</p>
          </div>
        </div>
      )}
    </header>
  );
}
