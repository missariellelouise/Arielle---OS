import { TopBar } from "@/components/TopBar";
import { Card } from "@/components/Card";
import { DeleteButton } from "@/components/DeleteButton";
import { createContact, deleteContact } from "@/app/actions";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

const CATEGORIES = [
  "People",
  "Brands",
  "Editors",
  "Photographers",
  "Stylists",
  "PR contacts",
  "Designers",
  "Manufacturers",
  "Recruiters",
  "Professors",
  "Sponsors",
  "Investors",
];

export default async function CrmPage() {
  const contacts = await db.contact.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <>
      <TopBar title="CRM" />
      <div className="p-6">
        <p className="mb-6 max-w-2xl text-sm text-rose-950/60 dark:text-rose-50/60">Track everyone you meet.</p>

        <Card title="Add contact">
          <form action={createContact} className="grid grid-cols-1 gap-2 md:grid-cols-2">
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              className="rounded-md border border-rose-950/10 bg-rose-50/80 px-2 py-1 text-sm dark:border-rose-50/10 dark:bg-rose-950/20"
            />
            <select
              name="category"
              required
              className="rounded-md border border-rose-950/10 bg-rose-50/80 px-2 py-1 text-sm dark:border-rose-50/10 dark:bg-rose-950/20"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="whereMet"
              placeholder="Where you met"
              className="rounded-md border border-rose-950/10 bg-rose-50/80 px-2 py-1 text-sm dark:border-rose-50/10 dark:bg-rose-950/20"
            />
            <input
              type="date"
              name="followUpDate"
              className="rounded-md border border-rose-950/10 bg-rose-50/80 px-2 py-1 text-sm dark:border-rose-50/10 dark:bg-rose-950/20"
            />
            <input
              type="text"
              name="interests"
              placeholder="Interests"
              className="rounded-md border border-rose-950/10 bg-rose-50/80 px-2 py-1 text-sm dark:border-rose-50/10 dark:bg-rose-950/20"
            />
            <input
              type="text"
              name="collaborationIdeas"
              placeholder="Collaboration ideas"
              className="rounded-md border border-rose-950/10 bg-rose-50/80 px-2 py-1 text-sm dark:border-rose-50/10 dark:bg-rose-950/20"
            />
            <textarea
              name="notes"
              placeholder="Notes"
              className="md:col-span-2 rounded-md border border-rose-950/10 bg-rose-50/80 px-2 py-1 text-sm dark:border-rose-50/10 dark:bg-rose-950/20"
            />
            <button className="rounded-md bg-pink-600 px-3 py-1 text-sm text-white hover:bg-pink-700 dark:bg-pink-500 dark:text-rose-950 dark:hover:bg-pink-400 md:col-span-2">
              Add contact
            </button>
          </form>
        </Card>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {contacts.map((c) => (
            <Card key={c.id} title={c.name}>
              <div className="flex items-start justify-between">
                <span className="mb-2 inline-block rounded-full bg-rose-950/5 px-2 py-0.5 text-xs dark:bg-rose-50/10">
                  {c.category}
                </span>
                <DeleteButton
                  label={c.name}
                  onDelete={async () => {
                    "use server";
                    await deleteContact(c.id);
                  }}
                />
              </div>
              <dl className="space-y-1 text-sm">
                {c.whereMet && (
                  <div>
                    <dt className="text-xs text-rose-950/50 dark:text-rose-50/50">Where you met</dt>
                    <dd>{c.whereMet}</dd>
                  </div>
                )}
                {c.followUpDate && (
                  <div>
                    <dt className="text-xs text-rose-950/50 dark:text-rose-50/50">Follow-up date</dt>
                    <dd>{c.followUpDate.toLocaleDateString()}</dd>
                  </div>
                )}
                {c.interests && (
                  <div>
                    <dt className="text-xs text-rose-950/50 dark:text-rose-50/50">Interests</dt>
                    <dd>{c.interests}</dd>
                  </div>
                )}
                {c.collaborationIdeas && (
                  <div>
                    <dt className="text-xs text-rose-950/50 dark:text-rose-50/50">Collaboration ideas</dt>
                    <dd>{c.collaborationIdeas}</dd>
                  </div>
                )}
                {c.notes && (
                  <div>
                    <dt className="text-xs text-rose-950/50 dark:text-rose-50/50">Notes</dt>
                    <dd>{c.notes}</dd>
                  </div>
                )}
              </dl>
            </Card>
          ))}
          {contacts.length === 0 && <p className="text-rose-950/40 dark:text-rose-50/40">No contacts yet.</p>}
        </div>
      </div>
    </>
  );
}
