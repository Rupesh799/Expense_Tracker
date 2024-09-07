"use client"
import { UserButton } from '@clerk/nextjs'
import { ArrowRightCircle, ArrowUpRightSquareIcon, DollarSignIcon, LayoutDashboardIcon, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const SideNav = () => {


    const path = usePathname()

    const MenuList =[
        {
            "id": 1,
            "name": "Dashboard",
            "icon": LayoutDashboardIcon,
            "link": "/dashboard",
        },
        {
            "id": 2,
            "name": "Budgets",
            "icon": DollarSignIcon,
            "link": "/dashboard/budgets",
        },
        {
            "id": 3,
            "name": "Expenses",
            "icon": ShoppingBag,
            "link": "/dashboard/expenses",
        },
        {
            "id":4,
            "name": "upgrade",
            "icon": ArrowUpRightSquareIcon,
            "link": "/dashboard/upgrade",
        }
    
    ]

  return (
    <div className='h-screen p-6 border shadow-sm '>
        <Image src={'/logo.svg'} alt='logo' height={160} width={150} className='mb-3'/>
        <div>
            {MenuList.map((items, index)=>(
                <Link href={items.link}>

                <h2 className={`flex gap-3 items-center p-4 mb-2 cursor-pointer text-primary font-bold hover:bg-primary hover:rounded-md hover:text-secondary active:bg-secondary
                    ${path == items.link && `text-secondary bg-primary rounded-md`}
                    `}>
                    <items.icon/>
                    {items.name}</h2>
                </Link>
            )

            )}
        </div>
        <div className='fixed bottom-5 flex gap-5 items-center font-bold cursor-pointer text-secondary'>
            <UserButton/>
            <h5>Profile 
                
            </h5>
            <ArrowRightCircle/>
        </div>
    </div>
  )
}

export default SideNav