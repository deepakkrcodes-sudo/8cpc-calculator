import SeventhSalaryCalculatorPremium from "@/components/calculator/SeventhSalaryCalculatorPremium";
import OtherToolsSection from "@/components/tools/OtherToolsSection";


export const metadata = {

  title: "7th CPC Salary Calculator 2026 – Accurate In-Hand Pay, DA & HRA",

  description: "Calculate your 7th CPC salary with DA, HRA, TA and deductions. Get accurate in-hand salary for central government employees with latest DA rates.",

  keywords: [
    "7th CPC salary calculator",
    "7th pay commission calculator",
    "in hand salary 7th CPC",
    "DA HRA calculator government employees",
    "central government salary calculator"
  ],

  alternates: {
    canonical: "https://8cpccalculator.com/7th-cpc-calculator"
  }

};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [

    {
      "@type": "Question",
      "name": "What is the 7th CPC Salary Calculator and who should use it?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The 7th CPC Salary Calculator is an online tool designed for central government employees to estimate their in-hand salary. It considers basic pay, DA, HRA, TA and deductions to provide an accurate salary breakdown."
      }
    },

    {
      "@type": "Question",
      "name": "How is in-hand salary calculated under the 7th Pay Commission?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In-hand salary is calculated by adding basic pay, DA, HRA and allowances, and subtracting deductions like NPS, CGHS and income tax. This calculator automates the process using latest DA rates."
      }
    },

    {
      "@type": "Question",
      "name": "What is Dearness Allowance (DA) in 7th CPC?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Dearness Allowance is a cost-of-living adjustment provided to central government employees and pensioners. It is revised periodically and directly impacts overall salary as it is a percentage of basic pay."
      }
    },

    {
      "@type": "Question",
      "name": "How is House Rent Allowance (HRA) calculated in 7th CPC?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "HRA is calculated as a percentage of basic pay depending on city classification (X, Y, Z). Employees in metro cities receive higher HRA compared to non-metro cities."
      }
    },

    {
      "@type": "Question",
      "name": "What are pay levels in the 7th CPC pay matrix?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The 7th CPC pay matrix defines salary levels for employees, replacing the grade pay system. Each level determines salary progression and annual increments."
      }
    },

    {
      "@type": "Question",
      "name": "Which deductions are included in the 7th CPC salary calculation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Common deductions include NPS contribution, CGHS charges and income tax. These deductions reduce the gross salary to determine final in-hand salary."
      }
    },

    {
      "@type": "Question",
      "name": "How accurate is this 7th CPC salary calculator?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "This calculator provides highly accurate estimates using latest DA rates and standard government salary rules. Minor variations may occur based on department-specific allowances."
      }
    },

    {
      "@type": "Question",
      "name": "Can this calculator help in salary planning?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, it helps in financial planning by providing a clear breakdown of salary, allowances and deductions. It allows users to compare different salary scenarios effectively."
      }
    },

    {
      "@type": "Question",
      "name": "Can I compare 7th CPC salary with 8th CPC?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, you can compare your current salary with projected 8th CPC salary using advanced calculators based on expected fitment factors and policy changes."
      }
    },

    {
      "@type": "Question",
      "name": "Does this calculator include promotions and increments?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "While it primarily calculates current salary, you can simulate promotions and increments by adjusting basic pay inputs to estimate future salary changes."
      }
    }

  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "7th CPC Salary Calculator",
  "url": "https://8cpccalculator.com/7th-cpc-calculator",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "All",
  "description": "Accurate 7th CPC salary calculator for central government employees. Calculate in-hand salary including DA, HRA, TA and deductions.",
  "browserRequirements": "Requires JavaScript enabled",
  "featureList": [
    "In-hand salary calculation",
    "DA and HRA calculation",
    "Allowance breakdown",
    "Accurate salary estimation"
  ]
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webAppSchema),
        }}
      />

      <div className="w-full max-w-full sm:max-w-[1200px] lg:max-w-[1100px] xl:max-w-[1000px] mx-auto px-2 sm:px-6 lg:px-8 py-6">

        <div className="flex justify-start">
          <div className="inline-flex gap-1 text-[11px] bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full font-medium">
            7th CPC Salary Calculator
          </div>
        </div>
        <div className="p-6 text-center space-y-4">

          <h1 className="text-xl md:text-2xl font-semibold tracking-tight md:whitespace-nowrap md:overflow-hidden md:text-ellipsis">
            <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              7th CPC Salary Calculator (In-Hand Pay, DA & HRA)
            </span>
          </h1>

          <p className="text-xs md:text-sm text-gray-600 mx-auto md:whitespace-nowrap md:overflow-hidden md:text-ellipsis">
            Use this 7th CPC salary calculator to estimate your in-hand salary based on basic pay, DA, HRA, and other allowances. This tool is designed for central government employees and provides accurate salary breakdown instantly.
          </p>

          <div className="mx-auto h-[2px] w-40 md:w-56 lg:w-72 bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 rounded-full opacity-80"></div>

        </div>



        {/* CALCULATOR */}
        <SeventhSalaryCalculatorPremium />


        {/* OTHER TOOLS */}
        <div className="bg-gray-100 p-4 rounded-xl shadow-sm hover:shadow-md transition">
          <OtherToolsSection />
        </div>


        {/* FAQ SECTION */}
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-6 text-left">

          <h2 className="text-xl font-semibold">
            7th CPC Salary Calculator – Detailed FAQs & Guide
          </h2>

          <div className="space-y-5 text-sm leading-relaxed">

            <div>
              <h3 className="font-semibold text-base">
                What is the 7th CPC Salary Calculator and who should use it?
              </h3>
              <p className="text-gray-600">
                The 7th CPC Salary Calculator is an advanced online tool designed for central government employees to accurately estimate their in-hand salary. It considers key components like basic pay, Dearness Allowance (DA), House Rent Allowance (HRA), Transport Allowance (TA), and standard deductions. This tool is especially useful for employees planning finances, comparing salary changes, or understanding their complete salary structure under the 7th Pay Commission.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-base">
                How is in-hand salary calculated under the 7th Pay Commission?
              </h3>
              <p className="text-gray-600">
                In-hand salary is calculated by adding all earnings such as basic pay, DA, HRA, and other applicable allowances, and then subtracting deductions like NPS contribution, income tax, and CGHS. This calculator automates the entire process and provides a precise estimate based on the latest DA rates and government norms.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-base">
                What is the current Dearness Allowance (DA) and how does it impact salary?
              </h3>
              <p className="text-gray-600">
                Dearness Allowance (DA) is a cost-of-living adjustment provided to central government employees and pensioners. It is revised periodically to offset inflation. DA directly impacts your gross and in-hand salary as it is calculated as a percentage of basic pay, making it one of the most significant salary components.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-base">
                How is House Rent Allowance (HRA) calculated in 7th CPC?
              </h3>
              <p className="text-gray-600">
                HRA is calculated based on your city category—X, Y, or Z—and is expressed as a percentage of basic pay. Employees posted in metro cities receive higher HRA compared to those in smaller cities. The calculator automatically applies the correct HRA percentage based on your selection.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-base">
                What are pay levels in the 7th CPC pay matrix?
              </h3>
              <p className="text-gray-600">
                The 7th CPC introduced a pay matrix system that replaced the earlier grade pay structure. Each employee is assigned a pay level based on their post, and salary progresses within that level through annual increments. Understanding your pay level is essential for accurate salary calculation.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-base">
                Which deductions are included in the 7th CPC salary calculation?
              </h3>
              <p className="text-gray-600">
                Common deductions include National Pension System (NPS) contributions, Central Government Health Scheme (CGHS) charges, and income tax. These deductions vary based on salary level and individual selections, and they significantly affect the final in-hand salary.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-base">
                How accurate is this 7th CPC calculator?
              </h3>
              <p className="text-gray-600">
                This calculator is designed to provide highly accurate results by incorporating the latest DA rates, standard allowance structures, and real-world calculation logic. While it closely reflects actual salary, minor variations may occur due to department-specific rules or additional allowances.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-base">
                Can this calculator help in salary planning or financial decisions?
              </h3>
              <p className="text-gray-600">
                Yes, this tool is extremely useful for salary planning, budgeting, and comparing different scenarios such as promotions, transfers, or DA changes. It gives a clear breakdown of earnings and deductions, helping employees make informed financial decisions.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-base">
                Can I compare my 7th CPC salary with expected 8th CPC salary?
              </h3>
              <p className="text-gray-600">
                Yes, you can easily compare your current salary with projected 8th CPC salary using our advanced 8th CPC calculator. This helps in understanding future salary growth based on expected fitment factors and policy changes.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-base">
                Does this calculator include promotions and increments?
              </h3>
              <p className="text-gray-600">
                This calculator primarily focuses on current salary estimation. However, by adjusting basic pay and inputs, you can simulate the impact of promotions and annual increments on your salary.
              </p>
            </div>

          </div>

        </div>

      </div>
    </>

  );

}