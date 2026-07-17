import Link from "next/link";
import { TopBar } from "@/components/TopBar";
import { Card } from "@/components/Card";
import { ListSection } from "@/components/ListSection";
import { DeleteButton } from "@/components/DeleteButton";
import { createDeadline, deleteDeadline, createEvent, updateMetric } from "@/app/actions";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const endOfToday = new Date(startOfToday);
  endOfToday.setDate(endOfToday.getDate() + 1);

  const startOfMonth = new Date(startOfToday.getFullYear(), startOfToday.getMonth(), 1);

  const [priorities, tasksDueToday, deadlines, todaysMeetings, recentIdeas, upcomingEvents, incomeTx, atRiskProjects, followersMetric] =
    await Promise.all([
      db.listItem.findMany({ where: { section: "tasks", group: "Weekly Priorities" }, orderBy: { order: "asc" } }),
      db.listItem.findMany({ where: { section: "tasks", group: "Daily MITs (Most Important Tasks)" }, orderBy: { order: "asc" } }),
      db.deadline.findMany({ orderBy: { date: "asc" } }),
      db.meeting.findMany({ where: { date: { gte: startOfToday, lt: endOfToday } }, orderBy: { date: "asc" } }),
      db.listItem.findMany({ where: { section: "dump" }, orderBy: { createdAt: "desc" }, take: 5 }),
      db.event.findMany({ where: { date: { gte: startOfToday } }, orderBy: { date: "asc" }, take: 5 }),
      db.transaction.findMany({ where: { type: "income", date: { gte: startOfMonth } } }),
      db.projectCard.findMany({ where: { status: "at-risk" } }),
      db.metric.findUnique({ where: { key: "followersGained" } }),
    ]);

  const moneyEarned = incomeTx.reduce((sum, t) => sum + t.amount, 0);

  return (
    <>
      <TopBar title="Dashboard" />
      <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2 xl:grid-cols-3">
        <ListSection section="tasks" group="Weekly Priorities" items={priorities} />

        <Card title="Deadlines">
          <ul className="mb-3 space-y-2 text-sm">
            {deadlines.map((d) => (
              <li key={d.id} className="flex items-center justify-between">
                <span>{d.label}</span>
                <div className="flex items-center gap-3">
                  <span className="text-black/50 dark:text-white/50">
                    {d.date.toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                  </span>
                  <DeleteButton
                    label={d.label}
                    onDelete={async () => {
                      "use server";
                      await deleteDeadline(d.id);
                    }}
                  />
                </div>
              </li>
            ))}
            {deadlines.length === 0 && <li className="text-black/40 dark:text-white/40">No deadlines yet.</li>}
          </ul>
          <form action={createDeadline} className="flex gap-2">
            <input
              type="text"
              name="label"
              placeholder="Deadline"
              required
              className="flex-1 rounded-md border border-black/10 bg-white/80 px-2 py-1 text-sm dark:border-white/10 dark:bg-black/20"
            />
            <input
              type="date"
              name="date"
              required
              className="rounded-md border border-black/10 bg-white/80 px-2 py-1 text-sm dark:border-white/10 dark:bg-black/20"
            />
            <button className="rounded-md bg-black/80 px-3 py-1 text-sm text-white dark:bg-white/80 dark:text-black">
              Add
            </button>
          </form>
        </Card>

        <Card title="Today's Meetings">
          <ul className="space-y-2 text-sm">
            {todaysMeetings.map((m) => (
              <li key={m.id} className="flex items-center justify-between">
                <span>{m.title}</span>
                <span className="text-black/50 dark:text-white/50">
                  {m.date.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" })}
                </span>
              </li>
            ))}
            {todaysMeetings.length === 0 && <li className="text-black/40 dark:text-white/40">Nothing scheduled today.</li>}
          </ul>
          <Link href="/meetings" className="mt-2 inline-block text-xs text-black/50 underline dark:text-white/50">
            Manage in Meetings Database →
          </Link>
        </Card>

        <ListSection section="tasks" group="Daily MITs (Most Important Tasks)" items={tasksDueToday} />

        <Card title="Recently Captured Ideas">
          <ul className="space-y-2 text-sm">
            {recentIdeas.map((i) => (
              <li key={i.id} className="flex gap-2">
                <span className="text-black/30 dark:text-white/30">•</span>
                {i.title}
              </li>
            ))}
            {recentIdeas.length === 0 && <li className="text-black/40 dark:text-white/40">Nothing captured yet.</li>}
          </ul>
          <Link href="/dump" className="mt-2 inline-block text-xs text-black/50 underline dark:text-white/50">
            Open Dumppp →
          </Link>
        </Card>

        <Card title="Upcoming Events">
          <ul className="mb-3 space-y-2 text-sm">
            {upcomingEvents.map((e) => (
              <li key={e.id} className="flex items-center justify-between">
                <span>{e.label}</span>
                <span className="text-black/50 dark:text-white/50">
                  {e.date.toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                </span>
              </li>
            ))}
            {upcomingEvents.length === 0 && <li className="text-black/40 dark:text-white/40">No upcoming events.</li>}
          </ul>
          <form action={createEvent} className="flex gap-2">
            <input
              type="text"
              name="label"
              placeholder="Event"
              required
              className="flex-1 rounded-md border border-black/10 bg-white/80 px-2 py-1 text-sm dark:border-white/10 dark:bg-black/20"
            />
            <input
              type="date"
              name="date"
              required
              className="rounded-md border border-black/10 bg-white/80 px-2 py-1 text-sm dark:border-white/10 dark:bg-black/20"
            />
            <button className="rounded-md bg-black/80 px-3 py-1 text-sm text-white dark:bg-white/80 dark:text-black">
              Add
            </button>
          </form>
        </Card>

        <Card title="Money Earned This Month">
          <p className="text-2xl font-semibold">${moneyEarned.toLocaleString()}</p>
          <Link href="/finance" className="mt-2 inline-block text-xs text-black/50 underline dark:text-white/50">
            View Finance →
          </Link>
        </Card>

        <Card title="Followers Gained">
          <p className="mb-2 text-2xl font-semibold">+{followersMetric?.value ?? 0}</p>
          <form action={updateMetric} className="flex gap-2">
            <input type="hidden" name="key" value="followersGained" />
            <input
              type="number"
              name="value"
              placeholder="Update count"
              defaultValue={followersMetric?.value ?? 0}
              className="w-28 rounded-md border border-black/10 bg-white/80 px-2 py-1 text-sm dark:border-white/10 dark:bg-black/20"
            />
            <button className="rounded-md bg-black/80 px-3 py-1 text-sm text-white dark:bg-white/80 dark:text-black">
              Save
            </button>
          </form>
        </Card>

        <Card title="Projects at Risk">
          <p className="mb-2 text-2xl font-semibold text-red-500">{atRiskProjects.length}</p>
          <ul className="space-y-1 text-sm">
            {atRiskProjects.map((p) => (
              <li key={p.id}>{p.title}</li>
            ))}
          </ul>
          <Link href="/project-hub" className="mt-2 inline-block text-xs text-black/50 underline dark:text-white/50">
            View Project Hub →
          </Link>
        </Card>
      </div>
    </>
  );
}
