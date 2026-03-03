"use client";

function IncreaseCard({
  title,
  before,
  after,
  color = "blue"
}) {

  const increase = after - before;

  const percent =
    before > 0
      ? Math.round((increase / before) * 100)
      : 0;

  const progressWidth =
    Math.min(percent, 100);

  const bgColor =
    color === "green"
      ? "from-green-600 to-green-500"
      : "from-blue-600 to-blue-500";

  const progressColor =
    color === "green"
      ? "bg-green-200"
      : "bg-blue-200";

  return (

    <div className={`bg-gradient-to-r ${bgColor} text-white rounded-xl p-4 shadow-sm`}>

      {/* Title */}
      <div className="text-sm opacity-90">
        {title}
      </div>

      {/* Before → After */}
      <div className="mt-1 text-lg font-semibold">

        ₹ {before.toLocaleString()}
        <span className="mx-2 opacity-80">→</span>
        ₹ {after.toLocaleString()}

      </div>

      {/* Increase */}
      <div className="mt-1 text-sm">

        +₹ {increase.toLocaleString()} / month

        <span className="ml-2 font-semibold">
          (+{percent}%)
        </span>

      </div>

      {/* Progress Bar */}
      <div className={`mt-3 ${progressColor} rounded-full h-2`}>

        <div
          className="bg-white h-2 rounded-full transition-all duration-700"
          style={{
            width: `${progressWidth}%`
          }}
        />

      </div>

    </div>

  );

}



export default function SalaryIncreaseCards({ result }) {

  if (!result) return null;

  return (

    <div className="space-y-3">

      {/* Gross Salary Card */}
      <IncreaseCard

        title="Gross Salary Increase"

        before={result.seventh.gross}

        after={result.eighth.gross}

        color="blue"

      />


      {/* Net Salary Card */}
      <IncreaseCard

        title="Net Salary Increase"

        before={result.seventh.net}

        after={result.eighth.net}

        color="green"

      />

    </div>

  );

}