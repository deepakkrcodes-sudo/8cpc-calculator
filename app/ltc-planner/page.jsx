"use client";

import { useState } from "react";
import LTCForm from "@/components/ltc/LTCForm";
import ResultSection from "@/components/ltc/ResultSection";
import { calculateLTC } from "@/utils/ltc/calculateLTC";
import FAQSection from "@/components/ltc/FAQSection";
import OtherToolsSection from "@/components/tools/OtherToolsSection";
import { FAQ_DATA } from "@/utils/ltc/faqData";




export default function LTCPage() {
    const [formData, setFormData] = useState(null);
    const [result, setResult] = useState(null);

    console.log("FINAL RESULT:", result);

    const handleCalculate = (data) => {
        const output = calculateLTC(data);
        setResult(output);
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQ_DATA.flatMap(section =>
            section.faqs.map(faq => ({
                "@type": "Question",
                name: faq.q,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: faq.a,
                },
            }))
        ),
    };


    return (
        <div className="max-w-[1400px] mx-auto p-4">
            <div className="text-center mb-6">

                <h1 className="text-2xl md:text-3xl font-bold mb-3">
                    LTC Planner 2026 for Central Government Employees
                </h1>

                <div className="mt-4 text-sm text-gray-600 max-w-3xl mx-auto">
                    <p>
                        This LTC planner helps central government employees calculate Leave Travel Concession eligibility,
                        block year usage, home town and all India travel benefits as per latest rules.
                    </p>
                </div>

                <div className="mt-3 text-xs md:text-sm text-gray-500">
                    Covers Fresh Recruits & Block System &nbsp; | &nbsp;
                    Home Town & All India LTC &nbsp; | &nbsp;
                    Updated as per latest LTC rules
                </div>

            </div>

            <LTCForm onCalculate={handleCalculate}
                onChange={() => setResult(null)} />

            {result && <ResultSection result={result} />}

            <FAQSection />

            {/* OTHER TOOLS */}
            <div className="bg-gray-100 p-4 rounded-xl shadow-sm hover:shadow-md transition">
                <OtherToolsSection />
            </div>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(faqSchema),
                }}
            />


        </div>
    );
}