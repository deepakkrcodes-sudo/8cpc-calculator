
import PayMatrixPage8CPC from "@/components/paymatrix/PayMatrixPage8CPC";
import OtherToolsSection from "@/components/tools/OtherToolsSection";
import FAQSection8CPCPayMatrix from "@/components/paymatrix/FAQSection8CPCPayMatrix";


export const metadata = {
  title: "8th CPC Pay Matrix 2026 (Projected) – Salary Levels & Fitment Factor",

  description:
    "Check projected 8th CPC pay matrix with expected fitment factor. View revised salary levels, basic pay structure and estimated salary for central government employees.",

  keywords: [
    "8th CPC pay matrix 2026",
    "8th pay commission salary table",
    "fitment factor 8th CPC",
    "projected pay matrix India",
    "government salary levels 8th CPC"
  ],

  alternates: {
    canonical: "https://8cpccalculator.com/8th-cpc-pay-matrix"
  }
};


const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is 8th CPC pay matrix?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The 8th CPC pay matrix is the expected salary structure for central government employees based on new fitment factor and revised pay levels."
      }
    },
    {
      "@type": "Question",
      "name": "What is the expected fitment factor in 8th CPC?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The expected fitment factor is estimated between 2.5 to 3.0, which will determine the revised basic pay."
      }
    },
    {
      "@type": "Question",
      "name": "Is 8th CPC pay matrix officially announced?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No, the official pay matrix is not yet announced. Current projections are based on expected trends and assumptions."
      }
    },
    {
      "@type": "Question",
      "name": "How can I estimate my salary using projected matrix?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can estimate your salary by applying expected fitment factor to your current basic pay and mapping it to projected levels."
      }
    }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "8th CPC Pay Matrix Tool",
  "url": "https://8cpccalculator.com/8th-cpc-pay-matrix",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "All",
  "description": "Projected 8th CPC pay matrix tool to estimate salary levels, basic pay and fitment factor impact.",
  "featureList": [
    "Projected salary table",
    "Fitment factor estimation",
    "Pay level comparison",
    "Future salary planning"
  ]
};

export default function Page() {
  return (

    <>
      <div className="space-y-6">

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
        />

        <div className="w-full max-w-full sm:max-w-[1200px] lg:max-w-[1100px] xl:max-w-[1000px] mx-auto px-2 sm:px-6 lg:px-8 py-6 space-y-4">

          <div className="w-full space-y-6">

            {/* HERO CONTENT */}
            <div className="text-center space-y-4">

              {/* H1 with gradient (MATCHED) */}
              <h1 className="text-xl md:text-2xl font-semibold tracking-tight">
                <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                  8th CPC Pay Matrix (Projected Salary Levels & Structure)
                </span>
              </h1>

              {/* Intro */}
              <p className="text-xs md:text-sm text-gray-600 mx-auto max-w-3xl">
                Explore the projected 8th CPC pay matrix based on expected fitment factor and salary revision trends. This helps central government employees estimate revised basic pay, salary levels, and future earnings under the upcoming pay commission.
              </p>

              {/* Gradient underline (MATCHED) */}
              <div className="mx-auto h-[2px] w-40 md:w-56 lg:w-72 bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 rounded-full opacity-80"></div>

            </div>

          </div>



          <PayMatrixPage8CPC />

          <div className="block bg-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition">
            <OtherToolsSection />
          </div>

          <FAQSection8CPCPayMatrix />
        </div>

      </div>

    </>
  );
}



