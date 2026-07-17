import { TopBar } from "@/components/TopBar";
import { Card } from "@/components/Card";
import { DeleteButton } from "@/components/DeleteButton";
import { createEvent, deleteEvent } from "@/app/actions";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function CalendarPage() {
  const events = await db.event.findMany({ orderBy: { date: "asc" } });

  return (
    <>
      <TopBar title="Calendar" />
      <div className="p-6">
        <p className="mb-6 max-w-2xl text-sm text-rose-950/60 dark:text-rose-50/60">
          Google Calendar & Apple Calendar aren&apos;t connected yet — that requires OAuth setup with your
          own accounts. In the meantime, track meetings and events manually below.
        </p>
        <div className="max-w-xl">
          <Card title="Events">
            <ul className="mb-3 space-y-2 text-sm">
              {events.map((event) => (
                <li key={event.id} className="flex items-center justify-between gap-2">
                  <span>{event.label}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-rose-950/50 dark:text-rose-50/50">
                      {event.date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                    <DeleteButton
                      label={event.label}
                      onDelete={async () => {
                        "use server";
                        await deleteEvent(event.id);
                      }}
                    />
                  </div>
                </li>
              ))}
              {events.length === 0 && <li className="text-rose-950/40 dark:text-rose-50/40">No events yet.</li>}
            </ul>
            <form action={createEvent} className="flex gap-2">
              <input
                type="text"
                name="label"
                placeholder="Event name"
                required
                className="flex-1 rounded-md border border-rose-950/10 bg-rose-50/80 px-2 py-1 text-sm dark:border-rose-50/10 dark:bg-rose-950/20"
              />
              <input
                type="date"
                name="date"
                required
                className="rounded-md border border-rose-950/10 bg-rose-50/80 px-2 py-1 text-sm dark:border-rose-50/10 dark:bg-rose-950/20"
              />
              <button className="rounded-md bg-pink-600 px-3 py-1 text-sm text-white hover:bg-pink-700 dark:bg-pink-500 dark:text-rose-950 dark:hover:bg-pink-400">
                Add
              </button>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
}
