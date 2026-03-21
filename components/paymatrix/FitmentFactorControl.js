"use client";

export default function FitmentFactorControl({
  fitmentFactor,
  setFitmentFactor
}) {

  const presets = [
    { value: 1.92, color: "bg-red-100 text-red-700", label: "Conservative" },
    { value: 2.08, color: "bg-orange-100 text-orange-700", label: "Low Estimate" },
    { value: 2.57, color: "bg-yellow-100 text-yellow-700", label: "7th CPC Baseline" },
    { value: 2.86, color: "bg-blue-100 text-blue-700", label: "Probable" },
    { value: 3.0, color: "bg-green-100 text-green-700", label: "Optimistic" },
    { value: 3.68, color: "bg-emerald-100 text-emerald-700", label: "Union Demand" }
  ];

  return (

    <div className="bg-white rounded-xl shadow-sm p-5 space-y-4">

      {/* TITLE */}
      <div>
        <label className="text-md font-semibold">
          Fitment Factor
        </label>

        <p className="text-xs text-gray-500">
          Estimate 8th CPC pay matrix using different scenarios
        </p>
      </div>


      {/* SLIDER */}
      <div className="flex items-center gap-4">

        <input
          type="range"
          min="1.5"
          max="4"
          step="0.01"
          value={fitmentFactor}
          onChange={(e)=>setFitmentFactor(Number(e.target.value))}
          className="w-full"
        />

        <input
          type="number"
          step="0.01"
          value={fitmentFactor}
          onChange={(e)=>setFitmentFactor(Number(e.target.value))}
          className="w-20 border rounded p-1 text-center"
        />

      </div>


      {/* PRESET BUTTONS */}
      <div className="flex flex-wrap gap-2">

        {presets.map(p => (

          <button
            key={p.value}
            onClick={()=>setFitmentFactor(p.value)}
            className={`px-2 py-1 text-sm rounded border transition
              ${fitmentFactor === p.value
                ? "ring-2 ring-blue-500"
                : ""}
              ${p.color}
            `}
          >
            {p.value}
          </button>

        ))}

      </div>


      {/* LEGEND */}
      <div className="text-xs text-gray-500 flex flex-wrap gap-3 pt-1">

        <span className="flex items-center gap-1">
          <span className="w-2 h-2 bg-red-500 rounded-full"></span>
          Conservative
        </span>

        <span className="flex items-center gap-1">
          <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
          Baseline
        </span>

        <span className="flex items-center gap-1">
          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
          Probable
        </span>

        <span className="flex items-center gap-1">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          Optimistic
        </span>

        <span className="flex items-center gap-1">
          <span className="w-2 h-2 bg-emerald-600 rounded-full"></span>
          Union Demand
        </span>

      </div>

    </div>

  );

}