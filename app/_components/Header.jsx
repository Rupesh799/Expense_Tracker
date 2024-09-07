"use client"
import { Button } from '@/components/ui/button'
import { UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'
// clerk provide useUser hook 

const Header = () => {

  const {user, isSignedIn} = useUser()
  
  return (
    <div className='p-4 flex justify-between items-center border shadow-sm'>
        <Image src={"./logo.svg"} alt='logo' height={100} width={200}/>

        {isSignedIn?
        (<UserButton/> ): 
        (<Button className="bg-primary hover:bg-secondary">Add Expense</Button>)
      }
        
    </div>
  )
}

export default Header