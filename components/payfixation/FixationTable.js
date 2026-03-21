export default function FixationTable({ timeline }) {

  if (!timeline) return null;

  return (

    <div className="bg-white rounded-xl shadow-sm overflow-x-auto">

      <table className="min-w-full text-sm">

        {/* HEADER */}

        <thead className="bg-gray-100 text-gray-600 uppercase text-xs">

          <tr>

            <th className="px-3 py-2 text-left">
              Month
            </th>

            <th className="px-3 py-2 text-right">
              Promotion Gross
            </th>

            <th className="px-3 py-2 text-right">
              DNI Gross
            </th>

            <th className="px-3 py-2 text-right">
              Monthly Difference
            </th>

            <th className="px-3 py-2 text-right">
              Cumulative Difference
              <div className="text-[10px] normal-case text-gray-400">
                (with interest)
              </div>
            </th>

          </tr>

        </thead>


        {/* BODY */}

        <tbody>

          {timeline.map((r, i) => {

            const diff = Math.round(r.difference);

            return (

              <tr
                key={i}
                className="border-b hover:bg-gray-50 transition"
              >

                {/* Month */}

                <td className="px-2 py-2 font-medium text-gray-600">
                   {r.month}
                </td>


                {/* Promotion */}

                <td className="px-3 py-2 text-right text-blue-600 font-medium">

                  ₹ {Math.round(r.grossA).toLocaleString()}

                </td>


                {/* DNI */}

                <td className="px-3 py-2 text-right text-gray-700 font-medium">

                  ₹ {Math.round(r.grossB).toLocaleString()}

                </td>


                {/* Monthly Diff */}

                <td
                  className={`px-3.5 py-2 text-right font-semibold
                  ${diff >= 0 ? "text-green-600" : "text-red-500"}`}
                >

                  {diff >= 0 ? "+" : ""}

                  ₹ {diff.toLocaleString()}

                </td>


                {/* Cumulative Diff */}

                <td
                  className={`px-3.5 py-2 text-right font-semibold
                  ${r.interestAdjusted >= 0
                    ? "text-green-600"
                    : "text-red-500"}`}
                >

                  ₹ {Math.round(r.interestAdjusted).toLocaleString()}

                </td>

              </tr>

            );

          })}

        </tbody>

      </table>

    </div>

  );

}