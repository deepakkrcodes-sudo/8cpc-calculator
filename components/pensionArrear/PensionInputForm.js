"use client";

import { useState, useEffect } from "react";
import { generateDAPeriods } from "@/utils/generateDAPeriods";
import DAProgressionTable from "./DAProgressionTable";
import { BarChart3, CalendarClock, Wallet, Clock, Repeat } from "lucide-react";

const presets = [
  { value: 1.92, label: "Minimum", color: "bg-gray-200 text-gray-800" },

  { value: 2.00, label: "Very Conservative", color: "bg-gray-100 text-gray-700" },

  { value: 2.15, label: "Conservative", color: "bg-blue-100 text-blue-700" },

  { value: 2.28, label: "Expected", color: "bg-orange-100 text-orange-700" },

  { value: 2.40, label: "Moderately Optimistic", color: "bg-indigo-100 text-indigo-700" },

  { value: 2.57, label: "7th CPC Benchmark", color: "bg-yellow-100 text-yellow-700" },

  { value: 2.70, label: "High Expectation", color: "bg-green-100 text-green-700" },

  { value: 3.83, label: "Union Demand", color: "bg-purple-100 text-purple-700" }
];

export default function PensionInputForm({ onCalculate }) {

  const [basicPension, setBasicPension] = useState("");
  const [lastBasicPay, setLastBasicPay] = useState("");
  const [fitmentFactor, setFitmentFactor] = useState(2.28);
  const [implementationPeriod, setImplementationPeriod] = useState("Jul-2027");
  const [commutation, setCommutation] = useState(40);

  const periods = generateDAPeriods(implementationPeriod);
  const [retirementType, setRetirementType] = useState("before");
  const [retirementDate, setRetirementDate] = useState("");


  useEffect(() => {
    const generated = generateDAPeriods(implementationPeriod);
    setDaRates(prev =>
      generated.map((p, i) => ({
        period: p.label,
        start: p.start,
        end: p.end,
        da: prev[i]?.da ?? 2
      }))
    );
  }, [implementationPeriod]);

  const [daRates, setDaRates] = useState([
    {
      period: "Jan–Jun 2026",
      start: "2026-01-01",
      end: "2026-06-30",
      da: 2
    },
    {
      period: "Jul–Dec 2026",
      start: "2026-07-01",
      end: "2026-12-31",
      da: 3
    },
    {
      period: "Jan–Jun 2027",
      start: "2027-01-01",
      end: "2027-06-30",
      da: 2
    },
    {
      period: "Jul–Dec 2027",
      start: "2027-07-01",
      end: "2027-12-31",
      da: 3
    }
  ]);

  const updateDARate = (index, value) => {
    const updated = [...daRates];
    updated[index].da = value;
    setDaRates(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onCalculate({
      lastBasicPay: Number(lastBasicPay),
      fitmentFactor,
      implementationDate: getImplementationDate(implementationPeriod),
      daRates,
      retirementType,
      retirementDate,
      commutation: commutation ? Number(commutation) : 40
    });
  };

  return (

    <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">

      {/* HEADER */}
      <div className="space-y-2">

        {/* Title */}
        <h2 className="text-lg md:text-lg font-semibold text-gray-800 tracking-tight">
          Pension Details
        </h2>



        {/* Full-width gradient line */}
        <div className="h-[2px] w-full bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 rounded-full"></div>

      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        <div>
          <h3 className="font-semibold text-md flex items-center gap-2 text-gray-800">
            <CalendarClock size={18} className="text-purple-600" />
            Retirement Date
          </h3>

          <div className="flex gap-4 mt-2 text-md">
            <label className="flex items-center gap-1">
              <input
                type="radio"
                value="before"
                checked={retirementType === "before"}
                onChange={(e) => setRetirementType(e.target.value)}
              />
              Before 1 Jan 2026
            </label>

            <label className="flex items-center gap-1">
              <input
                type="radio"
                value="after"
                checked={retirementType === "after"}
                onChange={(e) => setRetirementType(e.target.value)}
              />
              After 1 Jan 2026
            </label>
          </div>

          {retirementType === "after" && (
            <input
              type="date"
              value={retirementDate}
              onChange={(e) => setRetirementDate(e.target.value)}
              className="mt-2 border rounded-lg p-2 w-full"
            />
          )}
        </div>


        <div>
          <h3 className="font-semibold text-md flex items-center gap-2 text-gray-800 mb-1">
            <Wallet size={18} className="text-green-600" />
            Last Basic Pay (7th CPC)
          </h3>

          <input
            type="number"
            inputMode="numeric"
            placeholder="Example: 80000"
            value={lastBasicPay}
            onChange={(e) => setLastBasicPay(e.target.value)}
            onWheel={(e) => e.target.blur()} // ✅ prevents scroll change
            className="w-full border border-gray-400 rounded-lg p-2 text-base focus:ring-2 focus:ring-green-500 no-spinner"
            required
          />
        </div>

        <div>
          <h3 className="font-semibold text-md flex items-center gap-2 text-gray-800 mb-1">
            <Repeat size={18} className="text-orange-600" />
            Commutation Percentage
          </h3>

          <input
            type="number"
            inputMode="numeric"
            placeholder="Default: 40%"
            value={commutation}
            onChange={(e) => setCommutation(e.target.value)}
            onWheel={(e) => e.target.blur()}
            min="0"
            max="100"

            className="w-full border border-gray-400 rounded-lg p-2 text-base focus:ring-2 focus:ring-orange-500 no-spinner"
          />

          <p className="text-xs text-gray-500 mt-1">
            % of pension taken as lump sum (usually 40%)
          </p>
        </div>


        {/* IMPLEMENTATION */}
        <div>
          <h3 className="font-semibold text-md flex items-center gap-2 text-gray-800 mb-1 ">
            <Clock size={18} className="text-blue-600" />
            Expected Implementation
          </h3>

          <select
            value={implementationPeriod}
            onChange={(e) => setImplementationPeriod(e.target.value)}
            className="w-full border border-gray-400 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
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
          periods={daRates}
          daRates={daRates}
          updateDARate={updateDARate}
        />

        {/* FITMENT */}
        <div className="space-y-3">

          {/* TITLE */}
          <div>
            <h3 className="font-semibold text-md text-gray-800 flex items-center gap-2">
              <BarChart3 size={18} className="text-indigo-500" />
              Fitment Factor
            </h3>

            <p className="text-xs text-gray-500">
              Expected range: <span className="font-medium">1.92 – 3.83</span>
            </p>
          </div>


          {/* SLIDER + INPUT */}
          <div className="border border-gray-500 rounded-xl p-4 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-400 transition space-y-4">

            {/* SLIDER + INPUT */}
            <div className="flex items-center gap-3">

              <input
                type="range"
                min="1.5"
                max="4.0"
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
                onWheel={(e) => e.target.blur()}
                className="w-20 border border-gray-300 rounded-md px-2 py-1 text-center text-sm focus:ring-2 focus:ring-blue-400 outline-none no-spinner"
              />

            </div>


            {/* PRESET BUTTONS */}
            <div className="grid grid-cols-4 gap-2">

              {presets.map((p) => {
                const isActive = Number(fitmentFactor).toFixed(2) === p.value.toFixed(2);

                return (
                  <button
                    key={p.value}
                    type="button"
                    title={p.label}
                    onClick={() => setFitmentFactor(p.value)}
                    className={`
            w-full py-2 rounded-lg text-sm font-medium transition-all duration-200
            border
            ${isActive
                        ? "bg-blue-600 text-white shadow-md scale-[1.03]"
                        : `${p.color} border-gray-200 hover:shadow-sm`}
          `}
                  >
                    {p.value.toFixed(2)}
                  </button>
                );
              })}

            </div>


            {/* LEGENDS */}
            <div className="flex flex-wrap gap-2 pt-1">

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
            💡 Higher fitment factor increases total pension arrears
          </div>

        </div>

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

function getImplementationDate(period) {
  const [month, year] = period.split("-");

  if (month === "Jan") return `${year}-01-01`;
  if (month === "Jul") return `${year}-07-01`;

  return `${year}-01-01`;
}