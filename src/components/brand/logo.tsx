import Image from "next/image";

type LogoProps = {
  className?: string;
  priority?: boolean;
};

/** Full ZoikoAssure wordmark, seated on a light glass plate so the navy stays legible on dark glass. */
export function Logo({ className = "", priority = false }: LogoProps) {
  return (
    <div
      className={`group/logo relative inline-flex items-center rounded-2xl bg-white/92 px-3.5 py-2.5 shadow-[0_8px_30px_-12px_rgba(213,131,36,0.6)] ring-1 ring-white/40 transition-transform duration-500 hover:scale-[1.03] ${className}`}
    >
      <Image
        src="/brand/zoiko-assure-logo.png"
        alt="ZoikoAssure"
        width={640}
        height={187}
        priority={priority}
        className="h-auto w-full"
      />
    </div>
  );
}

/** The check-seal from the logo, used for loaders and compact spots. */
export function BrandMark({ className = "", animated = false }: { className?: string; animated?: boolean }) {
  // Scalloped seal path: 16 bumps around a circle.
  const bumps = 16;
  const points: string[] = [];
  for (let i = 0; i <= bumps * 2; i++) {
    const angle = (Math.PI * i) / bumps;
    const r = i % 2 === 0 ? 46 : 41;
    points.push(`${(50 + r * Math.cos(angle)).toFixed(2)},${(50 + r * Math.sin(angle)).toFixed(2)}`);
  }

  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <defs>
        <linearGradient id="za-mark-orange" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#EBA04B" />
          <stop offset="100%" stopColor="#C2711B" />
        </linearGradient>
      </defs>
      <polygon points={points.join(" ")} fill="#0E3A63" stroke="#2A6496" strokeWidth="1" strokeLinejoin="round" />
      <circle cx="50" cy="50" r="33" fill="#fff" />
      <circle cx="50" cy="50" r="28" fill="url(#za-mark-orange)" />
      <path
        d="M37 51 L46 60 L64 41"
        fill="none"
        stroke="#fff"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={animated ? "check-draw" : undefined}
      />
    </svg>
  );
}
