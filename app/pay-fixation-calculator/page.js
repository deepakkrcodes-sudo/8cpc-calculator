import PayFixationCalculator from "@/components/payfixation/PayFixationCalculator";
import OtherToolsSection from "@/components/tools/OtherToolsSection";
export const metadata = {
  title: "Pay Fixation Calculator (7th to 8th CPC) – Promotion & Increment Comparison",

  description:
    "Calculate pay fixation after promotion using 7th CPC rules and estimate 8th CPC salary using fitment factor. Compare Date of Promotion vs Date of Next Increment.",

  keywords: [
    "pay fixation calculator",
    "promotion pay fixation 7th CPC",
    "increment vs promotion salary",
    "8th CPC pay fixation",
    "government salary fixation India"
  ],

  alternates: {
    canonical: "https://8cpccalculator.com/pay-fixation-calculator"
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How is pay fixed after promotion?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Basic pay is increased by one increment and then placed in next level at nearest higher cell."
      }
    },
    {
      "@type": "Question",
      "name": "Which is better: promotion date or increment date?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It depends on timing. This calculator compares both scenarios to find the better option."
      }
    },
    {
      "@type": "Question",
      "name": "Does pay fixation affect allowances?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, DA and HRA increase with basic pay after fixation."
      }
    }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Pay Fixation Calculator",
  "url": "https://8cpccalculator.com/pay-fixation-calculator",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "All",
  "description": "Compare promotion vs increment pay fixation with detailed salary impact.",
  "featureList": [
    "Promotion vs increment comparison",
    "Salary impact analysis",
    "Month-wise difference",
    "8th CPC projection"
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


      <div className="w-full max-w-full sm:max-w-[1200px] lg:max-w-[1100px] xl:max-w-[1000px] mx-auto px-2 sm:px-6 lg:px-8 py-6 space-y-4">


        <div className="max-w-4xl mx-auto space-y-4">

          {/* Badge */}
          <div className="flex justify-start">
            <div className="inline-flex items-center gap-2 text-[11px] bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full font-medium">
              <span>Pay Fixation</span>
              <span className="opacity-60">•</span>
              <span>Promotion vs Increment</span>
              <span className="opacity-60">•</span>
              <span>7th to 8th CPC</span>
            </div>
          </div>

          {/* Hero Center */}
          <div className="text-center space-y-4">

            <h1 className="text-xl md:text-2xl font-semibold tracking-tight">
              <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Pay Fixation Calculator (Promotion vs Next Increment Comparison)
              </span>
            </h1>

            <p className="text-xs md:text-sm text-gray-600 mx-auto max-w-3xl">
              Compare salary fixation based on Date of Promotion and Date of Next Increment. Analyze month-wise salary difference and long-term financial impact under 7th CPC and projected 8th CPC scenarios.
            </p>

            <div className="mx-auto h-[2px] w-40 md:w-56 lg:w-72 bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 rounded-full opacity-80"></div>

          </div>

        </div>

        <p className="text-xs md:text-sm text-gray-500 text-center max-w-2xl mx-auto">
          Includes promotion rules, increment timing impact and fitment factor based salary projection for accurate comparison.
        </p>

        <PayFixationCalculator />

        <div className="block bg-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition">
          <OtherToolsSection />
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 space-y-6 text-left">

          <h2 className="text-xl font-semibold">
            Pay Fixation – Complete Guide, Rules & FAQs
          </h2>

          <div className="space-y-6 text-sm leading-relaxed">

            <div>
              <h3 className="font-semibold">01. What is pay fixation and why is it important?</h3>
              <p className="text-gray-600">
                Pay fixation determines your revised salary after promotion, increment or pay commission changes. It directly affects your basic pay, allowances and long-term salary growth, making it a critical financial decision for government employees.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">02. What is the difference between Date of Promotion and Date of Next Increment?</h3>
              <p className="text-gray-600">
                Employees can choose between fixation from promotion date or next increment date. Each option results in different salary outcomes over time, and the better option depends on timing and pay level.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">03. How is pay fixed after promotion under 7th CPC?</h3>
              <p className="text-gray-600">
                Basic pay is first increased by one increment in the current level, then moved to the next higher level and fixed at the nearest higher cell. This ensures a structured increase in salary.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">04. Which option gives more salary: promotion date or increment date?</h3>
              <p className="text-gray-600">
                There is no single answer. In some cases, choosing next increment date yields higher long-term benefits, while in others, immediate promotion fixation is better. This calculator helps compare both scenarios.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">05. How does increment timing affect salary?</h3>
              <p className="text-gray-600">
                Increment timing determines when your salary increases. A well-timed increment can significantly increase cumulative earnings over years.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">06. What is the role of fitment factor in 8th CPC pay fixation?</h3>
              <p className="text-gray-600">
                Fitment factor will multiply existing basic pay to determine revised salary under 8th CPC. It will play a crucial role in future pay fixation.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">07. Does pay fixation affect DA and HRA?</h3>
              <p className="text-gray-600">
                Yes, since DA and HRA are calculated as a percentage of basic pay, any increase due to fixation increases total salary significantly.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">08. Can I use this calculator for long-term salary planning?</h3>
              <p className="text-gray-600">
                Yes, this tool helps analyze long-term financial impact of fixation choices, making it useful for career and financial planning.
              </p>
            </div>

          </div>

        </div>


      </div>

    </>

  );

}