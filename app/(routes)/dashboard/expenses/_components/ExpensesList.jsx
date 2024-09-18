import { db } from '@/utils/dbConfig'
import { Expenses } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { LucideTrash } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

const ExpensesList = ({expenseList, refreshData}) => {

  const handleDelete=async(exp)=>{

      
        const data = await db.delete(Expenses)
        .where(eq(Expenses.id, exp.id))
        .returning()
      

      if(data){
        toast("Expense Deleted Successfully !");
        refreshData();
      }
  }

  return (
    <div className='mt-3'>
        <div className='bg-slate-300 flex justify-around  p-3 '>
            <h1>Name</h1>
            <h1>Amount</h1>
            <h1>CreatedAt</h1>
            <h1>Action</h1>
        </div>
        {expenseList?.map((expense, index)=>(
            <div className='bg-slate-100 flex justify-around  p-3 ' key={index}>
            <h1>{expense.name}</h1>
            <h1>{expense.amount}</h1>
            <h1>{expense.createdAt}</h1>
            <h1>
                <LucideTrash color='red' className='cursor-pointer' onClick={()=>handleDelete(expense)}/>
                  {/* //here we use expense as parameter so taht we can access expenses data */}
            </h1>
        </div>
        ))}
    </div>
  )
}

export default ExpensesList