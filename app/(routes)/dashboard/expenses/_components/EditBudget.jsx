import { Button } from "@/components/ui/button";
import { PenBoxIcon } from "lucide-react";
import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter, DialogClose
  } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/dbConfig";
import { Budgets } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { toast } from "sonner";

const EditBudget = ({budgetInfo, refreshData}) => {
    const {user} = useUser()
    const [name, setName] = useState(budgetInfo?.name);
    const [amount, setAmount] = useState(budgetInfo?.amount);

    const UpdateBudget=async()=>{
        const data = await db.update(Budgets).set({
            name:name,
            amount:amount
        })
        .where(eq(Budgets.id, budgetInfo.id))
        .returning()

        if(data){
            toast("Budget Updated Successfully !")
            refreshData()
        }
    }
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="flex gap-2">
            {" "}
            <PenBoxIcon /> Edit
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Budget</DialogTitle>
            <DialogDescription>
              <div className="mt-2">
                <h2 className="font-medium text-black my-2">Budget Name</h2>
                <Input
                  placeholder="untensils"
                  onChange={(e) => setName(e.target.value)}
                  defaultValue={budgetInfo?.name}
                />
              </div>

              <div className="mt-2">
                <h2 className="font-medium text-black my-2">Amount</h2>
                <Input
                  placeholder="Rs. 2000"
                  type="number"
                  onChange={(e) => setAmount(e.target.value)}
                  defaultValue={budgetInfo?.amount}
                />
              </div>
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                disabled={!(name && amount)}
                onClick={() => UpdateBudget()}
                className="w-full mt-3 bg-primary hover:bg-secondary"
               
              >
                Update Budget
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditBudget;
