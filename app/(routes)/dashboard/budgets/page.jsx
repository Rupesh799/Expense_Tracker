import React from 'react'
import BudgetsList from './_components/BudgetsList'

const BudgetPage = () => {
  return (
    <div className='p-10 mb-3'>
      <h1 className='font-bold text-3xl mb-4'>My Budgets</h1>
      <BudgetsList/>
    </div>
  )
}

export default BudgetPage