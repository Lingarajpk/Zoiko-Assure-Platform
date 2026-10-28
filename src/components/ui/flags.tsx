export function EuFlag({ className = "" }: { className?: string }) {
  const stars = Array.from({ length: 12 }, (_, i) => {
    const a = (i * Math.PI) / 6;
    return { x: 30 + 12 * Math.sin(a), y: 20 - 12 * Math.cos(a) };
  });
  return (
    <svg viewBox="0 0 60 40" className={className} aria-label="European Union">
      <rect width="60" height="40" fill="#003399" />
      {stars.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r="1.6" fill="#FFCC00" />
      ))}
    </svg>
  );
}

export function UsFlag({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 40" className={className} aria-label="United States">
      <rect width="60" height="40" fill="#fff" />
      {Array.from({ length: 7 }, (_, i) => (
        <rect key={i} y={i * (40 / 6.5)} width="60" height={40 / 13} fill="#B22234" />
      ))}
      <rect width="26" height={40 * (7 / 13)} fill="#3C3B6E" />
      {Array.from({ length: 12 }, (_, i) => (
        <circle key={i} cx={3.5 + (i % 4) * 6.3} cy={3.5 + Math.floor(i / 4) * 6.5} r="1" fill="#fff" />
      ))}
    </svg>
  );
}

export function GlobeFlag({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 40" className={className} aria-label="International">
      <rect width="60" height="40" fill="#0E3A63" />
      <circle cx="30" cy="20" r="12" fill="none" stroke="#8CC0FF" strokeWidth="1.6" />
      <ellipse cx="30" cy="20" rx="5" ry="12" fill="none" stroke="#8CC0FF" strokeWidth="1.4" />
      <path d="M18 20h24M20 13h20M20 27h20" stroke="#8CC0FF" strokeWidth="1.2" />
    </svg>
  );
}
