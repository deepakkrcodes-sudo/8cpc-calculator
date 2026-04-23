import PensionArrearCalculatorPage from "@/components/pensionArrear/PensionArrearCalculatorPage";
import OtherToolsSection from "@/components/tools/OtherToolsSection";
export const metadata = {
  title: "8th CPC Pension Arrear Calculator 2026 – Accurate DR & Pension Arrears",

  description:
    "Calculate 8th CPC pension arrears with DR progression, fitment factor and commutation impact. Accurate pension arrear calculator for central government pensioners.",

  keywords: [
    "8th CPC pension arrear calculator",
    "pension arrears calculation 2026",
    "DR pension arrear calculator",
    "commuted pension arrears",
    "8 cpc arrear calculator",
    "government pension arrears India"
  ],

  alternates: {
    canonical: "https://8cpccalculator.com/8th-cpc-pension-arrear-calculator"
  }
};
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How are 8th CPC pension arrears calculated?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "They are calculated by applying fitment factor, DR progression and monthly differences over arrear period."
      }
    },
    {
      "@type": "Question",
      "name": "Does commutation affect arrears?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, arrears are calculated only on remaining pension after commutation."
      }
    },
    {
      "@type": "Question",
      "name": "Is DR included in pension arrears?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, DR is recalculated for each period and significantly impacts arrears."
      }
    },
    {
      "@type": "Question",
      "name": "Is tax applicable on pension arrears?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, arrears are taxable but relief under Section 89 may apply."
      }
    }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "8th CPC Pension Arrear Calculator",
  "url": "https://8cpccalculator.com/8th-cpc-pension-arrear-calculator",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "All",
  "description": "Advanced pension arrear calculator with DR progression, commutation and fitment factor.",
  "featureList": [
    "Pension arrear calculation",
    "DR progression support",
    "Commutation impact",
    "Accurate estimation"
  ]
};

export default function Page() {
  return (

    <>
      {/* SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />

      {/* MAIN CONTAINER (SINGLE SOURCE OF TRUTH) */}
      <div className="w-full max-w-full sm:max-w-[1200px] lg:max-w-[1100px] xl:max-w-[1000px] mx-auto px-2 sm:px-6 lg:px-8 py-6 space-y-4">
        {/* HERO SECTION */}
        <div className="max-w-4xl mx-auto space-y-4">

        

          {/* Hero Center */}
          <div className="text-center space-y-4">

            <h1 className="text-xl md:text-2xl font-semibold tracking-tight">
              <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                8th CPC Pension Arrear Calculator (Accurate DR & Pension Estimation)
              </span>
            </h1>

            <p className="text-xs md:text-sm text-gray-600 mx-auto max-w-3xl">
              Estimate your 8th CPC pension arrears with high accuracy by considering fitment factor, Dearness Relief (DR) progression, commutation impact and implementation timeline.
            </p>

            <div className="mx-auto h-[2px] w-40 md:w-56 lg:w-72 bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 rounded-full opacity-80"></div>

          </div>
        </div>

        {/* CALCULATOR (FULL WIDTH) */}
        <div className="w-full">
          <PensionArrearCalculatorPage />
        </div>

        {/* OTHER TOOLS */}
        <div className="bg-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition">
          <OtherToolsSection />
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-6 text-left">

          <h2 className="text-xl font-semibold">
            8th CPC Pension Arrears – Complete Guide & FAQs
          </h2>

          <div className="space-y-6 text-sm leading-relaxed">

            <div>
              <h3 className="font-semibold">01. What are 8th CPC pension arrears?</h3>
              <p className="text-gray-600">
                Pension arrears represent the difference between pension calculated under the 7th CPC and revised pension under the 8th CPC, paid retrospectively from the implementation date. It forms a significant lump sum amount for pensioners.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">02. How are pension arrears calculated in real scenarios?</h3>
              <p className="text-gray-600">
                Pension arrears are calculated by revising basic pension using fitment factor, applying DR for each period, and calculating the difference month-by-month. This approach ensures accurate estimation rather than simple approximation.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">03. How does fitment factor impact pension arrears?</h3>
              <p className="text-gray-600">
                Fitment factor directly increases basic pension. A higher factor results in higher revised pension and significantly larger arrears.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">04. How does Dearness Relief (DR) affect arrears?</h3>
              <p className="text-gray-600">
                DR changes periodically, so arrears depend on DR rates in each period. Increasing DR leads to compounding growth in arrears.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">05. Does commutation affect pension arrears?</h3>
              <p className="text-gray-600">
                Yes, arrears are calculated only on the remaining pension after commutation. DR is not applied to the commuted portion, which impacts total arrears.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">06. From when will 8th CPC pension arrears be applicable?</h3>
              <p className="text-gray-600">
                Arrears are expected from January 2026 or official implementation date. Delay in implementation increases total arrears significantly.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">07. Will arrears be paid as lump sum?</h3>
              <p className="text-gray-600">
                Yes, pension arrears are generally paid as a lump sum after implementation, although payment may be phased depending on policy decisions.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">08. Is tax applicable on pension arrears?</h3>
              <p className="text-gray-600">
                Yes, arrears are taxable under income tax rules. Relief under Section 89 can be claimed to reduce tax liability.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">09. How accurate is this pension arrear calculator?</h3>
              <p className="text-gray-600">
                This calculator provides highly accurate estimates by considering DR progression, commutation and realistic assumptions. Actual values may vary slightly based on official orders.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">10. Why is this calculator better than others?</h3>
              <p className="text-gray-600">
                Unlike basic tools, this calculator includes DR progression, commutation effects and real-world assumptions, making it more reliable for planning.
              </p>
            </div>

          </div>

        </div>

      </div>
    </>

  );
}