import LTCPageClient from "../ltc-planner/LTCPageClient";
import FAQSection from "./FAQSection";
import { FAQ_DATA } from "./faqData";
import OtherToolsSection from "@/components/tools/OtherToolsSection";

export const metadata = {
  title: "LTC Rules for Central Government Employees (2026 Complete Guide)",
  description:
    "Complete LTC rules including block system, eligibility, entitlement, carry forward, and claim process for central government employees.",
  keywords: [
    "ltc rules",
    "ltc rules central government",
    "ltc block system",
    "ltc eligibility rules",
    "ltc guide india"
  ],
  alternates: {
    canonical: "https://8cpccalculator.com/ltc-rules-central-government"
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: (FAQ_DATA || []).flatMap(section =>
    (section?.faqs || []).map(faq => ({
      "@type": "Question",
      name: faq?.q || "",
      acceptedAnswer: {
        "@type": "Answer",
        text: faq?.a || "",
      },
    }))
  ),
};

export default function Page() {
  return (
    <>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="w-full max-w-full sm:max-w-[1200px] lg:max-w-[1100px] xl:max-w-[1000px] mx-auto px-2 sm:px-6 lg:px-8 py-6 space-y-4">

        {/* HERO */}
        <div className="w-full max-w-[1400px] mx-auto space-y-4 mb-6">

          <div className="text-center space-y-4">

            <h1 className="text-xl md:text-2xl font-semibold tracking-tight">
              <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                LTC Rules for Central Government Employees (Complete 2026 Guide)
              </span>
            </h1>

            <p className="text-xs md:text-sm text-gray-600 mx-auto max-w-3xl">
              Explore complete LTC rules including eligibility, block system, travel entitlement, air travel guidelines, and reimbursement process for central government employees.
            </p>

            <div className="mx-auto h-[2px] w-40 md:w-56 lg:w-72 bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 rounded-full opacity-80"></div>

          </div>

          <p className="text-xs md:text-sm text-gray-500 text-center max-w-2xl mx-auto">
            Covers LTC block years, home town and all India rules, carry forward, fresh recruit provisions, and latest government updates.
          </p>

        </div>


        <LTCPageClient
          title="LTC Rules Guide"
          description="Complete LTC rules guide for central govt employees"
          schemaUrl="https://8cpccalculator.com/ltc-rules-central-government"
        />



        <FAQSection />

        <div className="bg-gray-100 p-4 rounded-xl shadow-sm">
          <OtherToolsSection />
        </div>

      </div>
    </>
  );
}