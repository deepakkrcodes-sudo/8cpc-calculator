export default function SuggestionCard({ data }) {
  if (!data) return null;

  const { carryForward, remaining, warnings, type, message, advice, next } = data;

  const homeTown = remaining?.homeTown ?? 0;
  const allIndia = remaining?.allIndia ?? 0;

  const hasCarry = carryForward?.carryForwardAvailable;

  const hasPending =
    homeTown > 0 || allIndia > 0 || hasCarry;

  const suggestion =
    message
      ? { message, advice, type }
      : buildSuggestionText(homeTown, allIndia, carryForward, eligibility);

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-5 space-y-5">

      {/* HEADER */}
      <div className="border-b pb-3 flex items-center gap-2">
        <span className="text-lg">💡</span>
        <div>
          <h2 className="text-lg font-semibold">
            Recommendation
          </h2>
          <p className="text-xs text-gray-500">
            Smart advice based on your current LTC window
          </p>
        </div>
      </div>

      {/* WARNINGS */}
      {warnings?.length > 0 && (
        <div className="bg-red-50 border border-red-100 rounded-xl p-4 space-y-1">
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

      {/* MAIN DECISION CARD */}
      <div
        className={`rounded-xl p-5 text-center transition-all
        ${hasPending
            ? "bg-green-50 border border-green-100"
            : "bg-gray-50 border border-gray-200"
          }`}
      >
        {hasPending ? (
          <>
            <div className="text-sm text-gray-600 flex justify-center gap-1">
              📌 What You Should Do
            </div>

            <div className="text-lg font-semibold text-green-700 mt-1">
              {suggestion.message}
            </div>

            {suggestion.advice && (
              <div className="text-sm text-gray-600 mt-2">
                {suggestion.advice}
              </div>
            )}

            
          </>
        ) : (
          <>
            <div className="text-sm text-gray-600">
              ✔ Great Planning
            </div>

            <div className="text-lg font-semibold text-green-700 mt-1">
              You have successfully utilized all your LTC benefits.
            </div>

            {next && (
              <div className="text-xs text-gray-500 mt-2">
                {next}
              </div>
            )}
          </>
        )}
      </div>

      {/* SUMMARY */}
      <div className="bg-blue-50/60 rounded-xl p-4 border border-blue-100">
        <div className="flex items-center gap-2 text-sm font-semibold text-blue-700 mb-2">
          📊 Current Status
        </div>

        <div className="divide-y">
          <Row
            label="Home Town LTC"
            value={formatRemaining(homeTown, "HT")}
          />
          <Row
            label="All India LTC"
            value={formatRemaining(allIndia, "AI")}
          />
        </div>
      </div>

      {/* CARRY FORWARD */}
      {hasCarry && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">

          <div className="text-sm font-semibold text-yellow-700 mb-1">
            ⏳ Action Required
          </div>

          <p className="text-sm text-gray-700">
            You can carry forward 1 LTC. Use it before{" "}
            <span className="font-medium">
              {carryForward?.usageRules?.mustUseBy ||
                carryForward?.usageRules?.expiryYear}
            </span>{" "}
            or it will lapse.
          </p>

        </div>
      )}
    </div>
  );
}

/* =========================
   ROW COMPONENT
========================= */
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

/* =========================
   FORMAT REMAINING
========================= */
function formatRemaining(value, type) {
  if (value === 0) {
    return type === "HT"
      ? "Not Available"
      : "Not Available";
  }

  return `${value} remaining`;
}

/* =========================
   FALLBACK SUGGESTION
========================= */
function buildSuggestionText(homeTown, allIndia, carryForward, eligibility) {

  // =========================
  // PRIORITY 1: CARRY FORWARD (URGENT)
  // =========================
  if (carryForward?.carryForwardAvailable) {
  const expiryYear = carryForward?.usageRules?.expiryYear;
  const currentYear = new Date().getFullYear();

  if (expiryYear && currentYear > expiryYear) {
    return {
      type: "CARRY_EXPIRED",
      message: "❌ Your carry forward LTC has expired.",
      advice: "Plan properly in future blocks to avoid loss.",
    };
  }

  return {
    type: "CARRY_FORWARD",
    message: "⚠ You have a carry forward LTC pending.",
    advice: `Use it before ${expiryYear} (first year of new block) or it will lapse.`,
    urgent: true,
  };
}

  // =========================
  // PRIORITY 2: BOTH AVAILABLE
  // =========================
  if (homeTown > 0 && allIndia > 0) {
    return {
      type: "PLAN_BOTH",
      message: `You have ${homeTown} Home Town and ${allIndia} All India LTC remaining.`,
      advice: "Plan one short trip and one long-distance trip within current block.",
    };
  }

  // =========================
  // PRIORITY 3: ONLY HT
  // =========================
  if (homeTown > 0) {
    return {
      type: "PLAN_HT",
      message: `You have ${homeTown} Home Town LTC remaining.`,
      advice: "Use it before the end of current block/sub-block.",
    };
  }

  // =========================
  // PRIORITY 4: ONLY AI
  // =========================
  if (allIndia > 0) {
    return {
      type: "PLAN_AI",
      message: `You have ${allIndia} All India LTC remaining.`,
      advice: "Plan a long-distance journey for maximum benefit.",
    };
  }

  if (lapsedCount > 0) {
    return `⚠ ${lapsedCount} LTC has lapsed. Plan timely usage.`;
  }

  // =========================
  // PRIORITY 5: COMPLETED
  // =========================
  return {
    type: "COMPLETED",
    message: "✔ You have successfully utilized all LTC benefits.",
    next:
      eligibility.phase === "BLOCK_PERIOD"
        ? `Next block starts ${eligibility.currentBlock.end + 1}`
        : "Next eligibility will arise in upcoming years",
  };


}