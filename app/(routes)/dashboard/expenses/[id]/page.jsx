"use client";
import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import BudgetItem from "../../budgets/_components/BudgetItem";
import AddExpense from "../_components/AddExpense";
import ExpensesList from "../_components/ExpensesList";
import {
  LucideTrash,
  ArrowLeft,
  Receipt,
  TrendingUp,
  AlertTriangle,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import EditBudget from "../_components/EditBudget";

const Expensepage = ({ params }) => {
  const router = useRouter();
  const { user } = useUser();
  const [budgetInfo, setBudgetInfo] = useState();
  const [expenseLists, setExpenseLists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    user && getSingleExpense();
  }, [user]);

  /**
   * get single expense details
   */
  const getSingleExpense = async () => {
    setIsLoading(true);
    try {
      const data = await db
        .select({
          ...getTableColumns(Budgets),
          totalSpend: sql`sum(CAST(${Expenses.amount} AS NUMERIC))`.mapWith(
            Number
          ),
          totalItem: sql`count(${Expenses.id})`.mapWith(Number),
        })
        .from(Budgets)
        .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
        .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
        .where(eq(Budgets.id, params.id))
        .groupBy(Budgets.id);

      setBudgetInfo(data[0]);
      await fetchAllExpenses();
    } catch (error) {
      toast.error("Failed to load budget information");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Get all expenses
   */
  const fetchAllExpenses = async () => {
    const data = await db
      .select()
      .from(Expenses)
      .where(eq(Expenses.budgetId, params.id))
      .orderBy(desc(Expenses.id));
    setExpenseLists(data);
  };

  const deleteWholeBudget = async () => {
    setIsDeleting(true);
    try {
      const deleteExpenseData = await db
        .delete(Expenses)
        .where(eq(Expenses.budgetId, params.id))
        .returning();

      if (deleteExpenseData) {
        const data = await db
          .delete(Budgets)
          .where(eq(Budgets.id, params.id))
          .returning();
      }

      toast.success("Budget deleted successfully!", {
        description: "All associated expenses have been removed.",
      });
      router.push("/dashboard/budgets");
    } catch (error) {
      toast.error("Failed to delete budget");
    } finally {
      setIsDeleting(false);
    }
  };

  // Calculate budget health
  const getBudgetHealth = () => {
    if (!budgetInfo) return null;
    const percentage =
      (Number(budgetInfo.totalSpend || 0) / Number(budgetInfo.amount || 1)) *
      100;

    if (percentage >= 100)
      return {
        status: "critical",
        color: "text-red-600",
        bg: "bg-red-50",
        icon: AlertTriangle,
      };
    if (percentage >= 80)
      return {
        status: "warning",
        color: "text-orange-600",
        bg: "bg-orange-50",
        icon: TrendingUp,
      };
    return {
      status: "healthy",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      icon: TrendingUp,
    };
  };

  const budgetHealth = getBudgetHealth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            {/* Back Button & Title */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/dashboard/budgets")}
                className="hover:bg-gray-100"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Budgets
              </Button>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Receipt className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {budgetInfo?.name || "Loading..."}
                  </h1>
                  <p className="text-sm text-gray-500">Budget Management</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              {budgetInfo && (
                <>
                  <EditBudget
                    budgetInfo={budgetInfo}
                    refreshData={() => getSingleExpense()}
                  />
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="destructive"
                        size="sm"
                        disabled={isDeleting}
                        className="flex items-center gap-2"
                      >
                        <LucideTrash className="w-4 h-4" />
                        Delete Budget
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2">
                          <AlertTriangle className="w-5 h-5 text-red-500" />
                          Delete Budget Confirmation
                        </AlertDialogTitle>
                        <AlertDialogDescription className="space-y-2">
                          <p>Are you sure you want to delete this budget?</p>
                          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                            <p className="text-sm text-red-800 font-medium">
                              This will permanently:
                            </p>
                            <ul className="text-sm text-red-700 mt-1 space-y-1">
                              <li>• Delete the budget "{budgetInfo?.name}"</li>
                              <li>
                                • Remove all {expenseLists.length} associated
                                expenses
                              </li>
                              <li>• This action cannot be undone</li>
                            </ul>
                          </div>
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel disabled={isDeleting}>
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          variant="destructive"
                          onClick={deleteWholeBudget}
                          disabled={isDeleting}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          {isDeleting ? (
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              Deleting...
                            </div>
                          ) : (
                            "Delete Budget"
                          )}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Budget Health Alert */}
        {budgetInfo && budgetHealth && (
          <div
            className={`${budgetHealth.bg} border border-gray-200 rounded-xl p-4 mb-6`}
          >
            <div className="flex items-center gap-3">
              <budgetHealth.icon className={`w-5 h-5 ${budgetHealth.color}`} />
              <div>
                <h3 className={`font-semibold ${budgetHealth.color}`}>
                  Budget Status:{" "}
                  {budgetHealth.status === "critical"
                    ? "Over Budget"
                    : budgetHealth.status === "warning"
                    ? "Nearly Exhausted"
                    : "Healthy"}
                </h3>
                <p className="text-sm text-gray-600">
                  {budgetHealth.status === "critical"
                    ? `You've exceeded your budget by Rs. ${(
                        Number(budgetInfo.totalSpend || 0) -
                        Number(budgetInfo.amount || 0)
                      ).toLocaleString()}`
                    : budgetHealth.status === "warning"
                    ? `You've used ${Math.round(
                        (Number(budgetInfo.totalSpend || 0) /
                          Number(budgetInfo.amount || 1)) *
                          100
                      )}% of your budget`
                    : `Your spending is on track with ${Math.round(
                        (Number(budgetInfo.totalSpend || 0) /
                          Number(budgetInfo.amount || 1)) *
                          100
                      )}% used`}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Budget Overview & Add Expense */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Budget Item */}
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-600" />
              Budget Overview
            </h2>
            {isLoading ? (
              <div className="w-full h-[180px] rounded-xl bg-gray-200 animate-pulse"></div>
            ) : budgetInfo ? (
              <BudgetItem budget={budgetInfo} />
            ) : (
              <div className="w-full h-[180px] rounded-xl bg-red-50 border border-red-200 flex items-center justify-center">
                <p className="text-red-600 font-medium">Budget not found</p>
              </div>
            )}
          </div>

          {/* Add Expense */}
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-gray-900">
              Quick Add Expense
            </h2>
            <AddExpense
              budgetId={params.id}
              user={user}
              refreshData={() => getSingleExpense()}
            />
          </div>
        </div>

        {/* Expenses List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Receipt className="w-5 h-5 text-gray-600" />
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    All Expenses
                  </h2>
                  <p className="text-sm text-gray-500">
                    {expenseLists.length}{" "}
                    {expenseLists.length === 1 ? "expense" : "expenses"}{" "}
                    recorded
                  </p>
                </div>
              </div>
              {expenseLists.length > 0 && (
                <div className="text-right">
                  <p className="text-sm text-gray-500">Total Spent</p>
                  <p className="text-lg font-bold text-gray-900">
                    Rs. {Number(budgetInfo?.totalSpend || 0).toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="p-6">
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-16 bg-gray-200 rounded-lg animate-pulse"
                  ></div>
                ))}
              </div>
            ) : (
              <ExpensesList
                expenseList={expenseLists}
                refreshData={() => getSingleExpense()}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expensepage;
