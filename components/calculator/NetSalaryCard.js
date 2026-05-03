"use client";

import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { formatINR } from "@/utils/format";

function useCountUp(endValue, duration = 900, trigger) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let start = 0;
    setValue(0);

    const increment = endValue / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= endValue) {
        setValue(endValue);
        clearInterval(timer);
      } else {
        setValue(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [endValue, trigger]);

  return value;
}

export default function NetSalaryGrowthPremium({ result, trigger }) {
  if (!result) return null;

  const before = Number(result.seventh.net) || 0;
  const after = Number(result.eighth.net) || 0;

  const increase = after - before;
  const percent = before > 0 ? Math.round((increase / before) * 100) : 0;

  const animatedAfter = useCountUp(after, 1000, trigger);
  const animatedBefore = useCountUp(before, 700, trigger);
  const animatedIncrease = useCountUp(increase, 1000, trigger);

  return (
    <div className="relative overflow-hidden rounded-2xl p-[1px] 
      bg-gradient-to-r from-indigo-500 to-blue-600 
      shadow-lg transition-all duration-300">

      {/* Inner */}
      <div className="bg-white/90 backdrop-blur-xl rounded-2xl 
        px-4 py-5 md:px-6 md:py-6 text-center border border-white/40">

        {/* TITLE */}
        <div className="text-xs md:text-sm text-gray-500 font-semibold tracking-wide">
          Net Salary (7th → 8th CPC)
        </div>

        {/* BEFORE */}
        <div className="mt-2 text-md md:text-xl text-black-900 font-bold">
          ₹ {formatINR(animatedBefore)}
        </div>

        {/* CENTER ICON */}
        <div className="flex justify-center my-2">
          <div className="bg-gradient-to-br from-indigo-500 to-blue-600 
            text-white p-2 rounded-full shadow-sm">
            <TrendingUp size={16} />
          </div>
        </div>

        {/* MAIN VALUE */}
        <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold 
          bg-gradient-to-r from-indigo-600 to-blue-700 
          bg-clip-text text-transparent tracking-tight">

          ₹ {formatINR(animatedAfter)}
        </div>

        {/* BADGE */}
        <div className="mt-3">
          <span className="inline-flex items-center gap-1 px-3 py-1 
            rounded-full text-xs md:text-sm font-semibold 
            bg-gradient-to-r from-indigo-500 to-blue-600 
            text-white shadow-sm">

            <TrendingUp size={12} />
            +₹ {formatINR(animatedIncrease)} ({percent}%)
          </span>
        </div>

        {/* MINI DIVIDER */}
        <div className="mt-3 h-1 w-14 mx-auto rounded-full 
          bg-gradient-to-r from-indigo-400 to-blue-500"></div>
      </div>

      {/* GLOW */}
      <div className="absolute -top-8 -right-8 w-28 h-28 
        bg-indigo-300/30 rounded-full blur-2xl"></div>
    </div>
  );
}