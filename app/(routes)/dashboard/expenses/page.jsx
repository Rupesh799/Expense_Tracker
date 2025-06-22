"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";
import {
  Calendar,
  DollarSign,
  Receipt,
  RefreshCw,
  Search,
  SortAsc,
  SortDesc,
  TrendingUp,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import ExpensesList from "./_components/ExpensesList";
import { getAllExpensesByEmail } from "@/utils/getAllexpensesByEmail"; // Adjust the import path as needed

const Expense = () => {
  const [expenseList, setExpenseList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date"); // 'date', 'amount', 'name'
  const [sortOrder, setSortOrder] = useState("desc"); // 'asc', 'desc'
  const [filterPeriod, setFilterPeriod] = useState("all"); // 'all', 'today', 'week', 'month'
  const { user } = useUser();

  useEffect(() => {
    user && getAllExpenses();
  }, [user]);

  const getAllExpenses = async () => {
    setIsLoading(true);
    try {
      const email = user?.primaryEmailAddress?.emailAddress;
      if (!email) return;

      console.log("Fetching expenses for email:", email);

      const data = await getAllExpensesByEmail(email);

      // 🔁 Normalize amount and date
      const normalizedData = data.map((item) => ({
        ...item,
        amount: parseFloat(item.amount) || 0,
        createdAt: item.createdAt,
      }));

      setExpenseList(normalizedData);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    } finally {
      setIsLoading(false);
    }
  };
  console.log("Expense List:", expenseList);
  // Calculate summary statistics
  const expenseStats = useMemo(() => {
    if (!expenseList || expenseList.length === 0) {
      return {
        totalExpenses: 0,
        totalAmount: 0,
        averageAmount: 0,
        thisMonthExpenses: 0,
        thisMonthAmount: 0,
        todayExpenses: 0,
        todayAmount: 0,
      };
    }

    const total = expenseList.reduce(
      (sum, expense) => sum + (expense.amount || 0),
      0
    );
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const todayStr = today.toDateString();

    const thisMonthExpenses = expenseList.filter((expense) => {
      const expenseDate = new Date(expense.createdAt);
      return (
        expenseDate.getMonth() === currentMonth &&
        expenseDate.getFullYear() === currentYear
      );
    });

    const todayExpenses = expenseList.filter((expense) => {
      const expenseDate = new Date(expense.createdAt);
      return expenseDate.toDateString() === todayStr;
    });

    const thisMonthTotal = thisMonthExpenses.reduce(
      (sum, expense) => sum + (expense.amount || 0),
      0
    );
    const todayTotal = todayExpenses.reduce(
      (sum, expense) => sum + (expense.amount || 0),
      0
    );

    return {
      totalExpenses: expenseList.length,
      totalAmount: total,
      averageAmount: expenseList.length > 0 ? total / expenseList.length : 0,
      thisMonthExpenses: thisMonthExpenses.length,
      thisMonthAmount: thisMonthTotal,
      todayExpenses: todayExpenses.length,
      todayAmount: todayTotal,
    };
  }, [expenseList]);

  // Filter and sort expenses
  const filteredAndSortedExpenses = useMemo(() => {
    if (!expenseList) return [];

    let filtered = expenseList.filter(
      (expense) =>
        expense.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expense.budgetName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Apply date filter
    if (filterPeriod !== "all") {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      filtered = filtered.filter((expense) => {
        const expenseDate = new Date(expense.createdAt);

        switch (filterPeriod) {
          case "today":
            return expenseDate.toDateString() === today.toDateString();
          case "week":
            const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
            return expenseDate >= weekAgo;
          case "month":
            const monthAgo = new Date(
              today.getTime() - 30 * 24 * 60 * 60 * 1000
            );
            return expenseDate >= monthAgo;
          default:
            return true;
        }
      });
    }

    // Sort expenses
    return filtered.sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case "amount":
          aValue = a.amount || 0;
          bValue = b.amount || 0;
          break;
        case "name":
          aValue = a.name?.toLowerCase() || "";
          bValue = b.name?.toLowerCase() || "";
          break;
        case "budget":
          aValue = a.budgetName?.toLowerCase() || "";
          bValue = b.budgetName?.toLowerCase() || "";
          break;
        case "date":
        default:
          aValue = new Date(a.createdAt);
          bValue = new Date(b.createdAt);
          break;
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [expenseList, searchTerm, sortBy, sortOrder, filterPeriod]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "NPR",
    }).format(amount || 0);
  };

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  const refreshData = () => {
    getAllExpenses();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Loading Header */}
          <div className="mb-8">
            <div className="h-8 bg-gray-300 rounded w-64 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
          </div>

          {/* Loading Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              >
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                  <div className="h-8 bg-gray-300 rounded w-20"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Loading Controls */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="animate-pulse">
              <div className="h-10 bg-gray-200 rounded w-full max-w-md"></div>
            </div>
          </div>

          {/* Loading List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((item) => (
                <div
                  key={item}
                  className="h-16 bg-gray-200 rounded animate-pulse"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Receipt className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="font-bold text-3xl text-gray-900">
                  All Expenses
                </h1>
                <p className="text-gray-600">Track and manage your spending</p>
              </div>
            </div>
            <Button
              onClick={refreshData}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              disabled={isLoading}
            >
              <RefreshCw
                className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Expenses
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {expenseStats.totalExpenses}
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <Receipt className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Amount
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(expenseStats.totalAmount)}
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(expenseStats.thisMonthAmount)}
                </p>
                <p className="text-xs text-gray-500">
                  {expenseStats.thisMonthExpenses} expenses
                </p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Today</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(expenseStats.todayAmount)}
                </p>
                <p className="text-xs text-gray-500">
                  {expenseStats.todayExpenses} expenses
                </p>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search expenses or budgets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              {/* Date Filter */}
              <select
                value={filterPeriod}
                onChange={(e) => setFilterPeriod(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
              </select>

              {/* Sort Controls */}
              <div className="flex gap-1">
                <Button
                  variant={sortBy === "date" ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleSort("date")}
                  className="flex items-center gap-1"
                >
                  Date
                  {sortBy === "date" &&
                    (sortOrder === "asc" ? (
                      <SortAsc className="h-3 w-3" />
                    ) : (
                      <SortDesc className="h-3 w-3" />
                    ))}
                </Button>
                <Button
                  variant={sortBy === "amount" ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleSort("amount")}
                  className="flex items-center gap-1"
                >
                  Amount
                  {sortBy === "amount" &&
                    (sortOrder === "asc" ? (
                      <SortAsc className="h-3 w-3" />
                    ) : (
                      <SortDesc className="h-3 w-3" />
                    ))}
                </Button>
                <Button
                  variant={sortBy === "name" ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleSort("name")}
                  className="flex items-center gap-1"
                >
                  Name
                  {sortBy === "name" &&
                    (sortOrder === "asc" ? (
                      <SortAsc className="h-3 w-3" />
                    ) : (
                      <SortDesc className="h-3 w-3" />
                    ))}
                </Button>
                <Button
                  variant={sortBy === "budget" ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleSort("budget")}
                  className="flex items-center gap-1"
                >
                  Budget
                  {sortBy === "budget" &&
                    (sortOrder === "asc" ? (
                      <SortAsc className="h-3 w-3" />
                    ) : (
                      <SortDesc className="h-3 w-3" />
                    ))}
                </Button>
              </div>
            </div>
          </div>

          {/* Results Info */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Showing {filteredAndSortedExpenses.length} of{" "}
              {expenseList?.length || 0} expenses
              {searchTerm && ` matching "${searchTerm}"`}
              {filterPeriod !== "all" && ` from ${filterPeriod}`}
            </p>
          </div>
        </div>

        {/* Expenses List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <ExpensesList
            expenseList={filteredAndSortedExpenses}
            refreshData={refreshData}
          />
        </div>
      </div>
    </div>
  );
};

export default Expense;
