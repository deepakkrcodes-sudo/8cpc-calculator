import PayMatrixPage7CPC from "@/components/paymatrix/PayMatrixPage7CPC";
import OtherToolsSection from "@/components/tools/OtherToolsSection";
import FAQSection7cpcPayMatrix from "@/components/paymatrix/FAQSection7cpcPayMatrix";

export const metadata = {
  title: "7th CPC Pay Matrix 2026 – Level 1 to 18 Salary Table & Structure",

  description:
    "Check complete 7th CPC pay matrix with level-wise salary, basic pay progression, and increments. Updated salary table for central government employees.",

  keywords: [
    "7th CPC pay matrix table",
    "7th pay commission salary levels",
    "level 1 to 18 salary table",
    "basic pay progression 7th CPC",
    "central government pay matrix"
  ],

  alternates: {
    canonical: "https://8cpccalculator.com/7th-cpc-pay-matrix"
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the 7th CPC Pay Matrix and why was it introduced?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The 7th CPC Pay Matrix is a simplified salary structure replacing the 6th CPC pay band system. It provides a clear table showing salary progression based on level and years of service."
      }
    },
    {
      "@type": "Question",
      "name": "How do pay levels impact salary?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pay levels define salary range, increments and career growth. Higher levels offer higher starting pay and better long-term salary progression."
      }
    },
    {
      "@type": "Question",
      "name": "What is a cell in the pay matrix?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A cell represents a specific salary stage within a pay level. Employees move to the next cell annually through increments."
      }
    },
    {
      "@type": "Question",
      "name": "Does the pay matrix include allowances like DA and HRA?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No, the pay matrix only shows basic pay. Allowances like DA, HRA and TA are calculated separately."
      }
    },
    {
      "@type": "Question",
      "name": "Can I estimate future salary using the pay matrix?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, by tracking movement across cells and considering promotions, you can estimate future salary growth."
      }
    }
  ]
};


const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "7th CPC Pay Matrix Viewer",
  "url": "https://8cpccalculator.com/7th-cpc-pay-matrix",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "All",
  "description": "Interactive 7th CPC pay matrix tool to check salary levels, basic pay progression and increments.",
  "featureList": [
    "Level-wise salary table",
    "Basic pay progression",
    "Increment tracking",
    "Salary reference tool"
  ]
};




export default function Page() {
  return (


    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />


      <div className="space-y-6">

        <div className="flex justify-start">
          <div className="inline-flex gap-1 text-[11px] bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full font-medium">
            7th CPC Pay Matrix
          </div>
        </div>
        <div className="p-6 text-center space-y-4">

          <h1 className="text-xl md:text-2xl font-semibold tracking-tight md:whitespace-nowrap md:overflow-hidden md:text-ellipsis">
            <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              7th CPC Pay Matrix (Level 1 to 18 Salary Table)
            </span>
          </h1>

          <p className="text-xs md:text-sm text-gray-600 mx-auto md:whitespace-nowrap md:overflow-hidden md:text-ellipsis">
            Explore the complete 7th CPC pay matrix with level-wise basic pay, salary progression, and annual increments. This table helps central government employees understand their salary structure, pay level, and future growth under the 7th Pay Commission.
          </p>

          <div className="mx-auto h-[2px] w-40 md:w-56 lg:w-72 bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 rounded-full opacity-80"></div>

        </div>


        <PayMatrixPage7CPC />

        <div className="block mb-5 bg-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition">
          <OtherToolsSection />
        </div>

        <FAQSection7cpcPayMatrix />


      </div>

    </>
  );
}

