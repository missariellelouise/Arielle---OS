"use client";

import { Trash2 } from "lucide-react";
import { useTransition } from "react";

export function DeleteButton({ onDelete, label }: { onDelete: () => Promise<void>; label?: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      aria-label={label ?? "Delete"}
      disabled={isPending}
      onClick={() => {
        if (!confirm(`Delete ${label ?? "this item"}?`)) return;
        startTransition(() => {
          onDelete();
        });
      }}
      className="text-black/30 hover:text-red-500 dark:text-white/30"
    >
      <Trash2 size={14} />
    </button>
  );
}
