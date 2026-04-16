"use client";

import { PlusCircle, MinusCircle } from "lucide-react";

export default function SalaryBreakdown7({
  result,
  editableDeductions,
  setEditableDeductions,
  otherAllowances,
  otherDeductions,
  addAllowance,
  updateAllowance,
  removeAllowance,
  addDeduction,
  updateDeduction,
  removeDeduction
}) {

  if (!result) return null;

  const r = result;

  const totalDeductions =
    editableDeductions.nps +
    editableDeductions.cghs +
    editableDeductions.tax +
    otherDeductions.reduce((sum, d) => sum + (d.amount || 0), 0);

  return (

    <div className="space-y-5">

      {/* HEADER */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800">
          Salary Breakdown
        </h2>

        <p className="text-xs text-gray-500">
          7th CPC detailed breakdown
        </p>

        <div className="mt-3 h-[2px] w-full rounded-full bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 opacity-80"></div>
      </div>

      {/* ================= EARNINGS ================= */}
      <div className="rounded-xl border border-gray-200 bg-blue-50/40 p-4">

        <div className="text-sm font-semibold text-blue-700 mb-3">
          📈 Earnings
        </div>

        {/* HEADER */}
        <div className="grid grid-cols-2 text-xs font-semibold text-gray-500 border-b pb-2 mb-2">
          <div>Component</div>
          <div className="text-center">Amount</div>
        </div>

        {/* FIXED */}
        {[
          { label: "Basic", value: r.basic },
          { label: "DA", value: r.da },
          { label: "HRA", value: r.hra },
          { label: "TA", value: r.ta }
        ].map((item) => (

          <div key={item.label} className="grid grid-cols-2 py-2 text-sm border-b">
            <div>{item.label}</div>
            <div className="text-center">
              ₹ {item.value.toLocaleString("en-IN")}
            </div>
          </div>

        ))}

        {/* CUSTOM ALLOWANCES (SAME UI AS 8CPC) */}
        <div className="mt-3 space-y-2">

          {otherAllowances.map((a, i) => (

            <div
              key={i}
              className="relative grid grid-cols-2 gap-2 items-center"
            >

              <button
                onClick={() => removeAllowance(i)}
                className="absolute -top-2 -right-2 bg-white border rounded-full p-[2px] shadow-sm"
              >
                <MinusCircle size={12} className="text-red-500" />
              </button>

              <input
                placeholder="Allowance"
                value={a.label}
                onChange={(e) => updateAllowance(i, "label", e.target.value)}
                className="border rounded px-2 py-1 text-sm"
              />

              <input
                type="number"
                value={a.amount ?? 0}
                onChange={(e) => updateAllowance(i, "amount", e.target.value)}
                className="border rounded px-2 py-1 text-sm text-center"
              />

            </div>

          ))}

          <button
            onClick={addAllowance}
            className="flex items-center gap-1 text-indigo-600 text-sm"
          >
            <PlusCircle size={16} /> Add Allowance
          </button>

        </div>

        {/* TOTAL */}
        <div className="grid grid-cols-2 pt-3 font-semibold text-blue-800">
          <div>Gross Salary</div>
          <div className="text-center">
            ₹ {r.gross.toLocaleString("en-IN")}
          </div>
        </div>

      </div>

      {/* ================= DEDUCTIONS ================= */}
      <div className="rounded-xl border border-gray-200 bg-rose-50/40 p-4">

        <div className="text-sm font-semibold text-rose-700 mb-3">
          📉 Deductions
        </div>

        <div className="grid grid-cols-2 text-xs font-semibold text-gray-500 border-b pb-2 mb-2">
          <div>Component</div>
          <div className="text-center">Amount</div>
        </div>

        {/* FIXED EDITABLE (EXACT LIKE 8CPC) */}
        {[
          { key: "nps", label: "NPS" },
          { key: "cghs", label: "CGHS" },
          { key: "tax", label: "Income Tax" }
        ].map((item) => (

          <div key={item.key} className="grid grid-cols-2 gap-2 items-center py-2 text-sm">

            <div>{item.label}</div>

            <input
              type="number"
              value={editableDeductions[item.key] ?? 0}
              onChange={(e) =>
                setEditableDeductions({
                  ...editableDeductions,
                  [item.key]: e.target.value === "" ? 0 : Number(e.target.value)
                })
              }
              className="w-full rounded-lg border border-gray-300 px-2 py-1 text-center text-sm"
            />

          </div>

        ))}

        {/* CUSTOM */}
        <div className="mt-3 space-y-2">

          {otherDeductions.map((d, i) => (

            <div key={i} className="relative grid grid-cols-2 gap-2 items-center">

              <button
                onClick={() => removeDeduction(i)}
                className="absolute -top-2 -right-2 bg-white border rounded-full p-[2px] shadow-sm"
              >
                <MinusCircle size={12} className="text-red-500" />
              </button>

              <input
                placeholder="Deduction"
                value={d.label}
                onChange={(e) => updateDeduction(i, "label", e.target.value)}
                className="border rounded px-2 py-1 text-sm"
              />

              <input
                type="number"
                value={d.amount ?? 0}
                onChange={(e) => updateDeduction(i, "amount", e.target.value)}
                className="border rounded px-2 py-1 text-sm text-center"
              />

            </div>

          ))}

          <button
            onClick={addDeduction}
            className="flex items-center gap-1 text-indigo-600 text-sm"
          >
            <PlusCircle size={16} /> Add Deduction
          </button>

        </div>

        {/* TOTAL */}
        <div className="grid grid-cols-2 pt-3 font-semibold text-rose-700 border-t mt-3">

          <div>Total Deductions</div>

          <div className="text-center">
            ₹ {totalDeductions.toLocaleString("en-IN")}
          </div>

        </div>

      </div>

    </div>
  );
}
