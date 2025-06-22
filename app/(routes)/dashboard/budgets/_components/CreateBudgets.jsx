"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/dbConfig";
import { Budgets } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { Plus, Wallet, Target, DollarSign } from "lucide-react";

const CreateBudgets = ({ refreshData }) => {
  const { user } = useUser();
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const CreateBudget = async () => {
    setIsLoading(true);
    try {
      const data = await db
        .insert(Budgets)
        .values({
          name: name,
          amount: Number(amount),
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: new Date().toISOString(),
        })
        .returning({ insertedId: Budgets.id });

      if (data) {
        refreshData();
        toast.success("Budget created successfully! 🎉", {
          description: `${name} budget of Rs. ${Number(
            amount
          ).toLocaleString()} has been created.`,
        });

        // Reset form
        setName("");
        setAmount("");
        setOpen(false);
      }
    } catch (error) {
      toast.error("Failed to create budget", {
        description: "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = name.trim() && amount && Number(amount) > 0;

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div className="group relative p-8 flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 rounded-xl font-medium hover:shadow-lg cursor-pointer border-2 border-dashed border-emerald-300 hover:border-emerald-400 h-[180px] transition-all duration-300 hover:scale-105">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/20 to-green-100/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Plus icon with animation */}
            <div className="relative mb-3 p-3 bg-emerald-100 rounded-full group-hover:bg-emerald-200 transition-colors duration-200">
              <Plus className="w-8 h-8 text-emerald-600 group-hover:rotate-90 transition-transform duration-300" />
            </div>

            <h2 className="text-lg font-semibold text-emerald-800 group-hover:text-emerald-900 transition-colors duration-200">
              Create New Budget
            </h2>
            <p className="text-sm text-emerald-600 mt-1 opacity-70 group-hover:opacity-100 transition-opacity duration-200">
              Plan your finances
            </p>

            {/* Decorative elements */}
            <div className="absolute top-4 right-4 w-2 h-2 bg-emerald-300 rounded-full opacity-60"></div>
            <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-green-400 rounded-full opacity-40"></div>
          </div>
        </DialogTrigger>

        <DialogContent className="sm:max-w-md">
          <DialogHeader className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-2">
              <Wallet className="w-6 h-6 text-emerald-600" />
            </div>
            <DialogTitle className="text-xl font-bold text-gray-900">
              Create New Budget
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Set up a budget to track your spending and reach your financial
              goals.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Budget Name Input */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Target className="w-4 h-4 text-emerald-600" />
                Budget Name
              </label>
              <Input
                placeholder="e.g., Groceries, Entertainment, Travel"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="transition-all duration-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
              {name.trim() && (
                <p className="text-xs text-emerald-600 flex items-center gap-1">
                  <span className="w-1 h-1 bg-emerald-500 rounded-full"></span>
                  Looks good!
                </p>
              )}
            </div>

            {/* Amount Input */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <DollarSign className="w-4 h-4 text-emerald-600" />
                Budget Amount
              </label>
              <div className="relative">
                <Input
                  placeholder="Enter amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-12 transition-all duration-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  min="1"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                  Rs.
                </div>
              </div>
              {amount && Number(amount) > 0 && (
                <p className="text-xs text-emerald-600 flex items-center gap-1">
                  <span className="w-1 h-1 bg-emerald-500 rounded-full"></span>
                  Budget: Rs. {Number(amount).toLocaleString()}
                </p>
              )}
            </div>

            {/* Preview Card */}
            {isFormValid && (
              <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-lg p-4 space-y-2">
                <p className="text-xs font-medium text-emerald-700 uppercase tracking-wide">
                  Preview
                </p>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-gray-900">{name}</h3>
                    <p className="text-sm text-gray-600">0 items • 0% used</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">
                      Rs. {Number(amount).toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">Budget</p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full w-0 transition-all duration-300"></div>
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="gap-2">
            <DialogClose asChild>
              <Button variant="outline" className="flex-1" disabled={isLoading}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              disabled={!isFormValid || isLoading}
              onClick={CreateBudget}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Create Budget
                </div>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateBudgets;
