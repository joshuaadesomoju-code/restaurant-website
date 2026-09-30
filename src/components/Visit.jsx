import Booking from "./Booking";
import { info } from "../data";

export default function Visit() {
  return (
    <section id="visit" className="bg-sand/50">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-[1fr_1.3fr]">
        <div>
          <h2 className="font-display text-4xl font-bold text-palm sm:text-5xl">Come and eat</h2>
          <p className="mt-4 text-lg text-ink/80">{info.address}</p>
          <p className="mt-1 text-ink/80">{info.phone}</p>
          <h3 className="mt-10 font-display text-xl font-semibold text-palm">Opening hours</h3>
          <dl className="mt-3 space-y-2">
            {info.hours.map(([day, time]) => (
              <div key={day} className="flex justify-between gap-6 border-b border-sand pb-2">
                <dt>{day}</dt>
                <dd className={time === "Closed" ? "text-ink/50" : "font-medium"}>{time}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div id="book" className="scroll-mt-24">
          <h2 className="mb-6 font-display text-3xl font-bold text-palm">Book a table</h2>
          <Booking />
        </div>
      </div>
    </section>
  );
}
