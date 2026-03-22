"use client";


export default function EligibilityCard({ data }) {
  if (!data) return null;

  const {
    phase,
    serviceYear,
    isSameState,
    block,
    subBlock,
    homeTownRemaining,
    allIndiaRemaining,
    carryForward,
    carryForwardYear,
  } = data;

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-4 sm:p-5">
      {/* HEADER */}
      <h2 className="text-lg sm:text-xl font-semibold mb-4">
        📦 LTC Eligibility
      </h2>

      {/* BASIC INFO */}
      <div className="grid grid-cols-2 gap-3 text-sm sm:text-base mb-4">
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="text-gray-500">Phase</div>
          <div className="font-medium">
            {phase === "FIRST_8_YEARS"
              ? "First 8 Years"
              : "Block Period"}
          </div>
        </div>

        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="text-gray-500">Service Year</div>
          <div className="font-medium">{serviceYear}</div>
        </div>

        <div className="bg-gray-50 p-3 rounded-lg col-span-2">
          <div className="text-gray-500">Home Town vs HQ</div>
          <div className="font-medium">
            {isSameState
              ? "Same State (No Home Town LTC)"
              : "Different State"}
          </div>
        </div>
      </div>

      {/* BLOCK INFO */}
      {block && (
        <div className="mb-4 bg-blue-50 border border-blue-100 p-3 rounded-lg text-sm sm:text-base">
          <div className="text-blue-600 font-medium">
            Block: {block.start} - {block.end}
          </div>
          <div className="text-gray-600">
            {subBlock === "FIRST_SUB_BLOCK"
              ? "First Sub-Block (1st–2nd Year)"
              : "Second Sub-Block (3rd–4th Year)"}
          </div>
        </div>
      )}

      {/* REMAINING LTC */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-green-50 border border-green-100 p-3 rounded-lg text-center">
          <div className="text-green-600 text-sm">Home Town</div>
          <div className="text-xl font-semibold">
            {homeTownRemaining ?? 0}
          </div>
        </div>

        <div className="bg-purple-50 border border-purple-100 p-3 rounded-lg text-center">
          <div className="text-purple-600 text-sm">All India</div>
          <div className="text-xl font-semibold">
            {allIndiaRemaining ?? 0}
          </div>
        </div>
      </div>

      {/* CARRY FORWARD */}
      {carryForward && (
        <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg text-sm sm:text-base">
          <div className="font-medium text-yellow-700">
            ⚠ Carry Forward Available
          </div>
          <div className="text-gray-700">
            Use in {carryForwardYear} (else it will lapse)
          </div>
        </div>
      )}
    </div>
  );
}