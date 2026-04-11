"use client";



export default function PlannerCard({ data, eligibility }) {
  if (!data || data.length === 0) return null;
  const insight = generatePlannerInsight(data, eligibility);

 

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-4 sm:p-5 space-y-4">

      {/* HEADER */}
      <div className="border-b pb-3 flex items-center gap-2">
        🧭
        <div>
          <h2 className="text-lg sm:text-xl font-semibold">
            Smart LTC Planner
          </h2>
          <p className="text-xs text-gray-500">
            Optimized yearly plan based on your eligibility
          </p>
        </div>
      </div>

      {/* LIST */}
      <div className="space-y-3">

        {data.map((item, i) => (
          <div
            key={i}
            className={`flex justify-between items-center p-3 rounded-lg border transition-all

              ${item.urgent
                ? "bg-yellow-50 border-yellow-300"
                : item.priority === "RECOMMENDED"
                  ? "bg-blue-50 border-blue-200"
                  : "bg-gray-50 border-gray-200"
              }
            `}
          >

            {/* YEAR */}
            <div className="text-sm font-medium text-gray-800">
              {item.year}
            </div>

            {/* TYPE */}
            <div
              className={`text-xs px-3 py-1 rounded-full font-medium

                ${item.type === "HT"
                  ? "bg-green-100 text-green-700"
                  : item.type === "AI"
                    ? "bg-purple-100 text-purple-700"
                    : "bg-gray-200 text-gray-600"
                }
              `}
            >
              {item.label}
            </div>

          </div>
        ))}

      </div>

      

      <div className="bg-blue-50 text-xs p-3 rounded-lg text-blue-800">
        💡 {insight || "Planning insight will appear here based on your data."}
      </div>

    </div>
  );
}

function generatePlannerInsight(data, eligibility) {
  if (!data) return "No planning data available.";

  if (!eligibility || !eligibility.phase) {
    return "Eligibility data not available.";
  }

  const hasUrgent = data.some(d => d.urgent);
  const hasAI = data.some(d => d.type === "AI");
  const hasHT = data.some(d => d.type === "HT");

  // FIRST 8 YEARS
  if (eligibility.phase === "FIRST_8_YEARS") {
    if (eligibility.isSameState) {
      return "Only All India LTC is allowed in milestone years (4th & 8th). Plan accordingly.";
    }
    return "Distribute Home Town LTC in early years and reserve All India LTC for milestone years.";
  }

  // BLOCK PERIOD
  if (hasUrgent) {
    return "Carry forward LTC must be used in the first year, else it will lapse.";
  }

  if (eligibility.isSameState) {
    return "Only one All India LTC is allowed in the block. Choose the most beneficial year.";
  }

  if (hasHT && hasAI) {
    return "Best strategy: Use Home Town LTC in one sub-block and All India LTC in the other.";
  }

  return "Plan LTC distribution carefully across sub-blocks to maximize benefits.";
}