(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  root.PortfolioProfile = Object.assign(root.PortfolioProfile || {}, api);
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  function normalizeProficiency(value) {
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) return 0;
    return Math.min(100, Math.max(0, numeric));
  }

  function ringOffset(value, radius) {
    const safeRadius = Number.isFinite(Number(radius)) ? Math.max(0, Number(radius)) : 0;
    const circumference = 2 * Math.PI * safeRadius;
    return circumference * (1 - normalizeProficiency(value) / 100);
  }

  function activateProfile(rootDocument) {
    const documentRef = rootDocument || (typeof document !== "undefined" ? document : null);
    if (!documentRef) return function () {};

    const host = documentRef.getElementById("profileView");
    if (!host) return function () {};
    if (typeof host._profileCleanup === "function") host._profileCleanup();

    const scenes = Array.from(host.querySelectorAll(".profile-scene"));
    const progressButtons = Array.from(host.querySelectorAll("[data-profile-go]"));
    const softwareSkills = Array.from(host.querySelectorAll(".software-skill"));
    const projectTargets = Array.from(host.querySelectorAll("[data-project-target]"));
    const linesHost = host.querySelector("#kineticLines");
    const cleanup = [];
    let observer = null;

    function listen(target, eventName, handler, options) {
      target?.addEventListener(eventName, handler, options);
      cleanup.push(() => target?.removeEventListener(eventName, handler, options));
    }

    function updateProgress(activeIndex) {
      progressButtons.forEach((button, index) => {
        if (index === activeIndex) button.setAttribute("aria-current", "true");
        else button.removeAttribute("aria-current");
      });
    }

    progressButtons.forEach(button => {
      listen(button, "click", () => {
        const index = Number(button.dataset.profileGo);
        scenes[index]?.scrollIntoView({
          block: "start",
          behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        });
      });
    });

    if (typeof IntersectionObserver === "function" && scenes.length) {
      observer = new IntersectionObserver(entries => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const index = visible ? scenes.indexOf(visible.target) : -1;
        if (index >= 0) updateProgress(index);
      }, { root: host, threshold: [0.45, 0.65, 0.82] });
      scenes.forEach(scene => observer.observe(scene));
    }

    const lineNodes = Array.from(linesHost?.children || []);
    function moveLines(event) {
      const bounds = linesHost.getBoundingClientRect();
      const maxDistance = Math.max(bounds.width * 0.28, 120);
      lineNodes.forEach(line => {
        const lineBounds = line.getBoundingClientRect();
        const center = lineBounds.left + lineBounds.width / 2;
        const delta = event.clientX - center;
        const influence = Math.max(0, 1 - Math.abs(delta) / maxDistance);
        line.style.setProperty("--line-height", `${(58 + influence * 15).toFixed(2)}%`);
        line.style.setProperty("--line-scale", (1 + influence * 0.18).toFixed(3));
        line.style.setProperty("--line-sway", `${(delta * influence * 0.028).toFixed(2)}px`);
        line.style.setProperty("--line-opacity", (0.32 + influence * 0.68).toFixed(2));
        line.style.setProperty("--dot-opacity", (0.42 + influence * 0.58).toFixed(2));
      });
    }

    function resetLines() {
      lineNodes.forEach(line => {
        line.style.setProperty("--line-height", "58%");
        line.style.setProperty("--line-scale", "1");
        line.style.setProperty("--line-sway", "0px");
        line.style.setProperty("--line-opacity", ".38");
        line.style.setProperty("--dot-opacity", ".42");
      });
    }

    if (linesHost) {
      resetLines();
      listen(linesHost, "pointermove", moveLines);
      listen(linesHost, "pointerleave", resetLines);
    }

    softwareSkills.forEach(skill => {
      const value = normalizeProficiency(skill.dataset.skill);
      const radius = Number(skill.querySelector(".software-ring__value")?.getAttribute("r")) || 42;
      const circumference = 2 * Math.PI * radius;
      skill.style.setProperty("--ring-circumference", String(circumference));
      skill.style.setProperty("--ring-offset", String(ringOffset(value, radius)));

      const activate = () => skill.classList.add("is-active");
      const deactivate = () => {
        if (!skill.matches(":focus-visible")) skill.classList.remove("is-active");
      };
      listen(skill, "pointerenter", activate);
      listen(skill, "pointerleave", deactivate);
      listen(skill, "focus", activate);
      listen(skill, "blur", () => skill.classList.remove("is-active"));
      listen(skill, "click", () => skill.classList.toggle("is-active"));
    });

    projectTargets.forEach(button => {
      listen(button, "click", () => {
        const projectId = button.dataset.projectTarget;
        if (!projectId) return;
        button.dispatchEvent(new CustomEvent("portfolio:open-project", {
          bubbles: true,
          detail: { projectId },
        }));
      });
    });

    const dispose = function () {
      observer?.disconnect();
      cleanup.splice(0).forEach(remove => remove());
      if (host._profileCleanup === dispose) host._profileCleanup = null;
    };
    host._profileCleanup = dispose;
    return dispose;
  }

  function autoActivate() {
    if (typeof document === "undefined") return;
    const run = () => activateProfile(document);
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run, { once: true });
    else run();
  }

  autoActivate();

  return {
    activateProfile,
    normalizeProficiency,
    ringOffset,
  };
});
