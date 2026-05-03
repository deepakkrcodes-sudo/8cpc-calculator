"use client";

import { BarChart3 } from "lucide-react";


export default function FitmentFactorControl({
    fitmentFactor,
    setFitmentFactor
}) {

    const presets = [
        { value: 1.92, label: "Minimum", color: "bg-gray-200 text-gray-800" },

        { value: 2.00, label: "Very Conservative", color: "bg-gray-100 text-gray-700" },

        { value: 2.15, label: "Conservative", color: "bg-blue-100 text-blue-700" },

        { value: 2.28, label: "Expected", color: "bg-orange-100 text-orange-700" },

        { value: 2.40, label: "Moderately Optimistic", color: "bg-indigo-100 text-indigo-700" },

        { value: 2.57, label: "7th CPC Benchmark", color: "bg-yellow-100 text-yellow-700" },

        { value: 2.70, label: "Optimistic", color: "bg-green-100 text-green-700" },

        { value: 3.83, label: "Union Demand", color: "bg-purple-100 text-purple-700" }
    ];

    return (
        <div className="space-y-2 md:space-y-3">

            <div className="rounded-xl 
    px-1 py-1 md:px-2 md:py-2">

                {/* TITLE */}
                <div>
                    <label className="text-sm md:text-md font-semibold flex items-center gap-2 text-gray-800">
                        <BarChart3 size={16} className="text-indigo-500 md:size-[18px]" />
                        <span className="truncate">Fitment Factor</span>
                    </label>

                    {/* ❌ Hidden on mobile */}
                    <p className="hidden md:block text-xs text-gray-500">
                        Expected range: <span className="font-medium">1.92 – 3.83</span> • You can explore wider scenarios
                    </p>
                </div>

                {/* SLIDER + INPUT */}
                <div className="flex items-center gap-2 md:gap-3 mt-2">

                    <input
                        type="range"
                        min="1.5"
                        max="4"
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
                        className="w-16 md:w-20 border border-gray-300 rounded-md 
          px-2 py-1 text-center text-xs md:text-sm 
          focus:ring-2 focus:ring-indigo-400 outline-none"
                    />

                </div>

                {/* PRESETS */}
                <div className="grid grid-cols-4 gap-1.5 md:gap-2 mt-2 md:mt-3">

                    {presets.map((p) => {
                        const isActive = Number(fitmentFactor).toFixed(2) === p.value.toFixed(2);

                        return (
                            <button
                                key={p.value}
                                onClick={() => setFitmentFactor(p.value)}
                                title={p.label}
                                className={`
              w-full py-1.5 md:py-2 rounded-lg 
              text-xs md:text-sm font-medium 
              transition-all duration-200 border
              ${isActive
                                        ? "bg-indigo-600 text-white shadow-md scale-[1.03]"
                                        : `${p.color} border-gray-200 hover:shadow-sm`}
            `}
                            >
                                {p.value.toFixed(2)}
                            </button>
                        );
                    })}

                </div>

                {/* ❌ LEGENDS HIDDEN ON MOBILE */}
                <div className="hidden md:flex flex-wrap gap-2 pt-1 mt-2">
                    {presets.map((p) => (
                        <div
                            key={p.value}
                            className={`flex items-center gap-1 px-2 py-1 rounded-full text-[11px] ${p.color}`}
                        >
                            <span className="w-2 h-2 rounded-full bg-current"></span>
                            {p.label}
                        </div>
                    ))}
                </div>

            </div>

            {/* MICRO INSIGHT (lighter on mobile) */}
            <div className="text-[10px] md:text-[11px] text-gray-400 px-1">
                💡 Higher fitment factor = higher salary
            </div>

        </div>
    );
}