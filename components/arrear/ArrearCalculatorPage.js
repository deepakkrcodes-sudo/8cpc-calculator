"use client";

import { useState, useMemo } from "react";
import { payMatrix } from "@/data/payMatrix";
import { generatePeriods } from "@/utils/arrearPeriodGenerator";
import { calculateArrear } from "@/utils/arrearEngine";
import ArrearSummaryCard from "@/components/arrear/ArrearSummaryCard";
import ArrearTimelineChart from "@/components/arrear/ArrearTimelineChart";
import ArrearBreakdownTable from "@/components/arrear/ArrearBreakdownTable";
import OtherToolsSection from "@/components/tools/OtherToolsSection";
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
            <div >

                <h1 className="text-xl font-bold">

                    8th CPC Arrear Calculator

                </h1>

            </div>

            <p className="text-gray-600 text-sm mt-2 max-w-2xl mx-auto text-center">
                Estimate arrears from January 2026
                based on expected fitment factor and DA progression.
            </p>

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

                        {[1.92, 2.08, 2.86, 3.05, 3.10, 3.15, 3.20, 3.25]
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

                        {i === 0 ? (

                            <div className="text-black-500 text-m align-left px-5 py-0.5 rounded bg-gray-100">
                                2%
                            </div>

                        ) : (

                            <select
                                className="border rounded px-2"
                                value={daRates[i - 1] ?? 2}
                                onChange={(e) =>
                                    updateDARate(
                                        i - 1,
                                        Number(e.target.value)
                                    )
                                }
                            >

                                {[2, 3, 4, 5].map(v => (
                                    <option key={v} value={v}>
                                        {v}%
                                    </option>
                                ))}

                            </select>

                        )}

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


            <div className="block bg-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition">
                <OtherToolsSection />
            </div>


            <div className="bg-white rounded-xl shadow-sm p-5 space-y-4">

                <h2 className="text-lg font-semibold">
                    Frequently Asked Questions (8th CPC Arrear Calculator)
                </h2>

                <div className="space-y-3 text-sm">

                    <p className="text-sm text-gray-600">
                        8th CPC arrears depend on multiple factors like fitment factor, DA growth,
                        annual increments and promotions. Below are common questions to help you
                        understand how arrears are calculated.
                    </p>

                    <div>
                        <h3 className="font-medium">
                            What is 8th CPC arrear for salaried employees?
                        </h3>
                        <p className="text-gray-600">
                            Arrear is the difference between salary under the 7th Pay Commission
                            and revised salary under the 8th Pay Commission, paid from the
                            effective date of implementation.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-medium">
                            How is 8th CPC arrear calculated?
                        </h3>
                        <p className="text-gray-600">
                            Arrear is calculated by applying the expected fitment factor to your
                            basic pay, recalculating allowances like DA and HRA, and summing the
                            monthly differences over the arrear period.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-medium">
                            What is the role of fitment factor in arrear calculation?
                        </h3>
                        <p className="text-gray-600">
                            The fitment factor determines the revised basic pay under the 8th CPC.
                            Higher fitment factor leads to higher salary and larger arrears.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-medium">
                            How does DA progression affect arrears?
                        </h3>
                        <p className="text-gray-600">
                            Dearness Allowance increases over time, so arrears depend on DA rates
                            applicable in each period. Higher DA growth results in higher arrears.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-medium">
                            Does annual increment impact arrears?
                        </h3>
                        <p className="text-gray-600">
                            Yes, annual increments increase basic pay during the arrear period,
                            which further increases total arrears.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-medium">
                            How does promotion affect arrear calculation?
                        </h3>
                        <p className="text-gray-600">
                            Promotion changes your pay level and basic pay, resulting in higher
                            revised salary and increased arrears from the promotion date.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-medium">
                            From which date will 8th CPC arrears be calculated?
                        </h3>
                        <p className="text-gray-600">
                            Arrears are typically calculated from the effective date of the Pay
                            Commission, which is expected to be January 2026 or as notified by
                            the government.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-medium">
                            Are allowances included in arrear calculation?
                        </h3>
                        <p className="text-gray-600">
                            Yes, allowances like DA, HRA and Transport Allowance are recalculated
                            based on revised basic pay and included in total arrears.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-medium">
                            Is tax applicable on arrears?
                        </h3>
                        <p className="text-gray-600">
                            Yes, arrears are taxable as per income tax rules. Relief under Section
                            89 may be applicable to reduce tax burden.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-medium">
                            Can this calculator give exact arrear amount?
                        </h3>
                        <p className="text-gray-600">
                            This calculator provides a close estimate based on assumptions like
                            fitment factor and DA growth. Actual arrears may vary as per official
                            government orders.
                        </p>
                    </div>

                </div>

            </div>

        </div>

    );

}