"use client";

import { BarChart3 } from "lucide-react";

export default function FitmentFactorControl({
  fitmentFactor,
  setFitmentFactor
}) {

  const presets = [
    { value: 1.92, label: "Lower", color: "bg-gray-100 text-gray-700" },
    { value: 2.00, label: "Conservative", color: "bg-red-100 text-red-700" },
    { value: 2.15, label: "Discussed", color: "bg-orange-100 text-orange-700" },
    { value: 2.28, label: "Expected", color: "bg-indigo-100 text-indigo-700" },
    { value: 2.40, label: "Mid", color: "bg-blue-100 text-blue-700" },
    { value: 2.57, label: "7th CPC Ref", color: "bg-yellow-100 text-yellow-700" },
    { value: 2.70, label: "Optimistic", color: "bg-green-100 text-green-700" },
    { value: 2.86, label: "Upper", color: "bg-emerald-100 text-emerald-700" }
  ];

  return (
    <div className="space-y-2 sm:space-y-3">

      {/* TITLE */}
      <div>
        <label className="text-sm sm:text-md font-semibold flex items-center gap-2 text-gray-800">
          <BarChart3 size={16} className="text-indigo-500" />
          Fitment Factor
        </label>

        <p className="text-[11px] sm:text-xs text-gray-500">
          Expected range: <span className="font-medium">1.92 – 2.86</span>
        </p>
      </div>
       <div className="h-[2px] w-full bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 rounded-full"></div>



      {/* SLIDER + INPUT */}
      <div className="flex items-center gap-2 sm:gap-3">

        <input
          type="range"
          min="1.5"
          max="3.5"
          step="0.01"
          value={fitmentFactor}
          onChange={(e) => setFitmentFactor(Number(e.target.value))}
          className="w-full accent-indigo-500"
        />

        <input
          type="number"
          step="0.01"
          value={fitmentFactor}
          onChange={(e) => setFitmentFactor(Number(e.target.value))}
          className="w-16 sm:w-20 border border-gray-300 rounded-md px-1.5 sm:px-2 py-1 text-center text-xs sm:text-sm focus:ring-2 focus:ring-indigo-400 outline-none"
        />

      </div>


      {/* PRESET BUTTON GRID */}
      <div className="grid grid-cols-4 gap-1 sm:gap-2">

        {presets.map((p) => {
          const isActive = Number(fitmentFactor).toFixed(2) === p.value.toFixed(2);

          return (
            <button
              key={p.value}
              onClick={() => setFitmentFactor(p.value)}
              title={p.label}
              className={`
                w-full py-1.5 sm:py-2 rounded-md sm:rounded-lg
                text-[11px] sm:text-sm font-medium
                border transition-all duration-200
                ${isActive
                  ? "bg-indigo-600 text-white shadow-sm scale-[1.02]"
                  : `${p.color} border-gray-200`}
              `}
            >
              {p.value.toFixed(2)}
            </button>
          );
        })}

      </div>


      {/* LEGENDS */}
      <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">

        {presets.map((p) => (
          <div
            key={p.value}
            className={`flex items-center gap-1 px-1.5 sm:px-2 py-[2px] sm:py-1 rounded-full text-[10px] sm:text-[11px] ${p.color}`}
          >
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-current"></span>
            {p.label}
          </div>
        ))}

      </div>


      {/* MICRO INSIGHT */}
      <div className="w-full">
        <div className="text-left text-[10px] sm:text-[11px] text-gray-400">
          💡 Higher fitment factor = higher salary & pension projection
        </div>
      </div>
    </div>
  );
}