"use client";

import { useState } from "react";
import { CalendarDays, Check, ChevronDown, Download } from "lucide-react";
import { Spinner } from "@/components/brand/brand-loader";

type ExportState = "idle" | "working" | "done";

export function HeaderActions() {
  const [state, setState] = useState<ExportState>("idle");

  const exportReport = () => {
    if (state !== "idle") return;
    setState("working");
    // Stand-in for the report generation request.
    setTimeout(() => setState("done"), 1600);
    setTimeout(() => setState("idle"), 3400);
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button className="btn-glass flex h-11 items-center gap-2.5 rounded-xl px-4 text-sm font-medium text-fg">
        <CalendarDays className="h-4.5 w-4.5 text-brand" />
        Oct 2026
        <ChevronDown className="h-4 w-4 text-subtle" />
      </button>
      <button
        onClick={exportReport}
        aria-live="polite"
        className="btn-brand flex h-11 min-w-40 items-center justify-center gap-2.5 rounded-xl px-4 text-sm font-semibold"
      >
        {state === "working" ? (
          <>
            <Spinner /> Generating…
          </>
        ) : state === "done" ? (
          <>
            <Check className="h-4.5 w-4.5 animate-fade-up" /> Report ready
          </>
        ) : (
          <>
            <Download className="h-4.5 w-4.5" /> Export Report
          </>
        )}
      </button>
    </div>
  );
}
