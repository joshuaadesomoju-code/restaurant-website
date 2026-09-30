import { useState } from "react";
import { CheckCircle, WarningCircle } from "@phosphor-icons/react";
import { OPEN } from "../data";

function todayISO() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

function slotsFor(dateStr) {
  if (!dateStr) return [];
  const hours = OPEN[new Date(dateStr + "T12:00").getDay()];
  if (!hours) return [];
  const out = [];
  // Last booking 90 minutes before closing.
  for (let t = hours[0]; t <= hours[1] - 1.5; t += 0.5) {
    out.push(`${String(Math.floor(t)).padStart(2, "0")}:${t % 1 ? "30" : "00"}`);
  }
  return out;
}

const empty = { name: "", phone: "", date: "", time: "", guests: "2", notes: "" };

export default function Booking() {
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(null);

  const slots = slotsFor(form.date);
  const closed = form.date && slots.length === 0;
  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value, ...(key === "date" ? { time: "" } : {}) }));
    setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (form.name.trim().length < 2) next.name = "Please enter your name.";
    if (!/^\+?[\d\s-]{7,}$/.test(form.phone.trim())) next.phone = "Enter a phone number we can reach you on.";
    if (!form.date) next.date = "Pick a date.";
    else if (closed) next.date = "We're closed on Mondays. Please pick another day.";
    if (!form.time) next.time = "Pick a time.";
    setErrors(next);
    if (Object.keys(next).length === 0) setDone(form);
    else document.getElementById(`f-${Object.keys(next)[0]}`)?.focus();
  };

  if (done) {
    const when = new Date(done.date + "T12:00").toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });
    return (
      <div role="status" className="bg-plaster p-8 sm:p-10">
        <CheckCircle size={40} weight="fill" className="text-leaf" aria-hidden="true" />
        <p className="display mt-5 text-4xl">See you soon, {done.name.trim().split(" ")[0]}!</p>
        <p className="mt-4 text-lg">Table for {done.guests} on {when} at {done.time}.</p>
        <p className="mt-2 text-ink-2">This is a demo site, so no real booking was made.</p>
        <button type="button" onClick={() => { setDone(null); setForm(empty); }} className="btn btn-line mt-8">
          Make another booking
        </button>
      </div>
    );
  }

  const field = "mt-2 w-full rounded-none border-0 border-b-2 border-ink/25 bg-transparent px-0 py-3 text-lg outline-none transition-colors placeholder:text-ink-2/70 focus:border-leaf aria-[invalid=true]:border-pepper disabled:opacity-50 dark:focus:border-leaf-ink";
  const Err = ({ k }) =>
    errors[k] ? (
      <p id={`${k}-err`} role="alert" className="mt-2 flex items-center gap-1.5 text-sm font-medium text-pepper-deep dark:text-[#ff8a6b]">
        <WarningCircle size={16} weight="fill" aria-hidden="true" /> {errors[k]}
      </p>
    ) : null;
  const label = "text-sm font-semibold";

  return (
    <form onSubmit={submit} noValidate data-rv data-rv-delay="80" className="grid gap-x-8 gap-y-7 bg-plaster p-6 sm:grid-cols-2 sm:p-10">
      <div className="sm:col-span-2">
        <label htmlFor="f-name" className={label}>Name</label>
        <input id="f-name" name="name" className={field} value={form.name} onChange={set("name")} autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-err" : undefined} />
        <Err k="name" />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="f-phone" className={label}>Phone</label>
        <input id="f-phone" name="phone" className={field} type="tel" inputMode="tel" value={form.phone} onChange={set("phone")} autoComplete="tel" placeholder="+234 …" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-err" : undefined} />
        <Err k="phone" />
      </div>
      <div>
        <label htmlFor="f-date" className={label}>Date</label>
        <input id="f-date" name="date" className={field} type="date" min={todayISO()} value={form.date} onChange={set("date")} aria-invalid={!!errors.date} aria-describedby={errors.date ? "date-err" : closed ? "date-closed" : undefined} />
        {closed && !errors.date && <p id="date-closed" className="mt-2 text-sm font-medium text-pepper-deep dark:text-[#ff8a6b]">We're closed on Mondays.</p>}
        <Err k="date" />
      </div>
      <div>
        <label htmlFor="f-time" className={label}>Time</label>
        <select id="f-time" name="time" className={field} value={form.time} onChange={set("time")} disabled={!slots.length} aria-invalid={!!errors.time} aria-describedby={errors.time ? "time-err" : undefined}>
          <option value="">{form.date ? (slots.length ? "Choose a time" : "No times") : "Pick a date first"}</option>
          {slots.map((s) => <option key={s}>{s}</option>)}
        </select>
        <Err k="time" />
      </div>
      <div>
        <label htmlFor="f-guests" className={label}>Guests</label>
        <select id="f-guests" name="guests" className={field} value={form.guests} onChange={set("guests")}>
          {Array.from({ length: 10 }, (_, i) => <option key={i + 1} value={i + 1}>{i + 1} {i ? "people" : "person"}</option>)}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="f-notes" className={label}>Anything we should know? <span className="font-normal text-ink-2">(optional)</span></label>
        <textarea id="f-notes" name="notes" autoComplete="off" className={`${field} resize-y`} rows={2} value={form.notes} onChange={set("notes")} placeholder="Birthday, allergies, high chair…" />
      </div>
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button type="submit" className="btn btn-pepper">Request booking</button>
        <p className="text-sm text-ink-2">Demo form. Nothing is sent.</p>
      </div>
    </form>
  );
}
