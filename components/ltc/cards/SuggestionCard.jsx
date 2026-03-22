export default function SuggestionCard({ data }) {
  if (!data) return null;

  const { carryForward, remaining, warnings } = data;

  const homeTown = remaining?.homeTown ?? 0;
  const allIndia = remaining?.allIndia ?? 0;

  const hasCarry = carryForward?.carryForwardAvailable;

  const hasPending =
    homeTown > 0 || allIndia > 0 || hasCarry;

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 space-y-5">

      {/* HEADER */}
      <div className="border-b pb-3 flex items-center gap-2">
        💡
        <div>
          <h2 className="text-lg font-semibold">
            Recommendation
          </h2>
          <p className="text-xs text-gray-500">
            Smart advice based on your LTC usage
          </p>
        </div>
      </div>

      {/* WARNINGS */}
      {warnings?.length > 0 && (
        <div className="bg-red-50/60 rounded-lg p-4 space-y-1">
          <div className="text-sm font-semibold text-red-700">
            ⚠ Important
          </div>

          {warnings.map((w, i) => (
            <div key={i} className="text-sm text-gray-700">
              • {w}
            </div>
          ))}
        </div>
      )}

      {/* MAIN MESSAGE */}
      <div className="bg-green-50/60 rounded-lg p-5 text-center">

        {hasPending ? (
          <>
            <div className="text-sm text-gray-600 flex justify-center gap-1">
              📌 What You Should Do
            </div>

            <div className="text-lg font-semibold text-green-700 mt-1">
              {buildSuggestionText(homeTown, allIndia, carryForward)}
            </div>
          </>
        ) : (
          <>
            <div className="text-sm text-gray-600">
              ✔ Great Planning
            </div>

            <div className="text-lg font-semibold text-green-700 mt-1">
              You have successfully utilized all your LTC benefits.
            </div>

            {carryForward?.nextBlock?.start && (
              <div className="text-xs text-gray-500 mt-2">
                You will be eligible again in next block (
                {carryForward.nextBlock.start}–{carryForward.nextBlock.end})
              </div>
            )}
          </>
        )}
      </div>

      {/* SUMMARY */}
      <div className="bg-blue-50/50 rounded-lg p-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-blue-700 mb-2">
          📊 Quick Summary
        </div>

        <div className="divide-y">
          <Row
            label="Home Town LTC Remaining"
            value={formatRemaining(homeTown, "HT")}
          />

          <Row
            label="All India LTC Remaining"
            value={formatRemaining(allIndia, "AI")}
          />
        </div>
      </div>

      {/* CARRY FORWARD */}
      {hasCarry && (
        <div className="bg-yellow-50/60 rounded-lg p-4">
          <div className="text-sm font-semibold text-yellow-700 mb-1">
            ⏳ Action Required
          </div>

          <p className="text-sm text-gray-700">
            You can carry forward 1 LTC. Use it before{" "}
            <span className="font-medium">
              {carryForward?.usageRules?.expiryYear}
            </span>{" "}
            or it will lapse.
          </p>
        </div>
      )}
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between py-2 text-sm">
      <span className="text-gray-600">{label}</span>
      <span className="font-medium text-gray-800">
        {value}
      </span>
    </div>
  );
}

function formatRemaining(value, type) {
  if (value === 0) {
    return type === "HT"
      ? "No Home Town LTC remaining"
      : "No All India LTC remaining";
  }

  return `${value} remaining`;
}

function buildSuggestionText(homeTown, allIndia, carryForward) {

  // BOTH AVAILABLE
  if (homeTown > 0 && allIndia > 0) {
    return `You have ${homeTown} Home Town and ${allIndia} All India LTC remaining. Plan usage before block ends.`;
  }

  // ONLY HT
  if (homeTown > 0) {
    return `You still have ${homeTown} Home Town LTC remaining. Use before expiry year.`;
  }

  // ONLY AI
  if (allIndia > 0) {
    return `You still have ${allIndia} All India LTC remaining. Consider planning long-distance travel.`;
  }

  // CONVERSION CASE
  if (allIndia > 0 && homeTown === 0) {
    return `You can convert eligible LTC to All India LTC for better utilization.`;
  }

  // CARRY FORWARD
  if (carryForward?.carryForwardAvailable) {
    return `You can carry forward 1 LTC. Use it in ${carryForward.usageRules.expiryYear}.`;
  }

  return "";
}