"use client";
import { useState } from "react";
import { payMatrix } from "@/data/payMatrix";
import OtherToolsSection from "@/components/tools/OtherToolsSection";
import FAQSection8CPCPayMatrix from "@/components/paymatrix/FAQSection8CPCPayMatrix";
import PayLevelSelector from "@/components/paymatrix/PayLevelSelector";
import PayMatrixDisplay from "@/components/paymatrix/PayMatrixDisplay";
import FitmentFactorControl from "@/components/paymatrix/FitmentFactorControl";


export default function PayMatrix8Page() {

  const [level, setLevel] = useState("");

  const [fitmentFactor, setFitmentFactor] = useState(2.86);

  const matrix =
    level
      ? payMatrix[level].map(v =>
        Math.round(v * fitmentFactor)
      )
      : [];

  return (

    <div className="max-w-3xl mx-auto px-4 space-y-6">

      {/* HERO */}

      <div className="text-center space-y-2">

        <h1 className="text-2xl font-bold">
          8th CPC Pay Matrix (Projected)
        </h1>

        <p className="text-gray-600 text-sm">
          Estimate the projected pay matrix based on expected
          8th Pay Commission fitment factor.
        </p>

      </div>


      {/* FITMENT CONTROL */}

      <FitmentFactorControl
        fitmentFactor={fitmentFactor}
        setFitmentFactor={setFitmentFactor}
      />


      {/* LEVEL SELECTOR */}

      <PayLevelSelector
        level={level}
        setLevel={setLevel}
        payMatrix={payMatrix}
      />


      {/* MATRIX DISPLAY */}

      {level && (

        <PayMatrixDisplay
          level={level}
          matrix={matrix}
        />

      )}

      <div className="block bg-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition">
        <OtherToolsSection />
      </div>


      <FAQSection8CPCPayMatrix />


    </div>





  );



}
