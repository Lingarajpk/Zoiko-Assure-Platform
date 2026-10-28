"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { Panel } from "./panel";
import { CountUp } from "@/components/ui/count-up";
import { frameworks, posture, type Framework } from "@/lib/dashboard-data";

const R = 70;
const C = 2 * Math.PI * R;
// Round caps add strokeWidth/2 at each end, so trim that plus a small visible gap.
const GAP = 18;

export function CompliancePosture({ delay = 0 }: { delay?: number }) {
  const [framework, setFramework] = useState<Framework>("All Frameworks");
  const [hovered, setHovered] = useState<string | null>(null);
  const [drawn, setDrawn] = useState(false);

  // Let the first paint render empty arcs, then transition them in.
  useEffect(() => {
    const t = setTimeout(() => setDrawn(true), delay + 250);
    return () => clearTimeout(t);
  }, [delay]);

  const slices = posture[framework];
  const total = slices.reduce((s, x) => s + x.value, 0);
  const pct = (v: number) => (total ? Math.round((v / total) * 100) : 0);
  const proven = pct(slices[0].value);

  const arcs = useMemo(() => {
    const lens = slices.map((s) => (total ? (s.value / total) * C : 0));
    return slices.map((s, i) => ({
      ...s,
      len: lens[i] > 0 ? Math.max(0.1, lens[i] - GAP) : 0,
      offset: lens.slice(0, i).reduce((a, b) => a + b, 0) + GAP / 2,
    }));
  }, [slices, total]);

  return (
    <Panel
      title="Compliance Posture"
      delay={delay}
      className="z-10"
      action={<FrameworkSelect value={framework} onChange={setFramework} />}
    >
      <div className="grid items-center gap-6 md:grid-cols-[220px_1fr]">
        <div className="relative mx-auto h-[220px] w-[220px]">
          <div className="absolute inset-6 rounded-full bg-azure/20 blur-2xl" />
          <svg viewBox="0 0 180 180" className="relative h-full w-full -rotate-90">
            <defs>
              <linearGradient id="posture-ring" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#2F7CF6" />
                <stop offset="60%" stopColor="#6FB0FF" />
                <stop offset="100%" stopColor="#F5B544" />
              </linearGradient>
            </defs>
            <circle cx="90" cy="90" r={R} fill="none" stroke="var(--line)" strokeWidth="14" />
            {arcs.map((a) => {
              const dim = hovered && hovered !== a.key;
              return (
                <circle
                  key={a.key}
                  cx="90"
                  cy="90"
                  r={R}
                  fill="none"
                  stroke={a.key === "proven" ? "url(#posture-ring)" : a.color}
                  strokeWidth={hovered === a.key ? 20 : 14}
                  strokeLinecap="round"
                  strokeDasharray={`${drawn ? a.len : 0} ${C}`}
                  strokeDashoffset={-a.offset}
                  className="cursor-pointer transition-all duration-[900ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]"
                  style={{ opacity: dim ? 0.3 : 1, filter: hovered === a.key ? `drop-shadow(0 0 8px ${a.color})` : undefined }}
                  onMouseEnter={() => setHovered(a.key)}
                  onMouseLeave={() => setHovered(null)}
                />
              );
            })}
          </svg>
          <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
            <div>
              <p className="text-4xl font-extrabold tracking-tight text-fg">
                {hovered ? (
                  `${pct(slices.find((s) => s.key === hovered)!.value)}%`
                ) : (
                  <CountUp key={framework} value={proven} suffix="%" delay={delay} />
                )}
              </p>
              <p className="mt-1 text-sm text-muted">
                {hovered ? slices.find((s) => s.key === hovered)!.label : "Overall Compliance"}
              </p>
            </div>
          </div>
        </div>

        <ul className="divide-y divide-line">
          {slices.map((s, i) => (
            <li
              key={s.key}
              onMouseEnter={() => setHovered(s.key)}
              onMouseLeave={() => setHovered(null)}
              className={`grid cursor-default grid-cols-[1fr_auto_3rem] items-center gap-4 rounded-xl px-2 py-3 transition-all duration-300 animate-fade-up ${
                hovered === s.key ? "translate-x-1 bg-glass-strong" : ""
              }`}
              style={{ ["--d" as string]: `${delay + 200 + i * 80}ms` }}
            >
              <span className="flex items-center gap-3 text-[15px] font-medium text-fg">
                <span
                  className="h-3 w-3 rounded-full transition-transform duration-300"
                  style={{
                    background: s.color,
                    boxShadow: `0 0 12px ${s.color}`,
                    transform: hovered === s.key ? "scale(1.35)" : undefined,
                  }}
                />
                {s.label}
              </span>
              <span className="text-sm tabular-nums text-muted">
                {s.value.toLocaleString()} / {total.toLocaleString()}
              </span>
              <span className="text-right text-base font-bold tabular-nums text-fg">{pct(s.value)}%</span>
            </li>
          ))}
        </ul>
      </div>
    </Panel>
  );
}

function FrameworkSelect({ value, onChange }: { value: Framework; onChange: (f: Framework) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="btn-glass flex h-10 min-w-44 items-center justify-between gap-3 rounded-xl px-3.5 text-sm font-medium text-fg"
      >
        {value}
        <ChevronDown className={`h-4 w-4 text-subtle transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <ul
        role="listbox"
        className={`glass-menu absolute right-0 top-[calc(100%+0.5rem)] z-30 w-full origin-top rounded-xl p-1.5 transition-all duration-300 ${
          open ? "visible scale-100 opacity-100" : "invisible scale-95 opacity-0"
        }`}
      >
        {frameworks.map((f) => (
          <li key={f}>
            <button
              role="option"
              aria-selected={f === value}
              onClick={() => {
                onChange(f);
                setOpen(false);
              }}
              className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-muted transition-all hover:bg-glass-strong hover:pl-4 hover:text-fg"
            >
              {f}
              {f === value ? <Check className="h-4 w-4 text-brand" /> : null}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
