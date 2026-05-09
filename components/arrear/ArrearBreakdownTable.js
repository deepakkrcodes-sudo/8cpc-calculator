"use client";

import { useState } from "react";
import { formatINR } from "@/utils/format";
import { ChevronDown, ChevronUp, CalendarRange, IndianRupee } from "lucide-react";

function formatPeriodLabel(period) {
  const [month, year] = period.split(" ");
  const end = month === "Jan" ? `Jun ${year}` : `Dec ${year}`;
  return `${month} ${year} - ${end}`;
}

function expandToMonthly(periods) {
  const monthly = [];

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  periods.forEach((p, idx) => {
    const totalMonths = 6;

    const gross7 =
      (p.basic7Total ?? p.basic7 ?? 0) +
      (p.da7 ?? 0);

    const gross8 =
      (p.basic8Total ?? p.basic8 ?? 0) +
      (p.da8 ?? 0);

    const deduction7 = p.pension7 ?? p.nps7 ?? 0;
    const deduction8 = p.pension8 ?? p.nps8 ?? 0;

    const net7 = gross7 - deduction7;
    const net8 = gross8 - deduction8;

    const diff = net8 - net7;

    const mNet7 = net7 / totalMonths;
    const mNet8 = net8 / totalMonths;
    const mDiff = diff / totalMonths;

    let startIndex;

    const year = Number(p.period.split(" ")[1]);

    if (idx % 2 === 0) {
      // Jan block
      startIndex = 0;
    } else {
      // Jul block
      startIndex = 6;
    }

    for (let i = 0; i < totalMonths; i++) {
      const mIdx = (startIndex + i) % 12;
      const y = year + Math.floor((startIndex + i) / 12);

      monthly.push({
        period: `${monthNames[mIdx]} ${y}`,
        net7: Number(mNet7.toFixed(2)),
        net8: Number(mNet8.toFixed(2)),
        diff: Number(mDiff.toFixed(2)),
        netArrear: Number(mDiff.toFixed(2)),
        isPromotion: i === 0 ? p.isPromotion : false,
        isIncrement: i === 0 ? p.isIncrement : false,
      });
    }
  });

  return monthly;
}

export default function ArrearBreakdownTable({ result }) {
  const [open, setOpen] = useState(true);
  const [viewMode, setViewMode] = useState("HALF_YEARLY");

  if (!result) return null;

  const displayPeriods =
    viewMode === "MONTHLY"
      ? expandToMonthly(result.periods)
      : result.periods;

  const totalArrear =
    viewMode === "MONTHLY"
      ? displayPeriods.reduce((sum, p) => sum + p.netArrear, 0)
      : result.totalNetArrear;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">

      {/* HEADER */}
      <div className="flex items-center justify-between p-3 sm:p-5 bg-gradient-to-r from-gray-50 to-white">

        {/* LEFT */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
            <CalendarRange size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 text-sm sm:text-lg">Detailed Breakdown</h3>
            <p className="text-[10px] sm:text-xs text-gray-500">Period-wise arrear calculation</p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">

          {/* ✅ PREMIUM TOGGLE */}
          <div className="flex items-center bg-gray-100/60 backdrop-blur-sm rounded-full p-[1px] shadow-inner">

            {[
              { value: "HALF_YEARLY" },
              { value: "MONTHLY" }
            ].map((item) => (
              <button
                key={item.value}
                onClick={() => setViewMode(item.value)}
                className={`px-2 py-[1px] text-[10px] leading-none rounded-full transition-all duration-200 ${viewMode === item.value
                  ? "bg-white text-indigo-600 shadow-sm font-medium"
                  : "text-gray-500"
                  }`}
              >
                <span>
                  <span className="sm:hidden">
                    {item.value === "HALF_YEARLY" ? "HY" : "M"}
                  </span>
                  <span className="hidden sm:inline">
                    {item.value === "HALF_YEARLY" ? "Half-Yearly" : "Monthly"}
                  </span>
                </span>
              </button>
            ))}

          </div>

          {/* COLLAPSE BUTTON */}

        </div>


      </div>

      <div className="mt-1 flex items-start gap-1.5 text-[10px] leading-relaxed bg-gray-20 text-amber-700/90 sm:text-[12px]">

        <span className="mt-[3px] h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />

        <span>
          Arrear estimation considers Basic Pay and DA only; fixed deductions and regular tax are assumed unchanged during accrual.
        </span>

      </div>

      {/* MOBILE HINT */}
      <div className="text-[10px] text-gray-400 px-3 pb-1 sm:hidden text-center">
        ← Swipe to view →
      </div>

      {/* TABLE */}
      <div className={`${open ? "max-h-none opacity-100" : "max-h-0 opacity-0"} transition-all duration-300`}>
        <div className="overflow-x-auto w-full pt-1">
          <div className="border border-gray-100 rounded-xl overflow-x-auto">

            <table className="w-full text-[10px] sm:text-sm min-w-[500px] sm:min-w-[700px] tabular-nums">

              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-1 sm:px-3 py-1.5 sm:py-2 text-left text-gray-600 text-[11px] whitespace-nowrap">
                    {viewMode === "MONTHLY" ? "Month" : "Period"}
                  </th>
                  <th className="px-1 sm:px-3 py-1.5 sm:py-2 text-right text-gray-600 text-[11px] whitespace-nowrap">7th CPC Net</th>
                  <th className="px-1 sm:px-3 py-1.5 sm:py-2 text-right text-gray-600 text-[11px] whitespace-nowrap">8th CPC Net</th>
                  <th className="px-1 sm:px-3 py-1.5 sm:py-2 text-right text-gray-600 text-[11px] whitespace-nowrap">Difference</th>
                  <th className="px-1 sm:px-3 py-1.5 sm:py-2 text-right text-gray-600 text-[11px] whitespace-nowrap">
                    {viewMode === "HALF_YEARLY" ? "Arrear (6 months)" : "Arrear"}
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {displayPeriods.map((p, i) => {
                  const gross7 =
                    (p.basic7Total ?? p.basic7 ?? 0) +
                    (p.da7 ?? 0);

                  const gross8 =
                    (p.basic8Total ?? p.basic8 ?? 0) +
                    (p.da8 ?? 0);

                  const deduction7 = p.pension7 ?? p.nps7 ?? 0;
                  const deduction8 = p.pension8 ?? p.nps8 ?? 0;

                  let net7 = gross7 - deduction7;
                  let net8 = gross8 - deduction8;

                  let diff = net8 - net7;

                  if (viewMode === "HALF_YEARLY") {
                    const months = 6;

                    // 👉 convert to monthly for display
                    net7 = Number((net7 / months).toFixed(2));
                    net8 = Number((net8 / months).toFixed(2));
                    diff = Number((diff / months).toFixed(2));
                  }

                  const arrear = Number(
                    (
                      viewMode === "MONTHLY"
                        ? (p.netArrear ?? diff)
                        : (p.netArrear ?? diff * 6)
                    ).toFixed(2)
                  );
                  return (
                    <tr key={i} className="hover:bg-indigo-50/30">
                      <td
                        title={viewMode === "MONTHLY" ? p.period : formatPeriodLabel(p.period)}
                        className={`px-1 sm:px-3 py-1.5 sm:py-2 whitespace-nowrap text-[11px] sm:text-sm truncate ${viewMode === "HALF_YEARLY"
                          ? "max-w-[95px] sm:max-w-none"
                          : "max-w-[45px] sm:max-w-none"
                          }`}
                      >
                        <div className="flex items-center gap-2">
                          <span>
                            {viewMode === "MONTHLY"
                              ? p.period
                              : formatPeriodLabel(p.period)}
                          </span>

                          <div className="flex gap-1">
                            {p.isPromotion && <div className="w-2.5 h-2.5 bg-violet-500 rounded-full" />}
                            {p.isIncrement && <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />}
                          </div>
                        </div>
                      </td>

                      <td className="px-1 sm:px-3 py-1.5 sm:py-2 text-right text-[11px] sm:text-sm">₹{formatINR(net7)}</td>
                      <td className="px-1 sm:px-3 py-1.5 sm:py-2 text-right text-[11px] sm:text-sm">₹{formatINR(net8)}</td>
                      <td className="px-1 sm:px-3 py-1.5 sm:py-2 text-right text-[11px] sm:text-sm text-indigo-600 font-medium">
                        ₹{formatINR(diff)}
                      </td>
                      <td className="px-1 sm:px-3 py-1.5 sm:py-2 text-right text-[11px] sm:text-sm font-semibold text-emerald-600">
                        ₹{formatINR(arrear)}
                      </td>
                    </tr>
                  );
                })}

                {/* TOTAL */}
                <tr className="bg-emerald-50 border-t-2 border-emerald-200">
                  <td colSpan={4} className="px-1 py-3 text-right font-semibold text-gray-700">
                    Total Arrear
                  </td>
                  <td className="px-1 py-3 text-right">
                    <span className="font-bold text-lg text-emerald-700">
                      ₹{formatINR(totalArrear)}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* LEGEND */}
          <div className="flex justify-end gap-4 mt-4 px-2">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <div className="w-2.5 h-2.5 bg-violet-500 rounded-full" />
              Promotion
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />
              Increment
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
