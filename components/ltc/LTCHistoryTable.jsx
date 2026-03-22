import { useEffect, useState } from "react";

export default function LTCHistoryTable({ basicInfo, onChange }) {
    const [rows, setRows] = useState([]);
    const [info, setInfo] = useState("");
    const [unknown, setUnknown] = useState(false);

    useEffect(() => {
        if (!basicInfo?.doj) return;

        const currentYear = new Date().getFullYear();
        const joiningYear = new Date(basicInfo.doj).getFullYear();

        const serviceYears = currentYear - joiningYear;

        let relevantYears = [];

        // =========================
        // FIRST 8 YEARS
        // =========================
        if (serviceYears <= 8) {
            const startYear = Math.max(joiningYear + 1, currentYear - 3);

            for (let y = startYear; y <= currentYear; y++) {
                relevantYears.push(y);
            }
        }

        // =========================
        // BLOCK PERIOD
        // =========================
        else {
            const blockStart =
                Math.floor((currentYear - 2018) / 4) * 4 + 2018;

            for (let y = blockStart; y <= currentYear; y++) {
                relevantYears.push(y);
            }
        }

        const isSameState =
            basicInfo?.hometown?.toLowerCase() ===
            basicInfo?.office?.toLowerCase();

        const generated = generateRows(
            relevantYears,
            joiningYear,
            isSameState
        );

        setRows(generated);
        onChange(generated);

    }, [basicInfo]);

    // 🔹 Toggle handler
    const handleToggle = () => {
        const newVal = !unknown;
        setUnknown(newVal);

        if (newVal) {
            // Assume NONE for all
            const reset = rows.map((r) => ({
                ...r,
                type: "NONE",
            }));
            onChange(reset);
        } else {
            onChange(rows);
        }
    };

    const updateRow = (index, value) => {
        const updated = [...rows];
        updated[index].type = value;
        setRows(updated);
        onChange(updated);
    };

    const generateRows = (years, joiningYear, isSameState) => {
        return years.map((year) => {
            const serviceYear = year - joiningYear;

            let disabled = false;
            let allowedTypes = ["NONE", "HT", "AI", "CONVERTED"];

            if (isSameState) {
                if (serviceYear === 4 || serviceYear === 8) {
                    allowedTypes = ["NONE", "AI"];
                } else {
                    disabled = true;
                    allowedTypes = ["NONE"];
                }
            }

            return {
                year,
                type: "NONE",
                disabled,
                allowedTypes,
            };
        });
    };

    const isSameState =
        basicInfo?.hometown?.toLowerCase() ===
        basicInfo?.office?.toLowerCase();

    

    return (
        <div className="bg-white p-4 rounded-xl shadow-sm space-y-4 mt-4">

            {/* HEADER */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-sm font-semibold text-gray-800">
                        LTC History
                    </h2>
                    <p className="text-xs text-gray-500">{info}</p>
                </div>

                {/* TOGGLE */}
                <button
                    onClick={handleToggle}
                    className={`text-xs px-3 py-1 rounded-full border ${unknown
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-gray-100 text-gray-600"
                        }`}
                >
                    Not Sure
                </button>
            </div>

            {/* WHEN UNKNOWN */}
            {unknown ? (
                <div className="bg-blue-50/60 rounded-lg p-3 text-sm text-gray-700">
                    🤖 We’ll assume you have not used LTC recently and calculate based on maximum eligibility.
                </div>
            ) : (
                <>
                    {/* ROWS */}
                    <div className="space-y-3">
                        {rows.map((row, i) => (
                            <div
                                key={i}
                                className={`border rounded-lg p-3 flex items-center justify-between ${row.disabled ? "bg-gray-100 opacity-70" : "bg-gray-50"
                                    }`}
                            >

                                {/* YEAR */}
                                <div className="text-sm font-medium text-gray-700">
                                    {row.year}
                                </div>

                                {/* SELECT */}
                                <select
                                    value={row.type}
                                    disabled={row.disabled}
                                    onChange={(e) => updateRow(i, e.target.value)}
                                    className="border rounded px-2 py-1 text-sm disabled:bg-gray-200"
                                >
                                    {row.allowedTypes.map((t) => (
                                        <option key={t} value={t}>
                                            {t === "NONE"
                                                ? row.disabled
                                                    ? "Not Eligible"
                                                    : "Not Availed"
                                                : t === "HT"
                                                    ? "Home Town"
                                                    : t === "AI"
                                                        ? "All India"
                                                        : "Converted"}
                                        </option>
                                    ))}
                                </select>

                            </div>
                        ))}
                    </div>

                    {/* TIP */}
                    <div className="bg-blue-50/60 rounded-lg p-3 text-xs text-gray-700">
                        💡 Tip: If unsure, turn on "Not Sure" and we’ll estimate for you.
                    </div>
                </>
            )}
        </div>
    );
}