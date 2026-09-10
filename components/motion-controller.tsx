"use client";

import { useEffect } from "react";

export type MotionId = "a" | "b" | "c";

export function MotionController({ motion }: { motion: MotionId }) {
  useEffect(() => {
    const scope = document.querySelector<HTMLElement>(`[data-motion="${motion}"]`);
    if (!scope) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealItems = Array.from(scope.querySelectorAll<HTMLElement>("[data-reveal]"));
    const heroItems = Array.from(scope.querySelectorAll<HTMLElement>("[data-hero-motion]"));
    const sections = Array.from(scope.querySelectorAll<HTMLElement>("[data-motion-section]"));
    const navLinks = Array.from(scope.querySelectorAll<HTMLAnchorElement>("[data-nav-target]"));
    const kineticItems = Array.from(scope.querySelectorAll<HTMLElement>(
      "h1, .approved-display, .approved-result-accent, .approved-case-highlight strong",
    ));
    let kineticFrame = 0;

    const revealAll = () => {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      heroItems.forEach((item) => item.classList.add("is-visible"));
    };

    revealItems.forEach((item, index) => item.style.setProperty("--reveal-index", String(index % 5)));
    heroItems.forEach((item, index) => item.style.setProperty("--hero-index", String(index)));
    scope.classList.add("motion-ready");

    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
      scope.style.setProperty("--scroll-progress", String(progress));

      if (!reducedMotion && !kineticFrame) {
        kineticFrame = window.requestAnimationFrame(() => {
          const viewportCenter = window.innerHeight / 2;
          kineticItems.forEach((item, index) => {
            const rect = item.getBoundingClientRect();
            if (rect.bottom < -80 || rect.top > window.innerHeight + 80) return;
            const distance = ((rect.top + rect.height / 2) - viewportCenter) / Math.max(window.innerHeight, 1);
            const clamped = Math.max(-1, Math.min(1, distance));
            const direction = index % 2 === 0 ? 1 : -1;
            item.style.setProperty("--kinetic-scroll-x", `${(clamped * direction * 12).toFixed(2)}px`);
            item.style.setProperty("--kinetic-scroll-y", `${(clamped * -7).toFixed(2)}px`);
          });
          kineticFrame = 0;
        });
      }
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });

    const kineticCleanups = kineticItems.map((item, index) => {
      item.classList.add("approved-kinetic-text");
      item.style.setProperty("--kinetic-index", String(index));

      const move = (event: PointerEvent) => {
        if (reducedMotion) return;
        const rect = item.getBoundingClientRect();
        const x = (event.clientX - rect.left) / Math.max(rect.width, 1) - 0.5;
        const y = (event.clientY - rect.top) / Math.max(rect.height, 1) - 0.5;
        item.style.setProperty("--kinetic-hover-x", `${(x * 20).toFixed(2)}px`);
        item.style.setProperty("--kinetic-hover-y", `${(y * 10).toFixed(2)}px`);
        item.classList.add("is-kinetic-hovered");
      };
      const leave = () => {
        item.style.setProperty("--kinetic-hover-x", "0px");
        item.style.setProperty("--kinetic-hover-y", "0px");
        item.classList.remove("is-kinetic-hovered");
      };

      item.addEventListener("pointermove", move, { passive: true });
      item.addEventListener("pointerleave", leave);
      return () => {
        item.removeEventListener("pointermove", move);
        item.removeEventListener("pointerleave", leave);
      };
    });

    if (reducedMotion || !("IntersectionObserver" in window)) {
      scope.classList.add("motion-reduced");
      revealAll();

      return () => {
        kineticCleanups.forEach((cleanup) => cleanup());
        if (kineticFrame) window.cancelAnimationFrame(kineticFrame);
        window.removeEventListener("scroll", updateProgress);
      };
    }

    heroItems.forEach((item) => item.classList.add("is-visible"));

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -9% 0px" },
    );

    revealItems.forEach((item) => {
      const rect = item.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.94 && rect.bottom > 0) item.classList.add("is-visible");
      else revealObserver.observe(item);
    });

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const id = (visible.target as HTMLElement).id;
        navLinks.forEach((link) => link.classList.toggle("is-active", link.dataset.navTarget === id));
      },
      { threshold: [0.16, 0.35, 0.55], rootMargin: "-18% 0px -55% 0px" },
    );
    sections.forEach((section) => sectionObserver.observe(section));

    return () => {
      kineticCleanups.forEach((cleanup) => cleanup());
      if (kineticFrame) window.cancelAnimationFrame(kineticFrame);
      revealObserver.disconnect();
      sectionObserver.disconnect();
      window.removeEventListener("scroll", updateProgress);
    };
  }, [motion]);

  return null;
}
