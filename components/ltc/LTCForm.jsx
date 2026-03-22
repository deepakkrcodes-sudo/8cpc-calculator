import React, { useState } from "react";
import BasicInfoForm from "./BasicInfoForm";
import LTCHistoryTable from "./LTCHistoryTable";
import ResultSection from "./ResultSection";
import { useEffect } from "react";

export default function LTCForm({ onCalculate, onChange }) {

    const [basicInfo, setBasicInfo] = useState({});
    const [history, setHistory] = useState([]);
    const [error, setError] = useState("");

    // ✅ VALIDATION
    const isFormValid =
        basicInfo?.doj &&
        basicInfo?.hometown &&
        basicInfo?.office &&
        basicInfo?.payLevel;

    // ✅ BUTTON HANDLER
    const handleCalculate = () => {

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
            onChange?.();   
        }, [basicInfo, history]);

    return (
        <div className="bg-white p-4 rounded-xl shadow space-y-4">

            {/* BASIC INFO */}
            <BasicInfoForm onChange={setBasicInfo} />

            {/* HISTORY */}
            <LTCHistoryTable
                basicInfo={basicInfo}
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