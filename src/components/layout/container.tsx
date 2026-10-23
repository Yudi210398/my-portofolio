import type { HTMLAttributes } from "react";

type ContainerProps = HTMLAttributes<HTMLDivElement>;

export function Container({ className, ...props }: ContainerProps) {
  return (
    <div
      className={["content-container", className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}
