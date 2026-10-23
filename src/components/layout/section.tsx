import type { ComponentPropsWithoutRef } from "react";

type SectionProps = ComponentPropsWithoutRef<"section">;

export function Section({ className, ...props }: SectionProps) {
  return (
    <section
      className={["site-section", className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}
