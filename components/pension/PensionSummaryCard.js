export default function PensionSummaryCard({ result }) {

  if (!result) return null;

  const before = result.seventh.total;
  const after = result.eighth.total;

  const diff = after - before;

  const percent =
    before ? ((diff / before) * 100).toFixed(2) : 0;

  return (

    <div className="bg-gradient-to-r from-green-50 to-emerald-100 border border-green-200 rounded-xl p-4 shadow-sm">

      <div className="text-sm text-gray-600">
        Monthly Pension Increase
      </div>

      <div className="flex items-center justify-between mt-2">

        <div className="text-lg font-semibold">

          ₹ {before.toLocaleString()}

          <span className="mx-2 text-gray-400">→</span>

          <span className="text-green-700">
            ₹ {after.toLocaleString()}
          </span>

        </div>

        <div className="text-green-700 font-semibold">
          +₹ {diff.toLocaleString()}
        </div>

      </div>

      <div className="text-sm text-green-700 mt-1">
        {percent}% increase
      </div>

      {/* visual bar */}

      <div className="mt-3 bg-green-200 rounded-full h-2">

        <div
          className="bg-green-600 h-2 rounded-full"
          style={{ width: `${Math.min(percent, 100)}%` }}
        />

      </div>

    </div>

  );

}