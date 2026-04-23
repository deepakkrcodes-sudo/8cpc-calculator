import PensionCalculator from "@/components/pension/PensionCalculator";
import OtherToolsSection from "@/components/tools/OtherToolsSection";

export const metadata = {
    title: "7th CPC Pension Calculator 2026 – Calculate Pension, DR & Commutation",

    description:
        "Calculate your 7th CPC pension with Dearness Relief (DR), commutation and monthly pension breakdown. Accurate pension calculator for central government employees.",

    keywords: [
        "7th CPC pension calculator",
        "pension calculation government employees",
        "DR pension calculator",
        "commutation pension calculation",
        "central government pension calculator India",
        "pension calculator"
    ],

    alternates: {
        canonical: "https://8cpccalculator.com/7th-cpc-pension-calculator"
    }
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How is pension calculated under 7th CPC?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Pension is generally calculated as 50% of last drawn basic pay along with Dearness Relief added to it."
            }
        },
        {
            "@type": "Question",
            "name": "What is Dearness Relief in pension?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Dearness Relief is a cost-of-living adjustment applied to pension and revised periodically."
            }
        },
        {
            "@type": "Question",
            "name": "What is commutation of pension?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Commutation allows converting a portion of pension into a lump sum amount."
            }
        },
        {
            "@type": "Question",
            "name": "Is DR applicable on commuted pension?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "No, DR is not applicable on the commuted portion of pension."
            }
        },
        {
            "@type": "Question",
            "name": "Can I use pension calculator for retirement planning?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, it helps estimate post-retirement income and financial planning."
            }
        }
    ]
};

const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "7th CPC Pension Calculator",
    "url": "https://8cpccalculator.com/7th-cpc-pension-calculator",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "All",
    "description": "Accurate 7th CPC pension calculator with DR, commutation and monthly pension breakdown.",
    "featureList": [
        "Pension calculation",
        "Dearness Relief calculation",
        "Commutation impact",
        "Monthly pension estimation"
    ]
};

export default function Page() {

    return (

        <>
            {/* FAQ SCHEMA */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(faqSchema),
                }}
            />

            {/* WEB APP SCHEMA */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(webAppSchema),
                }}
            />


            <div className="w-full max-w-full sm:max-w-[1200px] lg:max-w-[1100px] xl:max-w-[1000px] mx-auto px-2 sm:px-6 lg:px-8 py-6 space-y-4">

              

                <div className="p-6 text-center space-y-4">
                    {/* Title */}
                    <h1 className="text-xl md:text-2xl font-semibold tracking-tight md:whitespace-nowrap md:overflow-hidden md:text-ellipsis">
                        <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                            7th CPC Pension Calculator (DR, Commutation & Monthly Pension)
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-xs md:text-sm text-gray-600 mx-auto md:whitespace-nowrap md:overflow-hidden md:text-ellipsis">
                        Use this 7th CPC pension calculator to estimate your monthly pension, Dearness Relief (DR), and commuted pension. Designed for central government employees, this tool provides accurate pension breakdown based on latest rules and helps in retirement planning.
                    </p>

                    {/* Premium gradient line */}
                    <div className="mx-auto h-[2px] w-40 md:w-56 lg:w-72 bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 rounded-full opacity-80"></div>

                </div>



                <PensionCalculator mode="7cpc" />


                <div className="block bg-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition">
                    <OtherToolsSection />
                </div>


                <div className="bg-white rounded-xl shadow-sm p-6 space-y-6 text-left">

                    <h2 className="text-xl font-semibold">
                        7th CPC Pension – Complete Guide, FAQs & Practical Insights
                    </h2>

                    <div className="space-y-6 text-sm leading-relaxed">

                        <div>
                            <h3 className="font-semibold">01. How is pension calculated under the 7th CPC?</h3>
                            <p className="text-gray-600">
                                Under the 7th Pay Commission, pension is generally calculated as 50% of the last drawn basic pay or the average of last 10 months basic pay, whichever is applicable. To this, Dearness Relief (DR) is added to determine the total monthly pension received by the pensioner.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold">02. What is Dearness Relief (DR) and how does it affect pension?</h3>
                            <p className="text-gray-600">
                                Dearness Relief (DR) is provided to pensioners to offset inflation. It is revised periodically by the government and calculated as a percentage of basic pension. An increase in DR directly increases your total monthly pension.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold">03. What is commutation of pension and should you opt for it?</h3>
                            <p className="text-gray-600">
                                Commutation allows a pensioner to receive a lump sum amount by surrendering a portion of their monthly pension (up to 40%). It is useful if you need immediate funds after retirement, but it reduces your monthly pension for a fixed period (usually 15 years).
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold">04. How does commutation impact monthly pension?</h3>
                            <p className="text-gray-600">
                                When you opt for commutation, your monthly pension decreases because a portion is converted into a lump sum. However, after the commutation period ends, the full pension is restored, increasing your monthly income again.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold">05. What is the maximum commutation allowed under 7th CPC?</h3>
                            <p className="text-gray-600">
                                As per current rules, up to 40% of the basic pension can be commuted. The exact lump sum amount depends on age and commutation factors defined by the government.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold">06. Is Dearness Relief paid on commuted pension?</h3>
                            <p className="text-gray-600">
                                No, Dearness Relief is not applicable on the commuted portion of pension. It is calculated only on the remaining (reduced) pension after commutation.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold">07. What is family pension and how is it calculated?</h3>
                            <p className="text-gray-600">
                                Family pension is provided to the spouse or eligible family members after the death of the pensioner. It is usually a percentage of the basic pension and ensures financial support to dependents.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold">08. How accurate is this pension calculator?</h3>
                            <p className="text-gray-600">
                                This calculator provides a highly accurate estimate by incorporating DR rates, commutation rules and standard pension formulas. However, actual pension may slightly vary based on official orders and individual service conditions.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold">09. Can I use this calculator for retirement planning?</h3>
                            <p className="text-gray-600">
                                Yes, this tool is very useful for retirement planning. It helps you estimate your post-retirement income, compare commutation options, and make informed financial decisions.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold">10. Can I compare 7th CPC pension with expected 8th CPC pension?</h3>
                            <p className="text-gray-600">
                                Yes, you can compare your current pension with projected 8th CPC pension using advanced calculators based on expected fitment factors and future policy changes.
                            </p>
                        </div>

                    </div>

                </div>
            </div>
        </>
    );

}