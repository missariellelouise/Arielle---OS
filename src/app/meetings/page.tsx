import { TopBar } from "@/components/TopBar";
import { Card } from "@/components/Card";
import { DeleteButton } from "@/components/DeleteButton";
import { PrintButton } from "@/components/PrintButton";
import { createMeeting, deleteMeeting } from "@/app/actions";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function MeetingsPage() {
  const meetings = await db.meeting.findMany({ orderBy: { date: "desc" } });

  return (
    <>
      <TopBar title="Meetings Database" />
      <div className="p-6">
        <p className="mb-6 max-w-2xl text-sm text-rose-950/60 dark:text-rose-50/60">
          A searchable record of every meeting, decision, and follow-up.
        </p>

        <Card title="Log a meeting">
          <form action={createMeeting} className="grid grid-cols-1 gap-2 md:grid-cols-2">
            <input
              type="text"
              name="title"
              placeholder="Meeting title"
              required
              className="rounded-md border border-rose-950/10 bg-rose-50/80 px-2 py-1 text-sm dark:border-rose-50/10 dark:bg-rose-950/20"
            />
            <input
              type="datetime-local"
              name="date"
              required
              className="rounded-md border border-rose-950/10 bg-rose-50/80 px-2 py-1 text-sm dark:border-rose-50/10 dark:bg-rose-950/20"
            />
            <textarea
              name="summary"
              placeholder="AI / manual summary"
              className="md:col-span-2 rounded-md border border-rose-950/10 bg-rose-50/80 px-2 py-1 text-sm dark:border-rose-50/10 dark:bg-rose-950/20"
            />
            <textarea
              name="decisions"
              placeholder="Decisions made / next steps"
              className="rounded-md border border-rose-950/10 bg-rose-50/80 px-2 py-1 text-sm dark:border-rose-50/10 dark:bg-rose-950/20"
            />
            <textarea
              name="actionItems"
              placeholder="Action items / deliverables"
              className="rounded-md border border-rose-950/10 bg-rose-50/80 px-2 py-1 text-sm dark:border-rose-50/10 dark:bg-rose-950/20"
            />
            <input
              type="date"
              name="followUpDate"
              className="rounded-md border border-rose-950/10 bg-rose-50/80 px-2 py-1 text-sm dark:border-rose-50/10 dark:bg-rose-950/20"
            />
            <button className="rounded-md bg-pink-600 px-3 py-1 text-sm text-white hover:bg-pink-700 dark:bg-pink-500 dark:text-rose-950 dark:hover:bg-pink-400 md:col-span-2">
              Save meeting
            </button>
          </form>
        </Card>

        <div className="mt-6 space-y-3">
          {meetings.map((m) => (
            <Card key={m.id} title={m.title}>
              <div className="flex items-start justify-between">
                <p className="mb-2 text-xs text-rose-950/50 dark:text-rose-50/50">
                  {m.date.toLocaleString(undefined, { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" })}
                </p>
                <div className="flex items-center gap-2">
                  <PrintButton label="Print notes" />
                  <DeleteButton
                    label={m.title}
                    onDelete={async () => {
                      "use server";
                      await deleteMeeting(m.id);
                    }}
                  />
                </div>
              </div>
              {m.summary && <p className="mb-2 text-sm">{m.summary}</p>}
              <div className="grid grid-cols-1 gap-2 text-sm md:grid-cols-2">
                {m.decisions && (
                  <div>
                    <p className="text-xs text-rose-950/50 dark:text-rose-50/50">Decisions / next steps</p>
                    <p>{m.decisions}</p>
                  </div>
                )}
                {m.actionItems && (
                  <div>
                    <p className="text-xs text-rose-950/50 dark:text-rose-50/50">Action items</p>
                    <p>{m.actionItems}</p>
                  </div>
                )}
              </div>
              {m.followUpDate && (
                <p className="mt-2 text-xs text-rose-950/50 dark:text-rose-50/50">
                  Follow up by {m.followUpDate.toLocaleDateString()}
                </p>
              )}
            </Card>
          ))}
          {meetings.length === 0 && <p className="text-rose-950/40 dark:text-rose-50/40">No meetings logged yet.</p>}
        </div>
      </div>
    </>
  );
}
