import { LucideTrash } from 'lucide-react'
import React from 'react'

const ExpensesList = ({expenseList}) => {
  return (
    <div className='mt-3'>
        <div className='bg-slate-300 flex justify-around  p-3 '>
            <h1>Name</h1>
            <h1>Amount</h1>
            <h1>CreatedAt</h1>
            <h1>Action</h1>
        </div>
        {expenseList.map((expense, index)=>(
            <div className='bg-slate-100 flex justify-around  p-3 ' key={index}>
            <h1>{expense.name}</h1>
            <h1>{expense.amount}</h1>
            <h1>{expense.createdAt}</h1>
            <h1>
                <LucideTrash color='red' className='cursor-pointer'/>
            </h1>
        </div>
        ))}
    </div>
  )
}

export default ExpensesList