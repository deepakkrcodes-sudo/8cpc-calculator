"use client";

import { useState } from "react";
import LTCForm from "@/components/ltc/LTCForm";
import ResultSection from "@/components/ltc/ResultSection";
import { calculateLTC } from "@/utils/ltc/calculateLTC";
import FAQSection from "@/components/ltc/FAQSection";
import OtherToolsSection from "@/components/tools/OtherToolsSection";



export default function LTCPage() {
    const [formData, setFormData] = useState(null);
    const [result, setResult] = useState(null);

    console.log("FINAL RESULT:", result);

    const handleCalculate = (data) => {
        const output = calculateLTC(data);
        setResult(output);
    };

    return (
        <div className="max-w-[1400px] mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">
                LTC Calculator for Central Govt Employees
            </h1>

            <LTCForm onCalculate={handleCalculate}
                onChange={() => setResult(null)} />

            {result && <ResultSection result={result} />}

            <FAQSection />

            {/* OTHER TOOLS */}
            <div className="bg-gray-100 p-4 rounded-xl shadow-sm hover:shadow-md transition">
                <OtherToolsSection />
            </div>


        </div>
    );
}