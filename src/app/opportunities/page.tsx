import { TopBar } from "@/components/TopBar";
import { Card } from "@/components/Card";
import { DeleteButton } from "@/components/DeleteButton";
import { StatusSelect } from "@/components/StatusSelect";
import { createOpportunity, updateOpportunityStatus, deleteOpportunity } from "@/app/actions";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

const TYPES = [
  "Jobs",
  "Freelance",
  "Speaking",
  "Volunteer",
  "Collaborations",
  "Brand partnerships",
  "Competitions",
  "Grants",
  "Accelerators",
  "Residencies",
  "Fashion shows",
  "Model calls",
  "Open casting calls",
  "Conferences",
  "Scholarships",
];

const STATUSES = [
  { value: "researching", label: "Researching" },
  { value: "applied", label: "Applied" },
  { value: "interview", label: "Interview" },
  { value: "accepted", label: "Accepted" },
  { value: "declined", label: "Declined" },
];

export default async function OpportunitiesPage() {
  const opportunities = await db.opportunity.findMany({ orderBy: [{ deadline: "asc" }, { createdAt: "desc" }] });

  return (
    <>
      <TopBar title="Opportunity Pipeline" />
      <div className="p-6">
        <Card title="Add opportunity">
          <form action={createOpportunity} className="grid grid-cols-1 gap-2 md:grid-cols-2">
            <input
              type="text"
              name="title"
              placeholder="Title"
              required
              className="rounded-md border border-rose-950/10 bg-rose-50/80 px-2 py-1 text-sm dark:border-rose-50/10 dark:bg-rose-950/20"
            />
            <select
              name="type"
              required
              className="rounded-md border border-rose-950/10 bg-rose-50/80 px-2 py-1 text-sm dark:border-rose-50/10 dark:bg-rose-950/20"
            >
              {TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <input
              type="date"
              name="deadline"
              placeholder="Deadline"
              className="rounded-md border border-rose-950/10 bg-rose-50/80 px-2 py-1 text-sm dark:border-rose-50/10 dark:bg-rose-950/20"
            />
            <input
              type="text"
              name="contactPerson"
              placeholder="Contact person"
              className="rounded-md border border-rose-950/10 bg-rose-50/80 px-2 py-1 text-sm dark:border-rose-50/10 dark:bg-rose-950/20"
            />
            <input
              type="text"
              name="requiredMaterials"
              placeholder="Required materials"
              className="rounded-md border border-rose-950/10 bg-rose-50/80 px-2 py-1 text-sm dark:border-rose-50/10 dark:bg-rose-950/20"
            />
            <input
              type="date"
              name="followUpDate"
              placeholder="Follow-up date"
              className="rounded-md border border-rose-950/10 bg-rose-50/80 px-2 py-1 text-sm dark:border-rose-50/10 dark:bg-rose-950/20"
            />
            <button className="rounded-md bg-pink-600 px-3 py-1 text-sm text-white hover:bg-pink-700 dark:bg-pink-500 dark:text-rose-950 dark:hover:bg-pink-400 md:col-span-2">
              Add
            </button>
          </form>
        </Card>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {opportunities.map((o) => (
            <Card key={o.id} title={o.title}>
              <div className="mb-2 flex items-center justify-between">
                <span className="rounded-full bg-rose-950/5 px-2 py-0.5 text-xs dark:bg-rose-50/10">{o.type}</span>
                <DeleteButton
                  label={o.title}
                  onDelete={async () => {
                    "use server";
                    await deleteOpportunity(o.id);
                  }}
                />
              </div>
              <div className="mb-2">
                <StatusSelect
                  value={o.status}
                  options={STATUSES}
                  onChange={async (status) => {
                    "use server";
                    await updateOpportunityStatus(o.id, status);
                  }}
                />
              </div>
              <dl className="space-y-1 text-sm">
                {o.deadline && (
                  <div>
                    <dt className="text-xs text-rose-950/50 dark:text-rose-50/50">Deadline</dt>
                    <dd>{o.deadline.toLocaleDateString()}</dd>
                  </div>
                )}
                {o.contactPerson && (
                  <div>
                    <dt className="text-xs text-rose-950/50 dark:text-rose-50/50">Contact person</dt>
                    <dd>{o.contactPerson}</dd>
                  </div>
                )}
                {o.requiredMaterials && (
                  <div>
                    <dt className="text-xs text-rose-950/50 dark:text-rose-50/50">Required materials</dt>
                    <dd>{o.requiredMaterials}</dd>
                  </div>
                )}
                {o.followUpDate && (
                  <div>
                    <dt className="text-xs text-rose-950/50 dark:text-rose-50/50">Follow-up date</dt>
                    <dd>{o.followUpDate.toLocaleDateString()}</dd>
                  </div>
                )}
              </dl>
            </Card>
          ))}
          {opportunities.length === 0 && <p className="text-rose-950/40 dark:text-rose-50/40">No opportunities tracked yet.</p>}
        </div>
      </div>
    </>
  );
}
