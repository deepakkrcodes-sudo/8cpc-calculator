"use client";

import { TrendingUp } from "lucide-react";

function IncreaseCard({
  title,
  before,
  after,
  color = "blue"
}) {

  const valBefore = Number(before) || 0;
  const valAfter = Number(after) || 0;

  const increase = valAfter - valBefore;

  const percent =
    valBefore > 0
      ? Math.round((increase / valBefore) * 100)
      : 0;

  const progressWidth = Math.min(percent, 100);

  // 🎨 PREMIUM THEMES
  const theme =
    color === "green"
      ? {
          gradient: "from-green-500 to-emerald-600",
          soft: "bg-green-50",
          text: "text-green-700",
          glow: "shadow-green-200"
        }
      : {
          gradient: "from-indigo-500 to-blue-600",
          soft: "bg-indigo-50",
          text: "text-indigo-700",
          glow: "shadow-indigo-200"
        };

  return (

    <div className={`rounded-2xl p-5 border border-gray-200 ${theme.soft} shadow-sm`}>

      {/* TITLE */}
      <div className="text-center text-md text-gray-600 font-medium">
        {title}
      </div>

      {/* 🔥 MAIN FLOW (LOW → HIGH) */}
      <div className="mt-3 flex flex-col items-center">

        {/* BEFORE */}
        <div className="text-black-500 font-bold text-md">
          ₹ {valBefore.toLocaleString("en-IN")}
        </div>

        {/* ARROW + ICON */}
        <div className={`my-1 flex items-center gap-1 ${theme.text}`}>
          <TrendingUp size={18}/>
          <span className="text-xs font-semibold">Increase</span>
        </div>

        {/* AFTER (FOCUS) */}
        <div className={`text-2xl font-bold ${theme.text}`}>
          ₹ {valAfter.toLocaleString("en-IN")}
        </div>

      </div>

      {/* 🔥 GAIN HIGHLIGHT */}
      <div className="mt-3 text-center">

        <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold 
          bg-gradient-to-r ${theme.gradient} text-white shadow-md`}>

          +₹ {increase.toLocaleString("en-IN")}  ({percent}%)

        </span>

      </div>

      {/* 🔥 PROGRESS (SMOOTH + PREMIUM) */}
      <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">

        <div
          className={`h-2 rounded-full bg-gradient-to-r ${theme.gradient} transition-all duration-700`}
          style={{ width: `${progressWidth}%` }}
        />

      </div>

    </div>
  );
}

export default function SalaryIncreaseCard({ result }) {

  if (!result) return null;

  return (

    <div className="grid md:grid-cols-2 gap-4">

      <IncreaseCard
        title="Gross Salary Growth"
        before={result.seventh.gross}
        after={result.eighth.gross}
        color="blue"
      />

      <IncreaseCard
        title="Net Salary Growth"
        before={result.seventh.net}
        after={result.eighth.net}
        color="green"
      />

    </div>

  );
}