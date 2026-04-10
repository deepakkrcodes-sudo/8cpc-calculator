"use client";

export default function TimelineCard({ data, eligibility }) {
  if (!data || data.length === 0) return null;

  const isBlock = eligibility?.phase === "BLOCK_PERIOD";

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-4 sm:p-5 space-y-4">

      {/* HEADER */}
      <div className="border-b pb-3 flex items-center gap-2">
        📅
        <div>
          <h2 className="text-lg sm:text-xl font-semibold">
            LTC Roadmap
          </h2>
          <p className="text-xs text-gray-500">
            Timeline + smart planning combined
          </p>
        </div>
      </div>

      {/* TIMELINE */}
      <div className="overflow-x-auto">
        <div className="flex gap-4 min-w-max pb-2">

          {data.map((item, index) => (
            <div
              key={index}
              className={`min-w-[120px] rounded-xl border p-3 text-center space-y-1 transition-all

                ${item.isCurrent ? "ring-2 ring-blue-400" : ""}

                ${
                  item.priority === "CRITICAL"
                    ? "bg-yellow-50 border-yellow-300"
                    : item.priority === "DONE"
                    ? "bg-green-50 border-green-200"
                    : "bg-gray-50 border-gray-200"
                }
              `}
            >

              {/* YEAR */}
              <div className="font-semibold text-sm text-gray-800">
                {item.year}
              </div>

              {/* SUBBLOCK */}
              {item.subBlock && (
                <div className="text-[10px] text-gray-400">
                  {item.subBlock}
                </div>
              )}

              {/* USED */}
              {item.used && (
                <div className="text-xs font-medium text-green-700">
                  ✔ Used {item.used}
                </div>
              )}

              {/* CARRY FORWARD */}
              {item.isCF && !item.used && (
                <div className="text-xs font-medium text-yellow-700">
                  ⚡ CF ({item.cfType})
                </div>
              )}

              {/* AVAILABLE */}
              {!item.used && item.allowed?.length > 0 && (
                <div className="text-[10px] text-gray-500">
                  {item.allowed.join(" / ")}
                </div>
              )}

              {/* ACTION */}
              <div
                className={`text-xs px-2 py-1 rounded-full font-medium inline-block

                  ${
                    item.priority === "CRITICAL"
                      ? "bg-red-100 text-red-700"
                      : item.priority === "RECOMMENDED"
                      ? "bg-blue-100 text-blue-700"
                      : item.priority === "DONE"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-600"
                  }
                `}
              >
                {formatAction(item.action)}
              </div>

            </div>
          ))}

        </div>
      </div>

      {/* SUBBLOCK LABELS (ONLY BLOCK PERIOD) */}
      {isBlock && (
        <div className="flex justify-between text-xs text-gray-400 px-2">
          <span>Sub-Block 1</span>
          <span>Sub-Block 2</span>
        </div>
      )}

      {/* STRATEGY INSIGHT */}
      <div className="bg-blue-50 text-xs p-3 rounded-lg text-blue-800">
        💡 {generateInsight(data, eligibility)}
      </div>
    </div>
  );
}

//
// =========================
// HELPERS
// =========================
//

function formatAction(action) {
  if (!action) return "";

  return action
    .replace("Plan", "Plan")
    .replace("Use CF", "Use CF")
    .replace("Optional", "Optional")
    .replace("Not Allowed", "Not Allowed");
}

function generateInsight(data, eligibility) {
  if (!data || data.length === 0) return "";

  const hasCF = data.some(d => d.isCF);
  const hasUnused = data.some(d => !d.used && d.allowed?.length > 0);

  // FIRST 8 YEARS
  if (eligibility.phase === "FIRST_8_YEARS") {
    return "Follow eligibility pattern: Home Town in early years and All India in milestone years.";
  }

  // BLOCK PERIOD
  if (hasCF) {
    return "Use carry forward in first year to avoid lapse, then distribute remaining LTC smartly.";
  }

  if (hasUnused) {
    return "Distribute LTC across sub-blocks to maximize benefits and avoid missing eligibility.";
  }

  return "All LTC benefits utilized efficiently in this block.";
}