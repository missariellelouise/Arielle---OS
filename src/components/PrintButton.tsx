"use client";

import { Printer } from "lucide-react";

export function PrintButton({ label = "Print / Save as PDF" }: { label?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="no-print flex items-center gap-1.5 rounded-md border border-pink-500/30 px-2.5 py-1 text-xs text-pink-700 hover:bg-pink-500/10 dark:border-pink-400/30 dark:text-pink-300 dark:hover:bg-pink-400/10"
    >
      <Printer size={13} />
      {label}
    </button>
  );
}
