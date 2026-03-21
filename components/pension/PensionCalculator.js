"use client";

import { useState } from "react";
import { calculatePension } from "@/utils/pensionEngine";

import PensionInputs from "./PensionInputs";
import PensionResults from "./PensionResults";
import PensionResults7 from "./PensionResults7";
export default function PensionCalculator({ mode = "8cpc" }) {

  const [inputs, setInputs] = useState({
    basic: "",
    fitment: 2.86,
    age: 60,
    commutation: 40,
    dr: 60
  });

  const [result, setResult] = useState(null);

  function handleCalculate() {

    console.log("RAW INPUTS:", inputs);

    const basic = Number(inputs.basic);

    console.log("Parsed Basic:", basic);

    const data = calculatePension({
      basic,
      fitment: mode === "8cpc" ? Number(inputs.fitment) : 1,
      age: Number(inputs.age),
      commutation: Number(inputs.commutation),
      dr: Number(inputs.dr),
      mode
    });
    console.log("CALC RESULT:", data);

    setResult(data);

  }

  return (

    <div className="space-y-6">

      <PensionInputs
        inputs={inputs}
        setInputs={setInputs}
        onCalculate={handleCalculate}
        mode={mode}
      />

      {mode === "8cpc" ? (
        <PensionResults result={result} />
      ) : (
        <PensionResults7 result={result} />
      )}
    </div>

  );

}