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

  // ==========================
  // COMPARISON DATA
  // ==========================
  const comparisonData = [
    {
      name: "Net Salary",
      "7th CPC": result.seventh.net,
      "8th CPC": result.eighth.net
    },
    {
      name: "Gross Salary",
      "7th CPC": result.seventh.gross,
      "8th CPC": result.eighth.gross
    }
  ];

  // ==========================
  // PERCENT INCREASE DATA
  // ==========================
  const percentData = [
    {
      name: "Net",
      increase:
        result.seventh.net > 0
          ? Math.round(
              ((result.eighth.net - result.seventh.net) /
                result.seventh.net) *
                100
            )
          : 0
    },
    {
      name: "Gross",
      increase:
        result.seventh.gross > 0
          ? Math.round(
              ((result.eighth.gross - result.seventh.gross) /
                result.seventh.gross) *
                100
            )
          : 0
    }
  ];

  return (

    <div className="space-y-6">

      {/* ===================== */}
      {/* COMPARISON CHART */}
      {/* ===================== */}
      <div className="bg-white rounded-xl shadow-sm p-5">

        <div className="flex items-center gap-2 mb-3">
          <span>📊</span>
          <div className="text-sm font-semibold">
            7th vs 8th CPC Comparison
          </div>
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
              fill="#94a3b8"   // gray
              radius={[6, 6, 0, 0]}
            />

            <Bar
              dataKey="8th CPC"
              fill="#2563eb"   // blue
              radius={[6, 6, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>


      {/* ===================== */}
      {/* PERCENT INCREASE */}
      {/* ===================== */}
      

    </div>

  );

}