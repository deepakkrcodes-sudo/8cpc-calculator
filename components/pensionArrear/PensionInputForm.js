"use client";

import { useState } from "react";
import { generateDAPeriods } from "@/utils/generateDAPeriods";
import DAProgressionTable from "./DAProgressionTable";

const presets = [
  { value: 1.92, color: "bg-red-100 text-red-700", label: "Conservative" },
  { value: 2.08, color: "bg-orange-100 text-orange-700", label: "Low Estimate" },
  { value: 2.57, color: "bg-yellow-100 text-yellow-700", label: "Baseline" },
  { value: 2.86, color: "bg-blue-100 text-blue-700", label: "Probable" },
  { value: 3.0, color: "bg-green-100 text-green-700", label: "Optimistic" },
  { value: 3.68, color: "bg-emerald-100 text-emerald-700", label: "Union" }
];

export default function PensionInputForm({ onCalculate }) {

  const [basicPension, setBasicPension] = useState("");
  const [fitmentFactor, setFitmentFactor] = useState(1.92);
  const [implementationPeriod, setImplementationPeriod] = useState("Jul-2027");

  const periods = generateDAPeriods(implementationPeriod);

  const [daRates, setDaRates] = useState([
    { period: "Jan 2026", da: 2 }, 
    { period: "Jul 2026", da: 3 },
    { period: "Jan 2027", da: 2 },
    { period: "Jul 2027", da: 3 }
  ]);

  const updateDARate = (index, value) => {
    const updated = [...daRates];
    updated[index].da = value;
    setDaRates(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onCalculate({
      basicPension: Number(basicPension),
      fitmentFactor: Number(fitmentFactor),
      implementationPeriod,
      daRates
    });
  };

  return (

    <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">

      {/* HEADER */}
      <div>
        <h2 className="text-xl font-semibold">
          Pension Details
        </h2>
        <p className="text-sm text-gray-500 ">
          Enter details to estimate pension arrears under 8th CPC
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* BASIC */}
        <div>
          <h3 className="font-semibold text-md">
            Current Basic Pension (7th CPC, excluding DR)
          </h3>

          <input
            type="number"
            placeholder="Example: 30000"
            value={basicPension}
            onChange={(e) => setBasicPension(e.target.value)}
            className="w-full border rounded-lg p-2 text-base focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* FITMENT */}
        <div>

          <h3 className="font-semibold text-md">
            Fitment Factor
          </h3>

          <div className="flex items-center gap-4">

            <input
              type="range"
              min="1.5"
              max="4"
              step="0.01"
              value={fitmentFactor}
              onChange={(e) => setFitmentFactor(Number(e.target.value))}
              className="w-full accent-blue-600"
            />

            <input
              type="number"
              step="0.01"
              value={fitmentFactor}
              onChange={(e) => setFitmentFactor(Number(e.target.value))}
              className="w-20 border rounded-lg p-1 text-center"
            />

          </div>

          {/* PRESETS */}
          <div className="flex flex-wrap gap-2 mt-3">

            {presets.map(p => (

              <button
                key={p.value}
                type="button"
                onClick={() => setFitmentFactor(p.value)}
                className={`px-2 py-1 text-sm rounded-md border transition
                ${fitmentFactor === p.value ? "ring-2 ring-blue-500" : ""}
                ${p.color}`}
              >
                {p.value}
              </button>

            ))}

          </div>

          {/* LEGEND */}
          <div className="text-xs text-gray-500 flex flex-wrap gap-3 mt-2">

            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              Conservative
            </span>

            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              Probable
            </span>

            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Optimistic
            </span>

          </div>

        </div>

        {/* IMPLEMENTATION */}
        <div>

          <h3 className="font-semibold text-md">
            Tentative Implementation
          </h3>

          <select
            value={implementationPeriod}
            onChange={(e) => setImplementationPeriod(e.target.value)}
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
          >

            <option value="Jul-2027">July 2027</option>
            <option value="Jan-2028">Jan 2028</option>
            <option value="Jul-2028">July 2028</option>
            <option value="Jan-2029">Jan 2029</option>
            <option value="Jul-2029">July 2029</option>

          </select>

        </div>

        {/* DA TABLE */}
        <DAProgressionTable
          periods={periods}
          daRates={daRates}
          updateDARate={updateDARate}
        />

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Calculate Pension Arrear
        </button>

      </form>

    </div>

  );

}