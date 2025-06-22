"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import {
  ArrowRightCircle,
  ArrowUpRightSquareIcon,
  DollarSignIcon,
  LayoutDashboardIcon,
  ShoppingBag,
  Settings,
  HelpCircle,
  Crown,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SideNav = () => {
  const path = usePathname();
  const { user } = useUser();

  const MenuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutDashboardIcon,
      link: "/dashboard",
    },
    {
      id: 2,
      name: "Budgets",
      icon: DollarSignIcon,
      link: "/dashboard/budgets",
    },
    {
      id: 3,
      name: "Expenses",
      icon: ShoppingBag,
      link: "/dashboard/expenses",
    },
    {
      id: 4,
      name: "Settings",
      icon: Settings,
      link: "/dashboard/settings",
    },
  ];

  return (
    <aside className="h-screen flex flex-col bg-gradient-to-b from-background to-muted/20 border-r border-border/50 shadow-lg">
      {/* Header Section */}
      <div className="p-6 border-b border-border/50">
        <Link href="/dashboard" className="block">
          <Image
            src="/logo.svg"
            alt="logo"
            height={160}
            width={150}
            className="h-8 w-auto hover:scale-105 transition-transform duration-200"
          />
        </Link>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-2">
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
            Main Menu
          </h3>

          {MenuList.map((item) => {
            const isActive = path === item.link;
            const Icon = item.icon;

            return (
              <Link href={item.link} key={item.id}>
                <div
                  className={`
                  group relative flex items-center gap-3 px-3 py-3 rounded-xl font-medium transition-all duration-200 cursor-pointer
                  ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  }
                `}
                >
                  <Icon
                    className={`h-5 w-5 transition-all duration-200 ${
                      isActive
                        ? "text-primary-foreground"
                        : "group-hover:scale-110"
                    }`}
                  />
                  <span className="font-medium">{item.name}</span>

                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute right-3">
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  )}

                  {/* Hover effect background */}
                  {!isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Upgrade Section */}
        <div className="mt-8">
          <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/10 border border-primary/20 rounded-xl p-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-2xl" />

            <div className="relative">
              <div className="flex items-center gap-2 mb-2">
                <Crown className="h-5 w-5 text-primary" />
                <span className="font-semibold text-foreground">Go Pro</span>
              </div>

              <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                Unlock advanced features and unlimited budgets
              </p>

              <Link href="/dashboard/upgrade">
                <div className="flex items-center justify-between bg-primary hover:bg-primary/90 text-primary-foreground px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 group">
                  <span>Upgrade Now</span>
                  <ArrowUpRightSquareIcon className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Footer Section */}
      <div className="p-4 border-t border-border/50 bg-muted/30">
        {/* Help Link */}
        <Link
          href="/help"
          className="flex items-center gap-3 px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-lg transition-all duration-200 mb-3 group"
        >
          <HelpCircle className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
          <span className="text-sm font-medium">Help & Support</span>
        </Link>

        {/* User Profile Section */}
        <div className="flex items-center gap-3 p-3 bg-background/50 rounded-xl border border-border/50 hover:bg-accent/30 transition-all duration-200 group cursor-pointer">
          <UserButton
            appearance={{
              elements: {
                avatarBox:
                  "h-9 w-9 hover:ring-2 hover:ring-primary/20 transition-all duration-200",
              },
            }}
          />

          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {user?.firstName || "User"}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {user?.emailAddresses?.[0]?.emailAddress || "user@example.com"}
            </p>
          </div>

          <ArrowRightCircle className="h-4 w-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all duration-200 flex-shrink-0" />
        </div>
      </div>
    </aside>
  );
};

export default SideNav;
