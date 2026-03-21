import SeventhSalaryCalculator
  from "@/components/calculator/SeventhSalaryCalculator";
import OtherToolsSection from "@/components/tools/OtherToolsSection";


export const metadata = {

  title: "7th CPC Salary Calculator | Basic Pay, DA, HRA Calculation",

  description:
    "Calculate your salary under the 7th Pay Commission including DA, HRA, TA and deductions. Estimate your in-hand salary instantly.",

  keywords:
    ["7th CPC calculator", "7th pay commission salary", "DA HRA calculator", "government salary 7th CPC"]

};

export default function Page() {

  return (

    <div className="space-y-6">

      {/* HERO / INTRO */}
      <div className="text-center space-y-2">

        <h1 className="text-xl md:text-2xl font-semibold">
          7th CPC Salary Calculator
        </h1>

        <p className="text-sm text-gray-600 max-w-2xl mx-auto">
          Calculate your salary under the 7th Pay Commission including Basic Pay,
          Dearness Allowance (DA), House Rent Allowance (HRA), Transport Allowance
          and deductions. Get an accurate estimate of your in-hand salary.
        </p>

      </div>


      {/* CALCULATOR */}
      <SeventhSalaryCalculator />


      {/* OTHER TOOLS */}
      <div className="bg-gray-100 p-4 rounded-xl shadow-sm hover:shadow-md transition">
        <OtherToolsSection />
      </div>


      {/* FAQ SECTION */}
      <div className="bg-white rounded-xl shadow-sm p-5 space-y-4">

        <h2 className="text-lg font-semibold">
          Frequently Asked Questions (7th CPC)
        </h2>


        {/* FAQ LIST */}
        <div className="space-y-3 text-sm">

          <div>
            <h3 className="font-medium">
              What is the 7th CPC Salary Calculator?
            </h3>
            <p className="text-gray-600">
              It is an online tool that helps Central Government employees
              calculate their salary under the 7th Pay Commission based on
              basic pay, DA, HRA and other allowances.
            </p>
          </div>

          <div>
            <h3 className="font-medium">
              How is salary calculated under the 7th Pay Commission?
            </h3>
            <p className="text-gray-600">
              Salary is calculated by adding Basic Pay, Dearness Allowance (DA),
              House Rent Allowance (HRA), Transport Allowance and other benefits,
              then subtracting deductions like NPS and taxes.
            </p>
          </div>

          <div>
            <h3 className="font-medium">
              What is Dearness Allowance (DA) in 7th CPC?
            </h3>
            <p className="text-gray-600">
              Dearness Allowance is a cost of living adjustment provided to
              employees and pensioners, revised periodically by the government.
            </p>
          </div>

          <div>
            <h3 className="font-medium">
              How is HRA calculated in 7th CPC?
            </h3>
            <p className="text-gray-600">
              HRA depends on city classification (X, Y, Z) and is calculated as a
              percentage of Basic Pay.
            </p>
          </div>

          <div>
            <h3 className="font-medium">
              What are the pay levels in 7th CPC?
            </h3>
            <p className="text-gray-600">
              Pay levels define salary bands for government employees, replacing
              the earlier grade pay system.
            </p>
          </div>

          <div>
            <h3 className="font-medium">
              What deductions are included in salary calculation?
            </h3>
            <p className="text-gray-600">
              Common deductions include NPS contribution, CGHS, income tax and
              other applicable deductions.
            </p>
          </div>

          <div>
            <h3 className="font-medium">
              What is in-hand salary under 7th CPC?
            </h3>
            <p className="text-gray-600">
              In-hand salary is the amount received after deducting NPS, tax and
              other deductions from gross salary.
            </p>
          </div>

          <div>
            <h3 className="font-medium">
              Can I calculate DA and HRA together using this calculator?
            </h3>
            <p className="text-gray-600">
              Yes, this calculator includes both DA and HRA calculations based on
              your inputs.
            </p>
          </div>

          <div>
            <h3 className="font-medium">
              Is this calculator accurate for all employees?
            </h3>
            <p className="text-gray-600">
              It provides a close estimate based on standard rules, but actual
              salary may vary depending on department-specific allowances and
              policies.
            </p>
          </div>

          <div>
            <h3 className="font-medium">
              Can I compare 7th CPC salary with 8th CPC?
            </h3>
            <p className="text-gray-600">
              Yes, you can use our 8th CPC Salary Calculator to compare expected
              salary after the next pay commission.
            </p>
          </div>

        </div>

      </div>

    </div>

  );

}