"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from "recharts";

export default function SalaryCharts({ result }) {

  if (!result) return null;

  const net7 = result.seventh.net;
  const net8 = result.eighth.net;

  const gross7 = result.seventh.gross;
  const gross8 = result.eighth.gross;

  const percentIncrease =
    net7 > 0
      ? Math.round(((net8 - net7) / net7) * 100)
      : 0;

  const comparisonData = [
    {
      name: "Net Salary",
      "7th CPC": net7,
      "8th CPC": net8
    },
    {
      name: "Gross Salary",
      "7th CPC": gross7,
      "8th CPC": gross8
    }
  ];

  return (

    <div className="space-y-5">

      {/* ===================== */}
      {/* 🔥 HERO SUMMARY */}
      {/* ===================== */}
      <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-4">

        <div className="text-xs text-indigo-600 font-semibold mb-2">
          7th CPC → 8th CPC
        </div>

        <div className="flex items-center justify-between">

          {/* OLD */}
          <div>
            <div className="text-xs text-gray-500">7th CPC</div>
            <div className="text-lg font-semibold text-gray-800">
              ₹ {net7.toLocaleString("en-IN")}
            </div>
          </div>

          {/* ARROW */}
          <div className="text-indigo-500 text-lg font-bold">
            →
          </div>

          {/* NEW */}
          <div className="text-right">
            <div className="text-xs text-gray-500">8th CPC</div>
            <div className="text-lg font-semibold text-indigo-700">
              ₹ {net8.toLocaleString("en-IN")}
            </div>
          </div>

        </div>

        {/* INCREASE */}
        <div className="mt-2 text-sm text-indigo-700 font-medium">
          +₹ {(net8 - net7).toLocaleString("en-IN")} / month
          <span className="ml-2 text-xs font-semibold">
            (+{percentIncrease}%)
          </span>
        </div>

      </div>


      {/* ===================== */}
      {/* CHART */}
      {/* ===================== */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">

        <div className="text-sm font-semibold text-gray-700 mb-3">
          Salary Comparison
        </div>

        <ResponsiveContainer width="100%" height={260}>

          <BarChart data={comparisonData}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Bar
              dataKey="7th CPC"
              fill="#94a3b8"
              radius={[6, 6, 0, 0]}
            />

            <Bar
              dataKey="8th CPC"
              fill="#4f46e5" // indigo (match UI)
              radius={[6, 6, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>

  );
}