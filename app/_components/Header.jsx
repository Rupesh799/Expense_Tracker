"use client";
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";
// clerk provide useUser hook

const Header = () => {
  const { user, isSignedIn } = useUser();

  return (
    <div className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto py-2 flex justify-between items-center ">
        <Image src={"./logo.svg"} alt="logo" height={80} width={150} />

        {isSignedIn ? (
          <UserButton />
        ) : (
          <Button className="bg-primary hover:bg-secondary">Add Expense</Button>
        )}
      </div>
    </div>
  );
};

export default Header;
