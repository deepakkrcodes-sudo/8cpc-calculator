"use client";

export default function EligibilityCard({ data }) {
  if (!data) return null;

  const {
    phase,
    serviceYears,
    isSameState,
    block,
    subBlock,
    homeTownRemaining,
    allIndiaRemaining,
    carryForward,
    carryForwardYear,
    carryForwardType,
  } = data;

  

  // =========================
  // SMART INSIGHT
  // =========================
  const getInsight = () => {
    if (phase === "FIRST_8_YEARS") {
      if (isSameState) {
        return "Only All India LTC allowed in 4th & 8th year. Plan carefully.";
      }
      return "3 Home Town + 1 All India LTC allowed in first 8 years.";
    }

    if (isSameState) {
      return "Only 1 All India LTC allowed per block.";
    }

    return "1 LTC per sub-block + 1 All India per block. Plan distribution smartly.";
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-4 sm:p-5 space-y-4">

      {/* HEADER */}
      <h2 className="text-lg sm:text-xl font-semibold">
        📦 LTC Eligibility
      </h2>

      {/* BASIC INFO */}
      <div className="grid grid-cols-2 gap-3 text-sm sm:text-base">

        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="text-gray-500">Phase</div>
          <div className="font-medium">
            {phase === "FIRST_8_YEARS"
              ? "First 8 Years"
              : "Block Period"}
          </div>
        </div>

        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="text-gray-500">Service</div>
          <div className="font-medium">
            {serviceYears} Years
          </div>
        </div>

        <div className="bg-gray-50 p-3 rounded-lg col-span-2">
          <div className="text-gray-500">Eligibility Type</div>
          <div className="font-medium">
            {isSameState
              ? "Same State (HT not allowed)"
              : "Different State, All India as well as Home Town"}
          </div>
        </div>
      </div>

      {/* BLOCK INFO */}
      {block && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl overflow-hidden text-sm">

          {/* HEADER */}
          <div className="bg-blue-100 text-center font-semibold py-2 text-blue-800">
            Current Block Year: {block.start} – {block.end}
          </div>

          {/* TABLE */}
          <div className="grid grid-cols-3 text-center">

            {/* HEADER ROW */}
            <div className="border p-2 font-medium bg-gray-100">
              Employee Choice
            </div>
            <div className="border p-2 font-medium bg-gray-100">
              Sub Block {block.start} – {block.start + 1}
            </div>
            <div className="border p-2 font-medium bg-gray-100">
              Sub Block {block.start + 2} – {block.end}
            </div>

            {/* OPTION 1 */}
            <div className="border p-2 font-medium">
              Option 1
            </div>
            <div className="border p-2 text-green-700 font-medium">
              Home Town
            </div>
            <div className="border p-2 text-purple-700 font-medium">
              All India
            </div>

            {/* OPTION 2 */}
            <div className="border p-2 font-medium">
              Option 2
            </div>
            <div className="border p-2 text-purple-700 font-medium">
              All India
            </div>
            <div className="border p-2 text-green-700 font-medium">
              Home Town
            </div>

          </div>

          {/* SAME STATE NOTE */}
          {isSameState && (
            <div className="bg-yellow-50 text-yellow-800 text-xs p-2 text-center border-t">
              ⚠ Same State: Only 1 All India LTC allowed in entire block (Home Town not applicable)
            </div>
          )}

        </div>
      )}

      {/* REMAINING */}
      <div className="grid grid-cols-2 gap-0 border border-gray-200 rounded-xl overflow-hidden">

        <div className="col-span-2 bg-blue-50 text-blue-800 text-center font-semibold py-2 border-b border-black">
          Remaining LTCs
        </div>

        {/* HOME TOWN */}
        <div className="bg-green-50 border-r border-gray-200 p-3 text-center">
          <div className="text-green-600 text-sm">Home Town</div>
          <div className="text-xl font-semibold">
            {homeTownRemaining ?? 0}
          </div>
        </div>

        {/* ALL INDIA */}
        <div className="bg-purple-50 p-3 text-center">
          <div className="text-purple-600 text-sm">All India</div>
          <div className="text-xl font-semibold">
            {allIndiaRemaining ?? 0}
          </div>
        </div>

      </div>

      {/* CARRY FORWARD */}
      {carryForward && (
        <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg text-sm">

          <div className="font-medium text-yellow-700">
            ⚠ Carry Forward LTC ({carryForwardType})
          </div>

          <div className="text-gray-700">
            Use in {carryForwardYear} (else it will lapse)
          </div>
        </div>
      )}

      {/* SMART INSIGHT */}
      <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700">
        💡 {getInsight()}
      </div>
    </div>
  );
}