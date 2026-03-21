"use client";
import { formatINR } from "@/utils/format";

export default function PayMatrixDisplay({ level, matrix }) {

    // Convert L10 → Level 10
    const levelLabel = level.replace("L", "Level ");

    return (

        <div className="bg-white rounded-xl shadow-sm p-5 mt-4">

            {/* HEADER */}
            <div className="flex items-center gap-3 mb-4 border-b pb-3">

                <div className="text-2xl">
                    📊
                </div>

                <div>

                    <h2 className="text-lg font-semibold">
                        {levelLabel} Pay Matrix
                    </h2>

                    <p className="text-md text-gray-500">
                        Salary progression across pay matrix cells
                    </p>

                </div>

            </div>


            {/* TABLE HEADER */}
            <div className="grid grid-cols-3 text-md font-semibold text-gray-500 border-b pb-2">

                <div>
                    Level
                </div>

                <div className="text-center">
                    Cell
                </div>

                <div className="text-right">
                    Basic Pay
                </div>

            </div>


            {/* MATRIX ROWS */}
            {matrix.map((value, index) => (

                <div
                    key={index}
                    className="grid grid-cols-3 items-center py-2 border-b text-md"
                >

                    {/* LEVEL */}
                    <div className="font-medium text-blue-600">
                        {levelLabel}
                    </div>

                    {/* CELL */}
                    <div className="text-center">

                        <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-sm">

                            Cell {index + 1}

                        </span>

                    </div>

                    {/* PAY */}
                    <div className="text-right font-semibold">
                        ₹ {formatINR(value)}
                    </div>

                </div>

            ))}

        </div>

    );

}