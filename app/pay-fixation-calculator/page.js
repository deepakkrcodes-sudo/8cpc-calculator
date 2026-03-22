import PayFixationCalculator from "@/components/payfixation/PayFixationCalculator";
import OtherToolsSection from "@/components/tools/OtherToolsSection";
export const metadata = {
  title: "Pay Fixation Calculator | 7th to 8th CPC Pay Fixation",

  description:
    "Calculate pay fixation from 7th to 8th Pay Commission using fitment factor and pay matrix rules.",

  keywords:
    ["pay fixation calculator", "pay fixation 7th CPC", "salary fixation rules", "government pay fixation"],

  alternates: {
    canonical: "https://8cpccalculator.com/pay-fixation-calculator"
  }

};

export default function Page() {

  return (

    <div className="max-w-6xl mx-auto p-4 space-y-6">

      <h1 className="text-2xl font-bold text-center">
        Promotion Pay Fixation Calculator
      </h1>

      <p className="text-gray-600 text-center text-sm">
        Compare fixation from Date of Promotion and Date of Next Increment.
        The tool calculates month-wise salary difference and interest-adjusted
        financial impact.
      </p>

      <PayFixationCalculator />

      <div className="block bg-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition">
        <OtherToolsSection />
      </div>

      <div className="bg-white rounded-xl shadow-sm p-5 space-y-4">

        <h2 className="text-lg font-semibold">
          Frequently Asked Questions (Pay Fixation)
        </h2>

        <div className="space-y-3 text-sm">

          <p className="text-sm text-gray-600">
            Pay fixation determines how your salary changes after promotion,
            increment or Pay Commission revision. Understanding the rules helps
            estimate your future salary accurately.
          </p>

          <div>
            <h3 className="font-medium">
              What is pay fixation?
            </h3>
            <p className="text-gray-600">
              Pay fixation is the process of determining revised salary when an
              employee gets a promotion, increment or when a new Pay Commission
              is implemented.
            </p>
          </div>

          <div>
            <h3 className="font-medium">
              How is pay fixed after promotion?
            </h3>
            <p className="text-gray-600">
              On promotion, the basic pay is first increased by one increment in
              the current level and then placed in the next higher pay level at
              the nearest higher cell.
            </p>
          </div>

          <div>
            <h3 className="font-medium">
              What is the formula for pay fixation?
            </h3>
            <p className="text-gray-600">
              Pay fixation generally follows this rule: apply one increment in the
              current level, then move to the next pay level and select the nearest
              higher basic pay in the pay matrix.
            </p>
          </div>

          <div>
            <h3 className="font-medium">
              How will pay fixation work in 8th CPC?
            </h3>
            <p className="text-gray-600">
              In the 8th CPC, pay fixation is expected to be based on a fitment
              factor applied to 7th CPC basic pay, followed by placement in the
              revised pay matrix.
            </p>
          </div>

          <div>
            <h3 className="font-medium">
              What is the role of fitment factor in pay fixation?
            </h3>
            <p className="text-gray-600">
              Fitment factor multiplies the existing basic pay to determine revised
              pay under the new Pay Commission. It directly impacts the final salary.
            </p>
          </div>

          <div>
            <h3 className="font-medium">
              What is the difference between increment and promotion in pay fixation?
            </h3>
            <p className="text-gray-600">
              Increment increases salary within the same level, while promotion
              moves the employee to a higher pay level with a revised salary.
            </p>
          </div>

          <div>
            <h3 className="font-medium">
              How many increments are given during promotion?
            </h3>
            <p className="text-gray-600">
              Typically, one increment is granted in the current level before
              moving to the higher level during promotion.
            </p>
          </div>

          <div>
            <h3 className="font-medium">
              Does pay fixation affect allowances like DA and HRA?
            </h3>
            <p className="text-gray-600">
              Yes, allowances such as DA and HRA are calculated as a percentage
              of basic pay, so any increase in basic pay through fixation increases
              these allowances.
            </p>
          </div>

          <div>
            <h3 className="font-medium">
              Can I calculate pay fixation for both 7th and 8th CPC?
            </h3>
            <p className="text-gray-600">
              Yes, this calculator helps estimate pay fixation under current 7th CPC
              rules as well as projected 8th CPC scenarios using different fitment
              factors.
            </p>
          </div>

          <div>
            <h3 className="font-medium">
              Is this pay fixation calculator accurate?
            </h3>
            <p className="text-gray-600">
              The calculator provides a close estimate based on standard rules,
              but actual fixation may vary depending on department rules and
              official government orders.
            </p>
          </div>

        </div>

      </div>


    </div>



  );

}