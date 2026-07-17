import { notFound } from "next/navigation";
import { TopBar } from "@/components/TopBar";
import { ListSection } from "@/components/ListSection";
import { GroupTabs } from "@/components/GroupTabs";
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

  const counts = section.groups.map((group) => itemsByGroup.get(group)?.length ?? 0);
  const panels = section.groups.map((group) => (
    <ListSection key={group} section={section.slug} group={group} items={itemsByGroup.get(group) ?? []} />
  ));

  return (
    <>
      <TopBar title={section.title} />
      <div className="p-6">
        <p className="mb-6 max-w-2xl text-sm text-rose-950/60 dark:text-rose-50/60">{section.summary}</p>
        <GroupTabs groups={section.groups} counts={counts}>
          {panels}
        </GroupTabs>
      </div>
    </>
  );
}
