"use client";

import { useState, type ReactNode } from "react";

export function GroupTabs({
  groups,
  counts,
  children,
}: {
  groups: string[];
  counts: number[];
  children: ReactNode[];
}) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="no-print mb-4 flex flex-wrap gap-1.5 border-b border-rose-950/10 pb-3 dark:border-rose-50/10">
        {groups.map((group, i) => (
          <button
            key={group}
            type="button"
            onClick={() => setActive(i)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              active === i
                ? "bg-pink-600 text-white dark:bg-pink-500 dark:text-rose-950"
                : "bg-rose-950/5 text-rose-950/60 hover:bg-pink-500/10 dark:bg-rose-50/5 dark:text-rose-50/60 dark:hover:bg-pink-400/10"
            }`}
          >
            {group}
            {counts[i] > 0 && <span className="ml-1 opacity-70">({counts[i]})</span>}
          </button>
        ))}
      </div>
      <div className="max-w-2xl">{children[active]}</div>
    </div>
  );
}
