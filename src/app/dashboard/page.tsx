import type { Metadata } from "next";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { CompliancePosture } from "@/components/dashboard/compliance-posture";
import { RegulatoryUpdates } from "@/components/dashboard/regulatory-updates";
import { PriorityActions } from "@/components/dashboard/priority-actions";
import { ComplianceActivity } from "@/components/dashboard/compliance-activity";
import { HeaderActions } from "@/components/dashboard/header-actions";
import { kpis } from "@/lib/dashboard-data";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-end sm:justify-between">
        <div className="animate-fade-up">
          <h1 className="text-3xl font-extrabold tracking-tight text-fg sm:text-4xl">
            Welcome back,{" "}
            <span className="bg-gradient-to-r from-brand to-brand-soft bg-clip-text text-transparent">
              Compliance Admin
            </span>
          </h1>
          <p className="mt-1.5 text-base text-muted sm:text-lg">Here&apos;s your compliance overview for ZoikoAssure</p>
        </div>
        <div className="animate-fade-up" style={{ ["--d" as string]: "120ms" }}>
          <HeaderActions />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi, i) => (
          <KpiCard key={kpi.label} kpi={kpi} index={i} />
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.45fr_1fr]">
        <CompliancePosture delay={350} />
        <RegulatoryUpdates delay={450} />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.45fr_1fr]">
        <PriorityActions delay={550} />
        <ComplianceActivity delay={650} />
      </div>
    </div>
  );
}
