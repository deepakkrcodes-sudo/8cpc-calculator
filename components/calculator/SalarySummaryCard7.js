import { formatINR } from "@/utils/format";

export default function SalarySummaryCard7({
  result,
  totalDeductions
}) {
  if (!result) return null;

  const gross = result.gross;
  const net = gross - totalDeductions;

  return (
    <div className="relative overflow-hidden rounded-2xl p-[1px] bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500">

      {/* INNER CARD */}
      <div className="rounded-2xl bg-white p-5">

        {/* HEADER */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            💎 Effective Salary
          </h3>
          <p className="text-xs text-gray-500">
            Monthly in-hand after deductions
          </p>
        </div>

        {/* MAIN VALUE */}
        <div className="text-center py-4">
          <div className="text-xs text-gray-500 mb-1">
            Net Monthly Salary
          </div>

          <div className="text-3xl font-bold text-indigo-600 tracking-tight">
            ₹ {formatINR(net)}
          </div>
        </div>

        {/* DIVIDER */}
        <div className="h-[1px] bg-gray-200 my-4"></div>

        {/* DETAILS */}
        <div className="grid grid-cols-2 gap-4 text-sm">

          {/* Gross */}
          <div className="bg-indigo-50 rounded-lg p-3 text-center">
            <div className="text-xs text-gray-500">Monthly Gross</div>
            <div className="font-semibold text-indigo-700">
              ₹ {formatINR(gross)}
            </div>
          </div>

          {/* Deductions */}
          <div className="bg-green-50 rounded-lg p-3 text-center">
            <div className="text-xs text-gray-500">Total Deductions</div>
            <div className="font-semibold text-green-700">
              ₹ {formatINR(totalDeductions)}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}