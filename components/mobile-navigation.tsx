"use client";

import type { MouseEvent } from "react";

type MobileNavigationProps = {
  items: string[];
  targets: string[];
};

export function MobileNavigation({ items, targets }: MobileNavigationProps) {
  const closeMenu = (event: MouseEvent<HTMLAnchorElement>) => {
    event.currentTarget.closest("details")?.removeAttribute("open");
  };

  return (
    <details className="mobile-menu">
      <summary>Меню <span aria-hidden="true">+</span></summary>
      <nav aria-label="Мобильная навигация">
        {items.map((item, index) => (
          <a key={item} href={`#${targets[index]}`} onClick={closeMenu}>{item}</a>
        ))}
      </nav>
    </details>
  );
}
