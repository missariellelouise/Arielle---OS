import { TopBar } from "@/components/TopBar";
import { Card } from "@/components/Card";
import { ListSection } from "@/components/ListSection";
import { updateBrand } from "@/app/actions";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

const FIELDS: { key: string; label: string }[] = [
  { key: "mission", label: "Mission" },
  { key: "vision", label: "Vision" },
  { key: "voice", label: "Voice" },
  { key: "targetAudience", label: "Target audience" },
  { key: "goals", label: "Goals" },
  { key: "guidelines", label: "Brand guidelines" },
  { key: "colorPalette", label: "Color palette" },
  { key: "fonts", label: "Fonts" },
  { key: "competitors", label: "Competitors" },
];

export default async function BrandHqPage() {
  const brands = await db.brand.findMany({ orderBy: { name: "asc" } });
  const ideaItems = await db.listItem.findMany({
    where: { section: "brand-hq" },
    orderBy: { createdAt: "asc" },
  });

  return (
    <>
      <TopBar title="Brand HQ" />
      <div className="p-6">
        <p className="mb-6 max-w-2xl text-sm text-black/60 dark:text-white/60">
          Mission, vision, voice, and identity for every brand you run.
        </p>
        <div className="space-y-6">
          {brands.map((brand) => (
            <Card key={brand.id} title={brand.name}>
              <form action={updateBrand} className="mb-4 grid grid-cols-1 gap-2 md:grid-cols-2">
                <input type="hidden" name="id" value={brand.id} />
                {FIELDS.map((f) => (
                  <div key={f.key}>
                    <label className="mb-1 block text-xs text-black/50 dark:text-white/50">{f.label}</label>
                    <input
                      type="text"
                      name={f.key}
                      defaultValue={(brand as Record<string, unknown>)[f.key] as string | undefined}
                      className="w-full rounded-md border border-black/10 bg-white/80 px-2 py-1 text-sm dark:border-white/10 dark:bg-black/20"
                    />
                  </div>
                ))}
                <button className="rounded-md bg-black/80 px-3 py-1 text-sm text-white dark:bg-white/80 dark:text-black md:col-span-2">
                  Save
                </button>
              </form>
              <ListSection
                section="brand-hq"
                group={`${brand.slug}:ideas`}
                title="Ideas backlog"
                items={ideaItems.filter((i) => i.group === `${brand.slug}:ideas`)}
              />
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
