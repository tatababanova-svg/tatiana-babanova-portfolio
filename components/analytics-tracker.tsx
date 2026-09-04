"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    plausible?: (eventName: string, options?: { props?: Record<string, string> }) => void;
    umami?: { track: (eventName: string, data?: Record<string, string>) => void };
  }
}

export function AnalyticsTracker() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const tracked = target.closest<HTMLElement>("[data-analytics-event]");
      const eventName = tracked?.dataset.analyticsEvent;
      if (!tracked || !eventName) return;

      const props = {
        href: tracked instanceof HTMLAnchorElement ? tracked.href : "",
        section: tracked.closest("section, footer")?.id || "page",
      };

      window.plausible?.(eventName, { props });
      window.umami?.track(eventName, props);
      window.dispatchEvent(new CustomEvent("site:analytics", { detail: { eventName, ...props } }));
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  return null;
}
