import { TopBar } from "@/components/TopBar";
import { Card } from "@/components/Card";
import {
  priorities,
  deadlines,
  todaysMeetings,
  tasksDueToday,
  recentIdeas,
  upcomingEvents,
  stats,
} from "@/data/dashboardWidgets";

export default function HomePage() {
  return (
    <>
      <TopBar title="Dashboard" />
      <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2 xl:grid-cols-3">
        <Card title="This Week's Priorities">
          <ul className="space-y-2 text-sm">
            {priorities.map((p) => (
              <li key={p} className="flex gap-2">
                <span className="text-black/30 dark:text-white/30">•</span>
                {p}
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Deadlines">
          <ul className="space-y-2 text-sm">
            {deadlines.map((d) => (
              <li key={d.label} className="flex items-center justify-between">
                <span>{d.label}</span>
                <span className="text-black/50 dark:text-white/50">{d.date}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Today's Meetings">
          <ul className="space-y-2 text-sm">
            {todaysMeetings.map((m) => (
              <li key={m.label} className="flex items-center justify-between">
                <span>{m.label}</span>
                <span className="text-black/50 dark:text-white/50">{m.time}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Tasks Due Today">
          <ul className="space-y-2 text-sm">
            {tasksDueToday.map((t) => (
              <li key={t} className="flex gap-2">
                <input type="checkbox" className="mt-0.5" readOnly />
                {t}
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Recently Captured Ideas">
          <ul className="space-y-2 text-sm">
            {recentIdeas.map((i) => (
              <li key={i} className="flex gap-2">
                <span className="text-black/30 dark:text-white/30">•</span>
                {i}
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Upcoming Events">
          <ul className="space-y-2 text-sm">
            {upcomingEvents.map((e) => (
              <li key={e.label} className="flex items-center justify-between">
                <span>{e.label}</span>
                <span className="text-black/50 dark:text-white/50">{e.date}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Money Earned This Month">
          <p className="text-2xl font-semibold">${stats.moneyEarnedThisMonth.toLocaleString()}</p>
        </Card>

        <Card title="Followers Gained">
          <p className="text-2xl font-semibold">+{stats.followersGained}</p>
        </Card>

        <Card title="Projects at Risk">
          <p className="text-2xl font-semibold text-red-500">{stats.projectsAtRisk}</p>
        </Card>
      </div>
    </>
  );
}
