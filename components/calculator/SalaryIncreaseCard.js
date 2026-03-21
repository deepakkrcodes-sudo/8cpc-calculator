"use client";

function IncreaseCard({
  title,
  before,
  after,
  color = "blue"
}) {

  const valBefore = Number(before) || 0;
  const valAfter = Number(after) || 0;

  const increase = valAfter - valBefore;

  const percent =
    valBefore > 0
      ? Math.round((increase / valBefore) * 100)
      : 0;

  const progressWidth = Math.min(percent, 100);

  // Soft theme colors
  const theme =
    color === "green"
      ? {
          bg: "bg-green-50/60",
          text: "text-green-700",
          sub: "text-green-600",
          bar: "bg-green-500",
          track: "bg-green-200"
        }
      : {
          bg: "bg-blue-50/60",
          text: "text-blue-700",
          sub: "text-blue-600",
          bar: "bg-blue-500",
          track: "bg-blue-200"
        };

  return (

    <div className={`rounded-xl p-4 shadow-sm ${theme.bg}`}>

      {/* Title */}
      <div className="text-sm text-gray-600">
        {title}
      </div>

      {/* Before → After */}
      <div className={`mt-1 text-lg font-semibold flex items-center justify-between`}>

        <span>
          ₹ {valBefore.toLocaleString("en-IN")}
        </span>

        <span className="text-gray-400 text-base">→</span>

        <span className={theme.text}>
          ₹ {valAfter.toLocaleString("en-IN")}
        </span>

      </div>

      {/* Increase */}
      <div className={`mt-1 text-sm ${theme.sub}`}>

        +₹ {increase.toLocaleString("en-IN")} / month

        <span className="ml-2 font-semibold">
          (+{percent}%)
        </span>

      </div>

      {/* Progress Bar */}
      <div className={`mt-3 ${theme.track} rounded-full h-2`}>

        <div
          className={`${theme.bar} h-2 rounded-full transition-all duration-700`}
          style={{ width: `${progressWidth}%` }}
        />

      </div>

    </div>

  );

}

export default function SalaryIncreaseCard({ result }) {

  if (!result) return null;

  return (

    <div className="space-y-4">

      <IncreaseCard
        title="Gross Salary Increase"
        before={result.seventh.gross}
        after={result.eighth.gross}
        color="blue"
      />

      <IncreaseCard
        title="Net Salary Increase"
        before={result.seventh.net}
        after={result.eighth.net}
        color="green"
      />

    </div>

  );

}