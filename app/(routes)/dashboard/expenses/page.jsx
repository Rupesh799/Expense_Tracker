import React from 'react'
import ExpensesList from './_components/ExpensesList'

const Expense = ({expenseList}) => {
  return (
    <div className='p-6'>
      <h1 className='font-bold text-2xl'>All Expenses</h1>
      <hr />

      <div>
        <ExpensesList expenseList={expenseList}/>
      </div>
    </div>
  )
}

export default Expense