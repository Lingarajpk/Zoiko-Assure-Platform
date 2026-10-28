import { CalendarDays } from "lucide-react";
import { Panel, Pill } from "./panel";
import { priorityActions, type ActionStatus } from "@/lib/dashboard-data";

const statusTone: Record<ActionStatus, "pink" | "orange" | "blue"> = {
  High: "pink",
  "In progress": "orange",
  "Not started": "blue",
};

export function PriorityActions({ delay = 0 }: { delay?: number }) {
  return (
    <Panel title="Priority Actions" viewAllHref="/dashboard/exceptions-reviews" delay={delay}>
      <div className="-mx-2 overflow-x-auto">
        <table className="w-full min-w-[640px] border-separate border-spacing-0 text-left">
          <thead>
            <tr className="text-xs font-semibold uppercase tracking-wider text-subtle">
              <th className="w-10 border-b border-line px-2 py-3">#</th>
              <th className="border-b border-line px-2 py-3">Action</th>
              <th className="border-b border-line px-2 py-3">Owner</th>
              <th className="border-b border-line px-2 py-3">Due date</th>
              <th className="border-b border-line px-2 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {priorityActions.map((a, i) => (
              <tr
                key={a.title}
                className="group/row cursor-pointer transition-colors duration-300 hover:bg-glass-strong animate-fade-up"
                style={{ ["--d" as string]: `${delay + 150 + i * 80}ms` }}
              >
                <td className="rounded-l-xl border-b border-line px-2 py-3.5 text-sm font-semibold text-subtle">{i + 1}</td>
                <td className="border-b border-line px-2 py-3.5">
                  <p className="font-semibold text-fg transition-colors group-hover/row:text-brand">{a.title}</p>
                  <p className="text-xs text-subtle">
                    {a.framework} · {a.area}
                  </p>
                </td>
                <td className="border-b border-line px-2 py-3.5">
                  <span className="flex items-center gap-2.5">
                    <span
                      className={`grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br ${a.avatar} text-xs font-bold text-navy ring-2 ring-white/15 transition-transform duration-300 group-hover/row:scale-110`}
                    >
                      {a.initials}
                    </span>
                    <span className="whitespace-nowrap text-sm font-medium text-fg">{a.owner}</span>
                  </span>
                </td>
                <td className="border-b border-line px-2 py-3.5">
                  <span className="flex items-center gap-2 whitespace-nowrap text-sm text-muted">
                    <CalendarDays className="h-4 w-4 text-subtle" />
                    {a.due}
                  </span>
                </td>
                <td className="rounded-r-xl border-b border-line px-2 py-3.5">
                  <Pill tone={statusTone[a.status]}>{a.status}</Pill>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}
