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
            <span className={item.done ? "flex-1 text-black/40 line-through dark:text-white/40" : "flex-1"}>
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
        {items.length === 0 && <li className="text-black/40 dark:text-white/40">Nothing yet.</li>}
      </ul>
      <form action={createListItem} className="flex gap-2">
        <input type="hidden" name="section" value={section} />
        <input type="hidden" name="group" value={group} />
        <input
          type="text"
          name="title"
          placeholder="Add item..."
          required
          className="flex-1 rounded-md border border-black/10 bg-white/80 px-2 py-1 text-sm dark:border-white/10 dark:bg-black/20"
        />
        <button className="rounded-md bg-black/80 px-3 py-1 text-sm text-white dark:bg-white/80 dark:text-black">
          Add
        </button>
      </form>
    </Card>
  );
}
