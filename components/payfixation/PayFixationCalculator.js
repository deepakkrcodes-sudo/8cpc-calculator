"use client";

import { useState } from "react";
import { calculateFixation } from "@/utils/payFixationEngine";

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
    dniDate:"",
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
      currentBasic:Number(form.currentBasic)
    });
    setResult(r);
  }

  return(
    <div className="space-y-6">

      {/* Hero Header */}
      <div className="text-center space-y-4">
        {/* Tag */}
        <div className="inline-flex items-center gap-1 text-[11px] bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full font-medium">
          Pay Fixation Calculator
        </div>

        {/* Title */}
        <h1 className="text-xl md:text-2xl font-semibold tracking-tight md:whitespace-nowrap md:overflow-hidden md:text-ellipsis">
          <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            Promotion Pay Fixation
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xs md:text-sm text-gray-600 mx-auto max-w-lg">
          Compare pay fixation from Date of Promotion vs Date of Next Increment (DNI). The tool calculates month-wise salary difference and interest-adjusted financial impact.
        </p>

        {/* Premium gradient line */}
        <div className="mx-auto h-[2px] w-40 md:w-56 lg:w-72 bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 rounded-full opacity-80"></div>
      </div>

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