import React, { useState } from "react";
import BasicInfoForm from "./BasicInfoForm";
import LTCHistoryTable from "./LTCHistoryTable";
import ResultSection from "./ResultSection";
import { useEffect } from "react";
import { getEligibility } from "@/utils/ltc/eligibilityEngine";

export default function LTCForm({ onCalculate, onChange }) {

    const [basicInfo, setBasicInfo] = useState({});
    const [history, setHistory] = useState([]);
    const [error, setError] = useState("");
    const [eligibility, setEligibility] = useState(null);

    useEffect(() => {
        if (!basicInfo?.doj) return;

        const result = getEligibility(basicInfo);
        setEligibility(result);

    }, [basicInfo?.doj, basicInfo?.hometown, basicInfo?.office]);
    // ✅ VALIDATION
    const isFormValid =
        basicInfo?.doj &&
        basicInfo?.hometown &&
        basicInfo?.office &&
        basicInfo?.payLevel;

    // ✅ BUTTON HANDLER
    const updateField = (field, value) => {
        setBasicInfo((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleCalculate = () => {

        if (!basicInfo?.doj) {
            setError("Please select year of joining");
            return;
        }

        if (!isFormValid) {
            setError("Please fill all required fields");
            return;
        }
        setError("");

        // 🔥 CALL PARENT FUNCTION
        onCalculate({
            basicInfo,
            history,
        });


    };

    useEffect(() => {
        setHistory([]); // 🔥 RESET history when DOJ changes
    }, [basicInfo?.doj]);

    useEffect(() => {
        onChange?.();
    }, [basicInfo, history]);

    return (
        <div className="bg-white p-4 rounded-xl shadow space-y-4">

            {/* BASIC INFO */}
            <BasicInfoForm
                onChange={setBasicInfo}
                form={basicInfo}   // ✅ FIXED
                updateField={updateField}
                setError={setError}
            />

            {basicInfo?.doj && (
                <div className="mt-2 text-xs">
                    {(() => {
                        const currentYear = new Date().getFullYear();
                        const serviceYears =
                            currentYear - Number(basicInfo.doj);

                        if (serviceYears <= 8) {
                            return (
                                <span className="text-green-600 font-medium">
                                    🟢 You are Fresh Recruit, First 8 Years (Special LTC Rules Apply)
                                </span>
                            );
                        }

                        return (
                            <span className="text-blue-600 font-medium">
                                🔵 You are in Regular LTC Block System
                            </span>
                        );
                    })()}
                </div>
            )}

            {/* HISTORY */}
            <LTCHistoryTable

                basicInfo={basicInfo}
                eligibility={eligibility}
                onChange={setHistory}
            />

            {/* ERROR */}
            {error && (
                <div className="bg-yellow-50 border border-yellow-200 text-sm text-yellow-700 p-3 rounded-lg">
                    ⚠ {error}
                </div>
            )}

            {/* BUTTON */}
            <button
                onClick={handleCalculate}
                disabled={!isFormValid}
                className={`w-full py-2 rounded font-medium transition ${isFormValid
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
            >
                Check LTC Eligibility
            </button>


            

        </div>
    );
}