"use client";

import { useState } from "react";
import LTCForm from "@/components/ltc/LTCForm";
import ResultSection from "@/components/ltc/ResultSection";
import { calculateLTC } from "@/utils/ltc/calculateLTC";

import { FAQ_DATA } from "@/utils/ltc/faqData";

export default function LTCPageClient() {
  const [result, setResult] = useState(null);

  const handleCalculate = (data) => {
    const output = calculateLTC(data);
    setResult(output);
  };

  

  

  return (
    <>
      

      <LTCForm onCalculate={handleCalculate} onChange={() => setResult(null)} />

      {result && <ResultSection result={result} />}

      

      
    </>
  );
}