"use client";

import { useState } from "react";

const articlesData = [
  {
    id: 1,
    title: "Memorandum Submission Deadline Extended to 31 May 2026",
    type: "official",
    tag: "Official Update",
    color: "blue",
    date: "April 2026",
    summary:
      "Government has extended the deadline for submission of memorandum for the 8th Pay Commission.",
    crux: "Deadline extended from 30 April to 31 May 2026",
    points: [
      "Extra time for employee unions",
      "Important procedural milestone",
      "Submissions will shape recommendations",
    ],
    content: [
      "The government has officially extended the deadline for submission of memorandum to the 8th Pay Commission. This gives employee unions and stakeholders additional time to present their demands.",
      "Earlier, the deadline was set for 30 April 2026, but has now been extended to 31 May 2026, indicating that the consultation process is being taken seriously.",
      "This stage is critical because inputs received during this phase will directly influence the recommendations of the commission.",
    ],
    image:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=1200",
  },
  {
    id: 2,
    title: "8th CPC Consultation Meetings Begin in Delhi",
    type: "official",
    tag: "Key Development",
    color: "indigo",
    date: "April 2026",
    summary:
      "Multi-day consultation meetings have started in Delhi involving stakeholders and employee representatives.",
    crux: "Consultation phase officially begins",
    points: [
      "Meetings held from 28–30 April",
      "Discussion on pay, allowances, and pension",
      "Stakeholder engagement initiated",
    ],
    content: [
      "The 8th Pay Commission has begun its consultation meetings in Delhi, marking a significant step in the process.",
      "These meetings involve discussions on salary structure, fitment factor, allowances, and pension-related aspects.",
      "This indicates that the commission has moved from expectation phase to active engagement and groundwork.",
    ],
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200",
  },
  {
    id: 3,
    title: "Stakeholder Interaction & Field Visits Planned",
    type: "official",
    tag: "Official Process",
    color: "blue",
    date: "April 2026",
    summary:
      "Structured interaction sessions and department-level visits are being scheduled.",
    crux: "Field visits and department inputs to shape report",
    points: [
      "Sessions with employee groups",
      "Department-level consultations",
      "Real-world data collection",
    ],
    content: [
      "The commission has outlined a structured consultation process including interactions with employee groups.",
      "Field visits to departments such as Railways and Defence are planned to understand ground realities.",
      "These insights will play a crucial role in forming balanced and realistic recommendations.",
    ],
    image:
      "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=1200",
  },
  {
    id: 4,
    title: "What Deadline Extension Means for 8th CPC Outcome",
    type: "analysis",
    tag: "Analysis",
    color: "purple",
    date: "April 2026",
    summary:
      "Understanding how the extended timeline may impact salary revision and recommendations.",
    crux: "More time = more detailed and stronger demands",
    points: [
      "Unions can refine demands",
      "More data-backed proposals",
      "Possibility of better outcomes",
    ],
    content: [
      "The extension of deadline gives employee unions additional time to prepare comprehensive and data-backed demands.",
      "This can potentially result in more realistic and well-supported proposals being submitted to the commission.",
      "In past commissions, detailed submissions have had a measurable impact on final outcomes.",
    ],
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200",
  },
];

export default function Latest8CPCPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [expanded, setExpanded] = useState(null);

  const filteredArticles =
    activeTab === "all"
      ? articlesData
      : articlesData.filter((a) => a.type === activeTab);

  const getBorderColor = (color) => {
    if (color === "blue") return "border-blue-500";
    if (color === "purple") return "border-purple-500";
    if (color === "indigo") return "border-indigo-500";
    return "border-gray-300";
  };

  const getTagStyle = (color) => {
    if (color === "blue") return "bg-blue-100 text-blue-700";
    if (color === "purple") return "bg-purple-100 text-purple-700";
    if (color === "indigo") return "bg-indigo-100 text-indigo-700";
    return "bg-gray-100 text-gray-700";
  };

  return (
    <div className="w-full max-w-full sm:max-w-[1200px] lg:max-w-[1100px] xl:max-w-[1000px] mx-auto px-2 sm:px-6 lg:px-8 py-6 space-y-6">

      {/* HERO */}
      <div className="text-center space-y-4">
        <h1 className="text-xl md:text-2xl font-semibold tracking-tight">
          <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            Latest on 8th CPC – Official Updates & Analysis
          </span>
        </h1>

        <p className="text-xs md:text-sm text-gray-600 max-w-3xl mx-auto">
          Track real government updates, commission developments and decoded insights in a clean, structured format.
        </p>

        <div className="mx-auto h-[2px] w-40 md:w-56 lg:w-72 bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 rounded-full opacity-80"></div>
      </div>

      {/* FILTERS */}
      <div className="flex justify-center gap-3 flex-wrap">
        {["all", "official", "analysis"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1 text-xs rounded-full border ${
              activeTab === tab
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-600"
            }`}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/* CARDS */}
      <div className="space-y-4">
        {filteredArticles.map((article) => (
          <div
            key={article.id}
            className={`bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition p-5 border-l-4 ${getBorderColor(
              article.color
            )}`}
          >
            <div className="flex flex-col md:flex-row gap-4">

              {/* IMAGE */}
              <img
                src={article.image}
                alt={article.title}
                className="w-full md:w-48 h-32 object-cover rounded-lg"
              />

              {/* CONTENT */}
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2 text-xs">
                  <span
                    className={`px-2 py-1 rounded-full ${getTagStyle(
                      article.color
                    )}`}
                  >
                    {article.tag}
                  </span>
                  <span className="text-gray-400">{article.date}</span>
                </div>

                <h2 className="font-semibold text-sm md:text-base">
                  {article.title}
                </h2>

                <p className="text-xs md:text-sm text-gray-600">
                  {article.summary}
                </p>

                {/* CRUX */}
                <div className="bg-gray-50 p-2 rounded-md text-xs md:text-sm">
                  👉 {article.crux}
                </div>

                {/* POINTS */}
                <ul className="text-xs text-gray-600 list-disc pl-4 space-y-1">
                  {article.points.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>

                {/* READ MORE */}
                <button
                  onClick={() =>
                    setExpanded(expanded === article.id ? null : article.id)
                  }
                  className="text-xs text-indigo-600 font-medium"
                >
                  {expanded === article.id
                    ? "Show Less"
                    : "Read Full Analysis →"}
                </button>

                {/* EXPANDED */}
                {expanded === article.id && (
                  <div className="mt-3 space-y-2 text-sm text-gray-700">
                    {article.content.map((c, i) => (
                      <p key={i}>{c}</p>
                    ))}

                    <div className="pt-2">
                      <a
                        href="/8th-cpc-pension-calculator"
                        className="text-indigo-600 text-sm font-medium"
                      >
                        👉 Try Pension Calculator →
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}