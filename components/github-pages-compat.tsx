"use client";

import { useEffect } from "react";

export function GitHubPagesCompat() {
  useEffect(() => {
    if (window.location.hostname !== "tatababanova-svg.github.io") return;

    const basePath = "/tatiana-babanova-portfolio";

    document
      .querySelectorAll<HTMLAnchorElement>('a[href="/tatiana-babanova-project-manager.pdf"]')
      .forEach((link) => {
        link.href = `${basePath}/tatiana-babanova-project-manager.pdf`;
      });
  }, []);

  return null;
}
