
import { Banknote, DollarSign,  Wallet } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const DashboardCard = ({budgetList}) => {

    const [totalBudget, setTotalBudget] = useState(0)
    const [totalSpend, setTotalSpend] = useState(0)
    useEffect(()=>{
        budgetList && calculateCardData()
    },[budgetList])

    const calculateCardData =()=>{
        console.log(budgetList);
        let totalbudget_ = 0;
        let totalspend_ = 0;

        budgetList.forEach(element => {
            totalbudget_ = totalbudget_ + Number(element.amount);
            totalspend_ = totalspend_ + element.totalSpend;
        });
        console.log(totalbudget_, totalspend_);
        setTotalBudget(totalbudget_);
        setTotalSpend(totalspend_);
        
    }
    
  return (
    <>
        {budgetList?.length>0 ?

    <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
        <div className='p-5 flex items-center justify-between border rounded-lg'>
            <div className='gap-2 flex flex-col'>
                <h2 className='font-bold '>Total Budgets</h2>
                <h2 className='text-green-700 font-bold text-2xl'>Rs. {totalBudget}</h2>
            </div>
            <div className='bg-primary rounded-full p-3'>
                <Banknote color='white'/>
            </div>
        </div>
        <div className='p-5 flex items-center justify-between border rounded-lg'>
            <div className='gap-2 flex flex-col'>
                <h2 className='font-bold'>Total Spend</h2>
                <h2 className='text-green-700 font-bold text-2xl'>Rs.{totalSpend}</h2>
            </div>
            <div className='bg-primary rounded-full p-3'>
                <DollarSign color='white'/>
            </div>
        </div>
        <div className='p-5 flex items-center justify-between border rounded-lg'>
            <div className='gap-2 flex flex-col'>
                <h2 className='font-bold'>No of Budgets</h2>
                <h2 className='text-green-700 font-bold text-2xl'>{budgetList?.length}</h2>
            </div>
            <div className='bg-primary rounded-full p-3'>
                <Wallet color='white'/>
            </div>
        </div>
    </div>
    :
    <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
       { [1,2,3].map((item, index)=>(
                <div className='h-[120px] w-full bg-slate-300 animate-pulse rounded-lg' key={index}>

                </div>
        ))}
    </div>
}


    </>
  )
}

export default DashboardCard