"use client";

import { useState } from "react";
import { payMatrix } from "@/data/payMatrix";
import { calculate7CPCSalary } from "@/utils/seventhSalaryEngine";
import { formatINR } from "@/utils/format";

export default function SeventhSalaryCalculator() {

  const [level, setLevel] = useState("");
  const [basic, setBasic] = useState("");

  const [daPercent, setDA] = useState(58);

  const [city, setCity] = useState("X");

  const [tptaType, setTpta] =
    useState("HIGHER");

  const [result, setResult] =
    useState(null);

  const hraMap = {

    X: 30,
    Y: 20,
    Z: 10

  };

  function handleCalculate() {

    if (!level || !basic) {
      alert("Select Pay Level and Basic");
      return;
    }

    const salary =
      calculate7CPCSalary({

        level,
        basic,
        daPercent,
        city,
        hraPercent: hraMap[city],
        tptaType

      });

    setResult(salary);

  }

  return (

    <div className="space-y-4">


      <div className="bg-white p-4 rounded-xl shadow-sm space-y-3">

        {/* Pay Level */}

        <div>

          <label className="text-sm text-gray-600">
            Pay Level
          </label>

          <select
            className="w-full border rounded p-2"
            value={level}
            onChange={(e) => {
              setLevel(e.target.value);
              setBasic("");
            }}
          >

            <option value="">
              Select Level
            </option>

            {Object.keys(payMatrix)
              .map(l => (
                <option key={l}>
                  {l}
                </option>
              ))}

          </select>

        </div>

        {/* Basic Pay */}

        {level && (

          <div>

            <label className="text-sm text-gray-600">
              Basic Pay
            </label>

            <select
              className="w-full border rounded p-2"
              value={basic}
              onChange={(e) =>
                setBasic(e.target.value)
              }
            >

              <option value="">
                Select Basic
              </option>

              {payMatrix[level]
                .map(b => (
                  <option key={b}>
                    {b}
                  </option>
                ))}

            </select>

          </div>

        )}

        {/* DA */}

        <div>

          <label className="text-sm text-gray-600">
            DA %
          </label>

          <select
            className="w-full border rounded p-2"
            value={daPercent}
            onChange={(e) =>
              setDA(Number(e.target.value))
            }
          >

            {[58, 60, 62, 63, 64, 65]
              .map(v => (
                <option key={v}>
                  {v}
                </option>
              ))}

          </select>

        </div>

        {/* City */}

        <div>

          <label className="text-sm text-gray-600">
            City Category
          </label>

          <select
            className="w-full border rounded p-2"
            value={city}
            onChange={(e) =>
              setCity(e.target.value)
            }
          >

            <option value="X">X City</option>
            <option value="Y">Y City</option>
            <option value="Z">Z City</option>

          </select>

        </div>

        {/* TPTA */}

        <div>

          <label className="text-sm text-gray-600">
            Transport Allowance
          </label>

          <select
            className="w-full border rounded p-2"
            value={tptaType}
            onChange={(e) =>
              setTpta(e.target.value)
            }
          >

            <option value="HIGHER">
              Higher TPTA
            </option>

            <option value="OTHER">
              Other City
            </option>

            <option value="NONE">
              No TPTA
            </option>

          </select>

        </div>

        <button
          onClick={handleCalculate}
          className="w-full bg-blue-600 text-white py-2 rounded font-medium"
        >
          Calculate Salary
        </button>

      </div>

      {result && (

        <div className="bg-white rounded-xl shadow-sm p-5 space-y-5">

          {/* HEADER */}
          <div className="border-b pb-3 flex items-center gap-2">

            <span className="text-lg">📊</span>

            <div>
              <h2 className="text-lg font-semibold">
                Salary Breakdown
              </h2>
              <p className="text-xs text-gray-500">
                Monthly salary structure overview
              </p>
            </div>

          </div>


          {/* ===== EARNINGS ===== */}
          <div className="bg-blue-50/50 rounded-lg p-4">

            <div className="flex items-center gap-2 text-sm font-semibold text-blue-700 mb-2">
              <span>📈</span>
              Earnings
            </div>

            <div className="divide-y">

              <Row label="Basic" value={result.basic} />
              <Row label="Dearness Allowance" value={result.da} />
              <Row label="House Rent Allowance" value={result.hra} />
              <Row label="Transport Allowance" value={result.ta} />

            </div>

            {/* GROSS */}
            <div className="mt-3 flex justify-between items-center pt-3 border-t text-blue-800">

              <span className="font-medium">
                Gross Salary
              </span>

              <span className="font-semibold text-lg">
                ₹ {result.gross.toLocaleString("en-IN")}
              </span>

            </div>

          </div>


          {/* ===== DEDUCTIONS ===== */}
          <div className="bg-rose-50/50 rounded-lg p-4">

            <div className="flex items-center gap-2 text-sm font-semibold text-rose-700 mb-2">
              <span>📉</span>
              Deductions
            </div>

            <div className="divide-y">

              <Row label="NPS Contribution" value={result.nps} />
              <Row label="CGHS" value={result.cghs} />
              <Row label="Income Tax" value={result.tax} />

            </div>

          </div>


          {/* ===== NET SALARY ===== */}
          <div className="bg-green-50/60 rounded-lg p-5 text-center">

            <div className="text-sm text-gray-600 flex justify-center items-center gap-1">
              <span>💰</span>
              Net Salary (In Hand)
            </div>

            <div className="text-2xl font-bold text-green-700 mt-1">
              ₹ {result.net.toLocaleString("en-IN")}
            </div>

            {/* subtle insight */}
            <div className="text-xs text-gray-500 mt-1">
              {Math.round((result.net / result.gross) * 100)}% of gross salary
            </div>

          </div>

        </div>

      )}

    </div>

  );

}

function Row({ label, value, highlight }) {

  return (

    <div className={`flex justify-between py-1 ${highlight ? "font-semibold text-blue-600" : ""}`}>

      <div>{label}</div>

      <div>
        ₹ {formatINR(value)}
      </div>

    </div>

  );

}