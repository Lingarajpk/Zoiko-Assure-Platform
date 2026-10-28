// Static demo data shaped like the API responses the dashboard will eventually consume.

export type Kpi = {
  label: string;
  value: number;
  decimals?: number;
  suffix?: string;
  delta: number;
  icon: "sources" | "obligations" | "controls" | "reviews";
  tone: "blue" | "orange" | "teal" | "pink";
  bars: number[];
};

export const kpis: Kpi[] = [
  { label: "Regulatory Sources", value: 248, delta: 12, icon: "sources", tone: "blue", bars: [30, 45, 38, 60, 72, 90] },
  { label: "Obligations", value: 1284, delta: 8, icon: "obligations", tone: "orange", bars: [25, 40, 55, 50, 75, 88] },
  { label: "Controls Verified", value: 92.4, decimals: 1, suffix: "%", delta: 2.6, icon: "controls", tone: "teal", bars: [35, 42, 50, 62, 70, 92] },
  { label: "Open Reviews", value: 17, delta: -5, icon: "reviews", tone: "pink", bars: [20, 32, 45, 40, 62, 80] },
];

export type PostureSlice = { key: string; label: string; value: number; color: string };

export const frameworks = ["All Frameworks", "ISO 27001", "EU AI Act", "NIS2", "SOC 2"] as const;
export type Framework = (typeof frameworks)[number];

export const posture: Record<Framework, PostureSlice[]> = {
  "All Frameworks": [
    { key: "proven", label: "Proven", value: 872, color: "#2FD38A" },
    { key: "review", label: "Requires review", value: 269, color: "#F5B544" },
    { key: "gap", label: "Evidence gap", value: 103, color: "#F2557A" },
    { key: "exception", label: "Exception", value: 40, color: "#8EA2C0" },
  ],
  "ISO 27001": [
    { key: "proven", label: "Proven", value: 81, color: "#2FD38A" },
    { key: "review", label: "Requires review", value: 9, color: "#F5B544" },
    { key: "gap", label: "Evidence gap", value: 3, color: "#F2557A" },
    { key: "exception", label: "Exception", value: 0, color: "#8EA2C0" },
  ],
  "EU AI Act": [
    { key: "proven", label: "Proven", value: 112, color: "#2FD38A" },
    { key: "review", label: "Requires review", value: 74, color: "#F5B544" },
    { key: "gap", label: "Evidence gap", value: 38, color: "#F2557A" },
    { key: "exception", label: "Exception", value: 6, color: "#8EA2C0" },
  ],
  NIS2: [
    { key: "proven", label: "Proven", value: 140, color: "#2FD38A" },
    { key: "review", label: "Requires review", value: 52, color: "#F5B544" },
    { key: "gap", label: "Evidence gap", value: 21, color: "#F2557A" },
    { key: "exception", label: "Exception", value: 11, color: "#8EA2C0" },
  ],
  "SOC 2": [
    { key: "proven", label: "Proven", value: 64, color: "#2FD38A" },
    { key: "review", label: "Requires review", value: 12, color: "#F5B544" },
    { key: "gap", label: "Evidence gap", value: 4, color: "#F2557A" },
    { key: "exception", label: "Exception", value: 2, color: "#8EA2C0" },
  ],
};

export type RegUpdate = {
  title: string;
  topic: string;
  source: string;
  date: string;
  flag: "eu" | "us" | "intl";
  tag: { label: string; tone: "orange" | "teal" | "blue" };
};

export const regulatoryUpdates: RegUpdate[] = [
  { title: "EU AI Act", topic: "Transparency requirements", source: "Official Journal of the EU", date: "28 Oct 2026", flag: "eu", tag: { label: "Review required", tone: "orange" } },
  { title: "NIS2", topic: "Incident reporting guidance", source: "European Commission", date: "24 Oct 2026", flag: "eu", tag: { label: "New source", tone: "teal" } },
  { title: "California CCPA/CPRA", topic: "Scope update", source: "California DOJ", date: "18 Oct 2026", flag: "us", tag: { label: "Scope check", tone: "blue" } },
];

export type ActionStatus = "High" | "In progress" | "Not started";

export type PriorityAction = {
  title: string;
  framework: string;
  area: string;
  owner: string;
  initials: string;
  avatar: string;
  due: string;
  status: ActionStatus;
};

export const priorityActions: PriorityAction[] = [
  { title: "Validate AI disclosure evidence", framework: "EU AI Act", area: "Transparency requirements", owner: "Ritika S.", initials: "RS", avatar: "from-[#cfe0f7] to-[#8fb0dd]", due: "28 Oct 2026", status: "High" },
  { title: "Review NIS2 applicability", framework: "NIS2", area: "Scope assessment", owner: "Shankaran P.", initials: "SP", avatar: "from-[#d7f3e6] to-[#8fd1b2]", due: "02 Nov 2026", status: "In progress" },
  { title: "Renew access-control evidence", framework: "ISO 27001", area: "A.9 Access control", owner: "Mukul K.", initials: "MK", avatar: "from-[#e6dcfb] to-[#ad97e6]", due: "05 Nov 2026", status: "Not started" },
  { title: "Update risk register", framework: "Internal", area: "Risk management", owner: "Sumon L.", initials: "SL", avatar: "from-[#fbe8c8] to-[#e9b66e]", due: "08 Nov 2026", status: "In progress" },
];

export type Activity = {
  title: string;
  meta: string;
  time: string;
  kind: "upload" | "feed" | "verified" | "assign" | "source";
};

export const activity: Activity[] = [
  { title: "Evidence uploaded for Data retention policy", meta: "Compliance · ISO 27001", time: "2 hours ago", kind: "upload" },
  { title: "NIS2 regulatory update added to feed", meta: "Regulatory Intelligence", time: "5 hours ago", kind: "feed" },
  { title: "Control status changed to Verified", meta: "Access Control (AC-1)", time: "1 day ago", kind: "verified" },
  { title: "Review assigned to Ritika S.", meta: "EU AI Act", time: "1 day ago", kind: "assign" },
  { title: "New regulatory source added", meta: "NIST AI Risk Management Framework", time: "2 days ago", kind: "source" },
];
