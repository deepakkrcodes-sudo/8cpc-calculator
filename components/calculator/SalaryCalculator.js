"use client";

import { useState } from "react";
import { payMatrix } from "@/data/payMatrix";
import { calculateSalary } from "@/utils/salaryEngine";
import SalaryCharts from "./SalaryCharts";
import SalaryIncreaseCard from "./SalaryIncreaseCard";

export default function SalaryCalculator() {

    // ============================
    // STATE
    // ============================

    const [level, setLevel] = useState("");
    const [basic, setBasic] = useState("");
    const [fitment, setFitment] = useState("");
    const [city, setCity] = useState("X");
    const [hraPercent, setHraPercent] = useState(24);
    const [tptaType, setTptaType] = useState("HIGHER");

    const [otherAllowances, setOtherAllowances] = useState([]);
    const [otherDeductions, setOtherDeductions] = useState([]);

    function addAllowance() {
        setOtherAllowances([...otherAllowances, { label: "", amount: 0 }]);
    }

    function updateAllowance(index, field, value) {
        const copy = [...otherAllowances];
        copy[index][field] =
            field === "amount"
                ? Number(value)
                : value;
        setOtherAllowances(copy);
    }

    const [editableDeductions, setEditableDeductions] = useState({
        nps7: 0,
        nps8: 0,
        cghs7: 0,
        cghs8: 0,
        tax7: 0,
        tax8: 0
    });

    const [result, setResult] = useState(null);

    const daPercent8 = 0;


    // ============================
    // HRA OPTIONS
    // ============================

    const hraOptions = {
        X: [30, 27, 24, 0],
        Y: [20, 18, 16, 0],
        Z: [10, 9, 8, 0]
    };


    // ============================
    // FITMENT OPTIONS
    // ============================

    const fitmentOptions = [
        1.92,
        2.08,
        2.86,
        3.05,
        3.10,
        3.15,
        3.20,
        3.25
    ];


    // ============================
    // CALCULATE
    // ============================

    function handleCalculate() {

        if (!level || !basic || !fitment) {
            alert("Please select required fields");
            return;
        }

        const salary = calculateSalary({

            level,
            basic: Number(basic),
            fitmentFactor: Number(fitment),
            hraPercent8: hraPercent,
            city,
            daPercent: daPercent8,
            tptaType,
            otherAllowances,
            otherDeductions,


        });

        setResult(salary);

        setEditableDeductions({
            nps7: salary.seventh.nps,
            nps8: salary.eighth.nps,
            cghs7: salary.seventh.cghs,
            cghs8: salary.eighth.cghs,
            tax7: salary.seventh.tax,
            tax8: salary.eighth.tax
        });

    }


    // ============================
    // ADD ALLOWANCE
    // ============================

    function addAllowance() {
        setOtherAllowances([...otherAllowances, 0]);
    }

    function updateAllowance(index, value) {

        const copy = [...otherAllowances];
        copy[index] = Number(value);
        setOtherAllowances(copy);

    }

    function removeAllowance(index) {

        const copy = [...otherAllowances];
        copy.splice(index, 1);
        setOtherAllowances(copy);

    }


    // ============================
    // ADD DEDUCTION
    // ============================

    function addDeduction() {
        setOtherDeductions([...otherDeductions, 0]);
    }

    function updateDeduction(index, value) {

        const copy = [...otherDeductions];
        copy[index] = Number(value);
        setOtherDeductions(copy);

    }

    function removeDeduction(index) {

        const copy = [...otherDeductions];
        copy.splice(index, 1);
        setOtherDeductions(copy);

    }


    // ============================
    // ROW COMPONENT
    // ============================

    function Row(label, v7, v8, highlight = false) {

        const val7 = Number(v7) || 0;
        const val8 = Number(v8) || 0;

        return (

            <div className={`grid grid-cols-3 items-center py-2 text-sm 
      ${highlight ? "bg-blue-50/50 font-semibold" : "border-b"}
    `}>

                {/* LABEL */}
                <div className="text-gray-700">
                    {label}
                </div>

                {/* 7th CPC */}
                <div className="text-center text-gray-800">
                    ₹ {val7.toLocaleString("en-IN")}
                </div>

                {/* 8th CPC */}
                <div className="text-center text-blue-600 font-medium">
                    ₹ {val8.toLocaleString("en-IN")}
                </div>

            </div>

        );

    }




    // ============================
    // UI
    // ============================

    return (

        <div className="space-y-4">

            {/* TITLE */}
            <div >

                <h1 className="text-lg font-semibold text-center">
                    8th CPC Salary Calculator
                </h1>

                <p className="text-sm text-gray-600 max-w-md mx-auto text-center">
                    Estimate your expected salary under the 8th Pay Commission based on projected fitment factors and assumptions.
                </p>

            </div>


            {/* INPUT CARD */}
            <div className="bg-white p-4 rounded-xl shadow-sm space-y-3">


                {/* LEVEL */}
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

                        {Object.keys(payMatrix).map(l => {
                            const values = payMatrix[l];
                            const first = values[0];
                            const last = values[values.length - 1];

                            const label =
                                values.length === 1
                                    ? `${l} (₹${first})`
                                    : `${l} (₹${first} - ₹${last})`;

                            return (
                                <option key={l} value={l}>
                                    {label}
                                </option>
                            );
                        })}

                    </select>

                </div>


                {/* BASIC */}
                {level && (

                    <div>

                        <label className="text-sm text-gray-600">
                            Basic Pay
                        </label>

                        <select
                            className="w-full border rounded p-2"
                            value={basic}
                            onChange={(e) => setBasic(e.target.value)}
                        >

                            <option value="">
                                Select Basic
                            </option>

                            {payMatrix[level].map(b => (
                                <option key={b}>
                                    {b}
                                </option>
                            ))}

                        </select>

                    </div>

                )}


                {/* FITMENT */}
                <div>

                    <label className="text-sm text-gray-600">
                        Fitment Factor (Tentative)
                    </label>

                    <select
                        className="w-full border rounded p-2"
                        value={fitment}
                        onChange={(e) => setFitment(e.target.value)}
                    >

                        <option value="">
                            Select Fitment
                        </option>

                        {fitmentOptions.map(f => (
                            <option key={f}>
                                {f}
                            </option>
                        ))}

                    </select>

                </div>


                {/* CITY */}
                <div>

                    <label className="text-sm text-gray-600">
                        City Class
                    </label>

                    <select
                        className="w-full border rounded p-2"
                        value={city}
                        onChange={(e) => {
                            setCity(e.target.value);
                            setHraPercent(hraOptions[e.target.value][0]);
                        }}
                    >

                        <option value="X">
                            X
                        </option>

                        <option value="Y">
                            Y
                        </option>

                        <option value="Z">
                            Z
                        </option>

                    </select>

                </div>


                {/* HRA */}
                <div>

                    <label className="text-sm text-gray-600">
                        HRA %
                    </label>

                    <select
                        className="w-full border rounded p-2"
                        value={hraPercent}
                        onChange={(e) => setHraPercent(Number(e.target.value))}
                    >

                        {hraOptions[city].map(h => (
                            <option key={h}>
                                {h}
                            </option>
                        ))}

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
                        onChange={(e) => setTptaType(e.target.value)}
                    >

                        <option value="HIGHER">
                            Higher TPTA
                        </option>

                        <option value="OTHER">
                            Other City
                        </option>

                        <option value="NONE">
                            None
                        </option>

                    </select>

                </div>


                {/* CALCULATE */}
                <button
                    onClick={handleCalculate}
                    className="w-full bg-blue-600 text-white py-2 rounded font-medium"
                >
                    Calculate
                </button>

            </div>


            {/* RESULT */}
            {/* RESULT */}
            {result && (

                <div className="bg-white rounded-xl shadow-sm p-5 space-y-5">

                    {/* HEADER */}
                    <div className="border-b pb-3 flex items-center gap-2">
                        <span className="text-lg">📊</span>
                        <div>
                            <h2 className="text-lg font-semibold">
                                Salary Comparison
                            </h2>
                            <p className="text-xs text-gray-500">
                                7th CPC vs 8th CPC detailed breakdown
                            </p>
                        </div>
                    </div>


                    {/* ===== COLUMN HEADER ===== */}



                    {/* ===== EARNINGS ===== */}
                    <div className="bg-blue-50/50 rounded-lg p-4 space-y-2">
                        <div className="text-sm font-semibold text-blue-700 flex items-center gap-2">
                            📈 Earnings
                        </div>

                        <div className="grid grid-cols-3 border-b text-sm font-bold text-gray-500 bg-blue-50/50  p-4 space-y-2">
                            <div>Component</div>
                            <div className="text-center">7th CPC</div>
                            <div className="text-center">8th CPC</div>
                        </div>





                        <div className="divide-y">

                            <div className="divide-y">

                                {Row("Basic", result.seventh.basic, result.eighth.basic)}
                                {Row("DA", result.seventh.da, result.eighth.da)}
                                {Row("HRA", result.seventh.hra, result.eighth.hra)}
                                {Row("TA", result.seventh.ta, result.eighth.ta)}

                            </div>

                            {/* Custom Allowances */}
                            {otherAllowances.map((item, i) => (
                                <div key={i} className="grid grid-cols-3 py-2 text-sm">
                                    <div>{item.label || "Allowance"}</div>
                                    <div className="text-center">₹ {item.amount.toLocaleString("en-IN")}</div>
                                    <div className="text-center">₹ {item.amount.toLocaleString("en-IN")}</div>
                                </div>
                            ))}

                        </div>

                        {/* GROSS */}
                        <div className="grid grid-cols-3 pt-3  text-blue-800 font-medium">

                            <div>Gross Salary</div>

                            <div className="text-center">
                                ₹ {result.seventh.gross.toLocaleString("en-IN")}
                            </div>

                            <div className="text-center">
                                ₹ {result.eighth.gross.toLocaleString("en-IN")}
                            </div>

                        </div>

                    </div>


                    {/* ===== DEDUCTIONS ===== */}
                    <div className="bg-rose-50/50 rounded-lg p-4 space-y-2">

                        <div className="text-sm font-semibold text-rose-700 flex items-center gap-2">
                            📉 Deductions
                        </div>

                        {/* NPS */}
                        <div className="grid grid-cols-3 items-center py-2 text-sm">
                            <div>NPS</div>

                            <input
                                type="number"
                                value={editableDeductions.nps7}
                                onChange={(e) => setEditableDeductions({ ...editableDeductions, nps7: Number(e.target.value) })}
                                className="mx-auto w-24 border rounded-lg p-1 text-center focus:ring-2 focus:ring-blue-400"
                            />

                            <input
                                type="number"
                                value={editableDeductions.nps8}
                                onChange={(e) => setEditableDeductions({ ...editableDeductions, nps8: Number(e.target.value) })}
                                className="mx-auto w-24 border rounded-lg p-1 text-center focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        {/* CGHS */}
                        <div className="grid grid-cols-3 items-center py-2 text-sm">
                            <div>CGHS</div>

                            <input
                                type="number"
                                value={editableDeductions.cghs7}
                                onChange={(e) => setEditableDeductions({ ...editableDeductions, cghs7: Number(e.target.value) })}
                                className="mx-auto w-24 border rounded-lg p-1 text-center focus:ring-2 focus:ring-blue-400"
                            />

                            <input
                                type="number"
                                value={editableDeductions.cghs8}
                                onChange={(e) => setEditableDeductions({ ...editableDeductions, cghs8: Number(e.target.value) })}
                                className="mx-auto w-24 border rounded-lg p-1 text-center focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        {/* TAX */}
                        <div className="grid grid-cols-3 items-center py-2 text-sm">
                            <div>Income Tax</div>

                            <input
                                type="number"
                                value={editableDeductions.tax7}
                                onChange={(e) => setEditableDeductions({ ...editableDeductions, tax7: Number(e.target.value) })}
                                className="mx-auto w-24 border rounded-lg p-1 text-center focus:ring-2 focus:ring-blue-400"
                            />

                            <input
                                type="number"
                                value={editableDeductions.tax8}
                                onChange={(e) => setEditableDeductions({ ...editableDeductions, tax8: Number(e.target.value) })}
                                className="mx-auto w-24 border rounded-lg p-1 text-center focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                    </div>




                    <SalaryIncreaseCard result={result} />
                    <SalaryCharts result={result} />

                </div>

            )}



        </div>

    );

}