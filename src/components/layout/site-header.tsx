"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CV_PATH, getCvHref } from "@/config/public-contact";
import { Container } from "./container";
import { MobileNav } from "./mobile-nav";
import navStyles from "./navigation-link.module.css";
import { navigationLinks } from "./navigation-links";
import { useActiveSection } from "./use-active-section";

function DownloadIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-4 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3v12m-4-4 4 4 4-4M4 17v3h16v-3" />
    </svg>
  );
}

function CvAction({ compact }: { compact?: boolean }) {
  const href = getCvHref(CV_PATH);
  const label = compact ? <span className="sr-only">Download CV</span> : "Download CV";
  const size = compact ? "min-w-11 px-2.5" : "gap-2 px-3.5";
  const base = `inline-flex min-h-11 items-center justify-center rounded-md border bg-transparent text-sm font-semibold ${size}`;

  if (!href) {
    const statusId = compact ? "mobile-cv-status" : "desktop-cv-status";
    return (
      <button
        type="button"
        disabled
        aria-label="Download CV"
        aria-describedby={statusId}
        className={`${base} cursor-not-allowed border-accent-blue/40 text-muted`}
      >
        <DownloadIcon />
        {label}
        <span id={statusId} className="sr-only">Approved CV PDF pending</span>
      </button>
    );
  }

  return (
    <a
      href={href}
      download
      className={`${base} border-accent-blue/70 text-foreground transition-colors duration-200 hover:border-accent-violet hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-blue motion-reduce:transition-none`}
    >
      <DownloadIcon />
      {label}
    </a>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const scrolledRef = useRef(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { activeSection, navigateToSection } = useActiveSection(pathname);

  useEffect(() => {
    if (pathname !== "/") return;

    const updateScrollState = () => {
      const next = scrolledRef.current ? window.scrollY > 8 : window.scrollY >= 16;
      if (next === scrolledRef.current) return;
      scrolledRef.current = next;
      setScrolled(next);
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, [pathname]);

  const glass = pathname !== "/" || scrolled;
  const appearance = menuOpen
    ? "border-border bg-background"
    : glass
      ? "border-border bg-background/90 backdrop-blur-[10px]"
      : "border-transparent bg-transparent";

  return (
    <header
      className={`sticky top-0 z-50 border-b ${menuOpen ? "transition-none" : "transition-[background-color,border-color] duration-[220ms] ease-out motion-reduce:transition-none"} ${appearance}`}
    >
      <Container>
        <div className="site-header__inner justify-between gap-x-2 py-3 sm:gap-x-6">
          <Link className="site-header__identity" href="/">
            <span className="site-header__name">Yudi Runat Masneno</span>
            <span className="site-header__role">Backend Engineer</span>
          </Link>
          <div className="flex items-center gap-2 lg:hidden">
            <CvAction compact />
            <MobileNav onOpenChange={setMenuOpen} activeSection={activeSection} onNavigate={navigateToSection} />
          </div>
          <div className="hidden items-center gap-3 lg:flex">
            <nav aria-label="Primary navigation" className="flex items-center gap-1">
              {navigationLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={activeSection === link.href.slice(2) ? "location" : undefined}
                  onClick={() => navigateToSection(link.href)}
                  className={`${navStyles.link} inline-flex min-h-11 items-center rounded-lg px-3 text-sm font-medium`}
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <CvAction />
          </div>
        </div>
        <noscript>
          <style>{`
            .js-only-mobile-nav { display: none !important; }
            @media (max-width: 767px) {
              html { scroll-padding-top: calc(11.0625rem + 1.5rem); }
            }
            @media (min-width: 768px) and (max-width: 1023px) {
              html { scroll-padding-top: calc(8.0625rem + 1.5rem); }
            }
          `}</style>
          <nav aria-label="Mobile navigation" className="flex flex-wrap gap-1 pb-3 lg:hidden">
            {navigationLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="inline-flex min-h-11 items-center rounded-md px-3 text-sm text-muted"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </noscript>
      </Container>
    </header>
  );
}
