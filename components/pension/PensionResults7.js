import PensionSummaryCard7 from "./PensionSummaryCard7";
import PensionRow7 from "./PensionRow7";

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

          <PensionRow7 label="Basic Pay" value={r.basic} />

          <PensionRow7 label="Basic Pension (50%)" value={r.pension} />

          <PensionRow7 label="Commuted Pension" value={r.commuted} />

          <PensionRow7 label="Remaining Pension" value={r.remaining} />

          <PensionRow7 label="Dearness Relief" value={r.dr} />

          <PensionRow7
            label="Total Monthly Pension"
            value={r.total}
            highlight
          />

          <PensionRow7 label="Commutation Lump Sum" value={r.lumpSum} />

          <PensionRow7 label="Family Pension" value={r.family} />

        </div>

      </div>

    </div>

  );

}