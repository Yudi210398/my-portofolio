"use client";

import { useCallback, useEffect, useRef, type ReactNode } from "react";
import { inView } from "motion";
import { motion, useAnimationControls, useReducedMotion } from "motion/react";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
  delay?: number;
};

const visible = { opacity: 1, y: 0 };
const hidden = { opacity: 0, y: 16 };
const ease = [0.16, 1, 0.3, 1] as const;

export function ScrollReveal({
  children,
  className,
  as = "div",
  delay = 0,
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLElement | null>(null);
  const revealedRef = useRef(false);
  const controls = useAnimationControls();
  const reducedMotion = useReducedMotion();
  const setElement = useCallback((element: HTMLElement | null) => {
    elementRef.current = element;
  }, []);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || revealedRef.current) return;

    const bounds = element.getBoundingClientRect();
    if (
      reducedMotion ||
      bounds.bottom <= 0 ||
      bounds.top <= window.innerHeight * 0.9
    ) {
      revealedRef.current = true;
      controls.set(visible);
      return;
    }

    controls.set(hidden);
    return inView(
      element,
      () => {
        if (revealedRef.current) return;
        revealedRef.current = true;
        void controls.start({
          ...visible,
          transition: { duration: 0.4, ease, delay },
        });
      },
      { margin: "0px 0px -10% 0px" },
    );
  }, [controls, delay, reducedMotion]);

  const revealOnFocus = () => {
    if (revealedRef.current) return;
    revealedRef.current = true;
    void controls.start({
      ...visible,
      transition: { duration: 0.2, ease },
    });
  };

  if (as === "li") {
    return (
      <motion.li
        ref={setElement}
        className={className}
        initial={false}
        animate={controls}
        onFocusCapture={revealOnFocus}
        data-scroll-reveal
      >
        {children}
      </motion.li>
    );
  }

  return (
    <motion.div
      ref={setElement}
      className={className}
      initial={false}
      animate={controls}
      onFocusCapture={revealOnFocus}
      data-scroll-reveal
    >
      {children}
    </motion.div>
  );
}
