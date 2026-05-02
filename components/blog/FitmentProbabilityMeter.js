"use client";
import React, { useState, useEffect } from 'react';
import { HelpCircle } from 'lucide-react';

export default function FitmentProbabilityMeter() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const markers = [
    {
      value: 1.92,
      label: "1.92",
      sub: "Minimum",
      scenario:
        "Lower bound scenario. Primarily inflation neutralisation with minimal real wage correction. Reflects a fiscally cautious approach."
    },
    {
      value: 2.00,
      label: "2.00",
      sub: "Very Conservative",
      scenario:
        "Slight improvement over minimum. Includes limited structural adjustment but remains strongly aligned with fiscal discipline."
    },
    {
      value: 2.15,
      label: "2.15",
      sub: "Conservative",
      scenario:
        "Balanced scenario. Combines inflation neutralisation with modest real wage growth. This reflects a practical midpoint approach."
    },
    {
      value: 2.28,
      label: "2.28",
      sub: "Expected",
      scenario:
        "Upper realistic range. Represents the highest level likely within fiscal comfort, allowing meaningful real wage increase."
    },
    {
      value: 2.40,
      label: "2.40",
      sub: "Moderately Optimistic",
      scenario:
        "Stretch scenario. Possible if economic conditions remain strong, but requires higher fiscal commitment."
    },
    {
      value: 2.57,
      label: "2.57",
      sub: "7th CPC Benchmark",
      scenario:
        "Historical reference. Replicating this level would be fiscally challenging due to lower inflation and higher pension burden."
    },
    {
      value: 2.70,
      label: "2.70",
      sub: "Optimistic",
      scenario:
        "High-growth scenario. Requires strong economic expansion and political willingness for higher expenditure."
    },
    {
      value: 3.83,
      label: "3.83",
      sub: "Union Demand",
      scenario:
        "Extremely aggressive scenario. Represents maximum demand but is unlikely due to massive fiscal implications."
    }
  ];

  const visibleMarkers = [
    { value: 1.92, label: "1.92", sub: "Minimum" },
    { value: 2.15, label: "2.15", sub: "Conservative" },
    { value: 2.28, label: "2.28", sub: "Probable", highlight: true },
    { value: 2.57, label: "2.57", sub: "7th CPC" },
    { value: 3.83, label: "3.83", sub: "Union Demand" }
  ];

  const min = 1.80;
  const max = 4.00;

  const getPercent = (val) => ((val - min) / (max - min)) * 100;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 shadow-sm mb-8">
      <div className="flex justify-between items-start mb-12">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            Fitment Factor Probability Meter
          </h3>
          <p className="text-sm text-gray-500 mt-1">Prediction based on macroeconomic trends & fiscal realities.</p>
        </div>
        <div className="group relative cursor-help hidden sm:block">
          <HelpCircle className="w-5 h-5 text-gray-400 hover:text-indigo-500 transition-colors" />
          <div className="absolute right-0 w-64 bg-gray-900 text-white text-xs rounded p-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30 -top-2 translate-y-[-100%] shadow-lg">
            Based on inflation trends, fiscal constraints and past CPC data, this range balances affordability with real wage growth.
            <div className="absolute -bottom-1 right-2 w-2 h-2 bg-gray-900 rotate-45"></div>
          </div>
        </div>
      </div>

      {/* Meter Container */}
      <div className="relative pt-8 pb-16 px-4 sm:px-8">
        {/* Track container */}
        <div className="relative w-full h-3">

          {/* Most Probable Range Highlight Glow */}
          <div
            className="absolute h-14 bg-emerald-100/40 border border-emerald-200/60 rounded-lg top-1/2 -translate-y-1/2 -z-10 transition-all duration-700"
            style={{
              left: `${getPercent(1.92)}%`,
              width: `${getPercent(2.28) - getPercent(1.92)}%`,
              boxShadow: '0 0 15px rgba(52, 211, 153, 0.3)'
            }}
          >
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-200 shadow-sm">
              Most Probable Range
            </div>
          </div>

          {/* Gradient Bar */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'linear-gradient(to right, #c7d2fe 0%, #a5b4fc 15%, #5eead4 35%, #34d399 50%, #6366f1 70%, #7c3aed 100%)'
            }}
          />

          {/* Markers */}
          {visibleMarkers.map((m, i) => {
            const isTop = i % 2 === 0;

            return (
              <div
                key={i}
                className="absolute group"
                style={{ left: `${getPercent(m.value)}%` }}
              >
                {/* DOT */}
                <div
                  className={`
          absolute -translate-x-1/2
          ${isTop ? "-top-0" : "top-0"}
        `}
                >
                  <div
                    className={`
            rounded-full border-2 shadow-sm transition-all
            ${m.highlight
                        ? "w-5 h-5 bg-indigo-600 border-indigo-700 scale-110"
                        : "w-3.5 h-3.5 bg-white border-gray-400"}
          `}
                  />
                </div>

                {/* LABEL */}
                <div
                  className={`
          absolute left-1/2 -translate-x-1/2 text-center
          ${isTop ? "-top-10" : "top-6"}
        `}
                >
                  <div className="text-xs font-bold text-gray-800 whitespace-nowrap">
                    {m.label}
                  </div>

                  <div
                    className={`
            text-[10px] whitespace-nowrap mt-0.5
            ${m.highlight ? "text-indigo-600 font-semibold" : "text-gray-500"}
          `}
                  >
                    {m.sub}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Current Estimate Pointer */}
          <div
            className="absolute top-0"
            style={{ left: `${getPercent(2.28)}%` }}
          >
            <div className="relative -translate-x-1/2 -top-16 flex flex-col items-center">
              <div className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded shadow-lg">
                Most Likely (~2.28)
              </div>
              <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-indigo-600"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Supporting Text */}
      <div className="mt-4 sm:mt-8 grid sm:grid-cols-3 gap-3 sm:gap-4 border-t border-gray-100 pt-5">
        <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100">
          <h4 className="text-xs font-semibold text-gray-700 flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-gray-400"></span>
            Why &lt;1.9 is Unlikely
          </h4>
          <p className="text-[11px] text-gray-600 leading-relaxed">
            Purely inflation neutralisation. Politically difficult as it offers almost zero real wage growth for employees over a 10-year period.
          </p>
        </div>

        <div className="bg-emerald-50 p-3.5 rounded-xl border border-emerald-100">
          <h4 className="text-xs font-semibold text-emerald-800 flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            The 1.92 - 2.28 Sweet Spot
          </h4>
          <p className="text-[11px] text-emerald-700 leading-relaxed">
            DA already compensates for inflation. This range provides a balanced structural correction and moderate real wage growth without destabilizing the budget.
          </p>
        </div>

        <div className="bg-red-50 p-3.5 rounded-xl border border-red-100">
          <h4 className="text-xs font-semibold text-red-800 flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-red-400"></span>
            Why &gt;2.3 is Difficult
          </h4>
          <p className="text-[11px] text-red-700 leading-relaxed">
            Massive ballooning of the pension burden (now exceeding serving personnel). High multiplier replicates 7th CPC structural fix, which isn't needed now.
          </p>
        </div>
      </div>
    </div>
  );
}
