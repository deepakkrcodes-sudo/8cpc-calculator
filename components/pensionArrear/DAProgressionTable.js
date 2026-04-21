"use client";

import { TrendingUp } from "lucide-react";

export default function DAProgressionTable({ periods, daRates, updateDARate }) {
  return (
    <div className="space-y-4">

      {/* HEADER */}
      <div>
        <h3 className="font-semibold text-md text-gray-800 flex items-center gap-2">
          <TrendingUp size={16} className="text-blue-600 shrink-0" />
          <span>Expected DA Progression</span>
        </h3>

        <p className="text-xs text-gray-500">
          Adjust expected DA increases until implementation
        </p>
      </div>

      {/* TIMELINE (lightweight, no heavy card) */}
      <div className="rounded-lg p-2 sm:p-3">

        <div className="relative border-l border-gray-300 ml-3 pl-4 space-y-4">

          {daRates.map((p, i) => (
            <div key={i} className="relative flex items-center justify-between">

              {/* DOT */}
              <span className="absolute -left-[22px] w-3.5 h-3.5 bg-blue-500 rounded-full border-2 border-white"></span>

              {/* LEFT */}
              <div className="text-sm text-gray-700 font-medium ml-3">
                {p.period}
              </div>

              {/* RIGHT */}
              <div className="flex items-center">
                {i === 0 ? (
                  <div className="text-sm font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                    2%
                  </div>
                ) : (
                  <select
                    className="text-sm border border-gray-300 rounded-md px-2 py-1 bg-white focus:ring-2 focus:ring-blue-400 outline-none"
                    value={daRates[i]?.da ?? 2}
                    onChange={(e) =>
                      updateDARate(i, Number(e.target.value))
                    }
                  >
                    {[2, 3, 4, 5].map(v => (
                      <option key={v} value={v}>
                        {v}%
                      </option>
                    ))}
                  </select>
                )}
              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}