import PensionCalculator from "@/components/pension/PensionCalculator";
import OtherToolsSection from "@/components/tools/OtherToolsSection";

export const metadata = {
    title: "7th CPC Pension Calculator | Calculate Pension & DR",

    description:
        "Calculate pension under 7th Pay Commission with DR and commutation details.",

    keywords:
        ["7th CPC pension calculator", "government pension calculator", "DR pension", "pension calculation India"],

    alternates: {
        canonical: "https://8cpccalculator.com/7th-cpc-pension-calculator"
    }
};
export default function Page() {

    return (
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
            
            <div className="inline-flex items-left gap-1 text-[11px] bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full font-medium">
                Pension Calculator
            </div>

            <div className="p-6 text-center space-y-4">              
                {/* Title */}
                <h1 className="text-xl md:text-2xl font-semibold tracking-tight md:whitespace-nowrap md:overflow-hidden md:text-ellipsis">
                    <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                        7th CPC Pension Calculator
                    </span>
                </h1>

                {/* Subtitle */}
                <p className="text-xs md:text-sm text-gray-600 mx-auto md:whitespace-nowrap md:overflow-hidden md:text-ellipsis">
                    Calculate your pension under 7th Central Pay Commission including commutation, DR and total monthly pension.
                </p>

                {/* Premium gradient line */}
                <div className="mx-auto h-[2px] w-40 md:w-56 lg:w-72 bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 rounded-full opacity-80"></div>

            </div>

            <PensionCalculator mode="7cpc" />


            <div className="block bg-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition">
                <OtherToolsSection />
            </div>


            <div className="bg-white rounded-xl shadow-sm p-5 space-y-4">

                <h2 className="text-lg font-semibold">
                    Frequently Asked Questions (7th CPC Pension)
                </h2>

                <div className="space-y-3 text-sm">

                    <p className="text-sm text-gray-600">
                        The 7th CPC pension system includes basic pension, Dearness Relief (DR),
                        commutation and family pension benefits. Below are common questions to help
                        you understand pension calculations.
                    </p>

                    <div>
                        <h3 className="font-medium">
                            How is pension calculated under the 7th Pay Commission?
                        </h3>
                        <p className="text-gray-600">
                            Pension is generally calculated as 50% of the last drawn basic pay.
                            Additional components like Dearness Relief (DR) are added to determine
                            the total monthly pension.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-medium">
                            What is Dearness Relief (DR) in pension?
                        </h3>
                        <p className="text-gray-600">
                            Dearness Relief is a cost of living adjustment provided to pensioners.
                            It is revised periodically by the government and applied as a percentage
                            of the basic pension.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-medium">
                            What is commuted pension?
                        </h3>
                        <p className="text-gray-600">
                            Commutation allows a pensioner to receive a lump sum amount by giving up
                            a portion of their monthly pension for a fixed period.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-medium">
                            How does commutation affect monthly pension?
                        </h3>
                        <p className="text-gray-600">
                            After commutation, the monthly pension is reduced based on the
                            percentage of pension commuted, while a lump sum is paid upfront.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-medium">
                            What is the maximum commutation allowed?
                        </h3>
                        <p className="text-gray-600">
                            Under current rules, up to 40% of the basic pension can be commuted
                            for a lump sum payment.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-medium">
                            What is family pension under 7th CPC?
                        </h3>
                        <p className="text-gray-600">
                            Family pension is provided to the spouse or eligible family members
                            after the death of a pensioner, typically at a reduced percentage
                            of the original pension.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-medium">
                            Is DR applicable on commuted pension?
                        </h3>
                        <p className="text-gray-600">
                            No, Dearness Relief is not paid on the commuted portion of pension.
                            It is applicable only on the remaining pension.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-medium">
                            Can I calculate my total monthly pension using this tool?
                        </h3>
                        <p className="text-gray-600">
                            Yes, this calculator provides an estimate of total pension including
                            DR, commutation and net monthly pension.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-medium">
                            Is this pension calculator accurate?
                        </h3>
                        <p className="text-gray-600">
                            The calculator provides a close estimate based on standard rules,
                            but actual pension may vary based on official orders and individual
                            service details.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-medium">
                            Can I compare 7th CPC pension with 8th CPC?
                        </h3>
                        <p className="text-gray-600">
                            Yes, you can use our 8th CPC Pension Calculator to estimate your
                            expected pension after the next Pay Commission revision.
                        </p>
                    </div>

                </div>

            </div>

        </div>
    );

}