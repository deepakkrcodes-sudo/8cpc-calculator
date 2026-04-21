
import ArrearCalculatorPage from "@/components/arrear/ArrearCalculatorPage";
import OtherToolsSection from "@/components/tools/OtherToolsSection";


export const metadata = {
  title: "8th CPC Arrear Calculator 2026 – Most Accurate Salary Arrear Tool",

  description:
    "Calculate your 8th CPC arrears with promotions, increments, DA progression and fitment factor. India's most accurate arrear calculator for central government employees.",

  keywords: [
    "8th CPC arrear calculator",
    "salary arrear calculator 2026",
    "8th pay commission arrears calculation",
    "DA arrear calculation",
    "government salary arrear calculator India"
  ],

  alternates: {
    canonical: "https://8cpccalculator.com/8th-cpc-arrear-calculator"
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is 8th CPC arrear for salaried employees?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Arrear is the difference between salary under the 7th Pay Commission and revised salary under the 8th Pay Commission, paid from the effective date of implementation."
      }
    },
    {
      "@type": "Question",
      "name": "How is 8th CPC arrear calculated?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Arrear is calculated by applying fitment factor, recalculating DA, HRA and allowances, and summing monthly differences over the arrear period."
      }
    },
    {
      "@type": "Question",
      "name": "What is the role of fitment factor in arrear calculation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Fitment factor determines revised basic pay. Higher fitment factor leads to higher salary and larger arrears."
      }
    },
    {
      "@type": "Question",
      "name": "How does DA progression affect arrears?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "DA changes over time, so arrears depend on DA rates in each period. Higher DA increases total arrears."
      }
    },
    {
      "@type": "Question",
      "name": "Does promotion affect arrear calculation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, promotion increases pay level and salary, resulting in higher arrears from the promotion date."
      }
    },
    {
      "@type": "Question",
      "name": "Are allowances included in arrear calculation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, allowances like HRA and Transport Allowance are recalculated and included in arrears."
      }
    },
    {
      "@type": "Question",
      "name": "Is tax applicable on arrears?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, arrears are taxable, but relief under Section 89 may be applicable."
      }
    }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "8th CPC Arrear Calculator",
  "url": "https://8cpccalculator.com/8th-cpc-arrear-calculator",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "All",
  "description": "Advanced 8th CPC arrear calculator with promotion, increment and DA progression support.",
  "featureList": [
    "Arrear calculation",
    "DA progression",
    "Promotion impact",
    "Increment-based calculation"
  ],
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "INR"
  }
};


export default function Page() {
  return (

    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      {/* Web App Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webAppSchema),
        }}
      />



      <div className="w-full max-w-full sm:max-w-[1200px] lg:max-w-[1100px] xl:max-w-[1000px] mx-auto px-2 sm:px-6 lg:px-8 py-6">

        <div className="inline-flex items-center gap-2 text-[11px] bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full font-medium">
          <span>8th CPC</span>
          <span className="opacity-60">•</span>
          <span>Arrear Calculator</span>
          <span className="opacity-60">•</span>
          <span>2026</span>
        </div>


        <div className="p-2 text-center space-y-4">
          <h1 className="text-xl md:text-2xl font-semibold tracking-tight md:whitespace-nowrap md:overflow-hidden md:text-ellipsis">
            <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              8th CPC Salary Arrear Calculator
            </span>
          </h1>

          <p className="text-xs md:text-sm text-gray-600 mx-auto max-w-3xl">
            Estimate salary arrears from January 2026 using expected fitment factor,
            DA progression, city class, HRA assumptions and increment month.
          </p>

          <div className="mx-auto h-[2px] w-40 md:w-56 lg:w-72 bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 rounded-full opacity-80"></div>

          <ArrearCalculatorPage />
        </div>

        <div className="block bg-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition">
          <OtherToolsSection />
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5 space-y-4">
          <h2 className="text-lg font-semibold">
            Frequently Asked Questions (8th CPC Arrear Calculator)
          </h2>

          <div className="space-y-3 text-sm">
            <p className="text-sm text-gray-600">
              8th CPC arrears depend on multiple factors like fitment factor, DA growth,
              annual increments and promotions. Below are common questions to help you
              understand how arrears are calculated.
            </p>

            <div>
              <h3 className="font-medium">
                What is 8th CPC arrear for salaried employees?
              </h3>
              <p className="text-gray-600">
                Arrear is the difference between salary under the 7th Pay Commission
                and revised salary under the 8th Pay Commission, paid from the
                effective date of implementation.
              </p>
            </div>

            <div>
              <h3 className="font-medium">
                How is 8th CPC arrear calculated?
              </h3>
              <p className="text-gray-600">
                Arrear is calculated by applying the expected fitment factor to your
                basic pay, recalculating allowances like DA and HRA, and summing the
                monthly differences over the arrear period.
              </p>
            </div>

            <div>
              <h3 className="font-medium">
                What is the role of fitment factor in arrear calculation?
              </h3>
              <p className="text-gray-600">
                The fitment factor determines the revised basic pay under the 8th CPC.
                Higher fitment factor leads to higher salary and larger arrears.
              </p>
            </div>

            <div>
              <h3 className="font-medium">
                How does DA progression affect arrears?
              </h3>
              <p className="text-gray-600">
                Dearness Allowance increases over time, so arrears depend on DA rates
                applicable in each period. Higher DA growth results in higher arrears.
              </p>
            </div>

            <div>
              <h3 className="font-medium">
                Does annual increment impact arrears?
              </h3>
              <p className="text-gray-600">
                Yes, annual increments increase basic pay during the arrear period,
                which further increases total arrears.
              </p>
            </div>

            <div>
              <h3 className="font-medium">
                How does promotion affect arrear calculation?
              </h3>
              <p className="text-gray-600">
                Promotion changes your pay level and basic pay, resulting in higher
                revised salary and increased arrears from the promotion date.
              </p>
            </div>

            <div>
              <h3 className="font-medium">
                From which date will 8th CPC arrears be calculated?
              </h3>
              <p className="text-gray-600">
                Arrears are typically calculated from the effective date of the Pay
                Commission, which is expected to be January 2026 or as notified by
                the government.
              </p>
            </div>

            <div>
              <h3 className="font-medium">
                Are allowances included in arrear calculation?
              </h3>
              <p className="text-gray-600">
                Yes, allowances like DA, HRA and Transport Allowance are recalculated
                based on revised basic pay and included in total arrears.
              </p>
            </div>

            <div>
              <h3 className="font-medium">
                Is tax applicable on arrears?
              </h3>
              <p className="text-gray-600">
                Yes, arrears are taxable as per income tax rules. Relief under Section
                89 may be applicable to reduce tax burden.
              </p>
            </div>

            <div>
              <h3 className="font-medium">
                Can this calculator give exact arrear amount?
              </h3>
              <p className="text-gray-600">
                This calculator provides a close estimate based on assumptions like
                fitment factor and DA growth. Actual arrears may vary as per official
                government orders.
              </p>
            </div>
          </div>
        </div>



      </div>

    </>
  );
}

