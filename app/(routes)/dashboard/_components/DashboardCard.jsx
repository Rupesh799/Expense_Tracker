import {
  Banknote,
  DollarSign,
  Wallet,
  TrendingUp,
  TrendingDown,
  Activity,
} from "lucide-react";
import React, { useEffect, useState } from "react";

const DashboardCard = ({ budgetList }) => {
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSpend, setTotalSpend] = useState(0);

  useEffect(() => {
    budgetList && calculateCardData();
  }, [budgetList]);

  const calculateCardData = () => {
    console.log(budgetList);
    let totalbudget_ = 0;
    let totalspend_ = 0;

    budgetList.forEach((element) => {
      totalbudget_ = totalbudget_ + Number(element.amount);
      totalspend_ = totalspend_ + element.totalSpend;
    });
    console.log(totalbudget_, totalspend_);
    setTotalBudget(totalbudget_);
    setTotalSpend(totalspend_);
  };

  const remainingBudget = totalBudget - totalSpend;
  const spendPercentage =
    totalBudget > 0 ? (totalSpend / totalBudget) * 100 : 0;

  const cardData = [
    {
      title: "Total Budget",
      value: `Rs. ${totalBudget.toLocaleString()}`,
      icon: Banknote,
      bgGradient: "from-blue-500 to-blue-600",
      bgLight: "from-blue-50 to-blue-100",
      textColor: "text-blue-700",
      iconBg: "bg-gradient-to-r from-blue-500 to-blue-600",
      trend: null,
    },
    {
      title: "Total Spent",
      value: `Rs. ${totalSpend.toLocaleString()}`,
      icon: DollarSign,
      bgGradient: "from-red-500 to-red-600",
      bgLight: "from-red-50 to-red-100",
      textColor: "text-red-700",
      iconBg: "bg-gradient-to-r from-red-500 to-red-600",
      trend:
        spendPercentage > 80 ? "high" : spendPercentage > 50 ? "medium" : "low",
    },
    {
      title: "Remaining Budget",
      value: `Rs. ${remainingBudget.toLocaleString()}`,
      icon: Wallet,
      bgGradient: "from-green-500 to-green-600",
      bgLight: "from-green-50 to-green-100",
      textColor: "text-green-700",
      iconBg: "bg-gradient-to-r from-green-500 to-green-600",
      trend: remainingBudget > 0 ? "positive" : "negative",
    },
  ];

  const getTrendIcon = (trend) => {
    switch (trend) {
      case "high":
      case "negative":
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      case "positive":
      case "low":
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "medium":
        return <Activity className="h-4 w-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl border border-gray-200 overflow-hidden">
      <div className="p-6 animate-pulse">
        <div className="flex items-center justify-between">
          <div className="space-y-3 flex-1">
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            <div className="h-8 bg-gray-300 rounded w-3/4"></div>
            <div className="h-3 bg-gray-300 rounded w-1/3"></div>
          </div>
          <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
        </div>
        <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-gray-300 rounded-full animate-pulse w-1/2"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="mt-8">
      {budgetList?.length > 0 ? (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {cardData.map((card, index) => {
              const IconComponent = card.icon;
              return (
                <div
                  key={index}
                  className={`relative overflow-hidden bg-gradient-to-br ${card.bgLight} rounded-xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group`}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]"></div>

                  <div className="relative p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                            {card.title}
                          </h3>
                          {card.trend && getTrendIcon(card.trend)}
                        </div>
                        <p
                          className={`text-2xl md:text-3xl font-bold ${card.textColor} mb-1`}
                        >
                          {card.value}
                        </p>
                        {index === 1 && totalBudget > 0 && (
                          <p className="text-xs text-gray-500">
                            {spendPercentage.toFixed(1)}% of budget used
                          </p>
                        )}
                      </div>

                      <div
                        className={`p-4 ${card.iconBg} rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                    </div>

                    {/* Progress bar for spending */}
                    {index === 1 && totalBudget > 0 && (
                      <div className="mt-4">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>Spent</span>
                          <span>{spendPercentage.toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-1000 ease-out ${
                              spendPercentage > 90
                                ? "bg-gradient-to-r from-red-500 to-red-600"
                                : spendPercentage > 70
                                ? "bg-gradient-to-r from-yellow-500 to-yellow-600"
                                : "bg-gradient-to-r from-green-500 to-green-600"
                            }`}
                            style={{
                              width: `${Math.min(spendPercentage, 100)}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Additional Stats Card */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200/50 p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Budget Overview
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">
                  {budgetList?.length || 0}
                </p>
                <p className="text-sm text-gray-600">Active Budgets</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">
                  {budgetList?.length > 0
                    ? (totalBudget / budgetList.length).toLocaleString()
                    : 0}
                </p>
                <p className="text-sm text-gray-600">Avg. Budget</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {totalBudget > 0
                    ? ((remainingBudget / totalBudget) * 100).toFixed(0)
                    : 0}
                  %
                </p>
                <p className="text-sm text-gray-600">Budget Left</p>
              </div>
              <div className="text-center">
                <p
                  className={`text-2xl font-bold ${
                    spendPercentage > 80 ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {spendPercentage > 80
                    ? "High"
                    : spendPercentage > 50
                    ? "Medium"
                    : "Low"}
                </p>
                <p className="text-sm text-gray-600">Spend Level</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((item, index) => (
            <LoadingSkeleton key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardCard;
