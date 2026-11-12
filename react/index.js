import { jsx as a, jsxs as m, Fragment as T } from "react/jsx-runtime";
import { forwardRef as w, useRef as x, useId as f, useEffect as A, useState as $ } from "react";
const b = () => document.documentElement;
function B(e) {
  e === "auto" ? b().removeAttribute("data-pr-theme") : b().setAttribute("data-pr-theme", e);
}
function I() {
  const e = b().getAttribute("data-pr-theme");
  return e === "light" || e === "dark" ? e : matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function y(e) {
  e ? b().setAttribute("data-pr-motion", "calm") : b().removeAttribute("data-pr-motion");
}
function L() {
  const e = matchMedia("(prefers-reduced-motion: reduce)");
  y(e.matches), e.addEventListener("change", () => y(e.matches));
}
const k = { info: "✦", success: "✓", warning: "!", error: "✕" };
function M(e, t = "info", r = 2800) {
  let n = document.querySelector(".pr-toasts");
  n || (n = document.createElement("div"), n.className = "pr-toasts", n.setAttribute("role", "status"), n.setAttribute("aria-live", "polite"), document.body.append(n));
  const i = document.createElement("div");
  i.className = `pr-toast pr-toast--${t}`;
  const c = document.createElement("i");
  c.textContent = k[t], c.setAttribute("aria-hidden", "true"), i.append(c, document.createTextNode(e)), n.append(i), setTimeout(() => {
    i.classList.add("pr-toast--leaving"), setTimeout(() => i.remove(), 400);
  }, r);
}
const p = (...e) => e.filter(Boolean).join(" ");
function C({ className: e, ...t }) {
  return /* @__PURE__ */ a("p", { className: p("pr-eyebrow", e), ...t });
}
function j({ size: e = 1, as: t, className: r, ...n }) {
  return /* @__PURE__ */ a(t ?? (e === "display" || e === 1 ? "h1" : e === 2 ? "h2" : "h3"), { className: p(e === "display" ? "pr-display" : `pr-h${e}`, r), ...n });
}
function F() {
  return /* @__PURE__ */ a("div", { className: "pr-mesh", "aria-hidden": "true" });
}
function O(e) {
  return /* @__PURE__ */ a("hr", { className: "pr-beam", ...e });
}
const q = w(function({ variant: t = "spectrum", size: r = "md", iconOnly: n, className: i, type: c = "button", ...l }, o) {
  return /* @__PURE__ */ a(
    "button",
    {
      ref: o,
      type: c,
      className: p("pr-btn", `pr-btn--${t}`, r !== "md" && `pr-btn--${r}`, n && "pr-btn--icon", i),
      ...l
    }
  );
});
function D({ className: e, onPointerMove: t, ...r }) {
  const n = (i) => {
    const c = i.currentTarget.getBoundingClientRect();
    i.currentTarget.style.setProperty("--mx", `${i.clientX - c.left}px`), i.currentTarget.style.setProperty("--my", `${i.clientY - c.top}px`), t == null || t(i);
  };
  return /* @__PURE__ */ a("div", { className: p("pr-lens", e), onPointerMove: n, ...r });
}
function H({ variant: e = "glass", className: t, ...r }) {
  return /* @__PURE__ */ a("div", { className: p(e === "glass" ? "pr-card pr-glass" : "pr-card--spectrum", t), ...r });
}
function K({ className: e, ...t }) {
  return /* @__PURE__ */ a("span", { className: p("pr-chip", e), ...t });
}
function U({ tone: e = "spectrum", className: t, ...r }) {
  return /* @__PURE__ */ a("span", { className: p("pr-badge", e !== "spectrum" && `pr-badge--${e}`, t), ...r });
}
function G() {
  return /* @__PURE__ */ a("span", { className: "pr-pulse", "aria-hidden": "true" });
}
function N({ id: e, label: t, hint: r, error: n, children: i }) {
  const c = n ?? r;
  return /* @__PURE__ */ m("div", { className: "pr-field", "data-invalid": n ? "" : void 0, children: [
    /* @__PURE__ */ a("label", { className: "pr-label", htmlFor: e, children: t }),
    i,
    c && /* @__PURE__ */ a("span", { className: "pr-hint", id: `${e}-hint`, children: n ? /* @__PURE__ */ m(T, { children: [
      "✕ ",
      n
    ] }) : c })
  ] });
}
function P({ label: e, hint: t, error: r, id: n, className: i, ...c }) {
  const l = f(), o = n ?? l;
  return /* @__PURE__ */ a(N, { id: o, label: e, hint: t, error: r, children: /* @__PURE__ */ a(
    "input",
    {
      id: o,
      className: p("pr-input", i),
      "aria-invalid": r ? !0 : void 0,
      "aria-describedby": r || t ? `${o}-hint` : void 0,
      ...c
    }
  ) });
}
function X({ label: e, hint: t, error: r, id: n, className: i, ...c }) {
  const l = f(), o = n ?? l;
  return /* @__PURE__ */ a(N, { id: o, label: e, hint: t, error: r, children: /* @__PURE__ */ a(
    "textarea",
    {
      id: o,
      className: p("pr-textarea", i),
      "aria-invalid": r ? !0 : void 0,
      "aria-describedby": r || t ? `${o}-hint` : void 0,
      ...c
    }
  ) });
}
function Y({ label: e, hint: t, error: r, id: n, className: i, children: c, ...l }) {
  const o = f(), u = n ?? o;
  return /* @__PURE__ */ a(N, { id: u, label: e, hint: t, error: r, children: /* @__PURE__ */ a(
    "select",
    {
      id: u,
      className: p("pr-select", i),
      "aria-invalid": r ? !0 : void 0,
      "aria-describedby": r || t ? `${u}-hint` : void 0,
      ...l,
      children: c
    }
  ) });
}
function _({ label: e, className: t, ...r }) {
  return /* @__PURE__ */ m("label", { className: p("pr-check", t), children: [
    /* @__PURE__ */ a("input", { type: "checkbox", ...r }),
    " ",
    e
  ] });
}
function J({ label: e, className: t, ...r }) {
  return /* @__PURE__ */ m("label", { className: p("pr-check", t), children: [
    /* @__PURE__ */ a("input", { type: "radio", ...r }),
    " ",
    e
  ] });
}
function Q({ label: e, className: t, ...r }) {
  return /* @__PURE__ */ m("label", { className: p("pr-switch", t), children: [
    /* @__PURE__ */ a("input", { type: "checkbox", role: "switch", ...r }),
    " ",
    e
  ] });
}
function V({ options: e, value: t, defaultValue: r, onChange: n, label: i }) {
  var v;
  const c = f(), [l, o] = $(r ?? ((v = e[0]) == null ? void 0 : v.value)), u = t ?? l;
  return /* @__PURE__ */ a("div", { className: "pr-seg", role: "radiogroup", "aria-label": i, children: e.map((s) => /* @__PURE__ */ m("label", { children: [
    /* @__PURE__ */ a(
      "input",
      {
        type: "radio",
        name: c,
        value: s.value,
        checked: u === s.value,
        onChange: () => {
          o(s.value), n == null || n(s.value);
        }
      }
    ),
    /* @__PURE__ */ a("span", { children: s.label })
  ] }, s.value)) });
}
function W({ items: e, defaultIndex: t = 0, onChange: r, label: n }) {
  const [i, c] = $(t), l = f(), o = x([]), u = (s, d = !1) => {
    var h;
    c(s), r == null || r(s), d && ((h = o.current[s]) == null || h.focus());
  }, v = (s, d) => {
    const h = e.length, g = s.key === "ArrowRight" ? (d + 1) % h : s.key === "ArrowLeft" ? (d - 1 + h) % h : s.key === "Home" ? 0 : s.key === "End" ? h - 1 : -1;
    g < 0 || (s.preventDefault(), u(g, !0));
  };
  return /* @__PURE__ */ m("div", { className: "pr-tabs", children: [
    /* @__PURE__ */ a("div", { role: "tablist", "aria-label": n, children: e.map((s, d) => /* @__PURE__ */ a(
      "button",
      {
        ref: (h) => o.current[d] = h,
        role: "tab",
        id: `${l}-tab-${d}`,
        "aria-selected": d === i,
        "aria-controls": `${l}-panel-${d}`,
        tabIndex: d === i ? 0 : -1,
        onClick: () => u(d),
        onKeyDown: (h) => v(h, d),
        children: s.label
      },
      d
    )) }),
    e.map((s, d) => /* @__PURE__ */ a("div", { role: "tabpanel", id: `${l}-panel-${d}`, "aria-labelledby": `${l}-tab-${d}`, hidden: d !== i, children: s.content }, d))
  ] });
}
function Z({ items: e }) {
  return /* @__PURE__ */ a("div", { className: "pr-accordion", children: e.map((t, r) => /* @__PURE__ */ m("details", { open: t.open, children: [
    /* @__PURE__ */ a("summary", { children: t.title }),
    /* @__PURE__ */ a("div", { children: t.content })
  ] }, r)) });
}
const E = { info: "✦", success: "✓", warning: "!", error: "✕" };
function z({ tone: e = "info", className: t, children: r, ...n }) {
  return /* @__PURE__ */ m("div", { className: p("pr-callout", `pr-callout--${e}`, t), role: e === "error" ? "alert" : void 0, ...n, children: [
    /* @__PURE__ */ a("b", { "aria-hidden": "true", children: E[e] }),
    /* @__PURE__ */ a("div", { children: r })
  ] });
}
function ee({ value: e, label: t }) {
  const r = Math.max(0, Math.min(100, e));
  return /* @__PURE__ */ a(
    "div",
    {
      className: "pr-progress",
      role: "progressbar",
      "aria-label": t,
      "aria-valuenow": r,
      "aria-valuemin": 0,
      "aria-valuemax": 100,
      style: { "--pr-value": `${r}%` }
    }
  );
}
function te({ value: e, label: t, size: r }) {
  const n = Math.max(0, Math.min(100, e)), i = { "--pr-value": n, ...r ? { "--pr-size": `${r}px` } : {} };
  return /* @__PURE__ */ a("span", { className: "pr-ring", role: "img", "aria-label": `${t}: ${n}%`, style: i, children: /* @__PURE__ */ m("b", { "aria-hidden": "true", children: [
    Math.round(n),
    "%"
  ] }) });
}
function re({ name: e, src: t }) {
  const r = e.split(/\s+/).map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  return /* @__PURE__ */ a("span", { className: "pr-avatar", children: t ? /* @__PURE__ */ a("img", { src: t, alt: e }) : /* @__PURE__ */ a("span", { role: "img", "aria-label": e, children: r }) });
}
function ae({ label: e, children: t }) {
  return /* @__PURE__ */ a("div", { className: "pr-avatar-group", role: "group", "aria-label": e, children: t });
}
function ne({ tip: e, children: t }) {
  return /* @__PURE__ */ a("span", { "data-pr-tip": e, style: { display: "inline-flex" }, children: t });
}
function ie({ open: e, onClose: t, title: r, eyebrow: n, children: i, actions: c }) {
  const l = x(null), o = f();
  return A(() => {
    const u = l.current;
    u && (e && !u.open && u.showModal(), !e && u.open && u.close());
  }, [e]), /* @__PURE__ */ m(
    "dialog",
    {
      ref: l,
      className: "pr-modal",
      "aria-labelledby": o,
      onClose: t,
      onClick: (u) => u.target === u.currentTarget && t(),
      children: [
        n && /* @__PURE__ */ a("p", { className: "pr-eyebrow", children: n }),
        /* @__PURE__ */ a("h2", { className: "pr-h2", id: o, children: r }),
        i,
        c && /* @__PURE__ */ a("div", { className: "pr-modal-actions", children: c })
      ]
    }
  );
}
function ce() {
  return (e, t = "info") => M(e, t);
}
function le({ brand: e, links: t, action: r, className: n, ...i }) {
  var c;
  return /* @__PURE__ */ m("nav", { className: p("pr-nav", n), ...i, children: [
    /* @__PURE__ */ m("a", { className: "pr-logo", href: ((c = t[0]) == null ? void 0 : c.href) ?? "#", children: [
      /* @__PURE__ */ a("i", { "aria-hidden": "true" }),
      e
    ] }),
    t.map((l) => /* @__PURE__ */ a("a", { href: l.href, "aria-current": l.current ? "page" : void 0, children: l.label }, l.href)),
    r
  ] });
}
export {
  Z as Accordion,
  re as Avatar,
  ae as AvatarGroup,
  U as Badge,
  O as Beam,
  q as Button,
  z as Callout,
  H as Card,
  _ as Checkbox,
  K as Chip,
  C as Eyebrow,
  j as Heading,
  D as Lens,
  F as Mesh,
  ie as Modal,
  le as Nav,
  ee as Progress,
  G as Pulse,
  J as Radio,
  te as Ring,
  V as Segmented,
  Y as Select,
  Q as Switch,
  W as Tabs,
  X as TextArea,
  P as TextField,
  ne as Tooltip,
  I as currentTheme,
  L as followSystemMotion,
  y as setCalmMotion,
  B as setTheme,
  ce as useToast
};
