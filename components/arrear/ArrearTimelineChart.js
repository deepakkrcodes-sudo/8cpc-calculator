"use client";

import { useMemo } from "react";
import { formatCompactINR, formatINR } from "@/utils/format";
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ReferenceDot,
    ReferenceLine
} from "recharts";

// ======================
// FORMAT PERIOD DATA
// ======================

function formatPeriods(periods) {
    return periods.map((p, index) => {
        const [month, year] = p.period.split(" ");
        
        // Calculate timestamp for continuous X-axis
        const monthIndex = month === "Jan" ? 0 : 6;
        const timestamp = new Date(year, monthIndex, 1).getTime();

        const end = month === "Jan" ? `Jun ${year}` : `Dec ${year}`;

        return {
            index,
            timestamp,
            shortLabel: month === "Jan" ? `H1 '${year.slice(-2)}` : `H2 '${year.slice(-2)}`,
            fullLabel: `${month} ${year} - ${end}`,
            arrear: p.netArrear,
            promotion: p.isPromotion,
            increment: p.isIncrement,
            promotionDate: p.promotionDate,
            incrementDate: p.incrementDate,
            basic8: p.basic8,
            da8Percent: p.da8Percent
        };
    });
}

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-indigo-50 min-w-[220px] transition-all">
                <div className="text-xs font-semibold text-indigo-500 uppercase tracking-wider mb-1">
                    {data.fullLabel}
                </div>
                <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent mb-3">
                    ₹{formatINR(data.arrear)}
                </div>
                
                <div className="space-y-2 mb-3 bg-gray-50/50 rounded-xl p-3 border border-gray-100/50">
                    <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-500">8th CPC Basic</span>
                        <span className="font-semibold text-gray-800">₹{formatINR(data.basic8)}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-500">DA Rate</span>
                        <span className="font-semibold text-emerald-600">{data.da8Percent}%</span>
                    </div>
                </div>

                {(data.promotion || data.increment) && (
                    <div className="pt-3 border-t border-gray-100 space-y-2">
                        {data.promotion && (
                            <div className="text-xs flex items-center gap-2 text-violet-700 font-medium bg-violet-50 px-2 py-1.5 rounded-lg">
                                <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse"></div>
                                Promotion Applied
                            </div>
                        )}
                        {data.increment && (
                            <div className="text-xs flex items-center gap-2 text-emerald-700 font-medium bg-emerald-50 px-2 py-1.5 rounded-lg">
                                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                Annual Increment
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    }
    return null;
};

// ======================
// CHART COMPONENT
// ======================

export default function ArrearTimelineChart({ result }) {
    if (!result) return null;

    const data = useMemo(() => formatPeriods(result.periods), [result.periods]);

    // Function to format XAxis ticks back to readable labels
    const formatXAxis = (tickItem) => {
        const date = new Date(tickItem);
        const month = date.getMonth();
        const year = date.getFullYear().toString().slice(-2);
        return month < 6 ? `H1 '${year}` : `H2 '${year}`;
    };

    return (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        Arrear Accumulation Trend
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">Timeline of your 6-monthly net arrear totals</p>
                </div>
            </div>

            <div className="relative">
                <ResponsiveContainer width="100%" height={320}>
                    <AreaChart
                        data={data}
                        margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="colorArrear" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                            </linearGradient>
                        </defs>

                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />

                        <XAxis
                            dataKey="timestamp"
                            type="number"
                            domain={['dataMin', 'dataMax']}
                            tickFormatter={formatXAxis}
                            tick={{ fontSize: 11, fill: '#6b7280', fontWeight: 500 }}
                            tickMargin={12}
                            axisLine={false}
                            tickLine={false}
                        />

                        <YAxis
                            width={50}
                            tick={{ fontSize: 11, fill: '#6b7280', fontWeight: 500 }}
                            tickFormatter={(value) => `₹${formatCompactINR(value)}`}
                            axisLine={false}
                            tickLine={false}
                            tickMargin={8}
                        />

                        <Tooltip 
                            content={<CustomTooltip />} 
                            cursor={{ stroke: '#c7d2fe', strokeWidth: 2, strokeDasharray: '4 4' }} 
                        />

                        <Area
                            type="monotone"
                            dataKey="arrear"
                            stroke="#4f46e5"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorArrear)"
                            activeDot={{ r: 6, fill: '#4f46e5', stroke: '#fff', strokeWidth: 2, className: 'drop-shadow-md' }}
                        />

                        {/* Promotion and Increment Markers exactly on timeline */}
                        {data.map((entry) => {
                            if (!entry.promotionDate && !entry.incrementDate) return null;
                            
                            const elements = [];
                            
                            if (entry.promotionDate) {
                                elements.push(
                                    <ReferenceDot
                                        key={"promo" + entry.index}
                                        x={entry.promotionDate}
                                        y={entry.arrear}
                                        r={6}
                                        fill="#8b5cf6"
                                        stroke="#fff"
                                        strokeWidth={3}
                                        className="drop-shadow-md cursor-pointer z-10"
                                    />
                                );
                            }

                            if (entry.incrementDate) {
                                elements.push(
                                    <ReferenceDot
                                        key={"inc" + entry.index}
                                        x={entry.incrementDate}
                                        y={entry.arrear}
                                        r={5}
                                        fill="#10b981"
                                        stroke="#fff"
                                        strokeWidth={2}
                                        className="drop-shadow-md cursor-pointer z-10"
                                    />
                                );
                            }
                            
                            return elements;
                        })}
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Premium Legend */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-6 pt-4 border-t border-gray-50">
                <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
                    <div className="w-3 h-3 bg-violet-500 rounded-full shadow-[0_0_8px_rgba(139,92,246,0.6)]" />
                    Promotion Applied
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                    Annual Increment
                </div>
            </div>
        </div>
    );
}