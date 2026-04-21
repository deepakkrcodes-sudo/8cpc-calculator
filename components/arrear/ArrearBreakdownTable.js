"use client";

import { useState } from "react";
import { formatINR } from "@/utils/format";
import { ChevronDown, ChevronUp, CalendarRange, IndianRupee } from "lucide-react";

function formatPeriodLabel(period) {
  const [month, year] = period.split(" ");
  const end = month === "Jan" ? `Jun ${year}` : `Dec ${year}`;
  return `${month} ${year} - ${end}`;
}

export default function ArrearBreakdownTable({ result }) {
  const [open, setOpen] = useState(false);

  if (!result) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300">
      {/* Header Toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 bg-gradient-to-r from-gray-50 to-white hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
            <CalendarRange size={20} />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-gray-800 text-lg">Detailed Breakdown</h3>
            <p className="text-xs text-gray-500 font-medium">Period-wise arrear calculation</p>
          </div>
        </div>
        <div className="text-gray-400 bg-white shadow-sm border border-gray-100 p-1.5 rounded-full">
          {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </button>

      <div className="text-[10px] text-gray-400 px-2 pb-1 sm:hidden">
        ← Scroll horizontally to view full table →
      </div>

      {/* Table Content */}
      <div
        className={`transition-all duration-300 ease-in-out ${open ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <div className="overflow-x-auto -mx-2 sm:mx-0 px-2 sm:px-5 pt-2">
          <div className="border border-gray-100 rounded-xl overflow-hidden">
            <table className="w-full text-xs sm:text-sm min-w-[600px]">
              <thead className="bg-gray-50/80 border-b border-gray-100">
                <tr>
                  <th className="py-2 px-2 sm:px-4 text-left font-semibold text-gray-600 uppercase tracking-wider text-[11px]">
                    Period
                  </th>
                  <th className="py-2 px-2 sm:px-4 text-center font-semibold text-gray-600 uppercase tracking-wider text-[11px]">
                    Duration
                  </th>
                  <th className="py-2 px-2 sm:px-4 text-right font-semibold text-gray-600 uppercase tracking-wider text-[11px]">
                    8th CPC Basic
                  </th>
                  <th className="py-2 px-2 sm:px-4 text-right font-semibold text-gray-600 uppercase tracking-wider text-[11px]">
                    Net Arrear
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {result.periods.map((p, i) => (
                  <tr
                    key={i}
                    className="hover:bg-indigo-50/30 transition-colors group"
                  >
                    <td className="py-2 px-2 sm:px-4 font-medium text-gray-700 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span>{formatPeriodLabel(p.period)}</span>
                        <div className="flex items-center gap-1.5">
                          {p.isPromotion && (
                            <div className="group/tt relative flex items-center justify-center">
                              <div className="w-2.5 h-2.5 bg-violet-500 rounded-full shadow-[0_0_6px_rgba(139,92,246,0.5)]"></div>
                              <span className="absolute bottom-full mb-1 hidden group-hover/tt:block whitespace-nowrap bg-gray-800 text-white text-[10px] px-2 py-0.5 rounded-md z-10">
                                Promotion
                              </span>
                            </div>
                          )}
                          {p.isIncrement && (
                            <div className="group/tt relative flex items-center justify-center">
                              <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-[0_0_6px_rgba(16,185,129,0.5)]"></div>
                              <span className="absolute bottom-full mb-1 hidden group-hover/tt:block whitespace-nowrap bg-gray-800 text-white text-[10px] px-2 py-0.5 rounded-md z-10">
                                Increment
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 text-center text-gray-600 font-medium">
                      {p.eligibleMonths ?? 6} <span className="text-xs text-gray-400">mo</span>
                    </td>

                    <td className="py-3 px-4 text-right text-gray-700 font-medium whitespace-nowrap">
                      ₹{formatINR(p.basic8)}
                    </td>

                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <span className="font-semibold text-emerald-600 group-hover:text-emerald-700 transition-colors">
                        ₹{formatINR(p.netArrear)}
                      </span>
                    </td>
                  </tr>
                ))}

                {/* Total Row */}
                <tr className="bg-emerald-50/50 border-t-2 border-emerald-100">
                  <td colSpan={3} className="py-3 px-2 sm:px-4 text-right font-bold text-gray-700">
                    Total Arrear Accumulation
                  </td>
                  <td className="py-3 px-2 sm:px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1">
                      <IndianRupee size={16} className="text-emerald-600" />
                      <span className="font-bold text-lg text-emerald-700">
                        {formatINR(result.totalNetArrear)}
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Sync Legend */}
          <div className="flex items-center justify-end gap-4 mt-4 px-2">
            <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
              <div className="w-2.5 h-2.5 bg-violet-500 rounded-full shadow-[0_0_6px_rgba(139,92,246,0.5)]" />
              Promotion
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
              <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-[0_0_6px_rgba(16,185,129,0.5)]" />
              Annual Increment
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
