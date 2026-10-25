import Link from "next/link";

import { getPublishedProjects } from "@/data/projects";

import { Container } from "./container";

const links = [
  { label: "Home", href: "/" },
  { label: "Focus", href: "/#focus" },
  { label: "Work", href: "/#work" },
  { label: "Contact", href: "/#contact" },
] as const;

export function SiteFooter() {
  const featuredProjects = getPublishedProjects().filter((project) => project.caseStudy);

  return (
    <footer className="border-t border-border py-12 sm:py-14">
      <Container>
        <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-[1.35fr_0.8fr_1.2fr_0.9fr] lg:gap-x-12">
          <div>
            <p className="text-lg font-semibold text-foreground">Yudi Runat Masneno</p>
            <p className="mt-1 text-sm text-muted">Backend Engineer</p>
            <p className="mt-4 max-w-[28ch] text-sm leading-relaxed text-muted">
              Building reliable backend systems with a focus on clean architecture
              and data integrity.
            </p>
          </div>
          <nav aria-label="Footer navigation">
            <h2 className="text-xs font-semibold tracking-[0.14em] text-accent-blue uppercase">Navigation</h2>
            <ul className="mt-3">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="inline-flex min-h-11 items-center rounded-md text-sm text-muted hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h2 className="text-xs font-semibold tracking-[0.14em] text-accent-blue uppercase">Featured work</h2>
            {featuredProjects.length > 0 ? (
              <ul className="mt-3">
                {featuredProjects.map((project) => (
                  <li key={project.slug}>
                    <Link href={`/projects/${project.slug}`} className="inline-flex min-h-11 items-center rounded-md text-sm leading-snug text-muted hover:text-foreground">
                      {project.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-5 text-sm text-muted">No case studies published yet.</p>
            )}
          </div>
          <div>
            <h2 className="text-xs font-semibold tracking-[0.14em] text-accent-blue uppercase">Information</h2>
            <p className="mt-5 text-sm leading-relaxed text-muted">
              English-first portfolio. Public contact and CV links will appear when approved.
            </p>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-6 text-sm text-muted">
          <p>© Yudi Runat Masneno. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
