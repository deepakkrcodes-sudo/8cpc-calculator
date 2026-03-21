"use client";

import Link from "next/link";

export default function OtherToolsSection(){

const tools = [

{
title:"8th CPC Salary Calculator",
desc:"Estimate revised salary",
icon:"🧮",
link:"/"
},

{
title:"7th CPC Salary Calculator",
desc:"Calculate current salary",
icon:"📊",
link:"/7th-cpc-calculator"
},

{
title:"8th CPC Pension Calculator",
desc:"Estimate revised pension",
icon:"👴",
link:"/8th-cpc-pension-calculator"
},

{
title:"7th CPC Pension Calculator",
desc:"Calculate current pension",
icon:"📉",
link:"/7th-cpc-pension-calculator"
},

{
title:"8th CPC Arrear Calculator",
desc:"Salary arrear estimation",
icon:"💰",
link:"/8th-cpc-arrear"
},

{
title:"8th CPC Pension Arrear",
desc:"Pension arrear estimate",
icon:"💵",
link:"/8th-cpc-pension-arrear"
},

{
title:"Pay Fixation Calculator",
desc:"Promotion pay fixation",
icon:"📌",
link:"/pay-fixation-calculator"
},

{
title:"7th CPC Pay Matrix",
desc:"Complete pay level table",
icon:"📋",
link:"/7th-cpc-pay-matrix"
},

{
title:"8th CPC Pay Matrix",
desc:"Projected pay matrix",
icon:"📈",
link:"/8th-cpc-pay-matrix"
}

];

return(

<div className="mt-10">

{/* HEADER */}

<div className="text-center mb-6">

<h2 className="text-2xl font-semibold">
Other Government Salary Calculators
</h2>

<p className="text-gray-500 text-sm">
Explore related salary, pension, and allowance tools
</p>

</div>


{/* GRID */}

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

{tools.map((tool,index)=>(

<Link key={index} href={tool.link}>

<div className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition cursor-pointer text-center space-y-2">

<div className="text-3xl">
{tool.icon}
</div>

<div className="font-semibold">
{tool.title}
</div>

<div className="text-sm text-gray-500">
{tool.desc}
</div>

</div>

</Link>

))}

</div>

</div>

);

}