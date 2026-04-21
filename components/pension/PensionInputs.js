"use client";

import FitmentFactorControl from "./FitmentFactorControl";

import {
  IndianRupee,
  User,
  Repeat,
  TrendingUp
} from "lucide-react";

export default function PensionInputs({
  inputs,
  setInputs,
  onCalculate,
  mode
}) {

  function update(field, value) {
    
    setInputs(prev => ({ ...prev, [field]: value }));
  }

  return (

    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-5 lg:p-6 space-y-6">

      <h2 className="text-lg font-semibold">
        Pension Details
      </h2>

      <div className="grid md:grid-cols-2 gap-4">

        <div>

          <label className="text-sm text-gray-600 flex items-center gap-2 mb-1">
            <IndianRupee size={16} className="text-green-600" />
            Basic Pay at Retirement
          </label>

          <input
            type="number"
            placeholder="Example: 60000"
            value={inputs.basic}
            onChange={(e) => update("basic", e.target.value)}
            className="w-full border rounded-lg p-2"
          />

        </div>


        <div>
          <label className="text-sm text-gray-600 flex items-center gap-2 mb-1">
            <User size={16} className="text-blue-500" />
            Age at Retirement
          </label>

          <input
            type="number"
            value={inputs.age}
            onChange={(e) => update("age", e.target.value)}
            className="w-full border rounded-lg p-2"
          />

        </div>


        <div>

          <label className="text-sm text-gray-600 flex items-center gap-2 mb-1">
            <Repeat size={16} className="text-purple-500" />
            Commutation %
          </label>

          <select
            value={inputs.commutation}
            onChange={(e) => update("commutation", e.target.value)}
            className="w-full border rounded-lg p-2"
          >

            <option value="40">40%</option>
            <option value="30">30%</option>
            <option value="20">20%</option>

          </select>

        </div>


        <div>

          <label className="text-sm text-gray-600 flex items-center gap-2 mb-1">
            <TrendingUp size={16} className="text-orange-500" />
            Dearness Relief %
            
          </label>

          <input
            type="number"
            value={
              mode === "7cpc"
                ? inputs.dr7 ?? 58
                : inputs.dr8 ?? 0
            }
            onChange={(e) =>
              update(
                mode === "7cpc" ? "dr7" : "dr8",
                Number(e.target.value)
              )
            }
            className="w-full border rounded-lg p-2"
          />

        </div>

      </div>

      {mode === "8cpc" && (
        <FitmentFactorControl
          fitmentFactor={inputs.fitment}
          setFitmentFactor={(v) => update("fitment", v)}
        />
      )}

      <button
        onClick={onCalculate}
        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
      >
        Calculate Pension
      </button>

    </div>

  );

}