import SalaryCalculator from "@/components/calculator/SalaryCalculator";
import Link from "next/link";

export const metadata = {
  title: "8th CPC Salary Calculator",
  description:
    "Calculate expected salary under the 8th Pay Commission using fitment factor, HRA, DA and pay matrix."
};

export default function Home() {

  return (

    <main className="max-w-md mx-auto px-4 py-4 space-y-6">

      {/* Salary Calculator */}
      <section>
        <SalaryCalculator />
      </section>


      {/* Arrear Calculator Card */}
      <div className="block bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition">
    

          <Link
            href="/arrear-calculator"
           
          >

            <div className="flex items-start gap-3">

              <div className="text-blue-600 text-xl mt-1">
                📊
              </div>

              <div>

                <h2 className="text-base font-semibold text-blue-600">
                  8th CPC Arrear Calculator
                </h2>

                <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                  Estimate arrears from Jan 2026 till the 8th CPC implementation
                  considering fitment factor, increments and promotions.
                </p>

              </div>

            </div>

          </Link>

      
      </div>

      {/* Information Section */}
      <section className="bg-white p-4 rounded-xl shadow-sm">

        <h2 className="text-lg font-semibold mb-2">
          What is the 8th Central Pay Commission (8th CPC)?
        </h2>

        <p className="text-sm text-gray-700 leading-relaxed">
          The 8th Central Pay Commission is expected to revise the salary
          structure for central government employees from 2026. This calculator
          estimates salary based on fitment factor, HRA and DA projections.
        </p>

      </section>

    </main>

  );

}