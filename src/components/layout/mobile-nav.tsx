"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { navigationLinks } from "./navigation-links";
import styles from "./mobile-nav.module.css";

export function MobileNav({ onOpenChange }: { onOpenChange: (open: boolean) => void }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const updateOpen = useCallback((next: boolean) => {
    setOpen(next);
    onOpenChange(next);
  }, [onOpenChange]);

  useEffect(() => {
    if (!open) return;

    const closeOnOutside = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) updateOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      updateOpen(false);
      buttonRef.current?.focus();
    };

    document.addEventListener("pointerdown", closeOnOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open, updateOpen]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => {
      if (desktop.matches) updateOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, [updateOpen]);

  return (
    <div ref={rootRef} className="js-only-mobile-nav lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        aria-controls="mobile-site-navigation"
        aria-expanded={open}
        onClick={() => updateOpen(!open)}
        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-border text-foreground hover:border-accent-blue hover:bg-surface"
      >
        <span className={`${styles.icon} ${open ? styles.iconOpen : ""}`} aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </button>
      <nav
        id="mobile-site-navigation"
        aria-label="Mobile navigation"
        aria-hidden={!open}
        inert={!open}
        className={`${styles.panel} ${open ? styles.panelOpen : ""}`}
      >
        <div className="content-container flex flex-col gap-1 py-3">
          {navigationLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => updateOpen(false)}
              className="flex min-h-12 items-center rounded-md px-4 text-sm font-medium text-muted hover:bg-surface hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </div>
  );
}
