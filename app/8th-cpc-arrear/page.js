
import ArrearCalculatorPage from "@/components/arrear/ArrearCalculatorPage";
import OtherToolsSection from "@/components/tools/OtherToolsSection";


export const metadata = {
    title: "8th CPC Arrear Calculator (2026) | Salary Arrears Estimate",

    description:
        "Estimate your 8th Pay Commission arrears with DA progression and fitment factor. Calculate monthly and total arrears easily.",

    keywords:
        ["8th CPC arrear calculator", "salary arrear calculator", "DA arrear 2026", "pay commission arrears"]
};


export default function Page() {
  return (
    <div className="space-y-6">

      <ArrearCalculatorPage />  

     

    </div>
  );
}

