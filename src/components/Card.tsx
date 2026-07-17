import type { ReactNode } from "react";

export function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-rose-950/10 bg-rose-50/70 p-4 shadow-sm dark:border-rose-50/10 dark:bg-rose-50/5">
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-rose-950/60 dark:text-rose-50/60">
        {title}
      </h2>
      {children}
    </div>
  );
}
