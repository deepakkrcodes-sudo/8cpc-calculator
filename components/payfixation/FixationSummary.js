export default function FixationSummary({ result }) {

  if (!result) return null;

  const promotion = Math.round(result.totalA);
  const dni = Math.round(result.totalB);

  const diff = promotion - dni;

  const better = diff >= 0 ? "Promotion Fixation" : "DNI Fixation";

  const gain = Math.abs(diff);

  const percent =
    dni > 0 ? ((gain / dni) * 100).toFixed(2) : 0;

  const total = promotion + dni;

  const promotionPercent =
    total ? (promotion / total) * 100 : 50;

  const dniPercent =
    total ? (dni / total) * 100 : 50;

  return (

    <div className="space-y-4">

      {/* DECISION CARD */}

      <div className="bg-gradient-to-br from-indigo-50 to-blue-100 hover:from-indigo-100 hover:to-blue-200 transition-all duration-300 rounded-xl shadow p-5">

        <div className="text-sm text-gray-600">
          Recommended Fixation
        </div>

        <div className="flex items-center justify-between mt-2">

          <div>

            <div className="text-xl font-semibold text-gray-800">
              {better}
            </div>

            <div className="text-sm text-gray-600 mt-1">
              Gain ₹ {gain.toLocaleString("en-IN")} ({percent}%)
            </div>

          </div>

          {/* indicator */}
          <div className="text-3xl text-green-600">
            ▲
          </div>

        </div>

      </div>



      {/* HISTOGRAM COMPARISON */}

      <div className="bg-white rounded-xl shadow p-5 space-y-4 pl-5">

        <div className="text-sm text-gray-500">
          Promotion vs DNI Earnings
        </div>


        {/* PROMOTION BAR */}

        <div>

          <div className="flex justify-between text-sm mb-1">

            <span className="text-gray-600">
              Promotion Fixation
            </span>

            <span className="font-medium">
              ₹ {promotion.toLocaleString("en-IN")}
            </span>

          </div>

          <div className="w-full bg-gray-200 rounded h-3">

            <div
              className="bg-blue-600 h-3 rounded"
              style={{ width: `${promotionPercent}%` }}
            />

          </div>

        </div>



        {/* DNI BAR */}

        <div>

          <div className="flex justify-between text-sm mb-1">

            <span className="text-gray-600">
              DNI Fixation
            </span>

            <span className="font-medium">
              ₹ {dni.toLocaleString("en-IN")}
            </span>

          </div>

          <div className="w-full bg-gray-200 rounded h-3">

            <div
              className="bg-green-600 h-3 rounded"
              style={{ width: `${dniPercent}%` }}
            />

          </div>

        </div>



        {/* PERCENTAGES */}

        <div className="flex justify-between text-xs text-gray-500">

          <span>
            {promotionPercent.toFixed(1)}%
          </span>

          <span>
            {dniPercent.toFixed(1)}%
          </span>

        </div>

      </div>

    </div>

  );

}