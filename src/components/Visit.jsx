import { ArrowUpRight } from "@phosphor-icons/react";
import Booking from "./Booking";
import Img from "./Img";
import { info } from "../data";

// Monday = index 3 in info.hours; map today's weekday to its hours row.
const rowForDay = [2, 3, 0, 0, 0, 1, 1];

export default function Visit() {
  const [street, ...rest] = info.address.split(", ");
  const area = rest.join(", ");
  const today = rowForDay[new Date().getDay()];
  return (
    <section id="visit" className="scroll-mt-16">
      <div className="mx-auto grid max-w-[1320px] gap-14 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <h2 data-rv="title" className="display text-5xl sm:text-7xl">Come and eat</h2>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(info.address)}`}
            target="_blank"
            rel="noreferrer"
            data-rv
            className="group mt-8 inline-block max-w-[26ch] text-lg font-medium sm:text-xl"
          >
            <span className="underline decoration-line decoration-2 underline-offset-[6px] group-hover:decoration-pepper">{street},</span>
            <br />
            <span className="whitespace-nowrap underline decoration-line decoration-2 underline-offset-[6px] group-hover:decoration-pepper">{area}</span>
            <ArrowUpRight size={18} weight="bold" className="ml-1.5 inline align-[-0.1em]" aria-hidden="true" />
          </a>
          <p data-rv className="mt-3 text-lg">
            <a href={`tel:${info.phone.replace(/\s/g, "")}`} className="tnum hover:text-pepper">{info.phone}</a>
          </p>

          <h3 data-rv className="mt-12 font-display text-xl font-bold [font-stretch:112%]">Opening hours</h3>
          <dl className="mt-4">
            {info.hours.map(([day, time], i) => (
              <div key={day} data-rv className={`flex justify-between gap-6 border-t border-line py-3.5 ${i === today ? "font-semibold" : ""}`}>
                <dt>
                  {day}
                  {i === today && <span className="ml-2 text-sm font-semibold text-pepper">Today</span>}
                </dt>
                <dd className={`tnum ${time === "Closed" ? "text-ink-2" : ""}`}>{time}</dd>
              </div>
            ))}
          </dl>

          <div data-rv="img" className="mt-12 hidden aspect-[16/10] overflow-hidden bg-concrete-2 lg:block">
            <Img name="terrace" w={900} h={560} sizes="36vw" />
          </div>
        </div>

        <div id="book" className="scroll-mt-20 lg:pt-3">
          <div className="relative isolate">
            <div data-rv="fade" className="absolute -inset-x-5 -top-8 bottom-24 -z-10 overflow-hidden opacity-70 sm:-inset-x-8 dark:opacity-20" aria-hidden="true">
              <Img name="blocks" w={1200} h={900} sizes="60vw" />
            </div>
            <h2 data-rv="title" className="display bg-concrete px-0 pb-6 text-4xl sm:inline-block sm:pr-6 sm:text-5xl">Book a table</h2>
            <Booking />
          </div>
        </div>
      </div>
    </section>
  );
}
