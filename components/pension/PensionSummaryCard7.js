import { formatINR } from "@/utils/format";

export default function PensionSummaryCard7({ result }) {

  if (!result) return null;

  const total = result.seventh.total;

  return (

    <div className="bg-gradient-to-r from-green-50 to-blue-100 border border-green-200 rounded-xl p-4 shadow-sm">

      <div className="text-md text-gray-600 font-semibold text-center">
        Total Monthly Pension (7th CPC)
      </div>

      <div className="text-2xl font-bold text-blue-700 mt-2 text-center">
        ₹ {formatINR(total)}
      </div>

      <div className="mt-3 text-xs text-gray-500 text-center">
        Includes Basic Pension, Commutation, and Dearness Relief
      </div>

    </div>

  );

}