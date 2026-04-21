"use client";

import { useMemo, useState } from "react";
import {
  Bus,
  CalendarClock,
  GitBranchPlus,
  Clock,
  Home,
  IndianRupee,
  Layers,
  MapPin,
  Sparkles,
  TrendingUp
} from "lucide-react";
import { payMatrix } from "@/data/payMatrix";
import { generatePeriods } from "@/utils/arrearPeriodGenerator";
import { calculateArrear, getPromotionPreview } from "@/utils/arrearEngine";
import FitmentFactorControl from "@/components/calculator/FitmentFactorControl";
import PremiumArrearSummaryCard from "@/components/arrear/PremiumArrearSummaryCard";
import ArrearTimelineChart from "@/components/arrear/ArrearTimelineChart";
import ArrearBreakdownTable from "@/components/arrear/ArrearBreakdownTable";


const incrementMonthOptions = [
  { value: "Jan 2026", label: "January" },
  { value: "July 2026", label: "July" }
];

const joiningOptions = [
  { value: "before", label: "Before 1 Jan 2026" },
  { value: "after", label: "Joined After 1 Jan 2026" }
];

const daIncreaseOptions = [2, 3, 4, 5];
const defaultImplementationPeriod = "Jan 2028";
const payFixationOptions = [
  { value: "promotion_date", label: "Date of Promotion" },
  { value: "dni", label: "DNI" }
];

const daPresets = [
  {
    key: "conservative",
    label: "Conservative",
    getValues: (length) => Array(length).fill(2)
  },
  {
    key: "balanced",
    label: "Balanced",
    getValues: (length) => Array.from({ length }, (_, index) => [2, 3, 3, 4][index] ?? 4)
  },
  {
    key: "optimistic",
    label: "Optimistic",
    getValues: (length) => Array.from({ length }, (_, index) => [2, 3, 4, 5][index] ?? 5)
  }
];

export default function ArrearCalculatorPage() {
  const [level, setLevel] = useState("");
  const [basic, setBasic] = useState("");
  const [incrementDate, setIncrementDate] = useState("Jan 2026");
  const [joiningType, setJoiningType] = useState("before");
  const [joiningDate, setJoiningDate] = useState("");
  const [implementationPeriod, setImplementationPeriod] = useState(defaultImplementationPeriod);
  const [fitmentFactor, setFitmentFactor] = useState(2.28);
  const [city, setCity] = useState("X");
  const [hraPercent, setHraPercent] = useState(30);
  const [tptaType, setTptaType] = useState("HIGHER");
  const [promotionApplicable, setPromotionApplicable] = useState(false);
  const [promotionLevel, setPromotionLevel] = useState("");
  const [payFixation, setPayFixation] = useState("promotion_date");
  const [promotionDate, setPromotionDate] = useState("");
  const [daRates, setDaRates] = useState(
    () => Array(generatePeriods(defaultImplementationPeriod).length).fill(2)
  );
  const [result, setResult] = useState(null);
  const [selectedPreset, setSelectedPreset] = useState(null);

  const periods = generatePeriods(implementationPeriod);
  const currentLevelNumber = getLevelNumber(level);
  const promotionLevelOptions = Object.keys(payMatrix).filter(
    (item) => getLevelNumber(item) > currentLevelNumber
  );
  const promotionPreview = useMemo(
    () =>
      getPromotionPreview({
        level,
        basic: Number(basic),
        incrementDate,
        joiningType,
        joiningDate,
        promotion: {
          applicable: promotionApplicable,
          level: promotionLevel,
          date: promotionDate,
          payFixation
        }
      }),
    [
      level,
      basic,
      incrementDate,
      joiningType,
      joiningDate,
      promotionApplicable,
      promotionLevel,
      promotionDate,
      payFixation
    ]
  );

  const hraOptions = {
    X: [30, 0],
    Y: [20, 0],
    Z: [10, 0]
  };

  const hra7PercentMap = {
    X: 30,
    Y: 20,
    Z: 10
  };

  function handleCalculate() {
    try {
      if (!level || !basic || !fitmentFactor) {
        alert("Please fill required fields");
        return;
      }

      if (joiningType === "after" && !joiningDate) {
        alert("Please select joining date");
        return;
      }

      if (promotionApplicable) {
        if (!promotionDate || !promotionLevel) {
          alert("Please complete promotion details");
          return;
        }

        if (getLevelNumber(promotionLevel) <= getLevelNumber(level)) {
          alert("Promotion level must be higher than the current pay level");
          return;
        }
      }

      const arrear = calculateArrear({
        level,
        basic: Number(basic),
        fitmentFactor: Number(fitmentFactor),
        implementationPeriod,
        daRates,
        hra7Percent: hraPercent,
        tptaType,
        incrementDate: incrementDate || null,
        joiningType,
        joiningDate,
        promotion: promotionApplicable
          ? {
            applicable: true,
            level: promotionLevel,
            date: promotionDate,
            payFixation
          }
          : { applicable: false }
      });

      setResult(arrear);
    } catch (err) {
      console.error("Calculation error:", err);
      alert("Calculation failed. Check console.");
    }
  }

  function updateDARate(index, value) {
    const copy = [...daRates];
    copy[index] = Number(value);
    setDaRates(copy);
  }

  function handleImplementationPeriodChange(value) {
    const nextPeriods = generatePeriods(value);

    setImplementationPeriod(value);
    setDaRates((previousRates) =>
      nextPeriods.map((_, index) => previousRates[index] ?? 2)
    );
  }

  function applyDAPreset(presetKey) {
    setSelectedPreset(presetKey);
    const preset = daPresets.find((item) => item.key === presetKey);

    if (!preset) return;

    setDaRates(preset.getValues(periods.length));
  }

  return (
    <div className="w-full space-y-6 text-left">


      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-3 sm:p-5 lg:p-6 space-y-6">
        <div className="space-y-4">
          <div className="text-md font-semibold text-gray-500 uppercase">
            Pay Details
          </div>

          <div>
            <label htmlFor="arrear-pay-level" className="flex items-center gap-2 text-sm text-gray-700">
              <Layers size={15} className="text-indigo-500" />
              Pay Level (As on 1 Jan 2026)
            </label>
            <select
              id="arrear-pay-level"
              className="w-full mt-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400"
              value={level}
              onChange={(e) => {
                setLevel(e.target.value);
                setBasic("");
              }}
            >
              <option value="">Select Level</option>
              {Object.keys(payMatrix).map((item) => {
                const values = payMatrix[item];
                return (
                  <option key={item} value={item}>
                    {item} ({values[0]} - {values.at(-1)})
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <label htmlFor="arrear-basic-pay" className="flex items-center gap-2 text-sm text-gray-700">
              <IndianRupee size={15} className="text-emerald-500" />
              Basic Pay (As on 1 Jan 2026)
            </label>
            <select
              id="arrear-basic-pay"
              disabled={!level}
              className="w-full mt-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400"
              value={basic}
              onChange={(e) => setBasic(e.target.value)}
            >
              <option value="">Select Basic</option>
              {level &&
                payMatrix[level].map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
            </select>
          </div>


        </div>

        <div className="space-y-4">


          <div>
            <label htmlFor="arrear-city-class" className="flex items-center gap-2 text-sm text-gray-700">
              <MapPin size={15} className="text-blue-500" />
              City Class
            </label>
            <select
              id="arrear-city-class"
              className="w-full mt-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400"
              value={city}
              onChange={(e) => {
                const selectedCity = e.target.value;
                setCity(selectedCity);
                setHraPercent(hraOptions[selectedCity][0]);
                setTptaType(selectedCity === "X" ? "HIGHER" : "OTHER");
              }}
            >
              <option value="X">X</option>
              <option value="Y">Y</option>
              <option value="Z">Z</option>
            </select>
          </div>

          <div>
            <label htmlFor="arrear-hra-percent" className="flex items-center gap-2 text-sm text-gray-700">
              <Home size={15} className="text-pink-500" />
              HRA % (7th CPC)
            </label>
            <select
              id="arrear-hra-percent"
              className="w-full mt-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400"
              value={hraPercent}
              onChange={(e) => setHraPercent(Number(e.target.value))}
            >
              {hraOptions[city].map((item) => (
                <option key={item} value={item}>
                  {item}%
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="arrear-transport-allowance" className="flex items-center gap-2 text-sm text-gray-700">
              <Bus size={15} className="text-amber-500" />
              Transport Allowance
            </label>
            <select
              id="arrear-transport-allowance"
              className="w-full mt-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400"
              value={tptaType}
              onChange={(e) => setTptaType(e.target.value)}
            >
              <option value="HIGHER">Higher TPTA</option>
              <option value="OTHER">Other City</option>
              <option value="PWD_HIGHER">2x Higher TPTA (for PwD)</option>
              <option value="PWD_OTHER">2x Other City (for PwD)</option>
              <option value="NONE">None</option>
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <CalendarClock size={15} className="text-purple-500" />
              Increment Month
            </label>
            <div className="mt-2 grid grid-cols-2 gap-3">
              {incrementMonthOptions.map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm transition ${incrementDate === option.value
                    ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                    : "border-gray-200 bg-white text-gray-700"
                    }`}
                >
                  <input
                    id={`increment-month-${option.label.toLowerCase()}`}
                    type="radio"
                    name="incrementMonth"
                    value={option.value}
                    checked={incrementDate === option.value}
                    onChange={(e) => setIncrementDate(e.target.value)}
                    className="accent-indigo-600"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <CalendarClock size={15} className="text-indigo-500" />
              Joining Timeline
            </label>
            <div className="mt-2 grid gap-3 sm:grid-cols-2">
              {joiningOptions.map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm transition ${joiningType === option.value
                    ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                    : "border-gray-200 bg-white text-gray-700"
                    }`}
                >
                  <input
                    type="radio"
                    name="joiningType"
                    value={option.value}
                    checked={joiningType === option.value}
                    onChange={(e) => setJoiningType(e.target.value)}
                    className="accent-indigo-600"
                  />
                  {option.label}
                </label>
              ))}
            </div>
            {joiningType === "after" && (
              <input
                id="arrear-joining-date"
                type="date"
                value={joiningDate}
                min="2026-01-02"
                onChange={(e) => setJoiningDate(e.target.value)}
                onClick={(e) => e.target.showPicker && e.target.showPicker()}
                className="w-full mt-3 cursor-pointer rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400"
              />
            )}
          </div>
        </div>

        <div>
          <label htmlFor="arrear-implementation-period" className="flex items-center gap-2 text-sm text-gray-700">
            <Clock size={15} className="text-blue-500" />
            Tentative Implementation
          </label>
          <select
            id="arrear-implementation-period"
            className="w-full mt-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400"
            value={implementationPeriod}
            onChange={(e) => handleImplementationPeriodChange(e.target.value)}
          >
            <option value="July 2027">July 2027</option>
            <option value="Jan 2028">Jan 2028</option>
            <option value="July 2028">July 2028</option>
            <option value="Jan 2029">Jan 2029</option>
            <option value="July 2029">July 2029</option>
          </select>
        </div>

        <div className="p-1 sm:p-1 lg:p-1 space-y-4 sm:space-y-5">

          <div className="space-y-2">
            <h2 className="text-base sm:text-lg font-semibold text-gray-800 tracking-tight flex items-center gap-2">
              <TrendingUp size={18} className="text-blue-600" />
              Expected DA Growth
            </h2>

            <div className="h-[2px] w-full bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 rounded-full"></div>

            <p className="text-xs sm:text-sm text-left text-gray-500">
              Each row adds cumulatively to the 7th CPC base DA of 58% and the 8th CPC base DA of 0%.
            </p>
          </div>

          {/* PRESETS */}
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {daPresets.map((preset) => {
              const isActive = selectedPreset === preset.key;

              return (
                <button
                  key={preset.key}
                  type="button"
                  onClick={() => applyDAPreset(preset.key)}
                  className={`rounded-md border transition font-medium leading-none
          px-1.5 py-[2px] text-[10px]
          sm:px-2.5 sm:py-1 sm:text-xs

          ${isActive
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                      : "bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100"
                    }
        `}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>
          {/* ROWS */}
          <div className="space-y-2 sm:space-y-3">
            {periods.map((period, index) => (
              <div
                key={period.label}
                className="flex items-center justify-between gap-2 sm:gap-3 rounded-lg border border-gray-200 px-2 sm:px-4 py-2 sm:py-3"
              >

                <div className="text-sm font-medium text-gray-800">
                  {period.label}
                </div>

                <select
                  className="rounded-md border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-sm focus:ring-2 focus:ring-indigo-400"
                  value={daRates[index] ?? 2}
                  onChange={(e) => updateDARate(index, Number(e.target.value))}
                >
                  {daIncreaseOptions.map((item) => (
                    <option key={item} value={item}>
                      {item}%
                    </option>
                  ))}
                </select>

              </div>
            ))}
          </div>

        </div>



        <FitmentFactorControl
          fitmentFactor={fitmentFactor}
          setFitmentFactor={setFitmentFactor}
        />

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <input
              id="promotionApplicable"
              type="checkbox"
              checked={promotionApplicable}
              onChange={(e) => setPromotionApplicable(e.target.checked)}
              className="h-4 w-4 rounded accent-indigo-600"
            />
            <label
              htmlFor="promotionApplicable"
              className="flex items-center gap-2 text-sm font-medium text-gray-700"
            >
              <Sparkles size={15} className="text-violet-500" />
              Promotion Applicable
            </label>
          </div>
          <p className="text-xs text-gray-500">
            (If promotion falls between January 2026 and the tentative implementation date.)
          </p>

          {promotionApplicable && (
            <div className="grid gap-3 rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <GitBranchPlus size={15} className="text-violet-500" />
                Promotion Details
              </label>
              <div className="w-full">
                <label
                  htmlFor="promotion-level"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Promotion Date
                </label>

                <input
                  id="promotion-date"
                  type="date"
                  value={promotionDate}
                  onChange={(e) => setPromotionDate(e.target.value)}
                  onClick={(e) => e.target.showPicker && e.target.showPicker()}
                  className="w-full cursor-pointer rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400"
                />
              </div>

              <div className="w-full">
                <label
                  htmlFor="promotion-level"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Promoted Pay Level
                </label>

                <select
                  id="promotion-level"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-md focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                  value={promotionLevel}
                  onChange={(e) => setPromotionLevel(e.target.value)}
                >
                  <option value="">Select Promotion Level</option>

                  {promotionLevelOptions.map((item) => {
                    const values = payMatrix[item];

                    return (
                      <option key={item} value={item}>
                        {item} ({values[0]} - {values.at(-1)})
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="w-full">
                <label
                  htmlFor="promotion-level"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Promoted Basic Pay (Auto-Calculated)
                </label>

                <select
                  id="promotion-basic"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400"
                  value={promotionPreview.basic}
                  disabled
                >
                  <option value="">
                    {promotionLevel ? "Calculated Promotion Basic" : "Select Promotion Level First"}
                  </option>
                  {promotionPreview.options.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>

              </div>



              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-700">
                  Pay Fixation
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {payFixationOptions.map((option) => (
                    <label
                      key={option.value}
                      className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm transition ${payFixation === option.value
                        ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                        : "border-gray-200 bg-white text-gray-700"
                        }`}
                    >
                      <input
                        type="radio"
                        name="payFixation"
                        value={option.value}
                        checked={payFixation === option.value}
                        onChange={(e) => setPayFixation(e.target.value)}
                        className="accent-indigo-600"
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </div>

              {promotionPreview.basic ? (
                <p className="text-xs text-gray-500">
                  Promotion basic is auto-fixed to {promotionPreview.basic} based on the selected pay fixation rule.
                </p>
              ) : null}
            </div>
          )}
        </div>

        <button
          onClick={handleCalculate}
          className="w-full py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
        >
          Calculate Arrear
        </button>
      </div>

      {result && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 space-y-5">
          <PremiumArrearSummaryCard
            result={result}
            implementationPeriod={implementationPeriod}
            fitmentFactor={fitmentFactor}
          />
          <ArrearTimelineChart result={result} />
          <ArrearBreakdownTable result={result} />
        </div>
      )}

    </div>
  );
}

function getLevelNumber(level) {
  return Number(level?.replace("L", "") || 0);
}
