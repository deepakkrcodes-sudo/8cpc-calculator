export default function PensionSummaryCard({ result }) {

  if (!result) return null;

  const before = result.seventh.total;
  const after = result.eighth.total;

  const diff = after - before;

  const percent =
    before ? ((diff / before) * 100).toFixed(2) : 0;

  return (
    <div className="relative overflow-hidden rounded-2xl p-[1px] 
                bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-700 
                shadow-lg transition-all duration-300 hover:scale-[1.02]">

      {/* Inner Card */}
      <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 border border-white/40 text-center">

        {/* Header with icon */}
        <div className="flex items-center justify-center gap-2 text-base text-gray-600 font-semibold">
          <span className="bg-gradient-to-br from-blue-500 to-indigo-600 
                       text-white px-2 py-1 rounded-full text-xs shadow">
            📊
          </span>
          Monthly Pension Increase
        </div>

        {/* Center Values */}
        <div className="mt-4 text-2xl font-bold text-gray-700">

          ₹ {before.toLocaleString()}

          <span className="mx-2 text-gray-400">→</span>

          <span className="bg-gradient-to-r from-blue-600 to-indigo-700 
                       bg-clip-text text-transparent">
            ₹ {after.toLocaleString()}
          </span>

        </div>

        {/* Percentage just below values */}
        {(() => {
          const isPositive = diff > 0;
          const isNegative = diff < 0;

          return (
            <div
              className={`mt-2 text-base font-semibold flex items-center justify-center gap-1
        ${isPositive ? "text-blue-700" : isNegative ? "text-red-600" : "text-gray-600"}`}
            >
              <span>
                {isPositive ? "📈" : isNegative ? "📉" : "➖"}
              </span>

              <span>
                ₹ {Math.abs(diff).toLocaleString()} ({Math.abs(percent)}%{" "}
                {isPositive ? "increase" : isNegative ? "decrease" : "change"})
              </span>
            </div>
          );
        })()}



        {/* Subtle info (optional keep/remove) */}
        <div className="mt-2 text-xs text-gray-500">
          Increase in revised pension after 8th CPC projection
        </div>

        {/* Finish line */}
        <div className="mt-4 h-1 w-16 mx-auto rounded-full 
                    bg-gradient-to-r from-blue-500 to-indigo-600"></div>

      </div>

      {/* Glow effect */}
      <div className="absolute -top-10 -right-10 w-40 h-40 
                  bg-blue-300/30 rounded-full blur-3xl"></div>
    </div>

  );

}