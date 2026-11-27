"use client";

import { useEffect, useState, type ReactNode } from "react";

const copyFailed = "Could not copy the email address.";

export function CopyEmailButton({
  email,
  children,
}: {
  email: string;
  children: ReactNode;
}) {
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (feedback !== "Copied!") return;

    const timeout = window.setTimeout(() => setFeedback(""), 2000);
    return () => window.clearTimeout(timeout);
  }, [feedback]);

  async function copyEmail() {
    setFeedback("");
    if (!navigator.clipboard?.writeText) {
      setFeedback(copyFailed);
      return;
    }

    try {
      await navigator.clipboard.writeText(email);
      setFeedback("Copied!");
    } catch {
      setFeedback(copyFailed);
    }
  }

  return (
    <div className="mt-5 border-t border-border pt-4 sm:mt-auto">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-4">
        {children}
        <button
          type="button"
          onClick={copyEmail}
          className="-my-3 inline-flex min-h-11 items-center gap-2 rounded-sm text-sm font-semibold text-accent-blue underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-blue [@media(scripting:none)]:hidden"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="size-4">
            <rect x="8" y="3" width="8" height="4" rx="1" />
            <path d="M8 5H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
          </svg>
          Copy Email
        </button>
      </div>
      <p role="status" className="text-sm text-muted">{feedback}</p>
      {feedback === copyFailed && (
        <details className="mt-2 text-sm">
          <summary className="cursor-pointer text-accent-blue">Show email address</summary>
          <p className="mt-1 select-text break-all text-foreground">{email}</p>
        </details>
      )}
    </div>
  );
}
