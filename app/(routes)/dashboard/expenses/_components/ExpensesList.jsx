"use client";
import { db } from "@/utils/dbConfig";
import { Expenses } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Trash2, Calendar, DollarSign, FileText } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

const ExpensesList = ({ expenseList, refreshData }) => {
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (exp) => {
    setDeletingId(exp.id);

    try {
      const data = await db
        .delete(Expenses)
        .where(eq(Expenses.id, exp.id))
        .returning();

      if (data) {
        toast.success("Expense deleted successfully!");
        refreshData();
      }
    } catch (error) {
      toast.error("Failed to delete expense");
      console.error("Delete error:", error);
    } finally {
      setDeletingId(null);
    }
  };

  console.log("Expense List:", expenseList);

  // const formatDate = (date) =>
  //   typeof date === "string"
  //     ? new Date(date).toLocaleDateString()
  //     : date.toLocaleDateString();

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "NPR",
    }).format(amount);
  };

  if (!expenseList || expenseList.length === 0) {
    return (
      <div className="mt-6 text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No expenses yet
        </h3>
        <p className="text-gray-500">
          Start by adding your first expense above.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <div className="grid grid-cols-4 gap-4 font-semibold text-gray-700 text-sm uppercase tracking-wide">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Name
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Amount
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Date
            </div>
            <div className="text-center">Action</div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {expenseList.map((expense, index) => (
            <div
              key={expense.id || index}
              className="px-6 py-4 hover:bg-gray-50 transition-colors duration-150"
            >
              <div className="grid grid-cols-4 gap-4 items-center">
                <div className="font-medium text-gray-900 truncate">
                  {expense.name}
                </div>
                <div className="text-green-600 font-semibold">
                  {formatAmount(expense.amount)}
                </div>
                <div className="text-gray-500 text-sm">
                  <p>{expense.createdAt}</p>
                </div>
                <div className="text-center">
                  <button
                    onClick={() => handleDelete(expense)}
                    disabled={deletingId === expense.id}
                    className="inline-flex items-center justify-center p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Delete expense"
                  >
                    <Trash2
                      className={`h-4 w-4 ${
                        deletingId === expense.id ? "animate-pulse" : ""
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {expenseList.map((expense, index) => (
          <div
            key={expense.id || index}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 truncate">
                  {expense.name}
                </h3>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {expense.createdAt}
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleDelete(expense)}
                disabled={deletingId === expense.id}
                className="ml-4 p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Delete expense"
              >
                <Trash2
                  className={`h-4 w-4 ${
                    deletingId === expense.id ? "animate-pulse" : ""
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-green-600 font-semibold text-lg">
                <DollarSign className="h-4 w-4" />
                {formatAmount(expense.amount)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpensesList;
