import { useState } from "react";

// Opening hours per weekday (0 = Sunday). Monday is closed.
const OPEN = { 0: [13, 21], 1: null, 2: [12, 22], 3: [12, 22], 4: [12, 22], 5: [12, 23.5], 6: [12, 23.5] };

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
  };

  if (done) {
    const when = new Date(done.date + "T12:00").toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });
    return (
      <div role="status" className="rounded-3xl bg-white p-8 text-center shadow-sm">
        <p className="font-display text-3xl font-bold text-palm">See you soon, {done.name.split(" ")[0]}!</p>
        <p className="mt-3 text-ink/80">Table for {done.guests} on {when} at {done.time}.</p>
        <p className="mt-2 text-sm text-ink/60">This is a demo site, so no real booking was made.</p>
        <button type="button" onClick={() => { setDone(null); setForm(empty); }} className="mt-6 rounded-full border-2 border-palm px-6 py-2.5 font-medium text-palm hover:bg-palm hover:text-cream">
          Make another booking
        </button>
      </div>
    );
  }

  const field = "mt-1.5 w-full rounded-xl border border-sand bg-white px-4 py-3 outline-none focus:border-palm";
  const Err = ({ k }) => (errors[k] ? <p id={`${k}-err`} className="mt-1 text-sm text-pepper-dark">{errors[k]}</p> : null);

  return (
    <form onSubmit={submit} noValidate className="grid gap-5 rounded-3xl bg-white p-6 shadow-sm sm:grid-cols-2 sm:p-8">
      <label className="sm:col-span-2">
        <span className="text-sm font-medium">Name</span>
        <input className={field} value={form.name} onChange={set("name")} autoComplete="name" aria-invalid={!!errors.name} aria-describedby="name-err" />
        <Err k="name" />
      </label>
      <label className="sm:col-span-2">
        <span className="text-sm font-medium">Phone</span>
        <input className={field} type="tel" value={form.phone} onChange={set("phone")} autoComplete="tel" placeholder="+234 …" aria-invalid={!!errors.phone} aria-describedby="phone-err" />
        <Err k="phone" />
      </label>
      <label>
        <span className="text-sm font-medium">Date</span>
        <input className={field} type="date" min={todayISO()} value={form.date} onChange={set("date")} aria-invalid={!!errors.date} aria-describedby="date-err" />
        {closed && !errors.date && <p className="mt-1 text-sm text-pepper-dark">We're closed on Mondays.</p>}
        <Err k="date" />
      </label>
      <label>
        <span className="text-sm font-medium">Time</span>
        <select className={field} value={form.time} onChange={set("time")} disabled={!slots.length} aria-invalid={!!errors.time} aria-describedby="time-err">
          <option value="">{form.date ? (slots.length ? "Choose a time" : "No times") : "Pick a date first"}</option>
          {slots.map((s) => <option key={s}>{s}</option>)}
        </select>
        <Err k="time" />
      </label>
      <label>
        <span className="text-sm font-medium">Guests</span>
        <select className={field} value={form.guests} onChange={set("guests")}>
          {Array.from({ length: 10 }, (_, i) => <option key={i + 1} value={i + 1}>{i + 1} {i ? "people" : "person"}</option>)}
        </select>
      </label>
      <label className="sm:col-span-2">
        <span className="text-sm font-medium">Anything we should know? <span className="text-ink/50">(optional)</span></span>
        <textarea className={field} rows={3} value={form.notes} onChange={set("notes")} placeholder="Birthday, allergies, high chair…" />
      </label>
      <button type="submit" className="rounded-full bg-pepper px-7 py-3.5 font-medium text-white hover:bg-pepper-dark sm:col-span-2 sm:justify-self-start">
        Request booking
      </button>
    </form>
  );
}
