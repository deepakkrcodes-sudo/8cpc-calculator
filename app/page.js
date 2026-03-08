import SalaryCalculator from "@/components/calculator/SalaryCalculator";

export const metadata = {
  title: "8th CPC Salary Calculator",
  description:
    "Calculate expected salary under the 8th Pay Commission using fitment factor, HRA, DA and pay matrix."
};

export default function Home() {

  return (

    <div className="space-y-4">

      <SalaryCalculator />

    </div>

    

  );

}