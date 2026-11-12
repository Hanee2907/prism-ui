const d = () => document.documentElement;
function f(e) {
  e === "auto" ? d().removeAttribute("data-pr-theme") : d().setAttribute("data-pr-theme", e);
}
function m() {
  const e = d().getAttribute("data-pr-theme");
  return e === "light" || e === "dark" ? e : matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function l(e) {
  e ? d().setAttribute("data-pr-motion", "calm") : d().removeAttribute("data-pr-motion");
}
function p() {
  const e = matchMedia("(prefers-reduced-motion: reduce)");
  l(e.matches), e.addEventListener("change", () => l(e.matches));
}
function h(e) {
  e.querySelectorAll(".pr-lens").forEach((t) => {
    t.dataset.prReady || (t.dataset.prReady = "1", t.addEventListener("pointermove", (r) => {
      const a = t.getBoundingClientRect();
      t.style.setProperty("--mx", `${r.clientX - a.left}px`), t.style.setProperty("--my", `${r.clientY - a.top}px`);
    }));
  });
}
function y(e) {
  e.querySelectorAll(".pr-tabs").forEach((t) => {
    if (t.dataset.prReady) return;
    t.dataset.prReady = "1";
    const r = [...t.querySelectorAll('[role="tab"]')], a = [...t.querySelectorAll('[role="tabpanel"]')], n = (o, c = !1) => {
      r.forEach((s, i) => {
        s.setAttribute("aria-selected", String(o === i)), s.tabIndex = o === i ? 0 : -1;
      }), a.forEach((s, i) => s.hidden = o !== i), c && r[o].focus();
    };
    r.forEach((o, c) => {
      o.addEventListener("click", () => n(c)), o.addEventListener("keydown", (s) => {
        const i = r.length, u = s.key === "ArrowRight" ? (c + 1) % i : s.key === "ArrowLeft" ? (c - 1 + i) % i : s.key === "Home" ? 0 : s.key === "End" ? i - 1 : -1;
        u < 0 || (s.preventDefault(), n(u, !0));
      });
    }), n(Math.max(0, r.findIndex((o) => o.getAttribute("aria-selected") === "true")));
  });
}
function v(e) {
  e.querySelectorAll("[data-pr-open]").forEach((t) => {
    t.dataset.prReady || (t.dataset.prReady = "1", t.addEventListener("click", () => {
      const r = document.getElementById(t.dataset.prOpen ?? "");
      r instanceof HTMLDialogElement && r.showModal();
    }));
  }), e.querySelectorAll("dialog.pr-modal").forEach((t) => {
    t.dataset.prReady || (t.dataset.prReady = "1", t.addEventListener("click", (r) => {
      (r.target.closest("[data-pr-close]") || r.target === t) && t.close();
    }));
  });
}
function E(e) {
  const t = e.querySelectorAll(".pr-reveal:not(.is-in)");
  if (!("IntersectionObserver" in window)) {
    t.forEach((a) => a.classList.add("is-in"));
    return;
  }
  const r = new IntersectionObserver(
    (a) => a.forEach((n) => {
      n.isIntersecting && (n.target.classList.add("is-in"), r.unobserve(n.target));
    }),
    { threshold: 0.12 }
  );
  t.forEach((a) => r.observe(a));
}
const A = { info: "✦", success: "✓", warning: "!", error: "✕" };
function g(e, t = "info", r = 2800) {
  let a = document.querySelector(".pr-toasts");
  a || (a = document.createElement("div"), a.className = "pr-toasts", a.setAttribute("role", "status"), a.setAttribute("aria-live", "polite"), document.body.append(a));
  const n = document.createElement("div");
  n.className = `pr-toast pr-toast--${t}`;
  const o = document.createElement("i");
  o.textContent = A[t], o.setAttribute("aria-hidden", "true"), n.append(o, document.createTextNode(e)), a.append(n), setTimeout(() => {
    n.classList.add("pr-toast--leaving"), setTimeout(() => n.remove(), 400);
  }, r);
}
function b(e = document) {
  h(e), y(e), v(e), E(e);
}
const w = { init: b, toast: g, setTheme: f, currentTheme: m, setCalmMotion: l, followSystemMotion: p };
export {
  w as PrismUI,
  m as currentTheme,
  w as default,
  p as followSystemMotion,
  b as init,
  l as setCalmMotion,
  f as setTheme,
  g as toast
};
