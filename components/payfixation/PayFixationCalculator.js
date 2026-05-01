"use client";

import { useState } from "react";
import { calculateFixation } from "@/utils/payFixationEngine";
import { payMatrix } from "@/data/payMatrix";

import FixationInputs from "./FixationInputs";
import FixationSummary from "./FixationSummary";
import FixationTable from "./FixationTable";
import FixationChart from "./FixationChart";

export default function PayFixationCalculator(){

  const [form,setForm]=useState({
    currentLevel:"",
    currentBasic:"",
    promotionLevel:"",
    promotionDate:"",
    incrementMonth:"JULY",
    daPercent:60,
    hraPercent:30,
    tptaType:"HIGHER",
    months:36,
    interestRate:4
  });

  const [result,setResult]=useState(null);

  function handleCalculate(){
    const r=calculateFixation({
      ...form,
      currentBasic:Number(form.currentBasic),
      payMatrix
    });
    setResult(r);
  }

  return(
    <div className="space-y-6">

      {/* Hero Header */}
      

      <FixationInputs
        form={form}
        setForm={setForm}
        onCalculate={handleCalculate}
      />

      {result && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <FixationSummary result={result}/>
          <FixationTable timeline={result.timeline}/>
          <FixationChart data={result.timeline}/>
        </div>
      )}

    </div>
  );
}
