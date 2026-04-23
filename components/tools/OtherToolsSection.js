"use client";

import Link from "next/link";

export default function OtherToolsSection() {

    const tools = [
        // 🔥 TOP PRIORITY
        {
            title: "8th CPC Arrear Calculator",
            desc: "8th CPC arrear calculator with DA, annual increment & promotion impact (2026 onwards)",
            icon: "💰",
            link: "/8th-cpc-arrear-calculator",
            highlight: true
        },


        // 🔥 SECONDARY
        {
            title: "8th CPC Salary Calculator",
            desc: "Estimate your 8th CPC salary with fitment factor impact",
            icon: "🧮",
            link: "/",
            highlight: true
        },

        {
            title: "8th CPC Pension Calculator",
            desc: "8th CPC pension calculator with DR & commutation (projected)",
            icon: "👴",
            link: "/8th-cpc-pension-calculator",
            highlight: true
        },

        {
            title: "8th CPC Pension Arrear",
            desc: "Estimate 8th CPC pension arrears with fitment factor & DR progression (Jan 2026)",
            icon: "💵",
            link: "/8th-cpc-pension-arrear",
            highlight: true
        },

        {
            title: "LTC Planner & Guide",
            desc: "LTC planner, eligibility check, block year details & travel benefits",
            icon: "✈️",
            link: "/ltc-planner",
            highlight: false
        },
        {
            title: "Pay Fixation Calculator",
            desc: "Pay fixation calculator: Compare Promotion vs DNI option",
            icon: "📌",
            link: "/pay-fixation-calculator",
            highlight: false
        },

        // 🔹 SUPPORT
        {
            title: "8th CPC Pay Matrix",
            desc: "8th CPC pay matrix with levels, salary structure & fitment factor projections",
            icon: "📈",
            link: "/8th-cpc-pay-matrix"
        },
        {
            title: "7th CPC Salary Calculator",
            desc: "7th CPC salary calculator with DA, HRA & salary breakdown",
            icon: "📊",
            link: "/7th-cpc-calculator"
        },
        {
            title: "7th CPC Pension Calculator",
            desc: "7th CPC pension calculator with DR & commutation",
            icon: "💼",
            link: "/7th-cpc-pension-calculator"
        },
        {
            title: "7th CPC Pay Matrix",
            desc: "7th CPC pay matrix with levels, pay scale & salary structure",
            icon: "📋",
            link: "/7th-cpc-pay-matrix"
        }
    ];

    return (
        <div className="mt-10">

            {/* HEADER */}
            <div className="text-center mb-6">
                <h2 className="text-xl md:text-2xl font-semibold">
                    Explore More Salary & Pension Tools
                </h2>
                <p className="text-gray-500 text-sm">
                    Powerful calculators for central government employees
                </p>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                {tools.map((tool, index) => (

                    <Link key={index} href={tool.link}>

                        <div
                            className={`h-full rounded-xl p-5 transition cursor-pointer flex flex-col justify-between
              ${tool.highlight
                                    ? "bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-200 shadow-sm hover:shadow-md"
                                    : "bg-white shadow-sm hover:shadow-md"
                                }`}
                        >

                            {/* ICON */}
                            <div className="text-3xl mb-2">
                                {tool.icon}
                            </div>

                            {/* TITLE */}
                            <div className="font-semibold text-sm md:text-base">
                                {tool.title}
                            </div>

                            {/* DESC */}
                            <div className="text-xs md:text-sm text-gray-500 mt-1">
                                {tool.desc}
                            </div>

                        </div>

                    </Link>

                ))}

            </div>

        </div>
    );
}