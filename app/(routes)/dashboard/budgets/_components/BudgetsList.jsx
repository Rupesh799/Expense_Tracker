import React from 'react'
import CreateBudgets from './CreateBudgets'

const BudgetsList = () => {
  return (
    <div className='mt-7'>
        <div className='grid md:grid-cols-2 lg:grid-cols-3'>

        <CreateBudgets/>
        </div>
    </div>
  )
}

export default BudgetsList