import PensionCalculator from "@/components/pension/PensionCalculator";
import OtherToolsSection from "@/components/tools/OtherToolsSection";

export const metadata = {
  title: "8th CPC Pension Calculator 2026 – DR, Commutation & Pension Estimate",

  description:
    "Calculate your 8th CPC pension with fitment factor, Dearness Relief (DR) and commutation. Compare 7th vs 8th CPC pension instantly.",

  keywords: [
    "8th CPC pension calculator",
    "pension calculation government employees",
    "DR pension calculator",
    "projected pension as per 8 cpc",
    "commutation pension calculator",
    "8th pay commission pension India"
  ],

  alternates: {
    canonical: "https://8cpccalculator.com/8th-cpc-pension-calculator"
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How is pension calculated under 8th CPC?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pension is calculated as 50% of revised basic pay after applying fitment factor along with DR."
      }
    },
    {
      "@type": "Question",
      "name": "What is fitment factor in pension?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Fitment factor multiplies existing pension to determine revised pension."
      }
    },
    {
      "@type": "Question",
      "name": "Does commutation affect pension?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, commutation reduces monthly pension but provides a lump sum."
      }
    }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "8th CPC Pension Calculator",
  "url": "https://8cpccalculator.com/8th-cpc-pension-calculator",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "All",
  "description": "Advanced pension calculator with DR, commutation and fitment factor.",
  "featureList": [
    "Pension calculation",
    "DR impact",
    "Commutation analysis",
    "7th vs 8th CPC comparison"
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

        {/* HERO CARD */}
        <div className="max-w-4xl mx-auto space-y-4">


          {/* Hero Center */}
          <div className="text-center space-y-4">

            <h1 className="text-xl md:text-2xl font-semibold tracking-tight">
              <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                8th CPC Pension Calculator (Commutation & Monthly Pension Estimate)
              </span>
            </h1>

            <p className="text-xs md:text-sm text-gray-600 mx-auto max-w-3xl">
              Estimate your pension under the projected 8th Pay Commission using fitment factor, Dearness Relief (DR) and commutation. Compare with 7th CPC pension for better retirement planning.
            </p>

            <div className="mx-auto h-[2px] w-40 md:w-56 lg:w-72 bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 rounded-full opacity-80"></div>

          </div>

        </div>

        <p className="text-xs md:text-sm text-gray-500 text-center max-w-2xl mx-auto">
          Includes DR impact, commutation rules and fitment factor based pension estimation for realistic monthly calculation.
        </p>


        {/* CALCULATOR CARD */}
        <div >

          <PensionCalculator />

        </div>


        <div className="block bg-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition">
          <OtherToolsSection />
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 space-y-6 text-left">

          <h2 className="text-xl font-semibold">
            8th CPC Pension – Complete Guide, Calculation & FAQs
          </h2>

          <div className="space-y-6 text-sm leading-relaxed">

            <div>
              <h3 className="font-semibold">01. How is pension calculated under the 8th CPC?</h3>
              <p className="text-gray-600">
                Pension is calculated by applying the fitment factor to your last drawn basic pay under the 7th CPC and then taking 50% of the revised amount. Dearness Relief (DR) is added on top of this to determine total monthly pension.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">02. What is the role of fitment factor in pension calculation?</h3>
              <p className="text-gray-600">
                Fitment factor is the multiplier used to revise basic pay and pension. It directly determines how much your pension increases under the new Pay Commission.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">03. How much pension increase can be expected in 8th CPC?</h3>
              <p className="text-gray-600">
                Based on expected fitment factors, pension may increase by 2.5 to 3 times. However, the actual increase depends on final government approval.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">04. What is Dearness Relief (DR) and how does it affect pension?</h3>
              <p className="text-gray-600">
                DR is a cost-of-living adjustment added to pension. It is revised periodically and significantly increases monthly pension over time.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">05. How does commutation impact pension?</h3>
              <p className="text-gray-600">
                Commutation allows you to take a lump sum by reducing a portion of your monthly pension. The remaining pension is used for DR calculation.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">06. Is DR applied on full pension?</h3>
              <p className="text-gray-600">
                No, DR is applied only on the remaining pension after commutation, not on the commuted portion.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">07. Can I compare 7th CPC and 8th CPC pension?</h3>
              <p className="text-gray-600">
                Yes, this calculator allows direct comparison, helping you understand the increase and plan retirement better.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">08. Is this pension calculator accurate?</h3>
              <p className="text-gray-600">
                This tool provides a highly accurate estimate using realistic assumptions. Actual pension may vary slightly based on official rules.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">09. When will 8th CPC pension be implemented?</h3>
              <p className="text-gray-600">
                The 8th Pay Commission is expected around 2026, but implementation depends on government notification.
              </p>
            </div>

          </div>

        </div>

      </div>

    </>

  );

}