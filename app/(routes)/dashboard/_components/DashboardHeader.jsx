import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { Search, Bell, Plus, Filter, Calendar } from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";

const DashboardHeader = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Left Section - Search */}
          <div className="flex items-center gap-4 flex-1 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search transactions, categories..."
                className="pl-10 pr-4 h-10 bg-background/50 border-border/50 focus:bg-background focus:border-primary/50 transition-all duration-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-muted"
                  onClick={() => setSearchQuery("")}
                >
                  ×
                </Button>
              )}
            </div>

            {/* Filter Button - Hidden on mobile */}
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:flex items-center gap-2 bg-background/50 hover:bg-accent/50 border-border/50"
            >
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>

          {/* Center Section - Quick Actions */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/dashboard/add-expense"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all duration-200 hover:scale-105 px-2 rounded-md flex items-center gap-2 h-10"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Expense
            </Link>

            <Button
              variant="outline"
              size="sm"
              className="bg-background/50 hover:bg-accent/50 border-border/50"
            >
              <Calendar className="h-4 w-4 mr-2" />
              This Month
            </Button>
          </div>

          {/* Right Section - Notifications & User */}
          <div className="flex items-center gap-3">
            {/* Mobile Add Button */}
            <Button
              size="sm"
              className="md:hidden bg-primary hover:bg-primary/90 text-primary-foreground p-2"
            >
              <Plus className="h-4 w-4" />
            </Button>

            {/* User Button with enhanced styling */}
            <div className="flex items-center">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox:
                      "h-10 w-10 hover:ring-2 hover:ring-primary/20 transition-all duration-200",
                    userButtonPopoverCard: "shadow-lg border border-border/50",
                    userButtonPopoverActions: "bg-background",
                  },
                }}
              />
            </div>
          </div>
        </div>

        {/* Mobile Filter Bar */}
        <div className="sm:hidden pb-3">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 bg-background/50 hover:bg-accent/50 border-border/50"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
