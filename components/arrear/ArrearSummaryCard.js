"use client";
import { formatINR } from "@/utils/format";
export default function ArrearSummaryCard({
  result,
  implementationPeriod,
  fitmentFactor
}) {

  if (!result) return null;

  return (

    <div className="bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl p-4 shadow-sm">

      <div className="text-sm opacity-90">
        Estimated Net Arrear
      </div>

      <div className="text-2xl font-bold mt-1">
        ₹ {formatINR(result.totalNetArrear)}
      </div>

      <div className="text-xs opacity-80 mt-1">
        Estimated value (±5%)
      </div>


      <div className="mt-3 grid grid-cols-2 gap-2 text-sm">

        <div>
          Gross Arrear
          <div className="font-semibold">
            ₹ {result.totalGrossArrear.toLocaleString()}
          </div>
        </div>

        <div>
          Fitment Factor
          <div className="font-semibold">
            {fitmentFactor}
          </div>
        </div>

        <div>
          Implementation
          <div className="font-semibold">
            {implementationPeriod}
          </div>
        </div>

        <div>
          Total Periods
          <div className="font-semibold">
            {result.periods.length}
          </div>
        </div>

      </div>

    </div>

  );

}