import Link from "next/link";
import { Container } from "./container";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Container>
        <div className="site-header__inner flex-wrap justify-between gap-x-6 gap-y-2 py-3 sm:flex-nowrap">
          <Link className="site-header__identity" href="/">
            <span className="site-header__name">Yudi Runat Masneno</span>
            <span className="site-header__role">Backend Engineer</span>
          </Link>
          <nav aria-label="Primary navigation" className="flex w-full items-center gap-1 sm:w-auto">
            <a
              href="#focus"
              className="inline-flex min-h-11 items-center rounded-md px-3 text-sm font-medium text-muted hover:text-foreground"
            >
              Focus
            </a>
            <a
              href="#work"
              className="inline-flex min-h-11 items-center rounded-md px-3 text-sm font-medium text-muted hover:text-foreground"
            >
              Work
            </a>
          </nav>
        </div>
      </Container>
    </header>
  );
}
