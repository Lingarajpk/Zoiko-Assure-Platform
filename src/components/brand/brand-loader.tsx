import { BrandMark } from "./logo";

type BrandLoaderProps = {
  label?: string;
  size?: "sm" | "md" | "lg";
};

const sizes = {
  sm: { box: "h-16 w-16", mark: "h-9 w-9" },
  md: { box: "h-24 w-24", mark: "h-14 w-14" },
  lg: { box: "h-32 w-32", mark: "h-20 w-20" },
};

/**
 * Signature loader: the check-seal breathes in the middle while two
 * counter-rotating brand-colored arcs orbit it, with a soft pulse ring.
 */
export function BrandLoader({ label = "Loading", size = "md" }: BrandLoaderProps) {
  const s = sizes[size];
  return (
    <div role="status" aria-live="polite" className="flex flex-col items-center gap-5">
      <div className={`relative grid place-items-center ${s.box}`}>
        <span className="absolute inset-2 rounded-full bg-brand/30 animate-pulse-ring" />
        <span
          className="absolute inset-0 rounded-full animate-spin-slow"
          style={{
            background: "conic-gradient(from 0deg, transparent 0 55%, #D58324 85%, #F2B35E 100%)",
            WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 4px), #000 calc(100% - 3px))",
            mask: "radial-gradient(farthest-side, transparent calc(100% - 4px), #000 calc(100% - 3px))",
          }}
        />
        <span
          className="absolute inset-[14%] rounded-full animate-spin-rev"
          style={{
            background: "conic-gradient(from 90deg, transparent 0 60%, #2F7CF6 90%, #8CC0FF 100%)",
            WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px))",
            mask: "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px))",
          }}
        />
        <BrandMark animated className={`${s.mark} drop-shadow-[0_6px_18px_rgba(213,131,36,0.55)] animate-[pulse_2s_ease-in-out_infinite]`} />
      </div>
      {label ? (
        <p className="flex items-center gap-1 text-sm font-medium tracking-wide text-muted">
          {label}
          <span className="inline-flex gap-0.5">
            {[0, 150, 300].map((d) => (
              <span
                key={d}
                className="h-1 w-1 rounded-full bg-brand animate-bounce"
                style={{ animationDelay: `${d}ms` }}
              />
            ))}
          </span>
        </p>
      ) : null}
    </div>
  );
}

/** Small inline spinner for buttons. */
export function Spinner({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`animate-spin ${className}`} aria-hidden>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" fill="none" />
      <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  );
}
