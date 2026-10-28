"use client";

import { useRef, useState } from "react";
import Link, { useLinkStatus } from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { BrandMark, Logo } from "@/components/brand/logo";
import { navItems, type NavItem } from "@/lib/navigation";

type SidebarProps = {
  /** Mobile drawer visibility. */
  open: boolean;
  onClose: () => void;
  /** Desktop icon-rail mode. Ignored below lg, where the sidebar is a drawer. */
  collapsed: boolean;
  onToggleCollapsed: () => void;
};

type Tip = { label: string; top: number } | null;

export function Sidebar({ open, onClose, collapsed, onToggleCollapsed }: SidebarProps) {
  const pathname = usePathname();
  const asideRef = useRef<HTMLElement>(null);
  const [tip, setTip] = useState<Tip>(null);

  // The nav scrolls, which clips anything overflowing it, so collapsed-mode
  // tooltips are rendered at the aside level and positioned from the hovered item.
  const showTip = (label: string, el: HTMLElement) => {
    if (!collapsed || !asideRef.current) return;
    const a = asideRef.current.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    setTip({ label, top: r.top - a.top + r.height / 2 });
  };
  const hideTip = () => setTip(null);

  return (
    <>
      {/* mobile scrim */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-30 bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        ref={asideRef}
        className={`glass fixed inset-y-3 left-3 z-40 flex w-[18rem] shrink-0 flex-col rounded-3xl transition-[transform,width] duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] lg:sticky lg:top-4 lg:inset-y-auto lg:left-auto lg:h-[calc(100vh-2rem)] lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-[110%]"
        } ${collapsed ? "lg:w-[5.5rem]" : ""}`}
      >
        {/* desktop collapse toggle, riding the sidebar's edge */}
        <button
          onClick={onToggleCollapsed}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-expanded={!collapsed}
          title={`${collapsed ? "Expand" : "Collapse"} sidebar (Ctrl+B)`}
          className="group/tg absolute -right-3.5 top-[4.5rem] z-10 hidden h-7 w-7 place-items-center rounded-full border border-glass-border bg-[#0c2747] text-muted shadow-lg shadow-black/30 transition-all duration-300 hover:scale-110 hover:border-brand hover:bg-brand hover:text-white hover:shadow-brand/50 light:bg-white lg:grid"
        >
          <ChevronLeft
            className={`h-4 w-4 transition-transform duration-500 ${collapsed ? "rotate-180" : ""}`}
          />
        </button>

        <div className={`flex items-center justify-between px-5 pb-4 pt-6 ${collapsed ? "lg:justify-center lg:px-0" : ""}`}>
          <Link
            href="/dashboard"
            onClick={onClose}
            aria-label="ZoikoAssure dashboard"
            className={`block w-44 ${collapsed ? "lg:hidden" : ""}`}
          >
            <Logo priority />
          </Link>
          <Link
            href="/dashboard"
            aria-label="ZoikoAssure dashboard"
            className={`hidden transition-transform duration-500 hover:rotate-[360deg] ${collapsed ? "lg:block lg:animate-fade-in" : ""}`}
          >
            <BrandMark className="h-12 w-12 drop-shadow-[0_6px_16px_rgba(213,131,36,0.5)]" />
          </Link>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-muted transition-colors hover:bg-glass-strong hover:text-fg lg:hidden"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav onScroll={hideTip} className={`flex-1 space-y-1 overflow-y-auto overflow-x-hidden px-3 py-2 ${collapsed ? "lg:px-3.5" : ""}`}>
          {navItems.map((item, i) => {
            const active = item.href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(item.href);
            return (
              <NavLink
                key={item.href}
                item={item}
                active={active}
                index={i}
                collapsed={collapsed}
                onNavigate={onClose}
                onHover={showTip}
                onLeave={hideTip}
              />
            );
          })}
        </nav>

        <div className="mx-4 border-t border-line" />
        <Link
          href="/dashboard/settings"
          onClick={onClose}
          onMouseEnter={(e) => showTip("Compliance Admin", e.currentTarget)}
          onMouseLeave={hideTip}
          className={`group m-3 flex items-center gap-3 rounded-2xl p-2.5 transition-colors duration-300 hover:bg-glass-strong ${
            collapsed ? "lg:justify-center lg:px-0" : ""
          }`}
        >
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#dbe6f5] to-[#9fb6d6] text-sm font-bold text-navy ring-2 ring-white/20 transition-shadow duration-300 group-hover:ring-brand/70">
            CA
          </span>
          <span className={`min-w-0 flex-1 ${collapsed ? "lg:hidden" : ""}`}>
            <span className="block truncate text-sm font-semibold text-fg">Compliance Admin</span>
            <span className="block truncate text-xs text-subtle">ZoikoAssure</span>
          </span>
          <ChevronRight
            className={`h-4 w-4 text-subtle transition-transform duration-300 group-hover:translate-x-1 group-hover:text-brand ${
              collapsed ? "lg:hidden" : ""
            }`}
          />
        </Link>

        {/* collapsed-mode tooltip */}
        <div
          role="tooltip"
          className={`glass-menu pointer-events-none absolute left-[calc(100%+0.85rem)] z-50 hidden -translate-y-1/2 whitespace-nowrap rounded-xl px-3 py-1.5 text-sm font-semibold text-fg transition-all duration-200 lg:block ${
            collapsed && tip ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
          }`}
          style={{ top: tip?.top ?? 0 }}
        >
          <span className="absolute -left-1 top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 border-b border-l border-glass-border bg-inherit" />
          {tip?.label}
        </div>
      </aside>
    </>
  );
}

function NavLink({
  item,
  active,
  index,
  collapsed,
  onNavigate,
  onHover,
  onLeave,
}: {
  item: NavItem;
  active: boolean;
  index: number;
  collapsed: boolean;
  onNavigate: () => void;
  onHover: (label: string, el: HTMLElement) => void;
  onLeave: () => void;
}) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      onMouseEnter={(e) => onHover(item.label, e.currentTarget)}
      onMouseLeave={onLeave}
      aria-label={collapsed ? item.label : undefined}
      aria-current={active ? "page" : undefined}
      className={`group relative flex items-center gap-3 overflow-hidden rounded-xl px-3.5 py-2.5 text-[14.5px] font-medium transition-all duration-300 animate-slide-in-left ${
        collapsed ? "lg:justify-center lg:px-0" : ""
      } ${
        active
          ? "bg-gradient-to-r from-brand/90 to-[#b8691a]/80 text-white shadow-[0_10px_30px_-10px_rgba(213,131,36,0.85),inset_0_1px_0_rgba(255,255,255,0.3)] ring-1 ring-brand-soft/60"
          : `text-muted hover:bg-glass-strong hover:text-fg ${collapsed ? "hover:translate-x-1 lg:hover:translate-x-0" : "hover:translate-x-1"}`
      }`}
      style={{ ["--d" as string]: `${index * 35}ms` }}
    >
      {/* hover accent bar */}
      {!active && (
        <span className="absolute left-0 top-1/2 h-0 w-[3px] -translate-y-1/2 rounded-full bg-brand transition-all duration-300 group-hover:h-6" />
      )}
      <span className="relative shrink-0">
        <Icon
          className={`h-5 w-5 transition-transform duration-300 group-hover:scale-110 ${
            active ? "text-white" : "text-subtle group-hover:text-brand"
          }`}
        />
        {/* badge collapses into a dot on the icon rail */}
        {item.badge ? (
          <span
            className={`absolute -right-1 -top-1 hidden h-2.5 w-2.5 rounded-full bg-danger ring-2 ring-[var(--bg)] ${
              collapsed ? "lg:block" : ""
            }`}
          />
        ) : null}
      </span>
      <span className={`flex-1 truncate ${collapsed ? "lg:hidden" : ""}`}>{item.label}</span>
      {item.badge ? (
        <span
          className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
            active ? "bg-white/25 text-white" : "bg-danger/20 text-danger"
          } ${collapsed ? "lg:hidden" : ""}`}
        >
          {item.badge}
        </span>
      ) : null}
      <PendingHint />
    </Link>
  );
}

/** Shimmer sweep over the clicked link while its route loads. */
function PendingHint() {
  const { pending } = useLinkStatus();
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(213,131,36,0.35),transparent)] bg-[length:200%_100%] transition-opacity duration-200 ${
        pending ? "opacity-100 [animation:shimmer_1s_linear_infinite]" : "opacity-0"
      }`}
    />
  );
}
