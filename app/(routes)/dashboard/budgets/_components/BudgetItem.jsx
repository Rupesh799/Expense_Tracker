import Link from "next/link";
import React from "react";

const BudgetItem = ({ budget }) => {
  const calculateProgessBar = () => {
    const percentage =
      (Number(budget.totalSpend || 0) / Number(budget.amount || 1)) * 100;
    return Math.min(percentage, 100).toFixed(1);
  };

  const getProgressColor = () => {
    const percentage = parseFloat(calculateProgessBar());
    if (percentage >= 90) return "bg-red-500";
    if (percentage >= 75) return "bg-orange-500";
    if (percentage >= 50) return "bg-yellow-500";
    return "bg-emerald-500";
  };

  const getProgressBgColor = () => {
    const percentage = parseFloat(calculateProgessBar());
    if (percentage >= 90) return "bg-red-50";
    if (percentage >= 75) return "bg-orange-50";
    if (percentage >= 50) return "bg-yellow-50";
    return "bg-emerald-50";
  };

  const remaining = Number(budget.amount || 0) - Number(budget.totalSpend || 0);
  const isOverBudget = remaining < 0;

  return (
    <Link
      href={`/dashboard/expenses/${budget?.id}`}
      className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 flex flex-col p-6 cursor-pointer border border-gray-100 h-[180px] overflow-hidden"
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>

      {/* Status indicator */}
      <div
        className={`absolute top-3 right-3 w-3 h-3 rounded-full ${getProgressColor()} shadow-sm`}
      ></div>

      {/* Content */}
      <div className="relative flex-1 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h2 className="text-lg font-bold text-gray-800 group-hover:text-indigo-700 transition-colors duration-200 line-clamp-1">
              {budget?.name || "Untitled Budget"}
            </h2>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-sm text-gray-600">
                {budget?.totalItem || 0} Items
              </span>
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <span className="text-xs text-gray-500">
                {calculateProgessBar()}% used
              </span>
            </div>
          </div>

          <div className="text-right">
            <div className="text-lg font-bold text-gray-800">
              Rs. {Number(budget?.amount || 0).toLocaleString()}
            </div>
            <div className="text-xs text-gray-500">Budget</div>
          </div>
        </div>

        {/* Spending details */}
        <div className="flex-1 flex flex-col justify-end">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm">
              <span className="text-gray-600">Spent: </span>
              <span className="font-semibold text-gray-800">
                Rs. {Number(budget.totalSpend || 0).toLocaleString()}
              </span>
            </div>
            <div className="text-sm text-right">
              <span
                className={`font-semibold ${
                  isOverBudget ? "text-red-600" : "text-emerald-600"
                }`}
              >
                {isOverBudget ? "Over by " : "Remaining: "}
                Rs. {Math.abs(remaining).toLocaleString()}
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="space-y-2">
            <div
              className={`w-full ${getProgressBgColor()} rounded-full h-2.5 overflow-hidden`}
            >
              <div
                className={`${getProgressColor()} h-full rounded-full transition-all duration-500 ease-out relative overflow-hidden`}
                style={{
                  width: `${calculateProgessBar()}%`,
                }}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-pulse"></div>
              </div>
            </div>

            {/* Progress indicators */}
            <div className="flex justify-between text-xs text-gray-500">
              <span>0%</span>
              <span
                className={`font-medium ${
                  parseFloat(calculateProgessBar()) >= 90
                    ? "text-red-600"
                    : parseFloat(calculateProgessBar()) >= 75
                    ? "text-orange-600"
                    : parseFloat(calculateProgessBar()) >= 50
                    ? "text-yellow-600"
                    : "text-emerald-600"
                }`}
              >
                {calculateProgessBar()}%
              </span>
              <span>100%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>

      {/* Bottom border accent */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-1 ${getProgressColor()} opacity-60 group-hover:opacity-100 transition-opacity duration-300`}
      ></div>
    </Link>
  );
};

export default BudgetItem;
