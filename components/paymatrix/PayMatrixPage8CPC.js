"use client";
import { useState } from "react";
import { payMatrix } from "@/data/payMatrix";

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

    <div className="w-full space-y-6">

      


      <div className="rounded-xl border border-gray-200 bg-white shadow-sm px-3 py-3">
        {/* LEVEL SELECTOR */}
        <PayLevelSelector
          level={level}
          setLevel={setLevel}
          payMatrix={payMatrix}
        />


        {/* FITMENT CONTROL */}

        <FitmentFactorControl
          fitmentFactor={fitmentFactor}
          setFitmentFactor={setFitmentFactor}
        />

      </div>


      {/* MATRIX DISPLAY */}

      {level && (

        <PayMatrixDisplay
          level={level}
          matrix={matrix}
        />

      )}

      

    </div>





  );



}
