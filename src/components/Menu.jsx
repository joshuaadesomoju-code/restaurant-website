import { useState } from "react";
import { menu, naira } from "../data";

const tabs = Object.keys(menu);

export default function Menu() {
  const [active, setActive] = useState(tabs[1]);
  return (
    <section id="menu" className="bg-palm text-cream">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <h2 className="font-display text-4xl font-bold sm:text-5xl">The menu</h2>
        <p className="mt-3 max-w-lg text-cream/75">Cooked fresh every day. Ask us about allergies; most dishes can be made milder.</p>

        <div role="tablist" aria-label="Menu sections" className="mt-10 flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={active === t}
              onClick={() => setActive(t)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${active === t ? "bg-cream text-palm" : "bg-palm-dark text-cream/80 hover:text-cream"}`}
            >
              {t}
            </button>
          ))}
        </div>

        <ul role="tabpanel" className="mt-10 grid gap-x-12 gap-y-8 md:grid-cols-2">
          {menu[active].map((d) => (
            <li key={d.name} className="border-b border-cream/15 pb-6">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-xl font-semibold">
                  {d.name}
                  {d.spicy && <span className="ml-2 align-middle text-xs font-medium text-pepper" title="Spicy">● spicy</span>}
                  {d.popular && <span className="ml-2 rounded-full bg-pepper px-2 py-0.5 align-middle font-body text-xs font-medium text-white">Popular</span>}
                </h3>
                <span className="shrink-0 font-medium">{naira(d.price)}</span>
              </div>
              <p className="mt-2 text-cream/70">{d.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
