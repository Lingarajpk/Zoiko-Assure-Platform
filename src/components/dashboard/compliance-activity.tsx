import { FileText, Settings2, ShieldCheck, Upload, Users } from "lucide-react";
import { Panel } from "./panel";
import { activity, type Activity } from "@/lib/dashboard-data";

const kinds: Record<Activity["kind"], { icon: typeof Upload; className: string }> = {
  upload: { icon: Upload, className: "from-[#2fd3ae] to-[#118a72] shadow-[#22c7a0]/40" },
  feed: { icon: FileText, className: "from-[#f5a54a] to-[#c9701b] shadow-brand/40" },
  verified: { icon: ShieldCheck, className: "from-[#4b95ff] to-[#1650c9] shadow-azure/40" },
  assign: { icon: Users, className: "from-[#a68bff] to-[#6a4fd8] shadow-violet/40" },
  source: { icon: Settings2, className: "from-[#8ea2c0] to-[#4c5f7c] shadow-black/30" },
};

export function ComplianceActivity({ delay = 0 }: { delay?: number }) {
  return (
    <Panel title="Compliance Activity" viewAllHref="/dashboard/audit-logs" delay={delay}>
      <ol className="relative">
        {/* timeline spine */}
        <span className="absolute bottom-6 left-[19px] top-6 w-px bg-gradient-to-b from-line via-glass-border to-transparent" />
        {activity.map((a, i) => {
          const { icon: Icon, className } = kinds[a.kind];
          return (
            <li
              key={a.title}
              className="group/row relative -mx-2 flex items-start gap-4 rounded-2xl px-2 py-2.5 transition-all duration-300 hover:bg-glass-strong animate-fade-up"
              style={{ ["--d" as string]: `${delay + 150 + i * 80}ms` }}
            >
              <span
                className={`relative grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br text-white shadow-lg ring-4 ring-[var(--bg)]/40 transition-transform duration-500 group-hover/row:scale-110 group-hover/row:rotate-[360deg] ${className}`}
              >
                <Icon className="h-4.5 w-4.5" />
              </span>
              <div className="min-w-0 flex-1 pt-0.5">
                <p className="text-sm font-semibold text-fg transition-colors group-hover/row:text-brand">{a.title}</p>
                <p className="text-xs text-subtle">{a.meta}</p>
              </div>
              <span className="shrink-0 whitespace-nowrap pt-0.5 text-xs text-subtle">{a.time}</span>
            </li>
          );
        })}
      </ol>
    </Panel>
  );
}
