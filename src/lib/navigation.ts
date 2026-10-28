import {
  BellRing,
  Blocks,
  ClipboardList,
  FileStack,
  FileText,
  Flame,
  Layers,
  LayoutDashboard,
  ListChecks,
  ScrollText,
  Settings,
  ShieldCheck,
  Users,
  Vault,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  description?: string;
  badge?: string;
};

export const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Regulatory Sources", href: "/dashboard/regulatory-sources", icon: FileText, description: "Official journals, regulators and guidance feeds monitored for change." },
  { label: "Applicability", href: "/dashboard/applicability", icon: Layers, description: "Decide which regulations apply to which entities, products and regions." },
  { label: "Obligations", href: "/dashboard/obligations", icon: ListChecks, description: "Atomic requirements extracted from each regulation." },
  { label: "Controls", href: "/dashboard/controls", icon: Blocks, description: "Internal controls mapped to obligations across frameworks." },
  { label: "Evidence Vault", href: "/dashboard/evidence-vault", icon: Vault, description: "Tamper-evident storage for documents, logs and attestations." },
  { label: "Assurance", href: "/dashboard/assurance", icon: ShieldCheck, description: "Testing, verification and sign-off on control effectiveness." },
  { label: "Exceptions & Reviews", href: "/dashboard/exceptions-reviews", icon: BellRing, description: "Approved deviations and pending reviewer decisions.", badge: "17" },
  { label: "Risk Management", href: "/dashboard/risk-management", icon: Flame, description: "Risk register, scoring and treatment plans." },
  { label: "Reports", href: "/dashboard/reports", icon: ClipboardList, description: "Board, regulator and auditor-ready reporting." },
  { label: "Integrations", href: "/dashboard/integrations", icon: FileStack, description: "Connect cloud, HR, ticketing and identity systems." },
  { label: "User Management", href: "/dashboard/user-management", icon: Users, description: "Members, roles and access policies." },
  { label: "Audit Logs", href: "/dashboard/audit-logs", icon: ScrollText, description: "Immutable trail of every action in the platform." },
  { label: "Settings", href: "/dashboard/settings", icon: Settings, description: "Workspace, branding, notifications and security settings." },
];

export const sectionSlugs = navItems.slice(1).map((n) => n.href.replace("/dashboard/", ""));

export function findSection(slug: string) {
  return navItems.find((n) => n.href === `/dashboard/${slug}`);
}
