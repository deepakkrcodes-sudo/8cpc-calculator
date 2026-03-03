"use client";

import { formatCompactINR } from "@/utils/format";
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ReferenceDot
} from "recharts";

import { formatINR } from "@/utils/format";


// ======================
// FORMAT PERIOD DATA
// ======================

function formatPeriods(periods) {

    return periods.map((p, index) => {

        const [month, year] =
            p.period.split(" ");

        const end =
            month === "Jan"
                ? `Jun ${year}`
                : `Dec ${year}`;

        return {

            index,

            shortLabel:
                month === "Jan"
                    ? `Jan ${year}`
                    : `Jul ${year}`,

            fullLabel:
                `${month} ${year} - ${end}`,

            arrear:
                p.netArrear,

            promotion:
                p.isPromotion,

            increment:
                p.isIncrement

        };

    });

}


// ======================
// CHART COMPONENT
// ======================

export default function ArrearTimelineChart({ result }) {

    if (!result) return null;

    const data =
        formatPeriods(result.periods);


    return (

        <div className="bg-white rounded-xl p-4 shadow-sm">

            <div className="font-semibold mb-3">
                Arrear Timeline (6-month periods)
            </div>


            <ResponsiveContainer width="100%" height={280}>

                <AreaChart
                    data={data}
                    margin={{
                        top: 5,
                        right: 21,   
                        left: -3,  
                        bottom: 5
                    }}
                >

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                        dataKey="shortLabel"
                        interval={0}
                        tick={{ fontSize: 11 }}
                        tickMargin={5}
                    />

                    <YAxis
                        width={40}   
                        tick={{ fontSize: 10 }}
                        tickFormatter={(value) =>
                            `₹${formatCompactINR(value)}`
                        }
                    />
                    <Tooltip
                        formatter={(value) =>
                            `₹ ${formatINR(value)}`
                        }
                        labelFormatter={(label, payload) => {

                            const item =
                                payload?.[0]?.payload;

                            let event = "";

                            if (item?.promotion)
                                event += " ● Promotion";

                            if (item?.increment)
                                event += " ▲ Increment";

                            return item?.fullLabel + event;

                        }}
                    />


                    <Area
                        type="monotone"
                        dataKey="arrear"
                        stroke="#2563eb"
                        fill="#93c5fd"
                        strokeWidth={2}
                    />


                    {/* Promotion markers */}
                    {data.map((entry) =>
                        entry.promotion && (

                            <ReferenceDot
                                key={"promo" + entry.index}
                                x={entry.shortLabel}
                                y={entry.arrear}
                                r={4}
                                fill="#8305f9"
                                stroke="white"
                                strokeWidth={2}
                            />

                        )
                    )}


                    {/* Increment markers */}
                    {data.map((entry) =>
                        entry.increment && (

                            <ReferenceDot
                                key={"inc" + entry.index}
                                x={entry.shortLabel}
                                y={entry.arrear}
                                r={5}
                                fill="#16a34a"
                                stroke="white"
                                strokeWidth={2}
                            />

                        )
                    )}

                </AreaChart>

            </ResponsiveContainer>


            {/* Legend */}
            <div className="flex gap-4 text-xs mt-3">

                <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-violet-600 rounded-full" />
                    Promotion
                </div>

                <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-green-600 rounded-full" />
                    Increment
                </div>

            </div>

        </div>

    );

}