import { notFound } from "next/navigation";
import { TopBar } from "@/components/TopBar";
import { Card } from "@/components/Card";
import { sections, getSection } from "@/data/sections";

export function generateStaticParams() {
  return sections.map((s) => ({ slug: s.slug }));
}

export default function SectionPage({ params }: { params: { slug: string } }) {
  const section = getSection(params.slug);
  if (!section) notFound();

  return (
    <>
      <TopBar title={section.title} />
      <div className="p-6">
        <p className="mb-6 max-w-2xl text-sm text-black/60 dark:text-white/60">{section.summary}</p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {section.groups.map((group, idx) => (
            <Card key={group.label ?? idx} title={group.label ?? section.title}>
              <ul className="space-y-2 text-sm">
                {group.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-black/30 dark:text-white/30">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
