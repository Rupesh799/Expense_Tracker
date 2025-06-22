import React from "react";
import {
  Bar,
  BarChart,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
} from "recharts";

const BarCharts = ({ budgetList }) => {
  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-800 mb-2">{`${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${
                entry.dataKey === "totalSpend" ? "Total Spent" : "Budget Amount"
              }: Rs. ${entry.value.toLocaleString()}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Custom legend component
  const CustomLegend = (props) => {
    const { payload } = props;
    return (
      <div className="flex justify-center gap-6 mt-4">
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: entry.color }}
            ></div>
            <span className="text-sm text-gray-600">
              {entry.dataKey === "totalSpend" ? "Total Spent" : "Budget Amount"}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <div className="w-1 h-8 bg-gradient-to-b from-emerald-600 to-emerald-800 rounded-full"></div>
          Budget Activities
        </h1>
        <div className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium">
          {budgetList?.length || 0} Categories
        </div>
      </div>

      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={budgetList}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            barCategoryGap="20%"
          >
            <defs>
              <linearGradient id="spentGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#065F46" stopOpacity={1} />
                <stop offset="100%" stopColor="#16423C" stopOpacity={0.8} />
              </linearGradient>
              <linearGradient id="budgetGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#34D399" stopOpacity={1} />
                <stop offset="100%" stopColor="#6A9C89" stopOpacity={0.8} />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="name"
              tick={{ fontSize: 12, fill: "#6B7280" }}
              axisLine={{ stroke: "#E5E7EB" }}
              tickLine={{ stroke: "#E5E7EB" }}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#6B7280" }}
              axisLine={{ stroke: "#E5E7EB" }}
              tickLine={{ stroke: "#E5E7EB" }}
              tickFormatter={(value) => `Rs. ${Number(value).toLocaleString()}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />

            <Bar
              dataKey="amount"
              fill="url(#budgetGradient)"
              radius={[0, 0, 4, 4]}
              name="Budget Amount"
            />
            <Bar
              dataKey="totalSpend"
              fill="url(#spentGradient)"
              radius={[4, 4, 0, 0]}
              name="Total Spent"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Stats */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-lg font-bold text-gray-800">
              Rs.{" "}
              {budgetList
                ?.reduce((sum, item) => sum + Number(item.amount || 0), 0)
                .toLocaleString()}
            </div>
            <div className="text-xs text-gray-500">Total Budget</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-emerald-600">
              Rs.{" "}
              {budgetList
                ?.reduce((sum, item) => sum + Number(item.totalSpend || 0), 0)
                .toLocaleString()}
            </div>
            <div className="text-xs text-gray-500">Total Spent</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">
              Rs.{" "}
              {budgetList
                ?.reduce(
                  (sum, item) =>
                    sum +
                    Math.max(
                      0,
                      Number(item.amount || 0) - Number(item.totalSpend || 0)
                    ),
                  0
                )
                .toLocaleString()}
            </div>
            <div className="text-xs text-gray-500">Remaining</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-purple-600">
              {budgetList?.length > 0
                ? Math.round(
                    (budgetList.reduce(
                      (sum, item) => sum + Number(item.totalSpend || 0),
                      0
                    ) /
                      budgetList.reduce(
                        (sum, item) => sum + Number(item.amount || 0),
                        0
                      )) *
                      100
                  )
                : 0}
              %
            </div>
            <div className="text-xs text-gray-500">Utilized</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarCharts;
