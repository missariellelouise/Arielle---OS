import { TopBar } from "@/components/TopBar";
import { Card } from "@/components/Card";
import { ListSection } from "@/components/ListSection";
import { agents } from "@/data/agents";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AiAgentsPage() {
  const reports = await db.listItem.findMany({
    where: { section: "ai-agents", group: "Recent reports" },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <TopBar title="AI Agents" />
      <div className="p-6">
        <p className="mb-6 max-w-2xl text-sm text-black/60 dark:text-white/60">
          A team of specialized AI agents covering research, creative, operations, and finance. These
          agents aren&apos;t wired up to run automatically yet — that requires connecting an AI provider.
          Log findings and reports below as you generate them manually.
        </p>
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {agents.map((agent) => (
            <Card key={agent.name} title={agent.name}>
              <p className="mb-3 text-sm text-black/60 dark:text-white/60">{agent.description}</p>
              <ul className="space-y-1.5 text-sm">
                {agent.capabilities.map((c) => (
                  <li key={c} className="flex gap-2">
                    <span className="text-black/30 dark:text-white/30">•</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
        <div className="max-w-xl">
          <ListSection section="ai-agents" group="Recent reports" items={reports} />
        </div>
      </div>
    </>
  );
}
