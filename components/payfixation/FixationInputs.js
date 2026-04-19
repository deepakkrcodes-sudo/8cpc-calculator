"use client";

import { payMatrix } from "@/data/payMatrix";
import {
    Layers,
    IndianRupee,
    TrendingUp,
    Calendar,
    CalendarCheck,
    Percent,
    Home,
    Bus,
    Clock,
    Banknote
} from "lucide-react";

export default function FixationInputs({ form, setForm, onCalculate }) {

  function update(field, value) {
    setForm({ ...form, [field]: value });
  }

  return (
    <div className="space-y-6">

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 md:p-6 space-y-6">
        
        {/* PAY DETAILS */}
        <div className="space-y-4">
          <div className="text-sm font-bold text-gray-500 uppercase border-b pb-2 tracking-wider">
            Pay & Promotion Details
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* CURRENT PAY LEVEL */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <Layers size={16} className="text-indigo-500" /> Current Pay Level
              </label>
              <select
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-shadow outline-none"
                value={form.currentLevel}
                onChange={(e) => {
                  setForm({
                    ...form,
                    currentLevel: e.target.value,
                    currentBasic: ""
                  });
                }}
              >
                <option value="">Select Level</option>
                {Object.keys(payMatrix).map(l => {
                  const values = payMatrix[l];
                  return (
                    <option key={l} value={l}>
                      {l} (₹{values[0].toLocaleString()} - ₹{values[values.length - 1].toLocaleString()})
                    </option>
                  );
                })}
              </select>
            </div>

            {/* BASIC */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <IndianRupee size={16} className="text-emerald-500" /> Current Basic Pay
              </label>
              <select
                disabled={!form.currentLevel}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-shadow outline-none disabled:bg-gray-50 disabled:text-gray-400"
                value={form.currentBasic}
                onChange={(e) => update("currentBasic", e.target.value)}
              >
                <option value="">Select Basic</option>
                {form.currentLevel &&
                  payMatrix[form.currentLevel]?.map(b => (
                    <option key={b} value={b}>
                      ₹ {b.toLocaleString()}
                    </option>
                  ))}
              </select>
            </div>

            {/* PROMOTION LEVEL */}
            <div className="md:col-span-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <TrendingUp size={16} className="text-purple-500" /> Promotion Pay Level
              </label>
              <select
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-shadow outline-none"
                value={form.promotionLevel}
                onChange={(e) => update("promotionLevel", e.target.value)}
              >
                <option value="">Select Promotion Level</option>
                {Object.keys(payMatrix).map(l => {
                  const values = payMatrix[l];
                  return (
                    <option key={l} value={l}>
                      {l} (₹{values[0].toLocaleString()} - ₹{values[values.length - 1].toLocaleString()})
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>

        {/* DATES */}
        <div className="space-y-4 pt-2">
          <div className="text-sm font-bold text-gray-500 uppercase border-b pb-2 tracking-wider">
            Important Dates
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* PROMOTION DATE */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <Calendar size={16} className="text-blue-500" /> Promotion Date
              </label>
              <input
                type="date"
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-shadow outline-none"
                value={form.promotionDate}
                onChange={(e) => update("promotionDate", e.target.value)}
              />
            </div>

            {/* DNI */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <CalendarCheck size={16} className="text-rose-500" /> Date of Next Increment (Old Level)
              </label>
              <input
                type="date"
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-shadow outline-none"
                value={form.dniDate}
                onChange={(e) => update("dniDate", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* ALLOWANCES & SIMULATION */}
        <div className="space-y-4 pt-2">
          <div className="text-sm font-bold text-gray-500 uppercase border-b pb-2 tracking-wider">
            Allowances & Simulation
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* DA */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <Percent size={16} className="text-orange-500" /> Dearness Allowance (%)
              </label>
              <input
                type="number"
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-shadow outline-none"
                value={form.daPercent}
                onChange={(e) => update("daPercent", e.target.value)}
              />
            </div>

            {/* HRA */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <Home size={16} className="text-pink-500" /> HRA (%)
              </label>
              <input
                type="number"
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-shadow outline-none"
                value={form.hraPercent}
                onChange={(e) => update("hraPercent", e.target.value)}
              />
            </div>

            {/* TPTA */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <Bus size={16} className="text-amber-500" /> Transport Allowance Category
              </label>
              <select
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-shadow outline-none"
                value={form.tptaType}
                onChange={(e) => update("tptaType", e.target.value)}
              >
                <option value="HIGHER">Higher TPTA City</option>
                <option value="OTHER">Other City</option>
                <option value="NONE">None</option>
              </select>
            </div>

            {/* SIMULATION */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <Clock size={16} className="text-teal-500" /> Simulation Period (Months)
              </label>
              <input
                type="number"
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-shadow outline-none"
                value={form.months}
                onChange={(e) => update("months", e.target.value)}
              />
            </div>

            {/* INTEREST */}
            <div className="md:col-span-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <Banknote size={16} className="text-green-600" /> Interest Rate on Arrears (%)
              </label>
              <input
                type="number"
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-shadow outline-none"
                value={form.interestRate}
                onChange={(e) => update("interestRate", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* CALCULATE */}
        <button
          onClick={onCalculate}
          className="w-full py-3 mt-6 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold text-base hover:from-indigo-700 hover:to-blue-700 transition shadow-md hover:shadow-lg active:scale-[0.99]"
        >
          Compare Pay Fixation Options
        </button>

      </div>

    </div>
  );
}