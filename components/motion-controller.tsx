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
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });

    const updatePointer = (event: PointerEvent) => {
      const x = event.clientX / Math.max(window.innerWidth, 1) - 0.5;
      const y = event.clientY / Math.max(window.innerHeight, 1) - 0.5;
      scope.style.setProperty("--pointer-x", x.toFixed(3));
      scope.style.setProperty("--pointer-y", y.toFixed(3));
    };
    window.addEventListener("pointermove", updatePointer, { passive: true });

    if (reducedMotion || !("IntersectionObserver" in window)) {
      scope.classList.add("motion-reduced");
      revealAll();

      return () => {
        window.removeEventListener("scroll", updateProgress);
        window.removeEventListener("pointermove", updatePointer);
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
      revealObserver.disconnect();
      sectionObserver.disconnect();
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("pointermove", updatePointer);
    };
  }, [motion]);

  return null;
}
