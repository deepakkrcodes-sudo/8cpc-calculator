"use client";

import { useState } from "react";
import PensionInputForm from "@/components/pensionArrear/PensionInputForm";
import ResultSummaryCard from "@/components/pensionArrear/ResultSummaryCard";
import ArrearBreakdownTable from "@/components/pensionArrear/ArrearBreakdownTable";
import { calculatePensionArrear } from "@/utils/pensionArrearUtils";
import OtherToolsSection from "@/components/tools/OtherToolsSection";

export default function PensionArrearCalculatorPage() {

  const [results, setResults] = useState(null);

  const handleCalculate = (formData) => {
    const calculation = calculatePensionArrear(formData);
    setResults(calculation);
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

      <div className="inline-block text-[11px] bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full font-medium">
        Pension Arrear Calculator
      </div>
      {/* Title */}
      <h1 className="text-xl md:text-2xl font-semibold text-center tracking-tight md:whitespace-nowrap md:overflow-hidden md:text-ellipsis">
        <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
          8th CPC Pension Arrear Calculator
        </span>
      </h1>

      {/* Subtitle */}
      <p className="text-xs md:text-sm text-gray-600 text-center mt-2 mx-auto md:whitespace-nowrap md:overflow-hidden md:text-ellipsis">
        Estimate pension increase and arrears from January 2026 based on expected fitment factor and DA progression.
      </p>

      {/* Premium gradient line */}
      <div className="mx-auto mt-3 h-[2px] w-40 md:w-56 lg:w-72 bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 rounded-full opacity-80"></div>

      <PensionInputForm onCalculate={handleCalculate} />

      {results && (
        <>
          <ResultSummaryCard summary={results.summary} />
          <ArrearBreakdownTable breakdown={results.breakdown} />
        </>
      )}

      <div className="block bg-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition">
        <OtherToolsSection />
      </div>

      <div className="bg-white rounded-xl shadow-sm p-5 space-y-4">

        <h2 className="text-lg font-semibold">
          Frequently Asked Questions (8th CPC Pension Arrear)
        </h2>

        <div className="space-y-3 text-sm">

          <p className="text-sm text-gray-600">
            8th CPC pension arrears depend on fitment factor, DR revisions and
            commutation status. Understanding these factors helps estimate total
            arrears accurately.
          </p>

          <div>
            <h3 className="font-medium">
              What is 8th CPC pension arrear?
            </h3>
            <p className="text-gray-600">
              Pension arrear is the difference between pension calculated under
              the 7th Pay Commission and revised pension under the 8th CPC,
              payable from the effective date of implementation.
            </p>
          </div>

          <div>
            <h3 className="font-medium">
              How is 8th CPC pension arrear calculated?
            </h3>
            <p className="text-gray-600">
              It is calculated by applying the fitment factor to basic pension,
              recalculating Dearness Relief (DR) for each period, and summing
              the monthly differences over the arrear duration.
            </p>
          </div>

          <div>
            <h3 className="font-medium">
              What is the role of fitment factor in pension arrears?
            </h3>
            <p className="text-gray-600">
              Fitment factor increases the basic pension. A higher fitment factor
              results in higher revised pension and larger arrears.
            </p>
          </div>

          <div>
            <h3 className="font-medium">
              How does Dearness Relief (DR) affect pension arrears?
            </h3>
            <p className="text-gray-600">
              DR is revised periodically, so arrears depend on DR rates applicable
              in each time period. Higher DR increases total arrear amount.
            </p>
          </div>

          <div>
            <h3 className="font-medium">
              Are arrears paid as a lump sum?
            </h3>
            <p className="text-gray-600">
              Yes, pension arrears are usually paid as a lump sum amount after
              implementation of the Pay Commission.
            </p>
          </div>

          <div>
            <h3 className="font-medium">
              Does commuted pension affect arrears?
            </h3>
            <p className="text-gray-600">
              Yes, arrears are calculated only on the remaining pension after
              commutation, since DR is not applicable on the commuted portion.
            </p>
          </div>

          <div>
            <h3 className="font-medium">
              From which date will 8th CPC pension arrears be calculated?
            </h3>
            <p className="text-gray-600">
              Arrears are expected to be calculated from January 2026 or the
              official implementation date announced by the government.
            </p>
          </div>

          <div>
            <h3 className="font-medium">
              Will DR be recalculated for arrear period?
            </h3>
            <p className="text-gray-600">
              Yes, DR is recalculated for each period based on revised pension,
              which significantly impacts total arrears.
            </p>
          </div>

          <div>
            <h3 className="font-medium">
              Is tax applicable on pension arrears?
            </h3>
            <p className="text-gray-600">
              Yes, pension arrears are taxable. However, relief under Section 89
              may be available to reduce the tax burden.
            </p>
          </div>

          <div>
            <h3 className="font-medium">
              Can this calculator provide exact arrear amount?
            </h3>
            <p className="text-gray-600">
              The calculator provides an estimate based on expected fitment factor
              and DR progression. Actual arrears may vary as per official orders.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}