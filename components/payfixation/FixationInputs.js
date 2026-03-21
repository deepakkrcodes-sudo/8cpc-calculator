"use client";

import { payMatrix } from "@/data/payMatrix";

export default function FixationInputs({ form, setForm, onCalculate }) {

  function update(field, value) {
    setForm({ ...form, [field]: value });
  }

  return (

    <div className="space-y-4">

      {/* TITLE */}
      <div>
        <h1 className="text-lg font-semibold text-center">
          Pay Fixation Comparison Calculator
        </h1>
      </div>


      {/* INPUT CARD */}
      <div className="bg-white p-4 rounded-xl shadow-sm space-y-4">


        {/* PAY LEVEL */}
        <div>

          <label className="text-sm text-gray-600">
            Current Pay Level
          </label>

          <select
            className="w-full border rounded p-2"
            value={form.currentLevel}
            onChange={(e) => {

              const level = e.target.value;

              setForm({
                ...form,
                currentLevel: level,
                currentBasic: ""
              });

            }}
          >

            <option value="">
              Select Level
            </option>

            {Object.keys(payMatrix).map(l => {

              const values = payMatrix[l];
              const first = values[0];
              const last = values[values.length - 1];

              const label =
                `${l} (₹${first.toLocaleString()} - ₹${last.toLocaleString()})`;

              return (
                <option key={l} value={l}>
                  {label}
                </option>
              );

            })}

          </select>

        </div>



        {/* BASIC */}
        {form.currentLevel && (

          <div>

            <label className="text-sm text-gray-600">
              Current Basic Pay
            </label>

            <select
              className="w-full border rounded p-2"
              value={form.currentBasic}
              onChange={(e) => update("currentBasic", e.target.value)}
            >

              <option value="">
                Select Basic
              </option>

              {form.currentLevel &&
                payMatrix[form.currentLevel]?.map(b => (
                  <option key={b} value={b}>
                    ₹ {b.toLocaleString()}
                  </option>
                ))}

            </select>

          </div>

        )}



        {/* PROMOTION LEVEL */}
        <div>

          <label className="text-sm text-gray-600">
            Promotion Pay Level
          </label>

          <select
            className="w-full border rounded p-2"
            value={form.promotionLevel}
            onChange={(e) => update("promotionLevel", e.target.value)}
          >

            <option value="">
              Select Promotion Level
            </option>

            {Object.keys(payMatrix).map(l => {

              const values = payMatrix[l];
              const first = values[0];
              const last = values[values.length - 1];

              const label =
                `${l} (₹${first.toLocaleString()} - ₹${last.toLocaleString()})`;

              return (
                <option key={l} value={l}>
                  {label}
                </option>
              );

            })}

          </select>

        </div>



        {/* PROMOTION DATE */}
        <div>

          <label className="text-sm text-gray-600">
            Promotion Date
          </label>

          <input
            type="date"
            className="w-full border rounded p-2"
            value={form.promotionDate}
            onChange={(e) => update("promotionDate", e.target.value)}
          />

        </div>



        {/* DNI */}
        <div>

          <label className="text-sm text-gray-600">
            Next Increment Date (Old Level)
          </label>

          <input
            type="date"
            className="w-full border rounded p-2"
            value={form.dniDate}
            onChange={(e) => update("dniDate", e.target.value)}
          />

        </div>



        {/* DA */}
        <div>

          <label className="text-sm text-gray-600">
            Dearness Allowance (%)
          </label>

          <input
            type="number"
            className="w-full border rounded p-2"
            value={form.daPercent}
            onChange={(e) => update("daPercent", e.target.value)}
          />

        </div>



        {/* HRA */}
        <div>

          <label className="text-sm text-gray-600">
            HRA (%)
          </label>

          <input
            type="number"
            className="w-full border rounded p-2"
            value={form.hraPercent}
            onChange={(e) => update("hraPercent", e.target.value)}
          />

        </div>



        {/* TPTA */}
        <div>

          <label className="text-sm text-gray-600">
            Transport Allowance Category
          </label>

          <select
            className="w-full border rounded p-2"
            value={form.tptaType}
            onChange={(e) => update("tptaType", e.target.value)}
          >

            <option value="HIGHER">
              Higher TPTA City
            </option>

            <option value="OTHER">
              Other City
            </option>

            <option value="NONE">
              None
            </option>

          </select>

        </div>



        {/* SIMULATION */}
        <div>

          <label className="text-sm text-gray-600">
            Simulation Period (Months)
          </label>

          <input
            type="number"
            className="w-full border rounded p-2"
            value={form.months}
            onChange={(e) => update("months", e.target.value)}
          />

        </div>



        {/* INTEREST */}
        <div>

          <label className="text-sm text-gray-600">
            Interest Rate (%)
          </label>

          <input
            type="number"
            className="w-full border rounded p-2"
            value={form.interestRate}
            onChange={(e) => update("interestRate", e.target.value)}
          />

        </div>



        {/* CALCULATE */}
        <button
          onClick={onCalculate}
          className="w-full bg-blue-600 text-white py-2 rounded font-medium"
        >
          Compare Pay Fixation Options
        </button>

      </div>

    </div>

  );

}