"use client";

import {
LineChart,
Line,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer,
Legend
} from "recharts";

export default function FixationChart({data}){

if(!data) return null;

return(

<div className="bg-white p-4 shadow rounded">

<ResponsiveContainer width="100%" height={350}>

<LineChart data={data}>

<XAxis dataKey="month"/>

<YAxis/>

<Tooltip/>

<Legend/>

<Line
dataKey="cumulativeA"
stroke="#2563eb"
strokeWidth={3}
name="Promotion"
/>

<Line
dataKey="cumulativeB"
stroke="#16a34a"
strokeWidth={3}
name="DNI"
/>

</LineChart>

</ResponsiveContainer>

</div>

);

}