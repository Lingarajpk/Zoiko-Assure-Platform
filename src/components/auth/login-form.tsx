"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Eye, EyeOff, KeyRound, Lock, Mail } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { BrandLoader, Spinner } from "@/components/brand/brand-loader";
import { startDemoSession } from "@/lib/session";

type Status = "idle" | "submitting" | "success";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [shakeKey, setShakeKey] = useState(0);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) return fail("Enter a valid work email address.");
    if (password.length < 6) return fail("Password must be at least 6 characters.");

    setError(null);
    setStatus("submitting");
    // Placeholder for the real auth call.
    await new Promise((r) => setTimeout(r, 1100));
    startDemoSession(remember);
    setStatus("success");
    router.prefetch("/dashboard");
    setTimeout(() => router.push("/dashboard"), 1300);
  }

  function fail(message: string) {
    setError(message);
    setShakeKey((k) => k + 1);
  }

  const busy = status !== "idle";

  return (
    <>
      <div
        key={shakeKey}
        className={`glass-strong relative rounded-3xl p-7 sm:p-9 animate-fade-up ${shakeKey ? "animate-shake" : ""}`}
        style={{ ["--d" as string]: "150ms" }}
      >
        {/* top glow edge */}
        <span className="pointer-events-none absolute inset-x-10 -top-px h-px bg-gradient-to-r from-transparent via-brand to-transparent" />

        <div className="mx-auto w-48 lg:hidden">
          <Logo priority />
        </div>

        <div className="mt-6 text-center lg:mt-0 lg:text-left">
          <h2 className="text-2xl font-bold tracking-tight text-fg sm:text-3xl">Welcome back</h2>
          <p className="mt-1.5 text-sm text-muted">Sign in to your ZoikoAssure admin console.</p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
          <Field
            id="email"
            label="Work email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={setEmail}
            icon={<Mail className="h-4.5 w-4.5" />}
            disabled={busy}
          />

          <Field
            id="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            value={password}
            onChange={setPassword}
            icon={<Lock className="h-4.5 w-4.5" />}
            disabled={busy}
            trailing={
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="rounded-lg p-1.5 text-subtle transition-colors hover:bg-glass-strong hover:text-fg"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            }
          />

          <div className="flex items-center justify-between text-sm">
            <label className="group flex cursor-pointer select-none items-center gap-2.5 text-muted">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="peer sr-only"
              />
              <span className="grid h-5 w-5 place-items-center rounded-md border border-glass-border bg-input transition-all duration-300 group-hover:border-brand peer-checked:border-brand peer-checked:bg-brand peer-focus-visible:ring-2 peer-focus-visible:ring-brand/50 [&>svg]:scale-0 peer-checked:[&>svg]:scale-100">
                <svg viewBox="0 0 12 12" className="h-3 w-3 text-white transition-transform duration-300">
                  <path d="M2 6.5 4.8 9 10 3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              Remember me
            </label>
            <a href="#" className="font-medium text-brand transition-colors hover:text-brand-soft hover:underline underline-offset-4">
              Forgot password?
            </a>
          </div>

          <div className="min-h-5" aria-live="assertive">
            {error ? <p className="text-sm font-medium text-danger animate-fade-in">{error}</p> : null}
          </div>

          <button
            type="submit"
            disabled={busy}
            className="btn-brand group flex h-12 w-full items-center justify-center gap-2 rounded-xl font-semibold disabled:cursor-wait"
          >
            {status === "submitting" ? (
              <>
                <Spinner /> Verifying…
              </>
            ) : (
              <>
                Sign in
                <ArrowRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1" />
              </>
            )}
          </button>

          <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-subtle">
            <span className="h-px flex-1 bg-line" />
            or
            <span className="h-px flex-1 bg-line" />
          </div>

          <button
            type="button"
            disabled={busy}
            className="btn-glass flex h-12 w-full items-center justify-center gap-2.5 rounded-xl font-medium text-fg"
          >
            <KeyRound className="h-4.5 w-4.5 text-brand" />
            Continue with SSO
          </button>
        </form>

        <p className="mt-7 text-center text-xs text-subtle">
          Demo mode: any valid email and a 6+ character password.
        </p>
      </div>

      {status === "success" ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-bg/70 backdrop-blur-xl animate-fade-in">
          <div className="flex flex-col items-center">
            <BrandLoader size="lg" label="Preparing your workspace" />
            <div className="mt-6 h-1 w-56 overflow-hidden rounded-full bg-glass">
              <div className="h-full w-full rounded-full bg-gradient-to-r from-brand to-brand-soft animate-width-grow [animation-duration:1.3s]" />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

type FieldProps = {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  icon: React.ReactNode;
  autoComplete?: string;
  disabled?: boolean;
  trailing?: React.ReactNode;
};

/** Floating-label glass input with a brand focus glow. */
function Field({ id, label, type, value, onChange, icon, autoComplete, disabled, trailing }: FieldProps) {
  return (
    <div className="group relative">
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-subtle transition-colors duration-300 group-focus-within:text-brand">
        {icon}
      </span>
      <input
        id={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        placeholder=" "
        className="peer h-14 w-full rounded-xl border border-glass-border bg-input pl-11 pr-12 pt-4 text-[15px] text-fg outline-none transition-all duration-300 placeholder:text-transparent hover:border-brand/40 focus:border-brand focus:shadow-[0_0_0_4px_rgba(213,131,36,0.18),0_10px_30px_-12px_rgba(213,131,36,0.6)] disabled:opacity-60"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-11 top-1/2 -translate-y-1/2 text-[15px] text-subtle transition-all duration-300 peer-focus:top-3.5 peer-focus:text-[11px] peer-focus:font-semibold peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-brand peer-[:not(:placeholder-shown)]:top-3.5 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-wider"
      >
        {label}
      </label>
      {trailing ? <span className="absolute right-2.5 top-1/2 -translate-y-1/2">{trailing}</span> : null}
    </div>
  );
}
