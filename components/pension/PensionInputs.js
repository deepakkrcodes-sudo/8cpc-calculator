"use client";

import FitmentFactorControl from "./FitmentFactorControl";

export default function PensionInputs({
  inputs,
  setInputs,
  onCalculate,
  mode
}) {

  function update(field, value) {
    console.log("INPUT UPDATE:", field, value);
    setInputs(prev => ({ ...prev, [field]: value }));
  }

  return (

    <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">

      <h2 className="text-lg font-semibold">
        Pension Details
      </h2>

      <div className="grid md:grid-cols-2 gap-4">

        <div>

          <label className="text-sm text-gray-600">
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

          <label className="text-sm text-gray-600">
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

          <label className="text-sm text-gray-600">
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

          <label className="text-sm text-gray-600">
            Dearness Relief %
          </label>

          <input
            type="number"
            value={inputs.dr}
            onChange={(e) => update("dr", e.target.value)}
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