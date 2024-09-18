import Link from 'next/link'
import React from 'react'

const BudgetItem = ({budget}) => {

  const calculateProgessBar =()=>{
    const percentage = (budget.totalSpend / budget.amount) * 100
    return percentage.toFixed(2)
  }
  return (
    <Link href={`/dashboard/expenses/${budget?.id}`} className='bg-gradient-to-r from-cyan-200 to-blue-500 rounded-md shadow-md flex flex-col p-4 cursor-pointer hover:shadow-lg h-[150px]'
    
   >
        <div className='flex justify-between items-center'>
               
               <div className='font-bold items-center'>

                <h2 className=''>{budget?.name}</h2>
                <h4>{budget?.totalItem} Items</h4>
               </div>

               <div className='font-bold text-secondary items-center'>
                 <h4>Rs. {budget?.amount}</h4>
               </div>

              

        </div>
        <div className='mt-5'>

        <div className='flex items-center justify-between mb-2'>
            <h4 className='text-xs text-slate-900'>Rs. {budget.totalSpend?budget?.totalSpend:0} spent</h4>
            <h4 className='text-xs text-slate-900'>Rs. {budget.amount - budget.totalSpend} Remaining</h4>
            {/* <h4>Rs. {budget?.}</h4> */}
        </div>
        
        <div className='w-full bg-slate-400 rounded-full h-2'>
            <div className=' bg-secondary h-2 rounded-full'
            style={{
              width:`${calculateProgessBar()}%`
            }} >

            </div>
        </div>
        </div>

        
    </Link>
  )
}

export default BudgetItem