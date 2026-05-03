"use client";

import { useState } from "react";
import { payMatrix } from "@/data/payMatrix";
import { calculate7CPCSalary } from "@/utils/seventhSalaryEngine";
import { formatINR } from "@/utils/format";

export default function SeventhSalaryCalculator() {

  const [level, setLevel] = useState("");
  const [basic, setBasic] = useState("");

  const [daPercent, setDA] = useState(60);

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

  const [allowances, setAllowances] = useState([
    { label: "Transport Allowance", value: 0 }
  ]);

  const [deductions, setDeductions] = useState([
    { label: "NPS Contribution", value: 0 },
    { label: "CGHS", value: 0 },
    { label: "Income Tax", value: 0 }
  ]);

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

    if (!salary || typeof salary !== "object") return;


    setAllowances([
      { label: "Basic", value: salary.basic },
      { label: "Dearness Allowance", value: salary.da },
      { label: "House Rent Allowance", value: salary.hra },
      { label: "Transport Allowance", value: salary.ta }
    ]);

    setDeductions([
      { label: "NPS Contribution", value: salary.nps },
      { label: "CGHS", value: salary.cghs },
      { label: "Income Tax", value: salary.tax }
    ]);

    setResult(salary);

  }


  function updateAllowance(i, key, value) {
    const updated = [...allowances];
    updated[i][key] = key === "value" ? Number(value) : value;
    setAllowances(updated);
  }

  function addAllowance() {
    setAllowances([...allowances, { label: "", value: 0 }]);
  }

  function removeAllowance(i) {
    setAllowances(allowances.filter((_, idx) => idx !== i));
  }


  // SAME FOR DEDUCTIONS
  function updateDeduction(i, key, value) {
    const updated = [...deductions];
    updated[i][key] = key === "value" ? Number(value) : value;
    setDeductions(updated);
  }

  function addDeduction() {
    setDeductions([...deductions, { label: "", value: 0 }]);
  }

  function removeDeduction(i) {
    setDeductions(deductions.filter((_, idx) => idx !== i));
  }

  const gross = allowances.reduce(
    (sum, a) => sum + Number(a.value || 0),
    0
  );

  const totalDeduction = deductions.reduce(
    (sum, d) => sum + Number(d.value || 0),
    0
  );

  const net = gross - totalDeduction;

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
            onChange={(e) => setTpta(e.target.value)}
          >
            <option value="HIGHER">City Class X</option>
            <option value="OTHER">City Class Y & Z</option>

            {/* NEW */}
            <option value="DOUBLE_HIGHER">2× City Class X</option>
            <option value="DOUBLE_OTHER">2× City Class Y & Z</option>

            <option value="NONE">No TPTA (Govt. Accommodation)</option>
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
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-blue-700">
                <span>📈</span>
                Earnings
              </div>

              <button onClick={addAllowance} className="text-xs text-blue-600">
                + Add
              </button>
            </div>

            <div className="space-y-2">

              {allowances.map((a, i) => (

                <div key={i} className="grid grid-cols-3 gap-2 items-center text-sm">

                  <input
                    value={a.label}
                    onChange={(e) => updateAllowance(i, "label", e.target.value)}
                    className="border rounded px-2 py-1"
                  />

                  <input
                    type="number"
                    value={a.value}
                    onChange={(e) => updateAllowance(i, "value", e.target.value)}
                    className="border rounded px-2 py-1"
                  />

                  <button
                    onClick={() => removeAllowance(i)}
                    className="text-red-500 text-xs"
                  >
                    Remove
                  </button>

                </div>

              ))}

            </div>
            <div className="mt-3 flex justify-between items-center pt-3 border-t text-blue-800">

              <span className="font-medium">
                Gross Salary
              </span>

              <span className="font-semibold text-lg">
                ₹ {gross.toLocaleString("en-IN")}
              </span>

            </div>
          </div>


          {/* ===== DEDUCTIONS ===== */}
          <div className="bg-rose-50/50 rounded-lg p-4">

            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-rose-700">
                <span>📉</span>
                Deductions
              </div>

              <button onClick={addDeduction} className="text-xs text-rose-600">
                + Add
              </button>
            </div>

            <div className="space-y-2">

              {deductions.map((d, i) => (

                <div key={i} className="grid grid-cols-3 gap-2 items-center text-sm">

                  <input
                    value={d.label}
                    onChange={(e) => updateDeduction(i, "label", e.target.value)}
                    className="border rounded px-2 py-1"
                  />

                  <input
                    type="number"
                    value={d.value}
                    onChange={(e) => updateDeduction(i, "value", e.target.value)}
                    className="border rounded px-2 py-1"
                  />

                  <button
                    onClick={() => removeDeduction(i)}
                    className="text-red-500 text-xs"
                  >
                    Remove
                  </button>

                </div>

              ))}

            </div>
          </div>


          {/* ===== NET SALARY ===== */}
          <div className="bg-green-50/60 rounded-lg p-5 text-center">

            <div className="text-sm text-gray-600 flex justify-center items-center gap-1">
              <span>💰</span>
              Net Salary (In Hand)
            </div>

            <div className="text-2xl font-bold text-green-700 mt-1">
              ₹ {net.toLocaleString("en-IN")}
            </div>

            {/* subtle insight */}
            <div className="text-xs text-gray-500 mt-1">
              {gross > 0 ? Math.round((net / gross) * 100) : 0}% of gross salary
            </div>

          </div>

        </div>

      )
      }

    </div >

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