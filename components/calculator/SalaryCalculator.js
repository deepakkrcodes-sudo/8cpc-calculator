"use client";

import { useState, useEffect } from "react";
import { payMatrix } from "@/data/payMatrix";
import { calculateSalary } from "@/utils/salaryEngine";
import SalaryCharts from "./SalaryCharts";
import SalaryIncreaseCard from "./SalaryIncreaseCard";
import FitmentFactorControl from "./FitmentFactorControl";
import SalaryBreakdown from "./SalaryBreakdown";

import {
    Layers,
    IndianRupee,
    MapPin,
    Home,
    Bus,
    PlusCircle,
    MinusCircle,
    ShieldCheck
} from "lucide-react";

export default function SalaryCalculator() {

    const [level, setLevel] = useState("");
    const [basic, setBasic] = useState("");
    const [fitment, setFitment] = useState(2.28);

    const [city, setCity] = useState("X");
    const [hraPercent, setHraPercent] = useState(24);
    const [tptaType, setTptaType] = useState("HIGHER");

    const [otherAllowances, setOtherAllowances] = useState([]);
    const [otherDeductions, setOtherDeductions] = useState([]);

    const [result, setResult] = useState(null);
    const [pensionType, setPensionType] = useState("NPS");
    const [gpf, setGpf] = useState({
        gpf7: 0,
        gpf8: 0
    });

    const daPercent8 = 0;


    function addAllowance() {
        setOtherAllowances([
            ...otherAllowances,
            { label: "", amount7: 0, amount8: 0 }
        ]);
    }

    function updateAllowance(i, field, value) {
        const copy = [...otherAllowances];
        copy[i][field] =
            field === "label" ? value : Number(value);
        setOtherAllowances(copy);
    }

    function removeAllowance(i) {
        const copy = [...otherAllowances];
        copy.splice(i, 1);
        setOtherAllowances(copy);
    }

    function addDeduction() {
        setOtherDeductions([
            ...otherDeductions,
            { label: "", amount7: 0, amount8: 0 }
        ]);
    }

    function updateDeduction(i, field, value) {
        const copy = [...otherDeductions];
        copy[i][field] =
            field === "label" ? value : Number(value);
        setOtherDeductions(copy);
    }

    function removeDeduction(i) {
        const copy = [...otherDeductions];
        copy.splice(i, 1);
        setOtherDeductions(copy);
    }
    const [editableDeductions, setEditableDeductions] = useState({
        nps7: 0,
        nps8: 0,
        cgegis7: 0,
        cgegis8: 0,
        cghs7: 0,
        cghs8: 0,
        tax7: 0,
        tax8: 0
    });

    const hraOptions = {
        X: [30, 27, 24, 0],
        Y: [20, 18, 16, 0],
        Z: [10, 9, 8, 0]
    };

    const [animateTrigger, setAnimateTrigger] = useState(0);
    const [pulse, setPulse] = useState(false);

    function handleCalculate() {

        if (!level || !basic || !fitment) {
            alert("Please fill required fields");
            return;
        }

        // 🔥 Trigger animation
        setAnimateTrigger(prev => prev + 1);

        // 🔥 Button feedback
        setPulse(true);
        setTimeout(() => setPulse(false), 300);
    }

    useEffect(() => {
        if (!result) return;

        setEditableDeductions({
            nps7: result.seventh.nps,
            nps8: result.eighth.nps,
            cgegis7: result.seventh.cgegis,
            cgegis8: result.eighth.cgegis,
            cghs7: result.seventh.cghs,
            cghs8: result.eighth.cghs,
            tax7: result.seventh.tax,
            tax8: result.eighth.tax
        });
        setGpf({
            gpf7: Math.round((result.seventh.basic + result.seventh.da) * 0.06),
            gpf8: Math.round((result.eighth.basic + result.eighth.da) * 0.06)
        });

    }, [result]);

    useEffect(() => {

        if (!level || !basic || !fitment) return;

        const salary = calculateSalary({
            level,
            basic: Number(basic),
            fitmentFactor: Number(fitment),
            hraPercent8: hraPercent,
            city,
            daPercent: daPercent8,
            tptaType,
            otherAllowances,
            otherDeductions
        });

        setResult(salary);

    }, [
        level,
        basic,
        fitment,
        city,
        hraPercent,
        tptaType,
        otherAllowances,
        otherDeductions
    ]);

    const otherDeduction7 =
        otherDeductions.reduce((sum, d) => sum + (d.amount7 || 0), 0);

    const otherDeduction8 =
        otherDeductions.reduce((sum, d) => sum + (d.amount8 || 0), 0);

    const pensionDeduction7 =
        pensionType === "NPS"
            ? editableDeductions.nps7
            : gpf.gpf7;

    const pensionDeduction8 =
        pensionType === "NPS"
            ? editableDeductions.nps8
            : gpf.gpf8;

    const adjustedResult = result
        ? {
            ...result,
            seventh: {
                ...result.seventh,
                net:
                    result.seventh.gross -
                    pensionDeduction7 -
                    editableDeductions.cgegis7 -
                    editableDeductions.cghs7 -
                    editableDeductions.tax7 -
                    otherDeduction7
            },
            eighth: {
                ...result.eighth,
                net:
                    result.eighth.gross -
                    pensionDeduction8 -
                    editableDeductions.cgegis8 -
                    editableDeductions.cghs8 -
                    editableDeductions.tax8 -
                    otherDeduction8
            }
        }
        : null;

    return (

        <div className="space-y-6">

            <div className="p-6 text-center space-y-4">
                {/* Title */}
                <h1 className="text-xl md:text-2xl font-semibold tracking-tight md:whitespace-nowrap md:overflow-hidden md:text-ellipsis">
                    <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                        8th CPC Salary Calculator
                    </span>
                </h1>

                {/* Subtitle */}
                <p className="text-xs md:text-sm text-gray-600 mx-auto md:whitespace-nowrap md:overflow-hidden md:text-ellipsis">
                    Estimate your expected salary under the 8th Pay Commission based on projected fitment factors and assumptions.
                </p>

                {/* Premium gradient line */}
                <div className="mx-auto h-[2px] w-40 md:w-56 lg:w-72 bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 rounded-full opacity-80"></div>

            </div>
            {/* CARD */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 space-y-5">

                {/* PAY */}
                <div className="space-y-4">

                    <div className="text-md font-semibold text-gray-500 uppercase">
                        Pay Details
                    </div>

                    {/* LEVEL */}
                    <div>
                        <label className="flex items-center gap-2 text-sm text-gray-700">
                            <Layers size={15} className="text-indigo-500" /> Pay Level
                        </label>

                        <select
                            className="w-full mt-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400"
                            value={level}
                            onChange={(e) => {
                                setLevel(e.target.value);
                                setBasic("");
                            }}
                        >
                            <option value="">Select Level</option>
                            {Object.keys(payMatrix).map(l => {
                                const values = payMatrix[l];
                                return (
                                    <option key={l} value={l}>
                                        {l} (₹{values[0]} - ₹{values.at(-1)})
                                    </option>
                                );
                            })}
                        </select>
                    </div>

                    {/* BASIC */}
                    <div>
                        <label className="flex items-center gap-2 text-sm text-gray-700">
                            <IndianRupee size={15} className="text-emerald-500" /> Current Basic Pay
                        </label>

                        <select
                            disabled={!level}
                            className="w-full mt-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400"
                            value={basic}
                            onChange={(e) => setBasic(e.target.value)}
                        >
                            <option value="">Select Basic</option>
                            {level && payMatrix[level].map(b => (
                                <option key={b}>{b}</option>
                            ))}
                        </select>
                    </div>



                </div>

                {/* LOCATION */}
                <div className="space-y-4">

                    {/* CITY */}
                    <div>
                        <label className="flex items-center gap-2 text-sm text-gray-700">
                            <MapPin size={15} className="text-blue-500" /> City Class
                        </label>

                        <select
                            className="w-full mt-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400"
                            value={city}
                            onChange={(e) => {
                                const c = e.target.value;
                                setCity(c);
                                setHraPercent(hraOptions[c][0]);
                                setTptaType(c === "X" ? "HIGHER" : "OTHER");
                            }}
                        >
                            <option value="X">X</option>
                            <option value="Y">Y</option>
                            <option value="Z">Z</option>
                        </select>
                    </div>

                    {/* HRA */}
                    <div>
                        <label className="flex items-center gap-2 text-sm text-gray-700">
                            <Home size={15} className="text-pink-500" /> HRA % (8 CPC)
                        </label>

                        <select
                            className="w-full mt-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400"
                            value={hraPercent}
                            onChange={(e) => setHraPercent(Number(e.target.value))}
                        >
                            {hraOptions[city].map(h => (
                                <option key={h} value={h}>
                                    {h}% {h === 0 && "(Govt. Accommodation)"}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* TA */}
                    <div>
                        <label className="flex items-center gap-2 text-sm text-gray-700">
                            <Bus size={15} className="text-amber-500" /> Transport Allowance
                        </label>

                        <select
                            className="w-full mt-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400"
                            value={tptaType}
                            onChange={(e) => setTptaType(e.target.value)}
                        >
                            <option value="HIGHER">City Class X</option>
                            <option value="OTHER">City Class Y & Z</option>
                            <option value="PWD_HIGHER">2× City Class X (for PwD)</option>
                            <option value="PWD_OTHER">2× City Class Y & Z (for PwD)</option>
                            <option value="NONE">None</option>
                        </select>
                    </div>

                </div>

                <div>
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                        <ShieldCheck size={15} className="text-indigo-500" />
                        Pension System
                    </label>

                    <div className="mt-2 grid grid-cols-2 gap-3">

                        {[
                            { label: "NPS", value: "NPS" },
                            { label: "OPS", value: "OPS" }
                        ].map((option) => (

                            <label
                                key={option.value}
                                className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm transition cursor-pointer
          ${pensionType === option.value
                                        ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                                        : "border-gray-200 bg-white text-gray-700"
                                    }
        `}
                            >

                                <input
                                    type="radio"
                                    name="pensionType"
                                    value={option.value}
                                    checked={pensionType === option.value}
                                    onChange={() => setPensionType(option.value)}
                                    className="accent-indigo-600"
                                />

                                {option.label}

                            </label>

                        ))}

                    </div>
                </div>

                {/* FITMENT */}
                <FitmentFactorControl
                    fitmentFactor={fitment}
                    setFitmentFactor={setFitment}
                />



                {/* CTA */}
                <button
                    onClick={handleCalculate}
                    className="w-full py-2.5 rounded-lg bg-indigo-600 text-white font-medium 
             hover:bg-indigo-700 active:scale-95 active:translate-y-[1px]
             transition-all duration-150"
                >
                    Calculate Salary
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 space-y-6">

                {result && (
                    <>
                        {/* 🔹 RESULT - HERO SECTION */}
                        <div >
                            <div className="text-center mb-3">
                                <h2 className="text-sm md:text-base font-medium text-indigo-700 tracking-wide">
                                    Projected Salary After 8th CPC
                                </h2>
                            </div>
                            <SalaryIncreaseCard result={adjustedResult} trigger={animateTrigger} />
                        </div>

                        {/* 🔸 Divider */}
                        <div className="flex items-center gap-3">
                            <div className="h-px flex-1 bg-gray-200"></div>
                            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                Detailed Breakdown
                            </span>
                            <div className="h-px flex-1 bg-gray-200"></div>
                        </div>

                        {/* 🔹 BREAKDOWN SECTION */}
                        <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
                            <SalaryBreakdown
                                result={result}
                                pensionType={pensionType}
                                gpf={gpf}
                                setGpf={setGpf}
                                editableDeductions={editableDeductions}
                                setEditableDeductions={setEditableDeductions}
                                otherAllowances={otherAllowances}
                                otherDeductions={otherDeductions}
                                addAllowance={addAllowance}
                                updateAllowance={updateAllowance}
                                removeAllowance={removeAllowance}
                                addDeduction={addDeduction}
                                updateDeduction={updateDeduction}
                                removeDeduction={removeDeduction}
                            />
                        </div>
                    </>
                )}
            </div>

        </div>
    );
}
