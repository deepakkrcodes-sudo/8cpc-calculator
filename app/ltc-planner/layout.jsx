export const metadata = {
  title: "LTC Planner & Calculator 2026 | Calculate LTC Eligibility & Claims",
  description:
    "Free LTC Planner & Calculator for Central Government employees. Calculate LTC eligibility, block year, travel entitlement and claims easily with latest rules.",

  keywords: [
    "LTC Planner",
    "LTC Calculator",
    "LTC India",
    "LTC eligibility calculator",
    "LTC block year calculator",
    "LTC claim calculator",
    "LTC for central government employees",
    "Leave Travel Concession calculator",
    "LTC Central Govt.",
    "Central Govt. LTC",
    "LTC"
  ],
};

export default function LTCLayout({ children }) {
  return (
    <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto">
        {children}
      </div>
    </div>
  );
}