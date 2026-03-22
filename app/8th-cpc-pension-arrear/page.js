import PensionArrearCalculatorPage from "@/components/pensionArrear/PensionArrearCalculatorPage";


export const metadata = {

  title: "8th CPC Pension Arrear Calculator | Pension Arrears 2026",

  description:
    "Estimate pension arrears under the 8th Pay Commission based on DA progression and implementation timeline.",

  keywords:
    ["pension arrear calculator", "8th CPC pension arrear", "DR arrears pension", "pension DA calculation"],

  alternates: {
    canonical: "https://8cpccalculator.com/8th-cpc-pension-arrear"
  }
};




export default function Page() {
  return (
    <div className="space-y-6">

      <PensionArrearCalculatorPage />

    </div>
  );
}

