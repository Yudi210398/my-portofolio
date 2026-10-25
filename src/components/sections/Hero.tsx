import Image from "next/image";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <Section id="home" aria-labelledby="hero-title" className={`${styles.viewport} overflow-hidden`}>
      <div className={styles.orbitScene} aria-hidden="true">
        <span className={`${styles.orbitLine} ${styles.orbitOuter}`} />
        <span className={`${styles.orbitLine} ${styles.orbitInner}`} />
        <span className={styles.orbitalNode} />
        <span className={styles.staticNode} />
        <span className={styles.sphere} />
        <span className={styles.floatingNode} />
      </div>
      <Container className={styles.content}>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="max-w-[65ch]">
            <h1
              id="hero-title"
              className={`${styles.headline} max-w-[14ch] text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl`}
            >
              Backend Engineer | NestJS &amp; TypeScript
            </h1>
            <p className={`${styles.description} mt-6 max-w-[52ch] text-base leading-relaxed text-muted sm:text-lg`}>
              Building reliable backend systems with a focus on clean
              architecture and data integrity.
            </p>
            <div className={`${styles.actions} mt-8 flex flex-wrap gap-3`}>
              <a
                href="#focus"
                className="inline-flex min-h-12 items-center justify-center rounded-md bg-accent-blue px-5 text-sm font-semibold text-background hover:underline hover:underline-offset-4"
              >
                Explore my focus
              </a>
              <a
                href="#work"
                className="inline-flex min-h-12 items-center justify-center rounded-md border border-border px-5 text-sm font-semibold text-foreground hover:border-accent-blue hover:underline hover:underline-offset-4"
              >
                View Selected Work
              </a>
            </div>
          </div>

          <div
            className="mx-auto w-full max-w-[50rem] mr-auto -translate-y-[24px]"
            aria-hidden="true"
          >
            <Image
              src="/images/hero-backend-reference.png"
              alt=""
              width={1448}
              height={1086}
              sizes="(min-width: 1024px) 50vw, 100vw"
              unoptimized
              loading="eager"
              className={`${styles.visual} h-auto w-full object-contain`}
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
