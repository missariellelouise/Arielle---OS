export function TopBar({ title }: { title: string }) {
  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="flex items-center justify-between border-b border-black/10 bg-white/60 px-6 py-4 dark:border-white/10 dark:bg-white/5">
      <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
      <p className="text-sm text-black/50 dark:text-white/50">{today}</p>
    </header>
  );
}
