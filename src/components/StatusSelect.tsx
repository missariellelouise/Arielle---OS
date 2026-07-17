"use client";

import { useTransition } from "react";

export function StatusSelect({
  value,
  options,
  onChange,
}: {
  value: string;
  options: { value: string; label: string }[];
  onChange: (status: string) => Promise<void>;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <select
      defaultValue={value}
      disabled={isPending}
      onChange={(e) => {
        const status = e.target.value;
        startTransition(() => {
          onChange(status);
        });
      }}
      className="rounded-md border border-rose-950/10 bg-rose-50/80 px-2 py-1 text-xs dark:border-rose-50/10 dark:bg-rose-950/20"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
