import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Sparkles } from "lucide-react";
import { findSection, sectionSlugs } from "@/lib/navigation";

export function generateStaticParams() {
  return sectionSlugs.map((section) => ({ section }));
}

export async function generateMetadata({ params }: PageProps<"/dashboard/[section]">): Promise<Metadata> {
  const { section } = await params;
  return { title: findSection(section)?.label ?? "Not found" };
}

export default async function SectionPage({ params }: PageProps<"/dashboard/[section]">) {
  const { section } = await params;
  const item = findSection(section);
  if (!item) notFound();
  const Icon = item.icon;

  return (
    <div className="space-y-5">
      <div className="animate-fade-up pt-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-fg sm:text-4xl">{item.label}</h1>
        <p className="mt-1.5 text-base text-muted sm:text-lg">{item.description}</p>
      </div>

      <section
        className="glass card-hover grid place-items-center rounded-3xl px-5 py-14 text-center sm:px-6 sm:py-20 animate-fade-up"
        style={{ ["--d" as string]: "120ms" }}
      >
        <div className="relative">
          <span className="absolute inset-0 rounded-3xl bg-brand/40 animate-pulse-ring" />
          <span className="relative grid h-20 w-20 place-items-center rounded-3xl bg-gradient-to-br from-brand to-[#b8691a] text-white shadow-xl shadow-brand/40">
            <Icon className="h-9 w-9" />
          </span>
        </div>
        <p className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand/15 px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand ring-1 ring-brand/30">
          <Sparkles className="h-3.5 w-3.5" /> Module in progress
        </p>
        <h2 className="mt-4 text-2xl font-bold text-fg">{item.label} is on its way</h2>
        <p className="mt-2 max-w-md text-muted">
          This module shares the dashboard shell, theme and motion system — drop its screens into this route.
        </p>
        <Link href="/dashboard" className="btn-glass group mt-8 inline-flex h-11 items-center gap-2 rounded-xl px-5 text-sm font-semibold text-fg">
          <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
          Back to dashboard
        </Link>
      </section>
    </div>
  );
}
