import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import moment from "moment";
import React, { useState } from "react";
import { toast } from "sonner";

const AddExpense = ({ budgetId, user , refreshData}) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState();

  const addNewExpense = async () => {
    const data = await db
      .insert(Expenses)
      .values({
        name: name,
        amount: amount,
        budgetId: budgetId,
        createdAt: moment().format("DD-MM-YYYY")
      })
      .returning({ insertedId: Budgets.id });

    console.log(data);
    if (data) {
      refreshData();

      toast("New Expense Added Successfully !");
    }
  };
  return (
    <div className="border p-5 rounded-lg">
      <h2 className="font-bold text-lg">Add Expense</h2>
      <div>
        <div className="mt-2">
          <h2 className="font-medium text-black my-2">Budget Name</h2>
          <Input
            placeholder="untensils"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mt-2">
          <h2 className="font-medium text-black my-2">Amount</h2>
          <Input
            placeholder="Rs. 2000"
            type="number"
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <Button
          className="bg-primary hover:bg-secondary mt-3 w-full"
          disabled={!(name && amount)}
          onClick={() => addNewExpense()}
        >
          Add Expense
        </Button>
      </div>
    </div>
  );
};

export default AddExpense;
