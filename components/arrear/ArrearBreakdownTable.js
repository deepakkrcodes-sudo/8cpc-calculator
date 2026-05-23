"use client";

import { useState } from "react";
import { formatINR } from "@/utils/format";
import { ChevronDown, ChevronUp, CalendarRange, IndianRupee } from "lucide-react";

function formatPeriodLabel(period) {
  const [month, year] = period.split(" ");
  const end = month === "Jan" ? `Jun ${year}` : `Dec ${year}`;
  return `${month} ${year} - ${end}`;
}

function getDisplayPeriodLabel(period) {
  return period.label && period.label !== period.period
    ? period.label
    : formatPeriodLabel(period.period);
}

function expandToMonthly(periods) {
  const monthly = [];
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  periods.forEach((p) => {
    const salary = calculateMonthlySalary(p);
    const monthlyDiff = salary.net8 - salary.net7;
    const start = parseDisplayDate(p.startDate);
    const end = parseDisplayDate(p.endDate);

    iterateMonthlySegments(start, end).forEach((segment, index) => {
      const segmentMonths = Number((segment.days / segment.daysInMonth).toFixed(4));
      const label = segment.isFullMonth
        ? `${monthNames[segment.start.getUTCMonth()]} ${segment.start.getUTCFullYear()}`
        : `${monthNames[segment.start.getUTCMonth()]} ${segment.start.getUTCFullYear()} (${segment.start.getUTCDate()}-${segment.end.getUTCDate()})`;

      monthly.push({
        period: label,
        net7: Number(salary.net7.toFixed(2)),
        net8: Number(salary.net8.toFixed(2)),
        diff: Number(monthlyDiff.toFixed(2)),
        netArrear: Number((monthlyDiff * segmentMonths).toFixed(2)),
        isPromotion: index === 0 ? p.isPromotion : false,
        isIncrement: index === 0 ? p.isIncrement : false,
      });
    });
  });

  return monthly;
}

function parseDisplayDate(value) {
  return new Date(`${value} UTC`);
}

function iterateMonthlySegments(start, end) {
  const segments = [];
  let cursor = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
  const inclusiveEnd = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate()));

  while (cursor <= inclusiveEnd) {
    const nextMonthStart = new Date(Date.UTC(cursor.getUTCFullYear(), cursor.getUTCMonth() + 1, 1));
    const segmentEndExclusive = nextMonthStart <= inclusiveEnd
      ? nextMonthStart
      : new Date(inclusiveEnd.getTime() + 86400000);
    const segmentEnd = new Date(segmentEndExclusive.getTime() - 86400000);
    const monthStart = new Date(Date.UTC(cursor.getUTCFullYear(), cursor.getUTCMonth(), 1));
    const monthEnd = new Date(Date.UTC(cursor.getUTCFullYear(), cursor.getUTCMonth() + 1, 0));

    segments.push({
      start: new Date(cursor),
      end: segmentEnd,
      days: Math.max(Math.round((segmentEndExclusive.getTime() - cursor.getTime()) / 86400000), 0),
      daysInMonth: monthEnd.getUTCDate(),
      isFullMonth:
        cursor.getTime() === monthStart.getTime() &&
        segmentEnd.getTime() === monthEnd.getTime()
    });

    cursor = segmentEndExclusive;
  }

  return segments;
}

function calculateMonthlySalary(period) {
  const basic7 = Number(period.basic7 || 0);
  const basic8 = Number(period.basic8 || 0);
  const da7 = Math.round(basic7 * Number(period.da7Percent || 0) / 100);
  const da8 = Math.round(basic8 * Number(period.da8Percent || 0) / 100);
  const pension7 = Math.round((basic7 + da7) * 0.1);
  const pension8 = Math.round((basic8 + da8) * 0.1);
  const net7 = basic7 + da7 - pension7;
  const net8 = basic8 + da8 - pension8;

  return {
    net7,
    net8
  };
}

function getCalendarProratedMonths(startDate, endDate) {
  let cursor = parseDisplayDate(startDate);
  const inclusiveEnd = parseDisplayDate(endDate);
  let months = 0;

  while (cursor <= inclusiveEnd) {
    const nextMonthStart = new Date(Date.UTC(
      cursor.getUTCFullYear(),
      cursor.getUTCMonth() + 1,
      1
    ));
    const endExclusive = nextMonthStart <= inclusiveEnd
      ? nextMonthStart
      : new Date(inclusiveEnd.getTime() + 86400000);
    const days = Math.max(
      Math.round((endExclusive.getTime() - cursor.getTime()) / 86400000),
      0
    );
    const daysInMonth = new Date(Date.UTC(
      cursor.getUTCFullYear(),
      cursor.getUTCMonth() + 1,
      0
    )).getUTCDate();

    months += days / daysInMonth;
    cursor = endExclusive;
  }

  return months;
}

function calculatePeriodArrear(period) {
  const salary = calculateMonthlySalary(period);

  return (salary.net8 - salary.net7) * getCalendarProratedMonths(
    period.startDate,
    period.endDate
  );
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
      : displayPeriods.reduce(
        (sum, p) => sum + calculatePeriodArrear(p),
        0
      );

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
                    {viewMode === "HALF_YEARLY" ? "Arrear (Period)" : "Arrear"}
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {displayPeriods.map((p, i) => {
                  const salary = viewMode === "HALF_YEARLY"
                    ? calculateMonthlySalary(p)
                    : p;
                  const net7 = Number(salary.net7 || 0);
                  const net8 = Number(salary.net8 || 0);
                  const diff = Number(salary.diff ?? (net8 - net7));

                  const arrear = Number(
                    (
                      viewMode === "MONTHLY"
                        ? (p.netArrear ?? diff)
                        : calculatePeriodArrear(p)
                    ).toFixed(2)
                  );
                  return (
                    <tr key={i} className="hover:bg-indigo-50/30">
                      <td
                        title={viewMode === "MONTHLY" ? p.period : getDisplayPeriodLabel(p)}
                        className={`px-1 sm:px-3 py-1.5 sm:py-2 whitespace-nowrap text-[11px] sm:text-sm truncate ${viewMode === "HALF_YEARLY"
                          ? "max-w-[95px] sm:max-w-none"
                          : "max-w-[45px] sm:max-w-none"
                          }`}
                      >
                        <div className="flex items-center gap-2">
                          <span>
                            {viewMode === "MONTHLY"
                              ? p.period
                              : getDisplayPeriodLabel(p)}
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
