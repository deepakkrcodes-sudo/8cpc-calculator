"use client";

import { useState } from "react";
import { payMatrix } from "@/data/payMatrix";
import { calculate7CPCSalary } from "@/utils/seventhSalaryEngine";
import SalaryBreakdown7 from "./SalaryBreakdown7";

import {
    Layers,
    IndianRupee,
    MapPin,
    Home,
    Bus
} from "lucide-react";

export default function SeventhSalaryCalculatorPremium() {

    const [level, setLevel] = useState("");
    const [basic, setBasic] = useState("");

    const [city, setCity] = useState("X");
    const [hraPercent, setHraPercent] = useState(30);
    const [tptaType, setTptaType] = useState("HIGHER");

    const [otherAllowances, setOtherAllowances] = useState([]);
    const [otherDeductions, setOtherDeductions] = useState([]);

    const [result, setResult] = useState(null);
    const [pensionType, setPensionType] = useState("NPS");
    const [gpf, setGpf] = useState(0);
    const [editableDeductions, setEditableDeductions] = useState({
        nps: 0,
        cgegis: 0,
        cghs: 0,
        tax: 0
    });

    function addAllowance() {
        setOtherAllowances([
            ...otherAllowances,
            { label: "", amount: 0 }
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
            { label: "", amount: 0 }
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

    const hraOptions = {
        X: [30, 27, 24, 0],
        Y: [20, 18, 16, 0],
        Z: [10, 9, 8, 0]
    };

    function handleCalculate() {

        if (!level || !basic) {
            alert("Please fill required fields");
            return;
        }

        const salary = calculate7CPCSalary({
            level,
            basic: Number(basic),
            daPercent: 60,
            hraPercent,
            city,
            tptaType
        });

        if (!salary) return;

        setResult(salary);
        setGpf(Math.round((salary.basic + salary.da) * 0.06));
        setEditableDeductions({
            nps: salary.nps,
            cgegis: salary.cgegis,
            cghs: salary.cghs,
            tax: salary.tax
        });
    }

    return (

        <div className="space-y-6">

            {/* TAG → LEFT */}
            
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-3 sm:p-5 lg:p-6 space-y-4 sm:space-y-4">

                <div className="space-y-4">

                    <div className="text-md font-semibold text-gray-500 uppercase">
                        Pay Details
                    </div>

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
                            {Object.keys(payMatrix).map((l) => {
                                const values = payMatrix[l];
                                return (
                                    <option key={l} value={l}>
                                        {l} (Rs {values[0]} - Rs {values.at(-1)})
                                    </option>
                                );
                            })}
                        </select>
                    </div>

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
                            {level && payMatrix[level].map((b) => (
                                <option key={b}>{b}</option>
                            ))}
                        </select>
                    </div>

                </div>

                <div className="space-y-4">

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

                    <div>
                        <label className="flex items-center gap-2 text-sm text-gray-700">
                            <Home size={15} className="text-pink-500" /> HRA %
                        </label>

                        <select
                            className="w-full mt-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400"
                            value={hraPercent}
                            onChange={(e) => setHraPercent(Number(e.target.value))}
                        >
                            {hraOptions[city].map((h) => (
                                <option key={h} value={h}>
                                    {h}% {h === 0 && "(Govt. Accommodation)"}
                                </option>
                            ))}
                        </select>
                    </div>

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
                            <option value="PWD_HIGHER">2x City Class X (for PwD)</option>
                            <option value="PWD_OTHER">2x City Class Y & Z (for PwD)</option>
                            <option value="NONE">None (Govt. Accomodation)</option>
                        </select>
                    </div>

                </div>

                <button
                    onClick={handleCalculate}
                    className="w-full py-2.5 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
                >
                    Calculate Salary
                </button>

            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 space-y-5">

                {result && (

                    <div className="space-y-5">

                        <SalaryBreakdown7
                            result={result}
                            pensionType={pensionType}
                            setPensionType={setPensionType}
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

                )}
            </div>

        </div>
    );
}
