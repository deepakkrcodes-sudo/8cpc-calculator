"use client";

import { useState } from "react";
import LTCForm from "@/components/ltc/LTCForm";
import ResultSection from "@/components/ltc/ResultSection";
import { calculateLTC } from "@/utils/ltc/calculateLTC";
import FAQSection from "@/components/ltc/FAQSection";
import OtherToolsSection from "@/components/tools/OtherToolsSection";
import { FAQ_DATA } from "@/utils/ltc/faqData";

export default function LTCPageClient() {
  const [result, setResult] = useState(null);

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

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "LTC Planner",
    url: "https://8cpccalculator.com/ltc-planner",
    applicationCategory: "FinanceApplication",
    operatingSystem: "All",
    description: "LTC planner for central government employees.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />

      <LTCForm onCalculate={handleCalculate} onChange={() => setResult(null)} />

      {result && <ResultSection result={result} />}

      <FAQSection />

      <div className="bg-gray-100 p-4 rounded-xl shadow-sm">
        <OtherToolsSection />
      </div>
    </>
  );
}