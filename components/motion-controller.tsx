"use client";

import { useLayoutEffect } from "react";

export type MotionId = "a" | "b" | "c";

export function MotionController({ motion }: { motion: MotionId }) {
  useLayoutEffect(() => {
    const root = document.documentElement;
    const scope = document.querySelector<HTMLElement>(`[data-motion="${motion}"]`);

    if (!scope) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sections = Array.from(scope.querySelectorAll<HTMLElement>("[data-motion-section]"));
    const staggeredItems = scope.querySelectorAll<HTMLElement>(
      ".sequence-track li, .metric, .question, .scenario-list article, .case-diagram li, .case-feature-grid article, .case-process li, .summary-metrics article, .editorial-hook",
    );

    staggeredItems.forEach((item, index) => {
      item.style.setProperty("--motion-index", String(index % 8));
    });

    root.classList.add("motion-enabled");
    scope.classList.add("motion-mounted");

    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
      scope.style.setProperty("--scroll-progress", String(progress));
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });

    if (reducedMotion) {
      scope.classList.add("motion-reduced");
      sections.forEach((section) => section.classList.add("is-visible"));

      return () => {
        window.removeEventListener("scroll", updateProgress);
        root.classList.remove("motion-enabled");
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateProgress);
      root.classList.remove("motion-enabled");
    };
  }, [motion]);

  return null;
}
