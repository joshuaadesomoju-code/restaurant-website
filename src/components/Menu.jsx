import { useRef, useState } from "react";
import { Flame } from "@phosphor-icons/react";
import Img from "./Img";
import { menu, menuPhoto, naira } from "../data";

const tabs = Object.keys(menu);

export default function Menu() {
  const [active, setActive] = useState(tabs[1]);
  const refs = useRef([]);

  // Arrow keys move between tabs, as in a native tab list.
  const onKey = (e, i) => {
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const next = (i + d + tabs.length) % tabs.length;
    setActive(tabs[next]);
    refs.current[next]?.focus();
    refs.current[next]?.scrollIntoView({ block: "nearest", inline: "nearest" });
  };

  return (
    <section id="menu" className="scroll-mt-16 bg-leaf-deep text-leaf-ink">
      <div className="mx-auto max-w-[1320px] px-5 py-20 sm:px-8 md:py-28">
        <h2 className="display text-5xl text-white sm:text-7xl">The menu</h2>
        <p className="mt-5 max-w-[34rem] text-lg text-leaf-ink/85">
          Cooked fresh every day. Ask us about allergies; most dishes can be made milder.
        </p>

        <div role="tablist" aria-label="Menu sections" className="-mx-5 mt-12 flex gap-x-8 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden border-b border-white/15 px-5 sm:mx-0 sm:px-0">
          {tabs.map((t, i) => (
            <button
              key={t}
              ref={(el) => (refs.current[i] = el)}
              role="tab"
              id={`tab-${i}`}
              aria-selected={active === t}
              aria-controls="menu-panel"
              tabIndex={active === t ? 0 : -1}
              onClick={(e) => {
                setActive(t);
                e.currentTarget.scrollIntoView({ block: "nearest", inline: "nearest", behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
              }}
              onKeyDown={(e) => onKey(e, i)}
              className={`-mb-px shrink-0 whitespace-nowrap border-b-[3px] pb-4 font-display text-xl font-bold [font-stretch:115%] transition-colors sm:text-2xl ${
                active === t ? "border-pepper text-white" : "border-transparent text-leaf-ink/60 hover:text-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div key={`m-${active}`} className="fade-swap mt-8 aspect-[16/9] overflow-hidden bg-leaf lg:hidden">
          <Img name={menuPhoto[active]} w={900} h={506} sizes="100vw" />
        </div>

        <div className="mt-10 grid gap-12 lg:mt-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
          <ul id="menu-panel" role="tabpanel" aria-labelledby={`tab-${tabs.indexOf(active)}`} key={active} className="fade-swap divide-y divide-white/12">
            {menu[active].map((d) => (
              <li key={d.name} className="grid grid-cols-[1fr_auto] gap-x-6 gap-y-1.5 py-6 first:pt-0">
                <h3 className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xl font-semibold text-white sm:text-[1.35rem]">
                  {d.name}
                  {d.spicy && (
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#ff8a6b]">
                      <Flame size={16} weight="fill" aria-hidden="true" /> Spicy
                    </span>
                  )}
                  {d.popular && <span className="rounded-full bg-white/12 px-2.5 py-0.5 text-sm font-semibold text-white">Popular</span>}
                </h3>
                <span className="tnum text-xl font-semibold text-white">{naira(d.price)}</span>
                <p className="col-span-2 max-w-[42rem] text-leaf-ink/80">{d.desc}</p>
              </li>
            ))}
          </ul>
          <div className="hidden lg:block">
            <div key={active} className="fade-swap sticky top-24 aspect-[4/5] overflow-hidden bg-leaf">
              <Img name={menuPhoto[active]} w={720} h={900} sizes="36vw" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
