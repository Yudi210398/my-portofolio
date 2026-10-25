import Link from "next/link";

import { Container } from "@/components/layout/container";

export default function NotFound() {
  return (
    <main id="main-content" className="flex min-h-[60vh] items-center py-16">
      <Container>
        <p className="text-sm font-semibold tracking-[0.14em] text-accent-blue uppercase">
          404 / Page not found
        </p>
        <h1 className="mt-6 max-w-[18ch] text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-foreground">
          This page could not be found.
        </h1>
        <p className="mt-5 max-w-[55ch] text-base leading-relaxed text-muted sm:text-lg">
          The page may have moved, or the address may be incorrect.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex min-h-11 items-center rounded-md border border-accent-blue/50 px-5 py-2 font-medium text-foreground hover:border-accent-blue hover:bg-accent-blue/10"
        >
          Return to homepage
        </Link>
      </Container>
    </main>
  );
}
