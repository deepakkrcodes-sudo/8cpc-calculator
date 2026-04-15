import PensionArrearCalculatorPage from "@/components/pensionArrear/PensionArrearCalculatorPage";

export const metadata = {
  title: "8th CPC Pension Arrear Calculator | Pension Arrears 2026",
  description:
    "Estimate pension arrears under the 8th Pay Commission based on DA progression and implementation timeline.",
  keywords: [
    "pension arrear calculator",
    "8th CPC pension arrear",
    "DR arrears pension",
    "pension DA calculation"
  ],
  alternates: {
    canonical: "https://8cpccalculator.com/8th-cpc-pension-arrear"
  }
};

export default function Page() {
  return (
    <div className="w-full">
      
      {/* RESPONSIVE CONTAINER */}
      <div className="
        max-w-7xl 
        mx-auto 
        px-4 
        sm:px-6 
        lg:px-8 
        xl:px-10
        py-6
      ">
        <PensionArrearCalculatorPage />
      </div>

    </div>
  );
}