"use client";
import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import BudgetItem from "../../budgets/_components/BudgetItem";
import AddExpense from "../_components/AddExpense";
import ExpensesList from "../_components/ExpensesList";
import { LucideTrash, PenBoxIcon } from "lucide-react";
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
  const router = useRouter()
  const { user } = useUser();
  const [budgetInfo, setBudgetInfo] = useState();
  const [expenseLists, setExpenseLists] = useState([]);

  useEffect(() => {
    user && getSingleExpense();
  }, [user]);

  /**
   * get single expense details
   */
  const getSingleExpense = async () => {
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
  //inorder to access the id we have to use params

      .groupBy(Budgets.id);

    setBudgetInfo(data[0]);
    fetchAllExpenses();
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

    console.log(data);
  };


  const deleteWholeBudget=async()=>{

    const deleteExpenseData= await db.delete(Expenses)
      .where(eq(Expenses.budgetId, params.id))
      .returning()
      

      if(deleteExpenseData){

    const data = await db.delete(Budgets)
    .where(eq(Budgets.id, params.id ))
    //here params.id is a current budget
    .returning();
      }

   
      toast("Budget Deleted!")
      router.push('/dashboard/budgets')
    
    
  }



  return (
    <div className="p-10">
      <h2 className="font-bold text-2xl flex justify-between">
        My Expenses

      <div className="flex gap-2">
      <EditBudget budgetInfo={budgetInfo} refreshData={()=>getSingleExpense()}/>
        <AlertDialog>
          <AlertDialogTrigger asChild>
          <Button className=" flex gap-2" variant="destructive">
          <LucideTrash /> Delete
        </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you Sure want to Delete?</AlertDialogTitle>
              <AlertDialogDescription>
                Once deleted it cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction variant="destructive" onClick={()=>deleteWholeBudget()}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mt-4 gap-6">
        {budgetInfo ? (
          <BudgetItem budget={budgetInfo} />
        ) : (
          <div className="w-full h-[130px] rounded-md bg-slate-300 animate-pulse "></div>
        )}
        <AddExpense
          budgetId={params.id}
          user={user}
          refreshData={() => getSingleExpense()}
        />
      </div>

      <div className="w-full border rounded-md mt-4 p-4">
        <h2 className="font-bold">All Expenses </h2>
        <hr />

        <ExpensesList
          expenseList={expenseLists}
          refreshData={() => getSingleExpense()}
        />
      </div>
    </div>
  );
};

export default Expensepage;
