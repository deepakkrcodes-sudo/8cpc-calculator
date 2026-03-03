"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";

const COLORS = [
  "#2563eb", // blue
  "#16a34a", // green
  "#f59e0b", // amber
  "#dc2626", // red
  "#7c3aed"  // purple
];

export default function SalaryCharts({ result }) {

  if (!result) return null;

  // ==========================
  // PIE DATA (8TH CPC)
  // ==========================

  const pieData = [

    {
      name: "Basic",
      value: result.eighth.basic
    },

    {
      name: "HRA",
      value: result.eighth.hra
    },

    {
      name: "TA",
      value: result.eighth.ta
    },

    {
      name: "DA",
      value: result.eighth.da
    }

  ];


  // ==========================
  // BAR DATA (COMPARISON)
  // ==========================

  const barData = [

    {
      name: "7th CPC",
      salary: result.seventh.net
    },

    {
      name: "8th CPC",
      salary: result.eighth.net
    }

  ];


  return (

    <div className="space-y-6">


      {/* PIE CHART */}
      <div className="bg-white p-4 rounded-xl shadow-sm">

        <div className="text-sm font-semibold mb-2">
          8th CPC Salary Structure
        </div>

        <ResponsiveContainer width="100%" height={220}>

          <PieChart>

            <Pie
              data={pieData}
              dataKey="value"
              outerRadius={80}
              label
            >

              {pieData.map((entry, index) => (

                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />

              ))}

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>


      {/* BAR CHART */}
      <div className="bg-white p-4 rounded-xl shadow-sm">

        <div className="text-sm font-semibold mb-2">
          Net Salary Comparison
        </div>

        <ResponsiveContainer width="100%" height={220}>

          <BarChart data={barData}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="salary"
              fill="#2563eb"
              radius={[6,6,0,0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

}