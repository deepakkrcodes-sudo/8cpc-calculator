"use client";

import { PlusCircle, MinusCircle } from "lucide-react";

export default function SalaryBreakdown({
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

    function Row(label, v7, v8, highlight = false) {
        return (
            <div className={`grid grid-cols-3 py-2 text-sm 
        ${highlight ? "bg-indigo-50 font-semibold rounded" : "border-b"}
      `}>
                <div>{label}</div>
                <div className="text-center">₹ {v7.toLocaleString("en-IN")}</div>
                <div className="text-center text-indigo-600 font-medium">
                    ₹ {v8.toLocaleString("en-IN")}
                </div>
            </div>
        );
    }

    return (

        <div className="space-y-5">

            {/* HEADER */}
            <div>
                <h2 className="text-lg font-semibold text-gray-800">
                    Salary Comparison
                </h2>
                <p className="text-xs text-gray-500">
                    7th CPC vs 8th CPC detailed breakdown
                </p>

                {/* 🔥 Gradient Divider */}
                <div className="mt-3 h-[2px] w-full rounded-full bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 opacity-80"></div>
            </div>
            {/* ================= EARNINGS ================= */}
            <div className="rounded-xl border border-gray-200 bg-blue-50/40 p-4">

                <div className="text-sm font-semibold text-blue-700 mb-3">
                    📈 Earnings
                </div>

                {/* HEADER */}
                <div className="grid grid-cols-3 text-xs font-semibold text-gray-500 border-b pb-2 mb-2">
                    <div>Component</div>
                    <div className="text-center">7th CPC</div>
                    <div className="text-center">8th CPC</div>
                </div>

                {Row("Basic", r.seventh.basic, r.eighth.basic)}
                {Row("DA", r.seventh.da, r.eighth.da)}
                {Row("HRA", r.seventh.hra, r.eighth.hra)}
                {Row("TA", r.seventh.ta, r.eighth.ta)}

                {/* 🔥 ADD ALLOWANCES HERE */}
                {/* 🔥 ALLOWANCES */}
                <div className="mt-3 space-y-2">

                    {otherAllowances.map((a, i) => (
                        <div
                            key={a.label || i}
                            className="relative grid grid-cols-3 gap-2 items-center"
                        >

                            {/* REMOVE BUTTON (top-right overlay) */}
                            <button
                                onClick={() => removeAllowance(i)}
                                className="absolute -top-2 -right-2 bg-white border rounded-full p-[2px] shadow-sm"
                            >
                                <MinusCircle size={12} className="text-red-500" />
                            </button>

                            {/* LABEL */}
                            <input
                                placeholder="Allowance"
                                value={a.label}
                                onChange={(e) => updateAllowance(i, "label", e.target.value)}
                                className="border rounded px-2 py-1 text-sm"
                            />

                            {/* 7th CPC */}
                            <input
                                type="number"
                                value={a.amount7 === 0 ? "" : a.amount7}
                                onChange={(e) => updateAllowance(i, "amount7", e.target.value)}
                                className="border rounded px-2 py-1 text-sm text-center"
                            />

                            {/* 8th CPC */}
                            <input
                                type="number"
                                value={a.amount8 === 0 ? "" : a.amount8}
                                onChange={(e) => updateAllowance(i, "amount8", e.target.value)}
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
                <div className="grid grid-cols-3 pt-3 font-semibold text-blue-800">
                    <div>Gross Salary</div>
                    <div className="text-center">
                        ₹ {r.seventh.gross.toLocaleString("en-IN")}
                    </div>
                    <div className="text-center">
                        ₹ {r.eighth.gross.toLocaleString("en-IN")}
                    </div>
                </div>

            </div>

            {/* ================= DEDUCTIONS ================= */}
            {/* ================= DEDUCTIONS ================= */}
            <div className="rounded-xl border border-gray-200 bg-rose-50/40 p-4">

                <div className="text-sm font-semibold text-rose-700 mb-3">
                    📉 Deductions
                </div>

                {/* HEADER */}
                <div className="grid grid-cols-3 text-xs font-semibold text-gray-500 border-b pb-2 mb-2">
                    <div>Component</div>
                    <div className="text-center">7th CPC</div>
                    <div className="text-center">8th CPC</div>
                </div>

                {/* 🔥 FIXED DEDUCTIONS */}
                {[
                    { key7: "nps7", key8: "nps8", label: "NPS" },
                    { key7: "cghs7", key8: "cghs8", label: "CGHS" },
                    { key7: "tax7", key8: "tax8", label: "Income Tax" }
                ].map((item, i) => (

                    <div
                        key={item.label}
                        className="grid grid-cols-3 gap-2 items-center py-2 text-sm"
                    >

                        {/* LABEL */}
                        <div>{item.label}</div>

                        {/* 7th */}
                        <input
                            type="number"
                            value={editableDeductions[item.key7] === 0 ? "" : editableDeductions[item.key7]}
                            onChange={(e) => setEditableDeductions({
                                ...editableDeductions,
                                [item.key7]: e.target.value === "" ? 0 : Number(e.target.value)
                            })}
                            className="w-full rounded-lg border border-gray-300 px-2 py-1 text-center text-sm"
                            placeholder="0"
                        />

                        {/* 8th */}
                        <input
                            type="number"
                            value={editableDeductions[item.key8] === 0 ? "" : editableDeductions[item.key8]}
                            onChange={(e) => setEditableDeductions({
                                ...editableDeductions,
                                [item.key8]: e.target.value === "" ? 0 : Number(e.target.value)
                            })}
                            className="w-full rounded-lg border border-gray-300 px-2 py-1 text-center text-sm"
                            placeholder="0"
                        />

                    </div>

                ))}

                {/* 🔥 CUSTOM DEDUCTIONS (MATCH ALLOWANCES UI) */}
                <div className="mt-3 space-y-2">

                    {otherDeductions.map((d, i) => (
                        <div
                            key={d.label || i}
                            className="relative grid grid-cols-3 gap-2 items-center"
                        >

                            {/* REMOVE BUTTON (overlay) */}
                            <button
                                onClick={() => removeDeduction(i)}
                                className="absolute -top-2 -right-2 bg-white border rounded-full p-[2px] shadow-sm"
                            >
                                <MinusCircle size={12} className="text-red-500" />
                            </button>

                            {/* LABEL */}
                            <input
                                placeholder="Deduction"
                                value={d.label}
                                onChange={(e) => updateDeduction(i, "label", e.target.value)}
                                className="border rounded px-2 py-1 text-sm"
                            />

                            {/* 7th */}
                            <input
                                type="number"
                                value={d.amount7 === 0 ? "" : d.amount7}
                                onChange={(e) => updateDeduction(i, "amount7", e.target.value)}
                                className="border rounded px-2 py-1 text-sm text-center"
                                placeholder="0"
                            />

                            {/* 8th */}
                            <input
                                type="number"
                                value={d.amount8 === 0 ? "" : d.amount8}
                                onChange={(e) => updateDeduction(i, "amount8", e.target.value)}
                                className="border rounded px-2 py-1 text-sm text-center"
                                placeholder="0"
                            />

                        </div>
                    ))}

                    {/* ADD BUTTON */}
                    <button
                        onClick={addDeduction}
                        className="flex items-center gap-1 text-sm text-indigo-600"
                    >
                        <PlusCircle size={16} /> Add Deduction
                    </button>

                </div>

                {/* 🔥 TOTAL DEDUCTIONS */}
                <div className="grid grid-cols-3 pt-3 font-semibold text-rose-700 border-t mt-3">

                    <div>Total Deductions</div>

                    <div className="text-center">
                        ₹ {(
                            editableDeductions.nps7 +
                            editableDeductions.cghs7 +
                            editableDeductions.tax7 +
                            otherDeductions.reduce((sum, d) => sum + (d.amount7 || 0), 0)
                        ).toLocaleString("en-IN")}
                    </div>

                    <div className="text-center">
                        ₹ {(
                            editableDeductions.nps8 +
                            editableDeductions.cghs8 +
                            editableDeductions.tax8 +
                            otherDeductions.reduce((sum, d) => sum + (d.amount8 || 0), 0)
                        ).toLocaleString("en-IN")}
                    </div>

                </div>

            </div>

        </div>
    );
}