import { TopBar } from "@/components/TopBar";
import { Card } from "@/components/Card";
import { ListSection } from "@/components/ListSection";
import { PrintButton } from "@/components/PrintButton";
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
        <p className="mb-6 max-w-2xl text-sm text-rose-950/60 dark:text-rose-50/60">
          Mission, vision, voice, and identity for every brand you run.
        </p>
        <div className="space-y-6">
          {brands.map((brand) => (
            <Card key={brand.id} title={brand.name}>
              <div className="mb-3 flex justify-end">
                <PrintButton label={`Print ${brand.name} guidelines`} />
              </div>

              {/* Print-only clean summary; the edit form below is hidden when printing. */}
              <dl className="mb-4 hidden space-y-2 text-sm print:block">
                {FIELDS.map((f) => (
                  <div key={f.key}>
                    <dt className="text-xs font-medium uppercase text-rose-950/50">{f.label}</dt>
                    <dd>{(brand as Record<string, unknown>)[f.key] as string | undefined}</dd>
                  </div>
                ))}
              </dl>

              <form action={updateBrand} className="mb-4 grid grid-cols-1 gap-2 md:grid-cols-2">
                <input type="hidden" name="id" value={brand.id} />
                {FIELDS.map((f) => (
                  <div key={f.key}>
                    <label className="mb-1 block text-xs text-rose-950/50 dark:text-rose-50/50">{f.label}</label>
                    <input
                      type="text"
                      name={f.key}
                      defaultValue={(brand as Record<string, unknown>)[f.key] as string | undefined}
                      className="w-full rounded-md border border-rose-950/10 bg-rose-50/80 px-2 py-1 text-sm dark:border-rose-50/10 dark:bg-rose-950/20"
                    />
                  </div>
                ))}
                <button className="rounded-md bg-pink-600 px-3 py-1 text-sm text-white hover:bg-pink-700 dark:bg-pink-500 dark:text-rose-950 dark:hover:bg-pink-400 md:col-span-2">
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
