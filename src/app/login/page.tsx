import type { Metadata } from "next";
import { CheckCircle2, FileCheck2, Radar, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Sign in",
};

const highlights = [
  { icon: Radar, title: "Regulatory intelligence", text: "Track EU AI Act, NIS2, CCPA and 240+ sources in one feed." },
  { icon: ShieldCheck, title: "Continuous assurance", text: "Map obligations to controls and prove them with evidence." },
  { icon: FileCheck2, title: "Audit-ready evidence", text: "A tamper-evident vault your auditors will actually like." },
];

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 lg:px-10">
      <AuroraBackground />

      <div className="grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        {/* Brand story */}
        <section className="hidden lg:block">
          <div className="w-64 animate-fade-up">
            <Logo priority />
          </div>

          <h1
            className="mt-10 text-5xl font-extrabold leading-[1.08] tracking-tight text-fg animate-fade-up"
            style={{ ["--d" as string]: "100ms" }}
          >
            Compliance,
            <br />
            <span className="bg-gradient-to-r from-brand via-brand-soft to-brand bg-clip-text text-transparent">
              proven continuously.
            </span>
          </h1>
          <p
            className="mt-5 max-w-md text-lg leading-relaxed text-muted animate-fade-up"
            style={{ ["--d" as string]: "200ms" }}
          >
            The admin console for ZoikoAssure — regulations, obligations, controls and evidence, connected.
          </p>

          <ul className="mt-10 space-y-4">
            {highlights.map(({ icon: Icon, title, text }, i) => (
              <li
                key={title}
                className="glass card-hover flex max-w-md items-start gap-4 rounded-2xl p-4 animate-fade-up"
                style={{ ["--d" as string]: `${300 + i * 100}ms` }}
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand to-[#b8691a] text-white shadow-lg shadow-brand/30">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold text-fg">{title}</p>
                  <p className="mt-0.5 text-sm text-muted">{text}</p>
                </div>
              </li>
            ))}
          </ul>

          <p
            className="mt-10 flex items-center gap-2 text-sm text-subtle animate-fade-in"
            style={{ ["--d" as string]: "800ms" }}
          >
            <CheckCircle2 className="h-4 w-4 text-success" />
            SOC 2 Type II · ISO 27001 · GDPR aligned
          </p>
        </section>

        {/* Sign-in card */}
        <section className="mx-auto w-full max-w-md">
          <LoginForm />
        </section>
      </div>
    </main>
  );
}
