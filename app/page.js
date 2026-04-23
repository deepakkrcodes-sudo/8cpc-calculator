import SalaryCalculator from "@/components/calculator/SalaryCalculator";
import Link from "next/link";
import OtherToolsSection from "@/components/tools/OtherToolsSection";

export const metadata = {
  title: "8th CPC Salary Calculator 2026 | 7th vs 8th Pay Commission Salary",

  description:
    "Calculate your expected salary under the 8th Pay Commission with fitment factor, DA, HRA and allowances. Compare 7th vs 8th CPC salary instantly.",

  keywords:
    ["8th CPC calculator", "8 cpc calculator", "fitment factor", "8th pay commission salary calculator", "7th vs 8th salary", "8th CPC fitment factor", "government salary calculator", "Central goverment Salary calculator"],

  alternates: {
    canonical: "https://8cpccalculator.com"
  }

};

export default function Home() {

  return (

    <main className="max-w-5xl mx-auto px-4 py-6 space-y-6">

      {/* Salary Calculator */}
      <section>
        <SalaryCalculator />
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

    </main>

  );

}