import { CalendarDays } from "lucide-react";

export default function ArrearBreakdownTable({ breakdown }) {

  const format = (v) => v?.toLocaleString("en-IN") ?? "-";

  return (

    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-5 space-y-4">

      {/* HEADER */}
      <div className="flex items-center gap-2">
        <CalendarDays size={18} className="text-indigo-600" />
        <h2 className="text-lg font-semibold text-gray-800">
          Arrear Breakdown
        </h2>
      </div>

      {/* TABLE WRAPPER (SCROLL FIX) */}
      <div className="overflow-x-auto rounded-xl border border-gray-200">

        <table className="min-w-[700px] w-full text-sm">

          {/* HEADER */}
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100 text-gray-600">
            <tr className="text-left">
              <th className="px-4 py-3 font-medium">Period</th>
             <th className="px-4 py-3 font-medium">New Pension</th>
              <th className="px-4 py-3 font-medium">Increase</th>
              <th className="px-4 py-3 font-medium">Arrear</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>

            {breakdown.map((row, index) => (

              <tr
                key={index}
                className="border-t hover:bg-gray-50 transition"
              >

                {/* PERIOD */}
                <td className="px-4 py-3 font-medium text-gray-700">

                  <div className="flex items-center gap-2">
                    {row.period}

                    {index !== 0 && (
                      <span className="text-green-500 text-xs">▲</span>
                    )}
                  </div>

                </td>

                {/*
               
                <td className="px-4 py-3">
                  <span className="px-2 py-1 rounded-md bg-indigo-50 text-indigo-700 text-xs font-medium">
                    {row.da ?? 0}%
                  </span>
                </td>
                 */ }

                {/* NEW PENSION */}
                <td className="px-4 py-3 text-gray-800 font-medium">
                  ₹{format(row.newPension)}
                </td>

                {/* INCREASE */}
                <td className="px-4 py-3 text-green-600 font-semibold">
                  +₹{format(row.monthlyIncrease)}
                </td>

                {/* ARREAR */}
                <td className="px-4 py-3 text-indigo-700 font-semibold">
                  ₹{format(row.arrear)}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* LEGEND */}
      <div className="text-xs text-gray-500 flex items-center gap-2">
        <span className="text-green-500">▲</span>
        DA Increase applied cumulatively
      </div>

    </div>

  );

}