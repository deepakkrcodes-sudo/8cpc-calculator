"use client";

import Link from "next/link";
import { useState } from "react";

const blogData = [

    {
        id: 3,
        slug: "most-probable-fitment-factor-8th-cpc",
        title: "Most Probable 8th CPC Fitment Factor - 2026 Analysis",
        category: "salary",
        date: "May 2026",
        readTime: "10 min read",
        image:
            "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200",
        excerpt:
            "A data-driven editorial on whether 1.92, 2.28, 2.57 or 3.83 is the most probable fitment outcome."
    },

    
    {
        id: 2,
        slug: "factors-affecting-8th-pay-commission",
        title: "Key Factors Affecting 8th Pay Commission Salary Decisions",
        category: "analysis",
        date: "April 2026",
        readTime: "7 min read",
        image:
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200",
        excerpt:
            "Inflation, fiscal deficit, and political decisions - understand what really drives pay commission outcomes."
    },
    
    {
        id: 4,
        slug: "8th-cpc-questions-analysis",
        title: "16 Key Questions Asked by 8th CPC - Meaning & Impact Explained",
        category: "analysis",
        date: "April 2026",
        readTime: "9 min read",
        image:
            "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1200",
        excerpt:
            "Decode official consultation questions and understand how they shape salary, pension, and allowances."
    },

    {
        id: 1,
        slug: "history-of-pay-commission-india",
        title: "History of Pay Commissions in India (1st to 7th CPC Explained)",
        category: "guides",
        date: "April 2026",
        readTime: "6 min read",
        image:
            "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200",
        excerpt:
            "Understand how pay commissions evolved in India, major salary changes, and what trends indicate for 8th CPC."
    }
];

export default function BlogPage() {
    const [active, setActive] = useState("all");

    const filtered =
        active === "all"
            ? blogData
            : blogData.filter((b) => b.category === active);

    return (
        <div className="w-full max-w-full sm:max-w-[1200px] lg:max-w-[1100px] xl:max-w-[1000px] mx-auto px-2 sm:px-6 lg:px-8 py-6 space-y-6">
            <div className="text-center space-y-4">
                <h1 className="text-xl md:text-2xl font-semibold tracking-tight">
                    <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                        8th CPC Insights: Salary, Fitment Factor & Analysis (2026)
                    </span>
                </h1>

                <p className="text-xs md:text-sm text-gray-600 max-w-3xl mx-auto">
                    Detailed explanations, salary insights, and analysis to help you understand the 8th Pay Commission clearly.
                </p>

                <div className="mx-auto h-[2px] w-40 md:w-56 lg:w-72 bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 rounded-full opacity-80"></div>
            </div>

            <div className="flex justify-center gap-3 flex-wrap">
                {["all", "guides", "analysis", "salary"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActive(tab)}
                        className={`px-3 py-1 text-xs rounded-full border ${active === tab
                            ? "bg-indigo-600 text-white"
                            : "bg-white text-gray-600"
                            }`}
                    >
                        {tab.toUpperCase()}
                    </button>
                ))}
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
                {filtered.map((blog) => (
                    <Link key={blog.id} href={`/8th-cpc/insights/${blog.slug}`}>
                        <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer overflow-hidden">
                            <img
                                src={blog.image}
                                alt={blog.title}
                                className="w-full h-40 object-cover"
                            />

                            <div className="p-4 space-y-2">
                                <div className="text-xs text-gray-400 flex gap-2">
                                    <span>{blog.date}</span>
                                    <span>-</span>
                                    <span>{blog.readTime}</span>
                                </div>

                                <h2 className="text-sm md:text-base font-semibold leading-snug">
                                    {blog.title}
                                </h2>

                                <p className="text-xs md:text-sm text-gray-600 line-clamp-2">
                                    {blog.excerpt}
                                </p>

                                <div className="pt-2 text-xs text-indigo-600 font-medium">
                                    Read Article
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
