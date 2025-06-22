// utils/queries/getAllExpensesByEmail.ts
import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { eq, getTableColumns } from "drizzle-orm";

export const getAllExpensesByEmail = async (userEmail) => {
  return await db
    .select({
      ...getTableColumns(Expenses),
      budgetName: Budgets.name,
      budgetAmount: Budgets.amount,
    })
    .from(Expenses)
    .leftJoin(Budgets, eq(Expenses.budgetId, Budgets.id))
    .where(eq(Expenses.createdBy, userEmail));
};
