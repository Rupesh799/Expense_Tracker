"use client"
import { UserButton, useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import DashboardCard from './_components/DashboardCard';
import { db } from '@/utils/dbConfig'
import { Budgets, Expenses } from '@/utils/schema'
import { desc, eq, getTableColumns, sql } from 'drizzle-orm'
import BarCharts from './_components/BarCharts';
import BudgetItem from './budgets/_components/BudgetItem';
const Dashboard = () => {
  const {user} = useUser();
  const [budgetList, setBudgetList] = useState([])

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
    <div className='p-5'>
        <h2 className='font-bold text-2xl'>Hi, {" "}
          <span className='text-primary'>
            {user?.fullName} 😊
          </span>
          </h2>

        <DashboardCard budgetList={budgetList}/>
        <div className='mt-4 grid grid-cols-1 md:grid-cols-3 gap-3'>
        <div className='md:col-span-2 border rounded-lg p-4 sm:hidden md:block'>
            <BarCharts budgetList={budgetList}/>
        </div>

        <div className='flex flex-col gap-2 '>
          <h2 className='font-bold'>Latest Budgets</h2>
            {budgetList?.map((budget, index)=>(
              <BudgetItem budget={budget} key={index}/>
            ))}
        </div>
</div>
    </div>
  )
}

export default Dashboard