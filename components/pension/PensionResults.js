import PensionRow from "./PensionRow";
import PensionSummaryCard from "./PensionSummaryCard";

export default function PensionResults({ result }) {

  

  if (!result) return null;

  return (

    <div className="space-y-4">

      {/* SUMMARY CARD */}
      <PensionSummaryCard result={result} />

      {/* TABLE WRAPPER */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="text-xs text-gray-400 text-right pr-2 pb-1 md:hidden">
          ← Swipe to view →
        </div>

        <div className="overflow-x-auto">

          {/* TABLE CONTENT */}
          <div className="min-w-[600px]"> {/* ensures proper width */}

            {/* HEADER */}
            <div className="grid grid-cols-[2fr_1fr_1fr_1fr] text-sm font-semibold border-b">

              <div className="p-2 bg-gray-50">
                Component
              </div>

              <div className="p-2 text-center bg-yellow-50">
                7th CPC
                <div className="text-xs text-gray-500">Current</div>
              </div>

              <div className="p-2 text-center bg-blue-50">
                8th CPC
                <div className="text-xs text-gray-500">Projected</div>
              </div>

              <div className="p-2 text-center bg-green-50">
                Difference
              </div>

            </div>

            {/* BODY */}
            <div className="divide-y">

              <PensionRow label="Basic Pay" v7={result.seventh.basic} v8={result.eighth.basic} />
              <PensionRow label="Basic Pension" v7={result.seventh.pension} v8={result.eighth.pension} />
              <PensionRow label="Commuted Pension" v7={result.seventh.commuted} v8={result.eighth.commuted} />
              <PensionRow label="Remaining Pension" v7={result.seventh.remaining} v8={result.eighth.remaining} />
              <PensionRow label="Dearness Relief" v7={result.seventh.dr} v8={result.eighth.dr} />
              <PensionRow label="Total Monthly Pension" v7={result.seventh.total} v8={result.eighth.total} highlight />
              <PensionRow label="Commutation Lump Sum" v7={result.seventh.lumpSum} v8={result.eighth.lumpSum} />
              <PensionRow label="Family Pension" v7={result.seventh.family} v8={result.eighth.family} />

            </div>

          </div>
        </div>

      </div>

    </div>

  );

}