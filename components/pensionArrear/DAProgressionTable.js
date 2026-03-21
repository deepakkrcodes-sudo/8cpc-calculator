"use client";

export default function DAProgressionTable({ periods, daRates, updateDARate }) {

  return (

    <div >

      {/* HEADER */}
      <div className="mb-4">

        <h3 className="font-semibold text-lg">
          Expected DA Progression
        </h3>

        <p className="text-xs text-gray-500">
          Adjust expected DA increases until implementation
        </p>

      </div>


      {/* TIMELINE */}
      <div className="relative border-l-2 border-gray-200 ml-3 space-y-6">

        {periods.map((p, i) => (

          <div key={i} className="flex items-center gap-4 relative">

            {/* TIMELINE DOT */}
            <span className="absolute -left-[9px] w-4 h-4 bg-blue-500 rounded-full "></span>

            {/* PERIOD */}
            <div className="w-28 text-sm text-gray-700 font-medium ml-4">
              {p.label}
            </div>

            {/* VALUE */}
            {i === 0 ? (

              <div className="flex justify-center">
                <div className="text-md font-semibold text-blue-600 text-center">
                  2%
                </div>
              </div>


            ) : (

              <select
                className="border rounded px-2 py-1 text-sm"
                value={daRates[i - 1]?.da ?? 3}
                onChange={(e) =>
                  updateDARate(i - 1, Number(e.target.value))
                }
              >

                {[2, 3, 4, 5].map(v => (
                  <option key={v} value={v}>
                    {v}%
                  </option>
                ))}

              </select>

            )}

          </div>

        ))}

      </div>

    </div>

  );

}