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
        <div className="space-y-3">

            {/* TITLE */}
            <div>
                <label className="text-md font-semibold flex items-center gap-2 text-gray-800">
                    <BarChart3 size={18} className="text-indigo-500" />
                    Fitment Factor
                </label>

                <p className="text-xs text-gray-500">
                    Expected range: <span className="font-medium">1.92 – 2.86</span> • You can explore wider scenarios
                </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white shadow-sm px-3 py-3">
                {/* SLIDER + INPUT */}
                <div className="flex items-center gap-3 mt-2">

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
                        className="w-20 border border-gray-300 rounded-md px-2 py-1 text-center text-sm focus:ring-2 focus:ring-indigo-400 outline-none"
                    />

                </div>


                {/* PRESET BUTTON GRID */}
                <div className="grid grid-cols-4 gap-2 mt-3">

                    {presets.map((p) => {
                        const isActive = Number(fitmentFactor).toFixed(2) === p.value.toFixed(2);

                        return (
                            <button
                                key={p.value}
                                onClick={() => setFitmentFactor(p.value)}
                                title={p.label} // 👈 tooltip (clean UX)
                                className={`
                w-full py-2 rounded-lg text-sm font-medium transition-all duration-200
                border
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


                {/* LEGENDS (ALL, CLEAN, RESPONSIVE) */}
                <div className="flex flex-wrap gap-2 pt-1 mt-2">

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


            {/* MICRO INSIGHT */}
            <div className="text-[11px] text-gray-400">
                💡 Higher fitment factor = higher salary & pension projection
            </div>

        </div>
    );
}