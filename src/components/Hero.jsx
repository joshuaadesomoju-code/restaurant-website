import { Clock, MapPin, Phone } from "@phosphor-icons/react";
import BlockScreen from "./BlockScreen";
import Img from "./Img";
import { info, openStatus } from "../data";

export default function Hero() {
  const status = openStatus();
  return (
    <>
      <section id="top" className="mx-auto grid max-w-[1320px] gap-10 px-5 pb-14 pt-10 sm:px-8 md:grid-cols-[1.25fr_1fr] md:items-center md:gap-14 md:pb-20 md:pt-14">
        <div className="max-w-[44rem]">
          <p className="reveal text-[0.95rem] font-semibold text-pepper" style={{ "--i": 0 }}>{info.tagline}, Lekki</p>
          <h1 className="reveal display mt-5 text-[2.6rem] sm:text-6xl lg:text-[4.1rem]" style={{ "--i": 1 }}>
            Smoke, spice and a cold glass of palm wine.
          </h1>
          <p className="reveal mt-6 max-w-[30rem] text-lg leading-relaxed text-ink-2" style={{ "--i": 2 }}>
            Firewood jollof, suya off the grill and soups your grandmother would approve of.
          </p>
          <div className="reveal mt-9 flex flex-wrap gap-3" style={{ "--i": 3 }}>
            <a href="#book" className="btn btn-pepper">Book a table</a>
            <a href="#menu" className="btn btn-line">See the menu</a>
          </div>
        </div>

        <div className="relative aspect-[4/5] w-full overflow-hidden bg-concrete-2 md:max-h-[76vh] md:justify-self-end">
          <Img name="hero" w={960} h={1200} sizes="(min-width: 768px) 48vw, 100vw" eager />
          <BlockScreen cols={4} rows={5} />
        </div>
      </section>

      <section aria-label="Opening information" className="bg-leaf text-leaf-ink">
        <div className="mx-auto grid max-w-[1320px] divide-y divide-white/15 px-5 sm:px-8 md:grid-cols-3 md:divide-x md:divide-y-0">
          <p className="flex items-center gap-3 py-5 md:pr-8">
            <Clock size={22} weight="bold" className="shrink-0 text-white" aria-hidden="true" />
            <span className="font-semibold text-white">{status.text}</span>
          </p>
          <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(info.address)}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 py-5 hover:text-white md:px-8">
            <MapPin size={22} weight="bold" className="shrink-0 text-white" aria-hidden="true" />
            {info.address}
          </a>
          <a href={`tel:${info.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 py-5 hover:text-white md:pl-8">
            <Phone size={22} weight="bold" className="shrink-0 text-white" aria-hidden="true" />
            <span className="tnum">{info.phone}</span>
          </a>
        </div>
      </section>
    </>
  );
}
