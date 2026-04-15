import PensionSummaryCard7 from "./PensionSummaryCard7";
import PensionRow7 from "./PensionRow7";
import {
  IndianRupee,
  Receipt,
  RefreshCcw,
  Calculator,
  TrendingUp,
  Wallet,
  Briefcase,
  Users
} from "lucide-react";

export default function PensionResults7({ result }) {

  if (!result) return null;

  const r = result.seventh;

  return (

    <div className="space-y-4">

      {/* SUMMARY */}
      <PensionSummaryCard7 result={result} />

      {/* BREAKDOWN */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">

        <div className="p-3 border-b font-semibold text-gray-700">
          Pension Breakdown (7th CPC)
        </div>

        <div className="divide-y">

          <PensionRow7
            icon={<IndianRupee size={16} className="text-green-600" />}
            label="Basic Pay"
            value={r.basic}
          />

          <PensionRow7
            icon={<Receipt size={16} className="text-blue-500" />}
            label="Basic Pension (50%)"
            value={r.pension}
          />

          <PensionRow7
            icon={<RefreshCcw size={16} className="text-purple-500" />}
            label="Commuted Pension"
            value={r.commuted}
          />

          <PensionRow7
            icon={<Calculator size={16} className="text-gray-600" />}
            label="Remaining Pension"
            value={r.remaining}
          />

          <PensionRow7
            icon={<TrendingUp size={16} className="text-orange-500" />}
            label="Dearness Relief"
            value={r.dr}
          />

          <PensionRow7
            icon={<Wallet size={16} className="text-indigo-600" />}
            label="Total Monthly Pension"
            value={r.total}
            highlight
          />

          <PensionRow7
            icon={<Briefcase size={16} className="text-amber-600" />}
            label="Commutation Lump Sum"
            value={r.lumpSum}
          />

          <PensionRow7
            icon={<Users size={16} className="text-pink-500" />}
            label="Family Pension"
            value={r.family}
          />

        </div>

      </div>

    </div>

  );

}