import SalaryCalculator from "@/components/calculator/SalaryCalculator";
import Link from "next/link";
import OtherToolsSection from "@/components/tools/OtherToolsSection";
import HomeFAQAccordion from "@/components/home/HomeFAQAccordion";
import {
  comparisonRows,
  homepageFaqs,
  howToUseSteps
} from "@/data/homeSeoContent";

export const metadata = {
  title: "8th Pay Commission Salary Calculator 2026 | 8th CPC Calculator",

  description:
    "Calculate your expected 8th Pay Commission salary online using projected fitment factor, DA, HRA and transport allowance. Compare revised 8th CPC salary with current 7th CPC pay instantly.",

  keywords: [
    "8th pay commission salary calculator",
    "8th CPC calculator",
    "8 cpc calculator",
    "8th cpc salary calculator",
    "8th pay commission calculator",
    "8th pay matrix calculator",
    "7th vs 8th salary",
    "8th CPC fitment factor",
    "government salary calculator",
    "central government salary calculator"
  ],
  
  alternates: {
    canonical: "https://8cpccalculator.com"
  }

};

export default function Home() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homepageFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };

  const webApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "8th Pay Commission Salary Calculator 2026",
    url: "https://8cpccalculator.com",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    description:
      "Online 8th Pay Commission salary calculator for estimating revised central government salary using projected fitment factor, DA, HRA and transport allowance assumptions."
  };

  return (

    <main className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }}
      />

      

      {/* Salary Calculator */}
      <section>
        <SalaryCalculator />
      </section>

      <section className="bg-white p-4 rounded-xl shadow-sm">
        <p className="text-sm text-gray-700 leading-relaxed">
          Use this <strong>8th Pay Commission salary calculator</strong> to estimate
          possible revised salary for central government employees and pensioners
          under projected 8th CPC assumptions. The calculator helps compare current
          7th CPC pay with expected revised salary by applying a selected fitment
          factor, allowance assumptions and pay matrix values.
        </p>
        <p className="text-sm text-gray-700 leading-relaxed mt-2">
          Since the final fitment factor and implementation rules are not yet
          officially approved, this 8th CPC calculator is designed for practical
          scenario planning. You can also review possible payout impact through the{" "}
          <Link href="/8th-cpc-arrear-calculator" className="text-indigo-600 font-medium hover:underline">
            8th CPC Arrear Calculator
          </Link>{" "}
          and pension impact through the{" "}
          <Link href="/8th-cpc-pension-arrear" className="text-indigo-600 font-medium hover:underline">
            Pension Arrear Calculator
          </Link>.
        </p>
      </section>

      <section className="bg-white p-4 rounded-xl shadow-sm space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            How to Use the 8th Pay Commission Salary Calculator
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed mt-1">
            Follow these steps to generate a clean estimate of your projected
            revised salary without treating assumptions as official figures.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {howToUseSteps.map((step, index) => (
            <div
              key={step}
              className="rounded-lg border border-gray-200 bg-gray-50 p-3 shadow-sm"
            >
              <div className="mb-2 flex h-7 w-7 items-center justify-center rounded-full bg-indigo-50 text-xs font-semibold text-indigo-700">
                {index + 1}
              </div>
              <p className="text-sm leading-relaxed text-gray-700">{step}</p>
            </div>
          ))}
        </div>

        <p className="text-sm text-gray-700 leading-relaxed">
          For best results, use your exact current basic pay and test more than one
          fitment scenario. A moderate fitment assumption can be compared with a
          higher assumption to understand the possible salary range. For deeper
          context, read the{" "}
          <Link href="/8th-cpc/insights/most-probable-fitment-factor-8th-cpc" className="text-indigo-600 font-medium hover:underline">
            Fitment Factor Analysis
          </Link>.
        </p>
      </section>

      <section className="bg-white p-4 rounded-xl shadow-sm space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            7th CPC vs Expected 8th CPC Salary Structure
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed mt-1">
            The comparison below summarizes how the current 7th CPC framework may
            differ from the expected 8th CPC structure once final rules are approved.
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="px-3 py-2 text-left font-semibold">Component</th>
                <th className="px-3 py-2 text-left font-semibold">7th CPC</th>
                <th className="px-3 py-2 text-left font-semibold">Expected 8th CPC</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {comparisonRows.map(([label, seventh, eighth]) => (
                <tr key={label} className="bg-white">
                  <td className="px-3 py-2 font-medium text-gray-900">{label}</td>
                  <td className="px-3 py-2 text-gray-700">{seventh}</td>
                  <td className="px-3 py-2 text-gray-700">{eighth}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-gray-500">
          8th CPC figures are projected estimates and final recommendations are yet
          to be officially approved. Salary arrears, pension arrears and DA reset
          rules should be reviewed after formal notification.
        </p>
      </section>

      {/* Latest Update Banner */}
      <section className="bg-yellow-50 border border-yellow-300 p-4 rounded-xl shadow-sm">
        <h2 className="text-md font-semibold text-yellow-800">
          🔔 Latest Update – 8th Pay Commission (May 2026)
        </h2>

        <p className="text-sm text-gray-800 mt-1">
          The government has extended the deadline for submitting feedback and
          representations to the 8th Pay Commission till <strong>31 May 2026</strong>.
          The Commission is currently in the consultation phase, collecting inputs
          from employees, pensioners and unions regarding salary structure,
          fitment factor, allowances and pension revision.
        </p>

        <p className="text-xs text-gray-600 mt-2">
          ⚠️ Final salary structure, fitment factor and pension changes are not yet decided.
        </p>
      </section>


      <div className="block bg-gray-100 p-4 rounded-xl shadow-sm hover:shadow-md transition">
        <OtherToolsSection />
      </div>

      {/* Information Section */}
      <section className="bg-white p-4 rounded-xl shadow-sm space-y-3">

        <h2 className="text-lg font-semibold">
          What is the 8th Central Pay Commission (8th CPC)?
        </h2>

        <p className="text-sm text-gray-700 leading-relaxed">
          The Central Pay Commission (CPC) is a committee constituted by the
          Government of India approximately every ten years to review and revise the
          salary structure, allowances, and pension benefits of central government
          employees and pensioners.
        </p>

        <p className="text-sm text-gray-700 leading-relaxed">
          The 7th Pay Commission was implemented from January 2016. The next
          commission, popularly referred to as the <strong>8th Pay Commission</strong>,
          is expected to revise pay structures again, likely with effect from
          <strong> January 2026</strong>. The commission studies inflation, cost of
          living, economic conditions, and comparisons with private sector salaries
          before recommending salary revisions.
        </p>

        <hr className="border-gray-400" />

        <h2 className="text-lg font-semibold">
          Key Timeline & Developments – 8th Pay Commission
        </h2>


        <div className="space-y-6">

          {/* Timeline Item */}
          <div className="border-l-4 border-green-600 pl-4">
            <p className="text-xs text-gray-500">May 2026 (Latest)</p>
            <h3 className="font-semibold text-gray-900">
              Deadline Extended for Public Feedback
            </h3>

            <p className="text-sm text-gray-700 mt-1">
              The deadline for submitting feedback and memoranda to the 8th Pay Commission
              has been extended till <strong>31 May 2026</strong>. Employee unions,
              pensioners and government departments are actively submitting proposals
              related to salary revision, fitment factor, pension benefits and allowances.
              This indicates that the Commission is still in the consultation stage and
              final recommendations are yet to be prepared.
            </p>
          </div>

          <hr className="border-gray-200" />

          {/* Timeline Item */}
          <div className="border-l-4 border-blue-600 pl-4">
            <p className="text-xs text-gray-500">March 2026</p>
            <h3 className="font-semibold text-gray-900">
              Public Consultation & Stakeholder Inputs
            </h3>

            <p className="text-sm text-gray-700 mt-1">
              The 8th Central Pay Commission is currently gathering feedback from
              central government employees, pensioners, ministries and employee
              unions. Stakeholders are submitting memoranda and suggestions regarding
              salary structure, allowances, pension revision and the expected fitment
              factor. These consultations are a key step before drafting the final
              recommendations.
            </p>
          </div>

          <hr className="border-gray-200" />

          {/* Timeline Item */}
          <div className="border-l-4 border-blue-600 pl-4">
            <p className="text-xs text-gray-500">Early 2026</p>
            <h3 className="font-semibold text-gray-900">
              Official Portal Launch & Commission Begins Work
            </h3>

            <p className="text-sm text-gray-700 mt-1">
              The official website for the 8th Pay Commission was launched to provide
              updates, notifications and a platform for departments and associations to
              submit their representations. Government ministries have also begun
              preparing financial data and pay structure details required for the
              Commission’s review.
            </p>
          </div>

          <hr className="border-gray-200" />

          {/* Timeline Item */}
          <div className="border-l-4 border-blue-600 pl-4">
            <p className="text-xs text-gray-500">3 November 2025</p>
            <h3 className="font-semibold text-gray-900">
              8th Pay Commission Formally Constituted
            </h3>

            <p className="text-sm text-gray-700 mt-1">
              The Government of India officially constituted the 8th Central Pay
              Commission through a resolution issued by the Ministry of Finance.
              Retired Supreme Court judge Justice Ranjana Prakash Desai was appointed
              as the Chairperson. The Commission will review salary structures,
              allowances and pension benefits for central government employees.
            </p>
          </div>

          <hr className="border-gray-200" />

          {/* Timeline Item */}
          <div className="border-l-4 border-blue-600 pl-4">
            <p className="text-xs text-gray-500">October 2025</p>
            <h3 className="font-semibold text-gray-900">
              Cabinet Approves Terms of Reference
            </h3>

            <p className="text-sm text-gray-700 mt-1">
              The Union Cabinet approved the Terms of Reference for the 8th Central Pay
              Commission, initiating the process for the next salary revision cycle.
              The Commission’s recommendations will affect roughly 50 lakh central
              government employees and around 69 lakh pensioners across India.
            </p>
          </div>

        </div>

        <hr className="border-gray-400" />

        <h2 className="text-lg font-semibold">
          Current Status of 8th Pay Commission (Reality Check)
        </h2>

        <ul className="text-sm text-gray-700 space-y-2">
          <li>✔ The 8th Pay Commission has been constituted (Nov 2025)</li>
          <li>✔ Currently in consultation phase (2026)</li>
          <li>✔ Deadline extended to 31 May 2026 for feedback</li>
          <li>❗ Fitment factor is NOT finalized</li>
          <li>❗ Salary revision is NOT approved yet</li>
          <li>❗ Old Pension Scheme (OPS) is NOT confirmed</li>
        </ul>

        <h2 className="text-lg font-semibold">
          Expected Timeline for 8th Pay Commission
        </h2>

        <ul className="text-sm text-gray-700 space-y-2">
          <li>• Consultation & data collection: 2026</li>
          <li>• Report submission: Expected by 2027</li>
          <li>• Implementation: Likely 2027–2028</li>
          <li>• Arrears: Expected from January 2026</li>
        </ul>

        <hr className="border-gray-400" />


        <h2 className="text-lg font-semibold mb-3">
          History of Pay Commissions in India
        </h2>

        <div className="space-y-3">

          {/* 1st Pay Commission */}
          <div className="border rounded-lg p-3 bg-white shadow-sm">
            <div className="flex justify-between">
              <span className="font-semibold">1st Pay Commission</span>
              <span className="text-xs text-gray-500">Implemented 1947</span>
            </div>
            <p className="text-sm text-gray-600">Minimum Salary: ₹80</p>
            <p className="text-sm text-gray-700">
              Introduced the first structured salary system for government employees after independence.
            </p>
          </div>

          {/* 2nd Pay Commission */}
          <div className="border rounded-lg p-3 bg-white shadow-sm">
            <div className="flex justify-between">
              <span className="font-semibold">2nd Pay Commission</span>
              <span className="text-xs text-gray-500">Implemented 1959</span>
            </div>
            <p className="text-sm text-gray-600">Minimum Salary: ₹80–₹90</p>
            <p className="text-sm text-gray-700">
              Highlighted the wide gap between lowest and highest government salaries.
            </p>
          </div>

          {/* 3rd Pay Commission */}
          <div className="border rounded-lg p-3 bg-white shadow-sm">
            <div className="flex justify-between">
              <span className="font-semibold">3rd Pay Commission</span>
              <span className="text-xs text-gray-500">Implemented 1973</span>
            </div>
            <p className="text-sm text-gray-600">Minimum Salary: ₹196</p>
            <p className="text-sm text-gray-700">
              Salary revision linked more closely with cost of living and inflation.
            </p>
          </div>

          {/* 4th Pay Commission */}
          <div className="border rounded-lg p-3 bg-white shadow-sm">
            <div className="flex justify-between">
              <span className="font-semibold">4th Pay Commission</span>
              <span className="text-xs text-gray-500">Implemented 1986</span>
            </div>
            <p className="text-sm text-gray-600">Minimum Salary: ₹750</p>
            <p className="text-sm text-gray-700">
              Introduced significant restructuring of pay scales and allowances.
            </p>
          </div>

          {/* 5th Pay Commission */}
          <div className="border rounded-lg p-3 bg-white shadow-sm">
            <div className="flex justify-between">
              <span className="font-semibold">5th Pay Commission</span>
              <span className="text-xs text-gray-500">Implemented 1996</span>
            </div>
            <p className="text-sm text-gray-600">Minimum Salary: ₹2,550</p>
            <p className="text-sm text-gray-700">
              Recommended major salary increases and pension reforms for government employees.
            </p>
          </div>

          {/* 6th Pay Commission */}
          <div className="border rounded-lg p-3 bg-white shadow-sm">
            <div className="flex justify-between">
              <span className="font-semibold">6th Pay Commission</span>
              <span className="text-xs text-gray-500">Implemented 2006</span>
            </div>
            <p className="text-sm text-gray-600">Minimum Salary: ₹7,000</p>
            <p className="text-sm text-gray-700">
              Introduced Pay Bands and Grade Pay system to simplify multiple pay scales.
            </p>
          </div>

          {/* 7th Pay Commission */}
          <div className="border rounded-lg p-3 bg-white shadow-sm">
            <div className="flex justify-between">
              <span className="font-semibold">7th Pay Commission</span>
              <span className="text-xs text-gray-500">Implemented 2016</span>
            </div>
            <p className="text-sm text-gray-600">Minimum Salary: ₹18,000</p>
            <p className="text-sm text-gray-700">
              Introduced Pay Matrix system, removed Grade Pay and applied a fitment factor of 2.57.
            </p>
          </div>


          <div className="border rounded-lg p-3 bg-white shadow-sm">
            <div className="flex justify-between">
              <span className="font-semibold">8th Pay Commission</span>
              <span className="text-xs text-gray-500">Expected 2026</span>
            </div>
            <p className="text-sm text-gray-600">Minimum Salary: To be decided</p>
            <p className="text-sm text-gray-700">
              Expected to revise salary structure and allowances for ~50 lakh employees and ~69 lakh pensioners.
            </p>
          </div>

        </div>



        <hr className="border-gray-400" />



        <h2 className="text-lg font-semibold">
          How Pay Commissions Decide Salary Revision
        </h2>

        <p className="text-sm text-gray-700 leading-relaxed">
          Pay Commissions study several economic and administrative factors before
          recommending salary revisions for government employees.
        </p>

        <ul className="text-sm text-gray-700 space-y-2">

          <li>• Inflation and cost of living</li>
          <li>• Housing and transportation expenses</li>
          <li>• Comparison with private sector salaries</li>
          <li>• Government financial capacity</li>
          <li>• Long-term sustainability of salary expenditure</li>

        </ul>

        <p className="text-sm text-gray-700 leading-relaxed">
          Based on these factors, the commission submits a detailed report to the
          Government of India recommending changes in pay structure, allowances, and
          pension benefits.
        </p>

      </section>

      <section className="bg-white p-4 rounded-xl shadow-sm space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            8th Pay Commission Salary Calculator FAQs
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed mt-1">
            Clear answers to practical questions about fitment factor, revised
            salary, arrears, pension impact, DA reset and calculator assumptions.
          </p>
        </div>

        <HomeFAQAccordion faqs={homepageFaqs} />
      </section>

    </main>

  );

}
