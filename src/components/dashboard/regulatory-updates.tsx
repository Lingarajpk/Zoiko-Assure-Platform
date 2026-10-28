import { Panel, Pill } from "./panel";
import { EuFlag, GlobeFlag, UsFlag } from "@/components/ui/flags";
import { regulatoryUpdates } from "@/lib/dashboard-data";

const flags = { eu: EuFlag, us: UsFlag, intl: GlobeFlag };

export function RegulatoryUpdates({ delay = 0 }: { delay?: number }) {
  return (
    <Panel title="Regulatory Updates" viewAllHref="/dashboard/regulatory-sources" delay={delay}>
      <ul className="divide-y divide-line">
        {regulatoryUpdates.map((u, i) => {
          const Flag = flags[u.flag];
          return (
            <li
              key={u.title}
              className="group/row -mx-2 flex items-center gap-4 rounded-2xl px-2 py-3.5 transition-all duration-300 hover:bg-glass-strong animate-fade-up"
              style={{ ["--d" as string]: `${delay + 150 + i * 90}ms` }}
            >
              <Flag className="h-10 w-14 shrink-0 rounded-lg shadow-md ring-1 ring-white/15 transition-transform duration-500 group-hover/row:scale-110 group-hover/row:-rotate-3" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-fg transition-colors group-hover/row:text-brand">{u.title}</p>
                <p className="truncate text-sm text-muted">{u.topic}</p>
                <p className="truncate text-xs text-subtle">
                  {u.source} · {u.date}
                </p>
              </div>
              <Pill tone={u.tag.tone}>{u.tag.label}</Pill>
            </li>
          );
        })}
      </ul>
    </Panel>
  );
}
