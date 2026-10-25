"use client";

import { useEffect, useRef, useState } from "react";
import { navigationLinks } from "./navigation-links";

const sectionIds = navigationLinks.map((link) => link.href.slice(2));

export function useActiveSection(pathname: string) {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const pendingSection = useRef<string | null>(null);
  const pendingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const requestUpdate = useRef<() => void>(() => {});

  useEffect(() => {
    if (pathname !== "/") return;

    let frame = 0;
    const clearPending = () => {
      pendingSection.current = null;
      if (pendingTimeout.current !== null) clearTimeout(pendingTimeout.current);
      pendingTimeout.current = null;
    };
    const update = () => {
      frame = 0;
      if (pendingSection.current) return;

      const headerBottom = document.querySelector("header")?.getBoundingClientRect().bottom ?? 0;
      const readingLine = headerBottom + Math.min(window.innerHeight * 0.2, 160);
      let current = sectionIds[0];
      for (const id of sectionIds) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= readingLine) current = id;
      }
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
        current = sectionIds[sectionIds.length - 1];
      }
      setActiveSection((previous) => (previous === current ? previous : current));
    };
    const scheduleUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    requestUpdate.current = scheduleUpdate;
    const finishScroll = () => {
      clearPending();
      scheduleUpdate();
    };
    const handleHashChange = () => {
      if (pendingSection.current !== window.location.hash.slice(1)) finishScroll();
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("scrollend", finishScroll);
    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("popstate", handleHashChange);
    return () => {
      cancelAnimationFrame(frame);
      clearPending();
      requestUpdate.current = () => {};
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("scrollend", finishScroll);
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("popstate", handleHashChange);
    };
  }, [pathname]);

  const navigateToSection = (href: string) => {
    if (pathname !== "/") return;
    const id = href.slice(2);
    pendingSection.current = id;
    setActiveSection(id);
    if (pendingTimeout.current !== null) clearTimeout(pendingTimeout.current);
    pendingTimeout.current = setTimeout(() => {
      pendingSection.current = null;
      requestUpdate.current();
    }, 2000);
  };

  return { activeSection: pathname === "/" ? activeSection : null, navigateToSection };
}
