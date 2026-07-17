import { ThemeToggle } from "@/components/ThemeToggle";

export function TopBar({ title }: { title: string }) {
  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="flex items-center justify-between border-b border-rose-950/10 bg-rose-50/60 px-6 py-4 dark:border-rose-50/10 dark:bg-rose-50/5">
      <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
      <div className="flex items-center gap-4">
        <p className="text-sm text-rose-950/50 dark:text-rose-50/50">{today}</p>
        <ThemeToggle />
      </div>
    </header>
  );
}
