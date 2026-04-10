export default function PlannerCard({ data }) {
  if (!data || data.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 space-y-4">

      {/* HEADER */}
      <div className="border-b pb-3 flex items-center gap-2">
        🧭
        <div>
          <h2 className="text-lg font-semibold">
            LTC Planner
          </h2>
          <p className="text-xs text-gray-500">
            Smart yearly planning based on rules
          </p>
        </div>
      </div>

      {/* LIST */}
      <div className="space-y-3">
        {data.map((item, i) => (
          <div
            key={i}
            className={`flex justify-between items-center p-3 rounded-lg border
              ${
                item.highlight
                  ? "bg-green-50 border-green-200"
                  : "bg-gray-50"
              }`}
          >
            <div className="text-sm font-medium text-gray-700">
              {item.year}
            </div>

            <div
              className={`text-xs px-3 py-1 rounded-full font-medium
                ${
                  item.type === "HT"
                    ? "bg-green-100 text-green-700"
                    : item.type === "AI"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-200 text-gray-600"
                }`}
            >
              {item.label}
            </div>
          </div>
        ))}
      </div>

      {/* INSIGHT */}
      <div className="bg-yellow-50 text-xs p-3 rounded-lg text-gray-700">
        💡 Best Strategy: Use HT early and reserve AI for long-distance travel.
      </div>
    </div>
  );
}