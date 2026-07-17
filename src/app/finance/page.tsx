import { TopBar } from "@/components/TopBar";
import { Card } from "@/components/Card";
import { DeleteButton } from "@/components/DeleteButton";
import { createTransaction, deleteTransaction } from "@/app/actions";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function FinancePage() {
  const transactions = await db.transaction.findMany({ orderBy: { date: "desc" } });

  const now = new Date();
  const thisMonth = transactions.filter(
    (t) => t.date.getMonth() === now.getMonth() && t.date.getFullYear() === now.getFullYear(),
  );
  const income = thisMonth.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0);
  const expenses = thisMonth.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0);
  const subscriptions = transactions.filter((t) => t.type === "subscription" && t.recurring);

  return (
    <>
      <TopBar title="Finance" />
      <div className="p-6">
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card title="Income This Month">
            <p className="text-2xl font-semibold">${income.toLocaleString()}</p>
          </Card>
          <Card title="Expenses This Month">
            <p className="text-2xl font-semibold">${expenses.toLocaleString()}</p>
          </Card>
          <Card title="Net This Month">
            <p className="text-2xl font-semibold">${(income - expenses).toLocaleString()}</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <Card title="All Transactions">
            <ul className="mb-3 space-y-2 text-sm">
              {transactions.map((t) => (
                <li key={t.id} className="flex items-center justify-between gap-2">
                  <div>
                    <span className="font-medium">{t.label}</span>
                    <span className="ml-2 text-xs uppercase text-black/40 dark:text-white/40">{t.type}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={t.type === "income" ? "text-green-600" : "text-black/70 dark:text-white/70"}>
                      {t.type === "income" ? "+" : "-"}${t.amount.toLocaleString()}
                    </span>
                    <DeleteButton
                      label={t.label}
                      onDelete={async () => {
                        "use server";
                        await deleteTransaction(t.id);
                      }}
                    />
                  </div>
                </li>
              ))}
              {transactions.length === 0 && <li className="text-black/40 dark:text-white/40">No transactions yet.</li>}
            </ul>
            <form action={createTransaction} className="flex flex-wrap gap-2">
              <select
                name="type"
                required
                className="rounded-md border border-black/10 bg-white/80 px-2 py-1 text-sm dark:border-white/10 dark:bg-black/20"
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
                <option value="subscription">Subscription</option>
              </select>
              <input
                type="text"
                name="label"
                placeholder="Label"
                required
                className="flex-1 rounded-md border border-black/10 bg-white/80 px-2 py-1 text-sm dark:border-white/10 dark:bg-black/20"
              />
              <input
                type="number"
                step="0.01"
                name="amount"
                placeholder="Amount"
                required
                className="w-28 rounded-md border border-black/10 bg-white/80 px-2 py-1 text-sm dark:border-white/10 dark:bg-black/20"
              />
              <input
                type="text"
                name="client"
                placeholder="Client (optional)"
                className="rounded-md border border-black/10 bg-white/80 px-2 py-1 text-sm dark:border-white/10 dark:bg-black/20"
              />
              <button className="rounded-md bg-black/80 px-3 py-1 text-sm text-white dark:bg-white/80 dark:text-black">
                Add
              </button>
            </form>
          </Card>

          <Card title="Memberships / Subscription Renewals">
            <ul className="space-y-2 text-sm">
              {subscriptions.map((s) => (
                <li key={s.id} className="flex items-center justify-between">
                  <span>{s.label}</span>
                  <span className="text-black/50 dark:text-white/50">
                    ${s.amount.toLocaleString()}
                    {s.dueDate ? ` — due ${s.dueDate.toLocaleDateString(undefined, { month: "short", day: "numeric" })}` : ""}
                  </span>
                </li>
              ))}
              {subscriptions.length === 0 && <li className="text-black/40 dark:text-white/40">None tracked yet.</li>}
            </ul>
          </Card>
        </div>
      </div>
    </>
  );
}
