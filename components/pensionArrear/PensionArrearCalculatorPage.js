"use client";

import { useState } from "react";
import PensionInputForm from "@/components/pensionArrear/PensionInputForm";
import ResultSummaryCard from "@/components/pensionArrear/ResultSummaryCard";
import ArrearBreakdownTable from "@/components/pensionArrear/ArrearBreakdownTable";
import { calculatePensionArrear } from "@/utils/pensionArrearUtils";

export default function PensionArrearCalculatorPage() {

  const [results, setResults] = useState(null);

  const handleCalculate = (formData) => {
    const calculation = calculatePensionArrear(formData);
    setResults(calculation);
  };

  return (

   
    <div className="w-full space-y-6">

      <PensionInputForm onCalculate={handleCalculate} />

      {results && (
        <>
          <ResultSummaryCard summary={results.summary} />
          <ArrearBreakdownTable breakdown={results.breakdown} />
        </>
      )}

    </div>

  );
}