import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ZoikoAssure — Compliance Platform",
    template: "%s · ZoikoAssure",
  },
  description:
    "ZoikoAssure admin console: regulatory sources, obligations, controls, evidence and assurance in one place.",
};

export const viewport: Viewport = {
  themeColor: "#071C33",
};

// Applies the saved theme before first paint so there is no flash.
const themeScript = `try{var t=localStorage.getItem('za-theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t;}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${jakarta.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
