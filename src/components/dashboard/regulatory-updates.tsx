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
              className="group/row -mx-2 flex items-start gap-3 rounded-2xl px-2 py-3.5 transition-all duration-300 hover:bg-glass-strong animate-fade-up sm:items-center sm:gap-4"
              style={{ ["--d" as string]: `${delay + 150 + i * 90}ms` }}
            >
              <Flag className="h-8 w-11 shrink-0 rounded-lg shadow-md ring-1 ring-white/15 transition-transform duration-500 group-hover/row:scale-110 group-hover/row:-rotate-3 sm:h-10 sm:w-14" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-fg transition-colors group-hover/row:text-brand">{u.title}</p>
                <p className="truncate text-sm text-muted">{u.topic}</p>
                <p className="truncate text-xs text-subtle">
                  {u.source} · {u.date}
                </p>
                {/* on phones the tag drops under the text so the title keeps its width */}
                <div className="mt-2 sm:hidden">
                  <Pill tone={u.tag.tone}>{u.tag.label}</Pill>
                </div>
              </div>
              <div className="hidden sm:block">
                <Pill tone={u.tag.tone}>{u.tag.label}</Pill>
              </div>
            </li>
          );
        })}
      </ul>
    </Panel>
  );
}
