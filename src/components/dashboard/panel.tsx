import Link from "next/link";
import { ArrowRight } from "lucide-react";

type PanelProps = {
  title: string;
  action?: React.ReactNode;
  viewAllHref?: string;
  delay?: number;
  className?: string;
  children: React.ReactNode;
};

export function Panel({ title, action, viewAllHref, delay = 0, className = "", children }: PanelProps) {
  return (
    <section
      className={`glass card-hover min-w-0 rounded-3xl p-4 sm:p-6 animate-fade-up [--glow:#2F7CF6] ${className}`}
      style={{ ["--d" as string]: `${delay}ms` }}
    >
      <header className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-base font-bold tracking-tight text-fg min-[380px]:text-lg sm:text-xl">{title}</h2>
        {action}
        {viewAllHref ? (
          <Link
            href={viewAllHref}
            className="group/va flex items-center gap-1.5 rounded-lg px-2 py-1 text-sm font-medium text-muted transition-colors hover:text-brand"
          >
            View all
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/va:translate-x-1" />
          </Link>
        ) : null}
      </header>
      {children}
    </section>
  );
}

const pillTones = {
  orange: "bg-brand/20 text-[#F2B35E] ring-brand/40",
  teal: "bg-success/15 text-success ring-success/35",
  blue: "bg-info/20 text-[#8CC0FF] ring-info/40",
  pink: "bg-danger/15 text-danger ring-danger/40",
} as const;

export function Pill({ tone, children }: { tone: keyof typeof pillTones; children: React.ReactNode }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center whitespace-nowrap rounded-lg px-2.5 py-1 text-xs font-semibold ring-1 transition-transform duration-300 hover:scale-105 light:brightness-75 ${pillTones[tone]}`}
    >
      {children}
    </span>
  );
}
