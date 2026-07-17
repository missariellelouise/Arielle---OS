import { TopBar } from "@/components/TopBar";
import { DeleteButton } from "@/components/DeleteButton";
import { StatusSelect } from "@/components/StatusSelect";
import { createProjectCard, updateProjectCardStatus, deleteProjectCard } from "@/app/actions";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

const COLUMNS = [
  { value: "todo", label: "To Do" },
  { value: "in-progress", label: "In Progress" },
  { value: "at-risk", label: "At Risk" },
  { value: "done", label: "Done" },
];

const CATEGORIES = ["Personal", "Miami Fashion Institute", "Fashion Alliance Network"];

export default async function ProjectHubPage() {
  const cards = await db.projectCard.findMany({ orderBy: [{ order: "asc" }, { createdAt: "asc" }] });

  return (
    <>
      <TopBar title="Project Hub" />
      <div className="p-6">
        <p className="mb-6 max-w-2xl text-sm text-black/60 dark:text-white/60">
          Kanban board spanning personal content, Miami Fashion Institute assignments, and Fashion Alliance
          Network work.
        </p>

        <form action={createProjectCard} className="mb-6 flex max-w-2xl flex-wrap gap-2">
          <input
            type="text"
            name="title"
            placeholder="New card title"
            required
            className="flex-1 rounded-md border border-black/10 bg-white/80 px-2 py-1 text-sm dark:border-white/10 dark:bg-black/20"
          />
          <select
            name="category"
            required
            className="rounded-md border border-black/10 bg-white/80 px-2 py-1 text-sm dark:border-white/10 dark:bg-black/20"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <button className="rounded-md bg-black/80 px-3 py-1 text-sm text-white dark:bg-white/80 dark:text-black">
            Add card
          </button>
        </form>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {COLUMNS.map((col) => (
            <div key={col.value} className="rounded-xl border border-black/10 bg-white/70 p-3 dark:border-white/10 dark:bg-white/5">
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-black/60 dark:text-white/60">
                {col.label}
              </h2>
              <div className="space-y-2">
                {cards
                  .filter((c) => c.status === col.value)
                  .map((card) => (
                    <div key={card.id} className="rounded-lg border border-black/10 bg-white/80 p-2 text-sm dark:border-white/10 dark:bg-black/20">
                      <p className="mb-1">{card.title}</p>
                      <p className="mb-2 text-xs text-black/50 dark:text-white/50">{card.category}</p>
                      <div className="flex items-center justify-between">
                        <StatusSelect
                          value={card.status}
                          options={COLUMNS}
                          onChange={async (status) => {
                            "use server";
                            await updateProjectCardStatus(card.id, status);
                          }}
                        />
                        <DeleteButton
                          label={card.title}
                          onDelete={async () => {
                            "use server";
                            await deleteProjectCard(card.id);
                          }}
                        />
                      </div>
                    </div>
                  ))}
                {cards.filter((c) => c.status === col.value).length === 0 && (
                  <p className="text-xs text-black/40 dark:text-white/40">No cards</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
