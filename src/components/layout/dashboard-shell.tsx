"use client";

import { useCallback, useEffect, useState } from "react";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { BrandLoader } from "@/components/brand/brand-loader";

const COLLAPSE_KEY = "za-sidebar-collapsed";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (localStorage.getItem(COLLAPSE_KEY) === "1") setCollapsed(true);
    } catch {}
  }, []);

  const toggleCollapsed = useCallback(() => {
    setCollapsed((c) => {
      try {
        localStorage.setItem(COLLAPSE_KEY, c ? "0" : "1");
      } catch {}
      return !c;
    });
  }, []);

  // Ctrl/Cmd+B toggles the sidebar, like most editors.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "b") {
        e.preventDefault();
        if (window.matchMedia("(min-width: 64rem)").matches) toggleCollapsed();
        else setMenuOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggleCollapsed]);

  return (
    <div className="relative min-h-screen">
      <AuroraBackground />
      <Splash />
      <div className="mx-auto flex max-w-[1680px] gap-5 p-3 sm:p-4">
        <Sidebar
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
          collapsed={collapsed}
          onToggleCollapsed={toggleCollapsed}
        />
        <div className="flex min-w-0 flex-1 flex-col gap-5">
          <Topbar onMenu={() => setMenuOpen(true)} onToggleSidebar={toggleCollapsed} collapsed={collapsed} />
          <main className="min-w-0 flex-1 pb-6">{children}</main>
        </div>
      </div>
    </div>
  );
}

/** Branded splash on a full page load; fades itself out with CSS, so no hydration dependency. */
function Splash() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60] grid place-items-center bg-bg [animation:splash-out_0.6s_ease_0.9s_forwards]"
    >
      <BrandLoader size="lg" label="Loading ZoikoAssure" />
    </div>
  );
}
