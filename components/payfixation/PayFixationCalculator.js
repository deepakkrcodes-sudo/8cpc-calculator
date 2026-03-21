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

<FixationInputs
form={form}
setForm={setForm}
onCalculate={handleCalculate}
/>

<FixationSummary result={result}/>

<FixationTable timeline={result?.timeline}/>

<FixationChart data={result?.timeline}/>

</div>

);

}