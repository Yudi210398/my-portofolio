"use client";

import { Children, useId, useState, type ReactNode } from "react";
import styles from "./ProjectCarousel.module.css";

export function ProjectCarousel({
  children,
  titles,
}: {
  children: ReactNode;
  titles: readonly string[];
}) {
  const slides = Children.toArray(children);
  const [active, setActive] = useState(0);
  const id = useId();
  const move = (direction: number) =>
    setActive((current) => (current + direction + slides.length) % slides.length);

  return (
    <div role="region" aria-roledescription="carousel" aria-label="Selected projects" className="mt-10 min-w-0">
      {slides.length > 1 && (
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <p aria-live="polite" aria-atomic="true" className="text-sm text-muted">
            {active + 1} / {slides.length}
            <span className="sr-only"> — {titles[active]}</span>
          </p>
          <div
            className="flex items-center gap-2"
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                event.preventDefault();
                move(event.key === "ArrowLeft" ? -1 : 1);
              }
            }}
          >
            <button type="button" aria-label="Previous project" aria-controls={id} onClick={() => move(-1)} className={styles.control}>
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="m14 6-6 6 6 6" /></svg>
            </button>
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Show project ${index + 1}: ${titles[index]}`}
                aria-current={index === active ? "true" : undefined}
                aria-controls={id}
                onClick={() => setActive(index)}
                className={styles.indicator}
              >
                <span aria-hidden="true" className={index === active ? styles.dotActive : styles.dot} />
              </button>
            ))}
            <button type="button" aria-label="Next project" aria-controls={id} onClick={() => move(1)} className={styles.control}>
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="m10 6 6 6-6 6" /></svg>
            </button>
          </div>
        </div>
      )}
      <div id={id} className={styles.stage}>
        {slides.map((slide, index) => (
          <div
            key={index}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${slides.length}: ${titles[index]}`}
            aria-hidden={index !== active}
            inert={index !== active}
            className={`${styles.slide} ${index === active ? styles.active : ""}`}
          >
            {slide}
          </div>
        ))}
      </div>
    </div>
  );
}
