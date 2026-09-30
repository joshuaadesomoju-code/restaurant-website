// Scroll reveal for anything marked with data-rv.
//
// Content is visible by default. index.html adds the `rv` class to <html>
// only when JS runs, so the hidden starting state never applies without it,
// and a timeout there removes the class again if this module never loads.
//
// Kinds (value of data-rv):
//   ""      soft rise and fade (default)
//   "title" headline rising out of a mask
//   "img"   photo frame opening while the image settles from a slight zoom
//   "fade"  opacity only

const STEP = 65; // ms between siblings that enter together
const MAX_STEP = 5; // cap the stagger so long lists never drag (max 325ms)
const QUICK_STEP = 40;
const INTRO_DELAY = 500; // let the hero entrance finish first on page load

const root = document.documentElement;

function start() {
  if (!root.classList.contains("rv")) return;

  const done = (el) => {
    el.classList.add("rv-done");
    el.style.removeProperty("--rv-delay");
  };

  const show = (el, delay, instant) => {
    if (instant) {
      el.classList.add("rv-in", "rv-done");
      return;
    }
    el.style.setProperty("--rv-delay", `${delay}ms`);
    el.classList.add("rv-in");
    // Hand the element back to its own transitions once it has arrived.
    const longest = "rvQuick" in el.dataset ? 700 : el.dataset.rv === "img" ? 1500 : 1200;
    setTimeout(() => done(el), delay + longest);
  };

  const io = new IntersectionObserver(
    (entries) => {
      const intro = performance.now() < 1200 ? INTRO_DELAY : 0;
      const entering = [];
      for (const e of entries) {
        if (e.isIntersecting) entering.push(e.target);
        // Already scrolled past (anchor jump, reload mid-page): show at once
        // so scrolling back up never finds an empty gap.
        else if (e.boundingClientRect.bottom < 0) {
          show(e.target, 0, true);
          io.unobserve(e.target);
        }
      }
      // Stagger in reading order: heading, then text, then items.
      entering.sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
      entering.forEach((el, i) => {
        io.unobserve(el);
        const extra = Number(el.dataset.rvDelay || 0);
        // Content swapped in by an interaction (menu tabs) answers faster.
        const step = "rvQuick" in el.dataset ? QUICK_STEP : STEP;
        show(el, ("rvQuick" in el.dataset ? 0 : intro) + extra + Math.min(i, MAX_STEP) * step, false);
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0 }
  );

  const watch = (scope, quick = false) => {
    const els = [...(scope.querySelectorAll?.("[data-rv]:not(.rv-in)") || [])];
    if (scope.matches?.("[data-rv]:not(.rv-in)")) els.unshift(scope);
    for (const el of els) {
      if (quick) el.dataset.rvQuick = "";
      io.observe(el);
    }
  };

  watch(document);
  // Menu tabs and form states mount new nodes later; pick those up too.
  new MutationObserver((list) => {
    for (const m of list) m.addedNodes.forEach((n) => n.nodeType === 1 && watch(n, true));
  }).observe(document.getElementById("root"), { childList: true, subtree: true });

  window.__rvReady = true;
}

// Run after React's first commit so every marked node exists.
requestAnimationFrame(() => requestAnimationFrame(start));
