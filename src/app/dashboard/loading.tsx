import { BrandMark } from "@/components/brand/logo";

/** Route-level skeleton that mirrors the dashboard grid. */
export default function Loading() {
  return (
    <div className="space-y-5" aria-busy="true" aria-label="Loading">
      <div className="relative h-1 overflow-hidden rounded-full bg-glass">
        <div className="progress-indeterminate absolute inset-y-0 left-0 w-full rounded-full bg-gradient-to-r from-brand via-brand-soft to-azure" />
      </div>

      <div className="flex items-center gap-4">
        <BrandMark className="h-10 w-10 animate-spin-slow [--dur:3s]" />
        <div className="space-y-2">
          <div className="skeleton h-7 w-72" />
          <div className="skeleton h-4 w-96 max-w-[60vw]" />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="skeleton border border-glass-border h-32 rounded-2xl" style={{ animationDelay: `${i * 120}ms` }} />
        ))}
      </div>
      <div className="grid gap-5 xl:grid-cols-[1.45fr_1fr]">
        <div className="skeleton border border-glass-border h-72 rounded-2xl" />
        <div className="skeleton border border-glass-border h-72 rounded-2xl" />
      </div>
      <div className="grid gap-5 xl:grid-cols-[1.45fr_1fr]">
        <div className="skeleton border border-glass-border h-80 rounded-2xl" />
        <div className="skeleton border border-glass-border h-80 rounded-2xl" />
      </div>
    </div>
  );
}
