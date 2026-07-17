"use client";

import { useTransition } from "react";

export function ItemCheckbox({
  defaultChecked,
  onToggle,
}: {
  defaultChecked: boolean;
  onToggle: (done: boolean) => Promise<void>;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <input
      type="checkbox"
      defaultChecked={defaultChecked}
      disabled={isPending}
      onChange={(e) => {
        const done = e.target.checked;
        startTransition(() => {
          onToggle(done);
        });
      }}
      className="mt-0.5"
    />
  );
}
