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
import OtherToolsSection from "@/components/tools/OtherToolsSection";

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
    const preset = daPresets.find((item) => item.key === presetKey);

    if (!preset) return;

    setDaRates(preset.getValues(periods.length));
  }

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <div className="inline-flex items-center gap-1 text-[11px] bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full font-medium">
        8th CPC Arrear Calculator
      </div>

      <div className="p-2 text-center space-y-4">
        <h1 className="text-xl md:text-2xl font-semibold tracking-tight md:whitespace-nowrap md:overflow-hidden md:text-ellipsis">
          <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            8th CPC Salary Arrear Calculator
          </span>
        </h1>

        <p className="text-xs md:text-sm text-gray-600 mx-auto max-w-3xl">
          Estimate salary arrears from January 2026 using expected fitment factor,
          DA progression, city class, HRA assumptions and increment month.
        </p>

        <div className="mx-auto h-[2px] w-40 md:w-56 lg:w-72 bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 rounded-full opacity-80"></div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 space-y-6">
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
              HRA % (7th CPC Basis)
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
                className="w-full mt-3 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400"
                onChange={(e) => setJoiningDate(e.target.value)}
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

        <div className="bg-white rounded-xl shadow-sm p-6 space-y-5 border border-gray-200">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-gray-800 tracking-tight flex items-center gap-2">
              <TrendingUp size={18} className="text-blue-600" />
              Expected DA Growth
            </h2>
            <div className="h-[2px] w-full bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 rounded-full"></div>
            <p className="text-sm text-gray-500">
              Each row adds cumulatively to the 7th CPC base DA of 58% and the 8th CPC base DA of 0%.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {daPresets.map((preset) => (
              <button
                key={preset.key}
                type="button"
                onClick={() => applyDAPreset(preset.key)}
                className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-700 transition hover:bg-indigo-100"
              >
                {preset.label}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {periods.map((period, index) => (
              <div
                key={period.label}
                className="flex items-center justify-between gap-3 rounded-xl border border-gray-200 px-4 py-3"
              >
                <div>
                  <div className="text-sm font-medium text-gray-800">
                    {period.label}
                  </div>
                </div>

                {index === 0 ? (
                  <select
                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400"
                    value={daRates[index] ?? 2}
                    onChange={(e) => updateDARate(index, Number(e.target.value))}
                  >
                    {daIncreaseOptions.map((item) => (
                      <option key={item} value={item}>
                        {item}%
                      </option>
                    ))}
                  </select>
                ) : (
                  <select
                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400"
                    value={daRates[index] ?? 2}
                    onChange={(e) => updateDARate(index, Number(e.target.value))}
                  >
                    {daIncreaseOptions.map((item) => (
                      <option key={item} value={item}>
                        {item}%
                      </option>
                    ))}
                  </select>
                )}
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
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400"
                  onChange={(e) => setPromotionDate(e.target.value)}
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

      <div className="block bg-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition">
        <OtherToolsSection />
      </div>

      <div className="bg-white rounded-xl shadow-sm p-5 space-y-4">
        <h2 className="text-lg font-semibold">
          Frequently Asked Questions (8th CPC Arrear Calculator)
        </h2>

        <div className="space-y-3 text-sm">
          <p className="text-sm text-gray-600">
            8th CPC arrears depend on multiple factors like fitment factor, DA growth,
            annual increments and promotions. Below are common questions to help you
            understand how arrears are calculated.
          </p>

          <div>
            <h3 className="font-medium">
              What is 8th CPC arrear for salaried employees?
            </h3>
            <p className="text-gray-600">
              Arrear is the difference between salary under the 7th Pay Commission
              and revised salary under the 8th Pay Commission, paid from the
              effective date of implementation.
            </p>
          </div>

          <div>
            <h3 className="font-medium">
              How is 8th CPC arrear calculated?
            </h3>
            <p className="text-gray-600">
              Arrear is calculated by applying the expected fitment factor to your
              basic pay, recalculating allowances like DA and HRA, and summing the
              monthly differences over the arrear period.
            </p>
          </div>

          <div>
            <h3 className="font-medium">
              What is the role of fitment factor in arrear calculation?
            </h3>
            <p className="text-gray-600">
              The fitment factor determines the revised basic pay under the 8th CPC.
              Higher fitment factor leads to higher salary and larger arrears.
            </p>
          </div>

          <div>
            <h3 className="font-medium">
              How does DA progression affect arrears?
            </h3>
            <p className="text-gray-600">
              Dearness Allowance increases over time, so arrears depend on DA rates
              applicable in each period. Higher DA growth results in higher arrears.
            </p>
          </div>

          <div>
            <h3 className="font-medium">
              Does annual increment impact arrears?
            </h3>
            <p className="text-gray-600">
              Yes, annual increments increase basic pay during the arrear period,
              which further increases total arrears.
            </p>
          </div>

          <div>
            <h3 className="font-medium">
              How does promotion affect arrear calculation?
            </h3>
            <p className="text-gray-600">
              Promotion changes your pay level and basic pay, resulting in higher
              revised salary and increased arrears from the promotion date.
            </p>
          </div>

          <div>
            <h3 className="font-medium">
              From which date will 8th CPC arrears be calculated?
            </h3>
            <p className="text-gray-600">
              Arrears are typically calculated from the effective date of the Pay
              Commission, which is expected to be January 2026 or as notified by
              the government.
            </p>
          </div>

          <div>
            <h3 className="font-medium">
              Are allowances included in arrear calculation?
            </h3>
            <p className="text-gray-600">
              Yes, allowances like DA, HRA and Transport Allowance are recalculated
              based on revised basic pay and included in total arrears.
            </p>
          </div>

          <div>
            <h3 className="font-medium">
              Is tax applicable on arrears?
            </h3>
            <p className="text-gray-600">
              Yes, arrears are taxable as per income tax rules. Relief under Section
              89 may be applicable to reduce tax burden.
            </p>
          </div>

          <div>
            <h3 className="font-medium">
              Can this calculator give exact arrear amount?
            </h3>
            <p className="text-gray-600">
              This calculator provides a close estimate based on assumptions like
              fitment factor and DA growth. Actual arrears may vary as per official
              government orders.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function getLevelNumber(level) {
  return Number(level?.replace("L", "") || 0);
}
