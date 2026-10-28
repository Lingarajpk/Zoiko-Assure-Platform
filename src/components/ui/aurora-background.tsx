/** Fixed, slowly drifting brand-colored glows behind the glass panels. */
export function AuroraBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,#0b2a4d_0%,var(--bg)_60%)] light:bg-[radial-gradient(120%_80%_at_50%_0%,#ffffff_0%,var(--bg)_60%)]" />
      <div
        className="absolute -left-40 top-1/3 h-[38rem] w-[38rem] rounded-full bg-brand/35 blur-[120px] animate-float light:bg-brand/25"
        style={{ ["--dur" as string]: "22s" }}
      />
      <div
        className="absolute -right-40 bottom-[-10rem] h-[40rem] w-[40rem] rounded-full bg-brand/30 blur-[130px] animate-float light:bg-brand/20"
        style={{ ["--dur" as string]: "26s", animationDelay: "-8s" }}
      />
      <div
        className="absolute left-1/3 -top-40 h-[34rem] w-[34rem] rounded-full bg-azure/30 blur-[120px] animate-float light:bg-azure/20"
        style={{ ["--dur" as string]: "30s", animationDelay: "-4s" }}
      />
      <div
        className="absolute right-1/4 top-1/4 h-[22rem] w-[22rem] rounded-full bg-[#1d5fd1]/25 blur-[110px] animate-float light:bg-[#1d5fd1]/10"
        style={{ ["--dur" as string]: "24s", animationDelay: "-12s" }}
      />
    </div>
  );
}
