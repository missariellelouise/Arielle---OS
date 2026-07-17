import { createListItem, toggleListItem, deleteListItem } from "@/app/actions";
import { ItemCheckbox } from "@/components/ItemCheckbox";
import { DeleteButton } from "@/components/DeleteButton";
import { Card } from "@/components/Card";

type Item = { id: string; title: string; done: boolean };

export function ListSection({
  section,
  group,
  items,
  title,
}: {
  section: string;
  group: string;
  items: Item[];
  title?: string;
}) {
  return (
    <Card title={title ?? group}>
      <ul className="mb-3 space-y-2 text-sm">
        {items.map((item) => (
          <li key={item.id} className="flex items-start gap-2">
            <ItemCheckbox
              defaultChecked={item.done}
              onToggle={async (done) => {
                "use server";
                await toggleListItem(item.id, section, done);
              }}
            />
            <span className={item.done ? "flex-1 text-rose-950/40 line-through dark:text-rose-50/40" : "flex-1"}>
              {item.title}
            </span>
            <DeleteButton
              label={item.title}
              onDelete={async () => {
                "use server";
                await deleteListItem(item.id, section);
              }}
            />
          </li>
        ))}
        {items.length === 0 && <li className="text-rose-950/40 dark:text-rose-50/40">Nothing yet.</li>}
      </ul>
      <form action={createListItem} className="flex gap-2">
        <input type="hidden" name="section" value={section} />
        <input type="hidden" name="group" value={group} />
        <input
          type="text"
          name="title"
          placeholder="Add item..."
          required
          className="flex-1 rounded-md border border-rose-950/10 bg-rose-50/80 px-2 py-1 text-sm dark:border-rose-50/10 dark:bg-rose-950/20"
        />
        <button className="rounded-md bg-pink-600 px-3 py-1 text-sm text-white hover:bg-pink-700 dark:bg-pink-500 dark:text-rose-950 dark:hover:bg-pink-400">
          Add
        </button>
      </form>
    </Card>
  );
}
