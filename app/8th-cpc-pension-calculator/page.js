import PensionCalculator from "@/components/pension/PensionCalculator";
import OtherToolsSection from "@/components/tools/OtherToolsSection";

export const metadata = {

  ttitle: "8th CPC Pension Calculator | Estimate Pension Increase 2026",

  description:
    "Calculate your revised pension under the 8th Pay Commission including fitment factor, commutation and DR impact.",

  keywords:
    ["8th CPC pension calculator", "government pension calculator", "pension increase 2026", "DR pension calculator"],

  alternates: {
    canonical: "https://8cpccalculator.com/8th-cpc-pension-calculator"
  }

};

export default function Page() {

  return (

    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">

      {/* HERO CARD */}
      <div>

        <h1 className="text-2xl font-bold">
          8th CPC Pension Calculator
        </h1>

        <p className="text-gray-600 text-sm mt-2 max-w-2xl mx-auto text-center">
          Estimate your pension under the projected 8th CPC and compare it with the 7th CPC based on fitment, commutation, and DA.
        </p>

      </div>


      {/* CALCULATOR CARD */}
      <div >

        <PensionCalculator />

      </div>


      <div className="block bg-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition">
        <OtherToolsSection />
      </div>

      <div className="bg-white rounded-xl shadow-sm p-5 space-y-4">

        <h2 className="text-lg font-semibold">
          Frequently Asked Questions (8th CPC Pension Calculator)
        </h2>

        <div className="space-y-3 text-sm">

          <p className="text-sm text-gray-600">
            8th CPC pension depends on fitment factor, Dearness Relief and
            commutation. Understanding these factors helps estimate your future
            monthly pension accurately.
          </p>

          <div>
            <h3 className="font-medium">
              How is pension calculated under the 8th Pay Commission?
            </h3>
            <p className="text-gray-600">
              Pension is calculated by applying the fitment factor to the 7th CPC
              basic pay and then taking 50% of the revised basic as pension.
              Dearness Relief (DR) is added on top of this amount.
            </p>
          </div>

          <div>
            <h3 className="font-medium">
              What is fitment factor in 8th CPC pension?
            </h3>
            <p className="text-gray-600">
              Fitment factor is a multiplier used to revise basic pay and pension.
              For example, with a fitment factor of 2.86, a basic pay of ₹50,000
              becomes ₹1,43,000, and pension is calculated accordingly.
            </p>
          </div>

          <div>
            <h3 className="font-medium">
              What is the expected fitment factor for 8th CPC?
            </h3>
            <p className="text-gray-600">
              Estimates suggest a fitment factor between 2.57 and 3.68, with
              2.86 considered the most probable scenario.
            </p>
          </div>

          <div>
            <h3 className="font-medium">
              How much pension increase can be expected in 8th CPC?
            </h3>
            <p className="text-gray-600">
              Pension may increase significantly depending on the fitment factor.
              In most cases, pension could increase by 2.5 to 3 times compared
              to the 7th CPC.
            </p>
          </div>

          <div>
            <h3 className="font-medium">
              What is Dearness Relief (DR) in pension calculation?
            </h3>
            <p className="text-gray-600">
              Dearness Relief is a cost-of-living adjustment added to pension.
              It is calculated as a percentage of basic pension and revised
              periodically by the government.
            </p>
          </div>

          <div>
            <h3 className="font-medium">
              How does commutation affect 8th CPC pension?
            </h3>
            <p className="text-gray-600">
              Commutation reduces monthly pension as a portion is taken as a lump
              sum. The remaining pension is used for DR calculation and monthly
              payout.
            </p>
          </div>

          <div>
            <h3 className="font-medium">
              Will DR be applied on full pension after 8th CPC?
            </h3>
            <p className="text-gray-600">
              DR is applied only on the remaining pension after commutation, not
              on the commuted portion.
            </p>
          </div>

          <div>
            <h3 className="font-medium">
              Is this calculator accurate for pension estimation?
            </h3>
            <p className="text-gray-600">
              This calculator provides an estimate based on expected fitment factor
              and current rules. Actual pension may vary based on official
              government notifications.
            </p>
          </div>

          <div>
            <h3 className="font-medium">
              Can I compare 7th CPC and 8th CPC pension?
            </h3>
            <p className="text-gray-600">
              Yes, this calculator allows comparison between current pension under
              7th CPC and projected pension under 8th CPC.
            </p>
          </div>

          <div>
            <h3 className="font-medium">
              When will 8th CPC pension be implemented?
            </h3>
            <p className="text-gray-600">
              The 8th Pay Commission is expected around 2026, but the exact date
              depends on government approval and official notification.
            </p>
          </div>

        </div>

      </div>

    </div>

  );

}