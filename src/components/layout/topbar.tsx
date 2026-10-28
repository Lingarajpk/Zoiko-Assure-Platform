"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  Moon,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  Settings,
  Sun,
  User,
} from "lucide-react";
import { endDemoSession } from "@/lib/session";

type TopbarProps = {
  onMenu: () => void;
  onToggleSidebar: () => void;
  collapsed: boolean;
};

export function Topbar({ onMenu, onToggleSidebar, collapsed }: TopbarProps) {
  return (
    <header className="glass sticky top-4 z-20 flex items-center gap-3 rounded-2xl px-3 py-2.5 sm:px-4 animate-fade-in">
      <button
        onClick={onMenu}
        className="btn-glass grid h-10 w-10 place-items-center rounded-xl text-fg lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>
      <button
        onClick={onToggleSidebar}
        className="btn-glass group relative hidden h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-xl text-fg lg:grid"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        title={`${collapsed ? "Expand" : "Collapse"} sidebar (Ctrl+B)`}
      >
        <PanelLeftClose
          className={`absolute h-5 w-5 transition-all duration-500 group-hover:text-brand ${
            collapsed ? "-translate-x-6 opacity-0" : "translate-x-0 opacity-100"
          }`}
        />
        <PanelLeftOpen
          className={`absolute h-5 w-5 transition-all duration-500 group-hover:text-brand ${
            collapsed ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"
          }`}
        />
      </button>
      <SearchBox />
      <div className="ml-auto flex items-center gap-1.5 sm:gap-2.5">
        <ThemeToggle />
        <Notifications />
        <ProfileMenu />
      </div>
    </header>
  );
}

function SearchBox() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <label className="group relative hidden min-w-0 flex-1 items-center sm:flex sm:max-w-xl">
      <Search className="pointer-events-none absolute left-4 h-4.5 w-4.5 text-subtle transition-colors duration-300 group-focus-within:text-brand" />
      <input
        ref={inputRef}
        type="search"
        placeholder="Search regulations, obligations, controls, evidence…"
        className="h-11 w-full rounded-xl border border-glass-border bg-input pl-11 pr-16 text-sm text-fg outline-none transition-all duration-300 placeholder:text-subtle hover:border-brand/40 focus:border-brand focus:shadow-[0_0_0_4px_rgba(213,131,36,0.15)]"
      />
      <kbd className="pointer-events-none absolute right-3 rounded-md border border-glass-border bg-glass px-1.5 py-0.5 text-[11px] font-semibold text-subtle">
        Ctrl K
      </kbd>
    </label>
  );
}

function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    // Sync with the value the pre-paint script applied.
    const current = document.documentElement.dataset.theme;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (current === "light") setTheme("light");
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("za-theme", next);
    } catch {}
  };

  return (
    <button
      onClick={toggle}
      className="btn-glass group relative grid h-10 w-10 place-items-center overflow-hidden rounded-xl text-fg"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
    >
      <Sun
        className={`absolute h-5 w-5 transition-all duration-500 group-hover:rotate-90 group-hover:text-brand ${
          theme === "dark" ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
        }`}
      />
      <Moon
        className={`absolute h-5 w-5 transition-all duration-500 group-hover:-rotate-12 group-hover:text-brand ${
          theme === "light" ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-0 opacity-0"
        }`}
      />
    </button>
  );
}

function useDismiss<T extends HTMLElement>(open: boolean, close: () => void) {
  const ref = useRef<T>(null);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);
  return ref;
}

const notifications = [
  { title: "EU AI Act transparency update", meta: "Review required · 2h ago", tone: "bg-warning" },
  { title: "Evidence expiring: Access review Q3", meta: "ISO 27001 · 5h ago", tone: "bg-danger" },
  { title: "NIS2 guidance added to feed", meta: "Regulatory Intelligence · 1d ago", tone: "bg-info" },
];

function Notifications() {
  const [open, setOpen] = useState(false);
  const ref = useDismiss<HTMLDivElement>(open, () => setOpen(false));

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="btn-glass group relative grid h-10 w-10 place-items-center rounded-xl text-fg"
        aria-label="Notifications"
        aria-expanded={open}
      >
        <Bell className="h-5 w-5 origin-top transition-transform duration-300 group-hover:animate-[wiggle_0.6s_ease-in-out] group-hover:text-brand" />
        <span className="absolute right-2 top-2 flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-brand animate-ping-dot" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand ring-2 ring-[var(--bg)]" />
        </span>
      </button>

      <Dropdown open={open} className="w-80">
        <div className="flex items-center justify-between px-4 pb-2 pt-3">
          <p className="text-sm font-semibold text-fg">Notifications</p>
          <span className="rounded-full bg-brand/20 px-2 py-0.5 text-[11px] font-bold text-brand">3 new</span>
        </div>
        <ul className="px-1.5 pb-1.5">
          {notifications.map((n) => (
            <li key={n.title}>
              <button className="flex w-full items-start gap-3 rounded-xl px-2.5 py-2.5 text-left transition-colors hover:bg-glass-strong">
                <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${n.tone}`} />
                <span>
                  <span className="block text-sm font-medium text-fg">{n.title}</span>
                  <span className="block text-xs text-subtle">{n.meta}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </Dropdown>
    </div>
  );
}

function ProfileMenu() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useDismiss<HTMLDivElement>(open, () => setOpen(false));

  const logout = () => {
    endDemoSession();
    router.replace("/login");
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="group flex items-center gap-2.5 rounded-xl p-1 pr-2 transition-colors duration-300 hover:bg-glass-strong"
      >
        <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-[#dbe6f5] to-[#9fb6d6] text-xs font-bold text-navy ring-2 ring-white/20 transition-shadow duration-300 group-hover:ring-brand/70">
          CA
        </span>
        <span className="hidden text-sm font-semibold text-fg md:block">Compliance Admin</span>
        <ChevronDown
          className={`hidden h-4 w-4 text-subtle transition-transform duration-300 md:block ${open ? "rotate-180" : ""}`}
        />
      </button>

      <Dropdown open={open} className="w-56">
        <div className="border-b border-line px-4 py-3">
          <p className="text-sm font-semibold text-fg">Compliance Admin</p>
          <p className="text-xs text-subtle">admin@zoikoassure.com</p>
        </div>
        <div className="p-1.5">
          <MenuItem icon={User} label="My profile" />
          <MenuItem icon={Settings} label="Settings" onClick={() => router.push("/dashboard/settings")} />
          <MenuItem icon={LogOut} label="Sign out" danger onClick={logout} />
        </div>
      </Dropdown>
    </div>
  );
}

function Dropdown({ open, className = "", children }: { open: boolean; className?: string; children: React.ReactNode }) {
  return (
    <div
      className={`glass-menu absolute right-0 top-[calc(100%+0.6rem)] z-50 origin-top-right rounded-2xl transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${className} ${
        open ? "visible translate-y-0 scale-100 opacity-100" : "invisible -translate-y-2 scale-95 opacity-0"
      }`}
    >
      {children}
    </div>
  );
}

function MenuItem({
  icon: Icon,
  label,
  danger,
  onClick,
}: {
  icon: typeof User;
  label: string;
  danger?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200 hover:pl-4 ${
        danger ? "text-danger hover:bg-danger/10" : "text-muted hover:bg-glass-strong hover:text-fg"
      }`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}
