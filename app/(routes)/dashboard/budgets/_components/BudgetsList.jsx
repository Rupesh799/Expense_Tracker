"use client"
import React , {useEffect, useState} from 'react'
import CreateBudgets from './CreateBudgets'
import { db } from '@/utils/dbConfig'
import { desc, eq, getTableColumns, sql } from 'drizzle-orm'
import { Budgets, Expenses } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import BudgetItem from './BudgetItem'

const BudgetsList = () => {

    const [budgetList, setBudgetList] = useState([])
    const {user} = useUser()

    useEffect(() => {
      
      user && getAllBudgets()
      
    }, [user]);
    const getAllBudgets = async()=>{
        const data = await db.select({
            ...getTableColumns(Budgets),
            totalSpend:sql `sum(CAST(${Expenses.amount} AS NUMERIC))`.mapWith(Number),
            totalItem:sql `count(${Expenses.id})`.mapWith(Number)
        }).from(Budgets)
        .leftJoin(Expenses,eq(Budgets.id, Expenses.budgetId))
        .where(eq(Budgets.createdBy,user?.primaryEmailAddress?.emailAddress))
        .groupBy(Budgets.id)
        .orderBy(desc(Budgets.id))
          setBudgetList(data)
        
    }

  return (
    <div className='mt-7'>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-2'>

        <CreateBudgets refreshData={()=>getAllBudgets()}/>

        {budgetList?.length > 0 ? budgetList.map((budget, index)=>(
            <BudgetItem budget={budget} key={index}/>
        ))
        :
        [1,2,3,4,5].map((item, index)=>(
          <div key={index} className='w-full bg-slate-300 rounded-md h-[130px] animate-pulse'>
              
          </div>
        ))
        
      
      }
        </div>
    </div>
  )
}

export default BudgetsList;