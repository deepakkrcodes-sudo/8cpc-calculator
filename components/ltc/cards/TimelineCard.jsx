export default function TimelineCard({ data }) {
  if (!data || data.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 space-y-4">

      {/* HEADER */}
      <div className="border-b pb-3 flex items-center gap-2">
        <span className="text-lg">📅</span>
        <div>
          <h2 className="text-lg font-semibold">
            LTC Timeline
          </h2>
          <p className="text-xs text-gray-500">
            Your LTC eligibility year-wise
          </p>
        </div>
      </div>

      {/* TIMELINE */}
      <div className="space-y-3">

        {data.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-gray-50 rounded-lg p-3"
          >

            {/* LEFT */}
            <div className="text-sm font-medium text-gray-700">
              {item.yearLabel || item.label}
            </div>

            {/* RIGHT BADGE */}
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

    </div>
  );
}