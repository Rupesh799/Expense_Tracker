"use client"
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
import { Button } from "@/components/ui/button";
import { db } from "@/utils/dbConfig";
import { Budgets } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

const CreateBudgets = ({refreshData}) => {

    const {user} = useUser()
    const [name , setName] = useState("");
    const [amount , setAmount] = useState("");

    const CreateBudget=async()=>{
        const data = await db.insert(Budgets).values({
            name:name,
            amount:amount,
            createdBy:user?.primaryEmailAddress?.emailAddress
        }).returning({insertedId:Budgets.id})

        if(data){
            refreshData();
            toast('Budget is Created')
        }
        


    }
  return (
    <div>
    
      <Dialog>
        <DialogTrigger asChild>
        <div className="p-10 flex flex-col items-center bg-green-100 rounded-md font-bold hover:shadow-md cursor-pointer border-2 border-dashed h-[150px]">
        <h2>+</h2>
        <h2>Create New Budget</h2>
      </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Budget</DialogTitle>
            <DialogDescription>
              <div className="mt-2">
                <h2 className="font-medium text-black my-2">Budget Name</h2>
                <Input placeholder="untensils" onChange={(e)=>setName(e.target.value)}/>
              </div>

              <div className="mt-2">
                <h2 className="font-medium text-black my-2">Amount</h2>
                <Input placeholder="Rs. 2000" type="number" onChange={(e)=>setAmount(e.target.value)}/>
              </div>

             

            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
          <Button 
              disabled={!(name&&amount)}
              onClick={()=>CreateBudget()}
              className="w-full mt-3 bg-primary hover:bg-secondary">Create Budget</Button>
          </DialogClose>
        </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateBudgets;
