import { CheckCircle2, MinusCircle, AlertCircle } from "lucide-react";

export default function FixationTable({ timeline }) {
  if (!timeline) return null;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="bg-gray-50 border-b px-5 py-4 flex items-center justify-between">
        <h3 className="font-semibold text-gray-800">Month-wise Fixation Breakdown</h3>
      </div>

      <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
        <table className="min-w-full text-sm">
          {/* HEADER */}
          <thead className="bg-white sticky top-0 shadow-sm z-10 text-gray-500 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Month</th>
              <th className="px-4 py-3 text-left font-semibold">Date</th>
              <th className="px-4 py-3 text-right font-semibold text-indigo-600 bg-indigo-50/30">Promotion Option</th>
              <th className="px-4 py-3 text-right font-semibold text-emerald-600 bg-emerald-50/30">DNI Option</th>
              <th className="px-4 py-3 text-right font-semibold">Advantage</th>
              <th className="px-4 py-3 text-right font-semibold">
                Cumulative Diff
                <div className="text-[10px] normal-case text-gray-400 font-medium">
                  (+ interest)
                </div>
              </th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody className="divide-y divide-gray-100">
            {timeline.map((r, i) => {
              const diff = Math.round(r.difference);
              const isPromoBetter = diff > 0;
              const isDniBetter = diff < 0;

              // Format date cleanly
              const dateObj = new Date(r.date);
              const dateStr = dateObj.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });

              return (
                <tr key={i} className="hover:bg-gray-50/80 transition-colors">

                  {/* Month */}
                  <td className="w-[90px] px-3 md:px-4 py-3 text-xs md:text-sm font-medium text-gray-500 whitespace-nowrap">
                    Month {r.month}
                  </td>

                  {/* Date */}
                  <td className="w-[110px] px-3 md:px-4 py-3 text-xs md:text-sm text-gray-600 whitespace-nowrap">
                    {dateStr}
                  </td>

                  {/* Promotion Option */}
                  <td className="w-[22%] px-3 md:px-4 py-3 bg-indigo-50/10 text-center md:text-right">
                    <div className="font-semibold md:font-bold text-gray-900 text-sm md:text-base leading-tight">
                      ₹ {Math.round(r.grossA).toLocaleString()}
                    </div>
                    <div className="text-[9px] md:text-[10px] text-gray-500 mt-0.5">
                      Basic: {r.basicA}
                    </div>
                  </td>

                  {/* DNI Option */}
                  <td className="w-[22%] px-3 md:px-4 py-3 bg-emerald-50/10 text-center md:text-right">
                    <div className="font-semibold md:font-bold text-gray-900 text-sm md:text-base leading-tight">
                      ₹ {Math.round(r.grossB).toLocaleString()}
                    </div>
                    <div className="text-[9px] md:text-[10px] text-gray-500 mt-0.5">
                      Basic: {r.basicB}
                    </div>
                  </td>

                  {/* Monthly Diff */}
                  <td className="w-[18%] px-3 md:px-4 py-3 text-center md:text-right whitespace-nowrap">
                    {diff === 0 ? (
                      <span className="inline-flex items-center gap-1 text-[10px] md:text-xs font-medium px-2 py-1 bg-gray-100 text-gray-400 rounded-full">
                        <MinusCircle size={12} /> Equal
                      </span>
                    ) : (
                      <div className="flex flex-col items-center md:items-end gap-1">
                        <span
                          className={`inline-flex items-center gap-1 text-[10px] md:text-xs font-bold px-2.5 py-1 rounded-full ${isPromoBetter
                              ? "text-indigo-700 bg-indigo-100"
                              : "text-emerald-700 bg-emerald-100"
                            }`}
                        >
                          <CheckCircle2 size={12} /> {isPromoBetter ? "Promo" : "DNI"}
                        </span>

                        <span className="text-[10px] md:text-[11px] font-semibold text-gray-600">
                          +₹ {Math.abs(diff).toLocaleString()}
                        </span>
                      </div>
                    )}
                  </td>

                  {/* Cumulative Diff */}
                  <td
                    className={`w-[18%] px-3 md:px-4 py-3 text-center md:text-right font-bold whitespace-nowrap text-sm md:text-base ${r.interestAdjusted > 0
                        ? "text-indigo-600"
                        : r.interestAdjusted < 0
                          ? "text-emerald-600"
                          : "text-gray-400"
                      }`}
                  >
                    {r.interestAdjusted > 0
                      ? "+"
                      : r.interestAdjusted < 0
                        ? "-"
                        : ""}
                    ₹ {Math.abs(Math.round(r.interestAdjusted)).toLocaleString()}
                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}