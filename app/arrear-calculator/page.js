"use client";

import { useState, useMemo } from "react";
import { payMatrix } from "@/data/payMatrix";
import { calculateArrear, generatePeriods } from "@/utils/arrearEngine";
import ArrearSummaryCard from "@/components/arrear/ArrearSummaryCard";
import ArrearTimelineChart from "@/components/arrear/ArrearTimelineChart";
import ArrearBreakdownTable from "@/components/arrear/ArrearBreakdownTable";

export default function ArrearCalculatorPage() {

    // =========================
    // STATE
    // =========================

    const [level, setLevel] = useState("");
    const [basic, setBasic] = useState("");
    const [incrementDate, setIncrementDate] = useState("");
    const [promotionIncrementDate, setPromotionIncrementDate] = useState("");
    const [implementationPeriod, setImplementationPeriod] =
        useState("Jan 2028");

    const [fitmentFactor, setFitmentFactor] =
        useState("");

    const [city, setCity] = useState("X");

    const [hra8Percent, setHra8Percent] =
        useState(24);

    const [tptaType, setTptaType] =
        useState("HIGHER");

    const [promotionApplicable, setPromotionApplicable] =
        useState(false);

    const [promotionLevel, setPromotionLevel] =
        useState("");

    const [promotionBasic, setPromotionBasic] =
        useState("");

    const [promotionDate, setPromotionDate] =
        useState("");

    const [daRates, setDaRates] =
        useState([]);

    const [result, setResult] =
        useState(null);


    // =========================
    // PERIODS
    // =========================

    const periods = useMemo(() => {

        const p =
            generatePeriods(implementationPeriod);

        if (daRates.length !== p.length) {
            setDaRates(Array(p.length).fill(2));
        }

        return p;

    }, [implementationPeriod]);


    // =========================
    // HRA OPTIONS
    // =========================

    const hraOptions = {

        X: [30, 27, 24, 0],
        Y: [20, 18, 16, 0],
        Z: [10, 9, 8, 0]

    };


    const hra7PercentMap = {

        X: 30,
        Y: 20,
        Z: 10

    };


    // =========================
    // CALCULATE
    // =========================

    function handleCalculate() {

        try {

            console.log("Calculate clicked");

            if (!level || !basic || !fitmentFactor) {

                alert("Please fill required fields");
                return;

            }

            const arrear =
                calculateArrear({

                    level,

                    basic: Number(basic),

                    fitmentFactor:
                        Number(fitmentFactor),

                    implementationPeriod,

                    daRates,

                    city,

                    hra7Percent:
                        hra7PercentMap[city],

                    hra8Percent,

                    tptaType,

                    incrementDate:
                        incrementDate || null,

                    promotion:
                        promotionApplicable
                            ? {

                                applicable: true,

                                level:
                                    promotionLevel,

                                basic:
                                    Number(promotionBasic),

                                date:
                                    promotionDate,

                                incrementDate:
                                    promotionIncrementDate || null

                            }
                            : { applicable: false }

                });

            console.log("Arrear result:", arrear);

            setResult(arrear);

        }

        catch (err) {

            console.error(
                "Calculation error:",
                err
            );

            alert(
                "Calculation failed. Check console."
            );

        }

    }


    // =========================
    // UPDATE DA RATE
    // =========================

    function updateDARate(index, value) {

        const copy = [...daRates];
        copy[index] = Number(value);

        setDaRates(copy);

    }


    // =========================
    // UI
    // =========================

    return (

        <div className="space-y-4 pb-10">


            {/* TITLE */}
            <div className="bg-white p-4 rounded-xl shadow-sm">

                <h1 className="text-lg font-semibold text-center">

                    8th CPC Arrear Calculator (Tentative)

                </h1>

            </div>


            {/* BASIC DETAILS */}
            <div className="bg-white p-4 rounded-xl shadow-sm space-y-3">


                {/* PAY LEVEL */}
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

                        {Object.keys(payMatrix).map(l => (
                            <option key={l}>{l}</option>
                        ))}

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
                            onChange={(e) =>
                                setBasic(e.target.value)
                            }
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


                {/* IMPLEMENTATION DATE */}
                <div>

                    <label className="text-sm text-gray-600">
                        Tentative Implementation
                    </label>

                    <select
                        className="w-full border rounded p-2"
                        value={implementationPeriod}
                        onChange={(e) =>
                            setImplementationPeriod(
                                e.target.value
                            )
                        }
                    >

                        <option>July 2027</option>
                        <option>Jan 2028</option>
                        <option>July 2028</option>
                        <option>Jan 2029</option>
                        <option>July 2029</option>

                    </select>

                </div>


                {/* FITMENT */}
                <div>

                    <label className="text-sm text-gray-600">
                        Tentative Fitment Factor
                    </label>

                    <select
                        className="w-full border rounded p-2"
                        value={fitmentFactor}
                        onChange={(e) =>
                            setFitmentFactor(e.target.value)
                        }
                    >

                        <option value="">
                            Select
                        </option>

                        {[1.92, 2.08, 2.86, 3.05, 3.10, 3.15]
                            .map(f => (
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

                            setHra8Percent(
                                hraOptions[
                                e.target.value
                                ][0]
                            );

                        }}
                    >

                        <option value="X">X</option>
                        <option value="Y">Y</option>
                        <option value="Z">Z</option>

                    </select>

                </div>


                {/* HRA */}
                <div>

                    <label className="text-sm text-gray-600">
                        8th CPC HRA %
                    </label>

                    <select
                        className="w-full border rounded p-2"
                        value={hra8Percent}
                        onChange={(e) =>
                            setHra8Percent(
                                Number(e.target.value)
                            )
                        }
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
                        onChange={(e) =>
                            setTptaType(
                                e.target.value
                            )
                        }
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

                <div>

                    <label className="text-sm text-gray-600">
                        Next Increment Date
                    </label>

                    <select
                        className="w-full border rounded p-2"
                        value={incrementDate}
                        onChange={(e) => setIncrementDate(e.target.value)}
                    >

                        <option value="">Select Increment Date</option>

                        <option value="Jan 2026">Jan 2026</option>
                        <option value="July 2026">July 2026</option>
                        <option value="Jan 2027">Jan 2027</option>
                        <option value="July 2027">July 2027</option>
                        <option value="Jan 2028">Jan 2028</option>
                        <option value="July 2028">July 2028</option>
                        <option value="Jan 2029">Jan 2029</option>
                        <option value="July 2029">July 2029</option>

                    </select>

                </div>

            </div>





            {/* DA TABLE */}
            <div className="bg-white p-4 rounded-xl shadow-sm">

                <div className="font-medium mb-2">
                    Expected DA Increases
                </div>

                {periods.map((p, i) => (
                    <div key={i} className="flex justify-between mb-2">

                        <div>{p.label}</div>

                        <select
                            className="border rounded px-2"
                            value={daRates[i]}
                            onChange={(e) =>
                                updateDARate(
                                    i,
                                    e.target.value
                                )
                            }
                        >

                            {[2, 3, 4, 5].map(v => (
                                <option key={v}>
                                    {v}
                                </option>
                            ))}

                        </select>

                    </div>
                ))}

            </div>


            {/* PROMOTION */}
            <div className="bg-white p-4 rounded-xl shadow-sm">

                <label className="flex items-center gap-2">

                    <input
                        type="checkbox"
                        checked={promotionApplicable}
                        onChange={(e) =>
                            setPromotionApplicable(
                                e.target.checked
                            )
                        }
                    />

                    Promotion Applicable

                </label>


                {promotionApplicable && (

                    <div className="space-y-2 mt-3">

                        <select
                            className="w-full border p-2 rounded"
                            onChange={(e) =>
                                setPromotionLevel(
                                    e.target.value
                                )
                            }
                        >

                            <option>
                                Promotion Level
                            </option>

                            {Object.keys(payMatrix)
                                .map(l => (
                                    <option key={l}>
                                        {l}
                                    </option>
                                ))}

                        </select>

                        <select
                            className="w-full border p-2 rounded"
                            value={promotionIncrementDate}
                            onChange={(e) =>
                                setPromotionIncrementDate(e.target.value)
                            }
                        >

                            <option value="">
                                Promotion Increment Date
                            </option>

                            <option value="Jan 2026">Jan 2026</option>
                            <option value="July 2026">July 2026</option>
                            <option value="Jan 2027">Jan 2027</option>
                            <option value="July 2027">July 2027</option>
                            <option value="Jan 2028">Jan 2028</option>
                            <option value="July 2028">July 2028</option>
                            <option value="Jan 2029">Jan 2029</option>
                            <option value="July 2029">July 2029</option>

                        </select>

                        


                        <input
                            type="date"
                            className="w-full border p-2 rounded"
                            onChange={(e) =>
                                setPromotionDate(
                                    e.target.value
                                )
                            }
                        />

                    </div>

                )}

            </div>


            {/* CALCULATE BUTTON */}
            <button
                onClick={handleCalculate}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold shadow"
            >

                Calculate Arrear

            </button>


            {/* RESULT */}
            {result && (

                <div className="bg-white p-4 rounded-xl shadow-sm">

                    <div className="text-center font-semibold text-lg text-green-600">

                        Net Arrear:
                        ₹ {result.totalNetArrear.toLocaleString()}

                    </div>

                    <div className="text-center text-blue-600 mt-1">

                        Gross Arrear:
                        ₹ {result.totalGrossArrear.toLocaleString()}

                    </div>


                    <div className="space-y-4">

                        <ArrearSummaryCard
                            result={result}
                            implementationPeriod={implementationPeriod}
                            fitmentFactor={fitmentFactor}
                        />

                        <ArrearTimelineChart result={result} />

                        <ArrearBreakdownTable result={result} />

                    </div>


                </div>

            )}

        </div>

    );

}