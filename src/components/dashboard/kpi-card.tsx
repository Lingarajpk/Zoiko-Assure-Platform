import { ArrowDown, ArrowUp, Database, FileSearch, FileText, ShieldCheck } from "lucide-react";
import { CountUp } from "@/components/ui/count-up";
import type { Kpi } from "@/lib/dashboard-data";

const icons = { sources: FileText, obligations: Database, controls: ShieldCheck, reviews: FileSearch };

const tones = {
  blue: { glow: "#2F7CF6", tile: "from-[#3b8cff] to-[#1650c9]", bar: "from-[#1d5fd1] to-[#6fb0ff]", card: "from-[#2F7CF6]/25" },
  orange: { glow: "#D58324", tile: "from-[#eba04b] to-[#b8691a]", bar: "from-[#b8691a] to-[#f5b860]", card: "from-[#D58324]/25" },
  teal: { glow: "#22c7a0", tile: "from-[#2fd3ae] to-[#118a72]", bar: "from-[#118a72] to-[#5ff0c8]", card: "from-[#22c7a0]/25" },
  pink: { glow: "#d0569b", tile: "from-[#e17ab8] to-[#9b3a8a]", bar: "from-[#b4377a] to-[#ff7fb0]", card: "from-[#d0569b]/25" },
};

export function KpiCard({ kpi, index }: { kpi: Kpi; index: number }) {
  const Icon = icons[kpi.icon];
  const tone = tones[kpi.tone];
  const up = kpi.delta >= 0;
  // Open reviews going down is good, so color by meaning rather than sign.
  const good = kpi.icon === "reviews" ? !up : up;

  return (
    <article
      className="glass card-hover group min-w-0 rounded-3xl p-4 animate-fade-up sm:p-5"
      style={{ ["--d" as string]: `${index * 90}ms`, ["--glow" as string]: tone.glow }}
    >
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-0 -z-10 rounded-[inherit] bg-gradient-to-br ${tone.card} to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100`}
      />
      <div className="flex items-start gap-4">
        <span
          className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${tone.tile} text-white shadow-lg ring-1 ring-white/25 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110`}
        >
          <Icon className="h-7 w-7" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-muted">{kpi.label}</p>
          <p className="mt-1 text-3xl font-extrabold tracking-tight text-fg">
            <CountUp value={kpi.value} decimals={kpi.decimals} suffix={kpi.suffix} delay={index * 90} />
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-end justify-between">
        <span
          className={`inline-flex items-center gap-1 text-sm font-bold ${good ? "text-success" : "text-danger"}`}
        >
          <span className={`grid h-5 w-5 place-items-center rounded-full ${good ? "bg-success/20" : "bg-danger/20"}`}>
            {up ? <ArrowUp className="h-3.5 w-3.5" /> : <ArrowDown className="h-3.5 w-3.5" />}
          </span>
          {Math.abs(kpi.delta)}%
          <span className="ml-1 font-medium text-subtle">vs last month</span>
        </span>

        <div className="flex h-11 items-end gap-1" aria-hidden>
          {kpi.bars.map((h, i) => (
            <span
              key={i}
              className={`w-1.5 rounded-full bg-gradient-to-t ${tone.bar} animate-bar-grow transition-all duration-500 group-hover:w-2`}
              style={{ height: `${h}%`, ["--d" as string]: `${300 + index * 90 + i * 70}ms` }}
            />
          ))}
        </div>
      </div>
    </article>
  );
}
