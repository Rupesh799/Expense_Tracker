import { Input } from '@/components/ui/input'
import { UserButton } from '@clerk/nextjs'
import { Search, SearchCheckIcon } from 'lucide-react'
import React from 'react'

const DashboardHeader = () => {
  return (
    <div className='p-4 flex justify-between items-center border-b shadow-md '>
          
          <div className='flex gap-4 items-center font-bold'>
            <Search size={40}/>
               <Input type="search"/>
          </div>
          <div>

            <UserButton/>
          </div>
    </div>
  )
}

export default DashboardHeader