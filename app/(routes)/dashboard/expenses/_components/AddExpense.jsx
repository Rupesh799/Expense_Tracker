import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { Plus, DollarSign, FileText, Receipt, IndianRupee } from "lucide-react";
import moment from "moment";
import React, { useState } from "react";
import { toast } from "sonner";

const AddExpense = ({ budgetId, user, refreshData }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const addNewExpense = async () => {
    if (!name.trim() || !amount || amount <= 0) {
      toast.error("Please enter valid expense name and amount");
      return;
    }

    setIsLoading(true);

    try {
      const data = await db
        .insert(Expenses)
        .values({
          name: name.trim(),
          amount: parseFloat(amount),
          budgetId: budgetId,
          createdAt: moment().format("DD-MM-YYYY"),
          createdBy: user?.primaryEmailAddress?.emailAddress,
        })
        .returning({ insertedId: Budgets.id });

      console.log(data);

      if (data) {
        refreshData();
        setName("");
        setAmount("");
        toast.success("New expense added successfully!");
      }
    } catch (error) {
      console.error("Error adding expense:", error);
      toast.error("Failed to add expense. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    // Allow only numbers and decimal point
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addNewExpense();
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-50 rounded-lg">
          <Receipt className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <h2 className="font-bold text-xl text-gray-900">Add Expense</h2>
          <p className="text-sm text-gray-500">Track your spending</p>
        </div>
      </div>

      <div className="space-y-5">
        {/* Expense Name Field */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-green-700">
            <FileText className="h-4 w-4" />
            Expense Name
          </label>
          <Input
            placeholder="e.g., Groceries, Gas, Coffee"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            disabled={isLoading}
          />
        </div>

        {/* Amount Field */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-green-700">
            <IndianRupee className="h-4 w-4" />
            Amount
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-green-500 text-sm">Rs.</span>
            </div>
            <Input
              placeholder="0.00"
              type="text"
              value={amount}
              onChange={handleAmountChange}
              onKeyPress={handleKeyPress}
              className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              disabled={isLoading}
            />
          </div>
          {amount && parseFloat(amount) > 0 && (
            <p className="text-xs text-gray-500">
              Amount:{" "}
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "NPR",
              }).format(parseFloat(amount))}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          onClick={addNewExpense}
          disabled={
            !name.trim() || !amount || parseFloat(amount) <= 0 || isLoading
          }
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2 group"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              Adding...
            </>
          ) : (
            <>
              <Plus className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
              Add Expense
            </>
          )}
        </Button>
      </div>

      {/* Helper Text */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-xs text-gray-600 flex items-center gap-1">
          <Receipt className="h-3 w-3" />
          Tip: Press Enter to quickly add your expense
        </p>
      </div>
    </div>
  );
};

export default AddExpense;
