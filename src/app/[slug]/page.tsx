import { notFound } from "next/navigation";
import { TopBar } from "@/components/TopBar";
import { ListSection } from "@/components/ListSection";
import { db } from "@/lib/db";
import { getGenericSection } from "@/data/sections";

export const dynamic = "force-dynamic";

export default async function SectionPage({ params }: { params: { slug: string } }) {
  const section = getGenericSection(params.slug);
  if (!section) notFound();

  const items = await db.listItem.findMany({
    where: { section: section.slug },
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });

  const itemsByGroup = new Map<string, typeof items>();
  for (const item of items) {
    const list = itemsByGroup.get(item.group) ?? [];
    list.push(item);
    itemsByGroup.set(item.group, list);
  }

  return (
    <>
      <TopBar title={section.title} />
      <div className="p-6">
        <p className="mb-6 max-w-2xl text-sm text-black/60 dark:text-white/60">{section.summary}</p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {section.groups.map((group) => (
            <ListSection key={group} section={section.slug} group={group} items={itemsByGroup.get(group) ?? []} />
          ))}
        </div>
      </div>
    </>
  );
}
