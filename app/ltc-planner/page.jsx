import LTCPageClient from "./LTCPageClient";

export const metadata = {
  title: "LTC Planner 2026 – Leave Travel Concession Calculator for Govt Employees",
  description:
    "Plan your LTC with block year eligibility, home town and all India LTC rules. Calculate LTC benefits for central government employees.",
  keywords: [
    "LTC planner",
    "leave travel concession calculator",
    "LTC rules central government"
  ],
  alternates: {
    canonical: "https://8cpccalculator.com/ltc-planner"
  }
};

export default function Page() {
  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

      {/* HERO */}
      <div className="w-full max-w-[1400px] mx-auto space-y-4 mb-6">

        <div className="flex justify-start">
          <div className="inline-flex items-center gap-2 text-[11px] bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full font-medium">
            <span>LTC Planner</span>
            <span className="opacity-60">•</span>
            <span>Govt Employees</span>
            <span className="opacity-60">•</span>
            <span>2026</span>
          </div>
        </div>

        <div className="text-center space-y-4">
          <h1 className="text-xl md:text-2xl font-semibold tracking-tight">
            <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              LTC Planner 2026 (Leave Travel Concession Calculator)
            </span>
          </h1>

          <p className="text-xs md:text-sm text-gray-600 mx-auto max-w-3xl">
            Plan your Leave Travel Concession (LTC) with block year tracking, home town and all India eligibility, and latest government rules.
          </p>

          <div className="mx-auto h-[2px] w-40 md:w-56 lg:w-72 bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 rounded-full opacity-80"></div>
        </div>

        <p className="text-xs md:text-sm text-gray-500 text-center max-w-2xl mx-auto">
          Covers block year system, fresh recruits, carry forward rules and LTC eligibility calculation.
        </p>

      </div>

      {/* CLIENT PART */}
      <LTCPageClient />

    </div>
  );
}