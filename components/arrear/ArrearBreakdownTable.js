"use client";

import { useState } from "react";
import { formatINR } from "@/utils/format";

function formatPeriodLabel(period) {

  const [month, year] =
    period.split(" ");

  const end =
    month === "Jan"
      ? `Jun ${year}`
      : `Dec ${year}`;

  return `${period} - ${end}`;

}

export default function ArrearBreakdownTable({ result }) {

  const [open, setOpen] =
    useState(false);

  if (!result) return null;

  return (

    <div className="bg-white rounded-xl shadow-sm">

      {/* Header */}
      <div
        onClick={() => setOpen(!open)}
        className="p-4 font-semibold cursor-pointer flex justify-between"
      >

        Detailed Breakdown

        <span>
          {open ? "▲" : "▼"}
        </span>

      </div>


      {/* Table */}
      {open && (

        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            <thead className="bg-gray-100">

              <tr>

                <th className="p-2 text-left">
                  Period
                </th>

                <th className="p-2">
                  Level
                </th>

                <th className="p-2">
                  Basic
                </th>

                <th className="p-2">
                  Net Arrear
                </th>

              </tr>

            </thead>


            <tbody>

              {result.periods.map((p, i)=> (

                <tr key={i} className="border-t">

                  <td className="p-2">

                    {formatPeriodLabel(p.period)}

                    {p.isIncrement && (
                      <span className="text-green-600 text-xs ml-1">
                        ▲
                      </span>
                    )}

                    {p.isPromotion && (
                      <span className="text-red-600 text-xs ml-1">
                        ●
                      </span>
                    )}

                  </td>


                  <td className="text-center">

                    {p.level}

                  </td>


                  <td className="text-center font-medium">

                    ₹ {formatINR(p.basic7)}

                  </td>


                  <td className="text-center text-green-600 font-semibold">

                    ₹ {formatINR(p.netArrear)}

                  </td>

                </tr>

              ))}


              {/* TOTAL ROW */}

              <tr className="border-t bg-green-50 font-bold">

                <td className="p-2">

                  Total

                </td>

                <td></td>
                <td></td>

                <td className="text-center text-green-700">

                  ₹ {formatINR(result.totalNetArrear)}

                </td>

              </tr>


            </tbody>

          </table>

        </div>

      )}

    </div>

  );

}