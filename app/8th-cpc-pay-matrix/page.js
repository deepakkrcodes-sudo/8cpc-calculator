
import PayMatrixPage8CPC from "@/components/paymatrix/PayMatrixPage8CPC";


export const metadata = {

  title: "8th CPC Pay Matrix (Projected) | Salary Levels & Fitment Factor",

  description:
    "Explore projected 8th Pay Commission pay matrix with fitment factor. Check revised salary for all pay levels.",

  keywords:
    ["8th CPC pay matrix", "pay level salary table", "fitment factor matrix", "government pay levels"],

  alternates: {
    canonical: "https://8cpccalculator.com/8th-cpc-pay-matrix"
  }
};





export default function Page() {
  return (
    <div className="space-y-6">

      <PayMatrixPage8CPC />

    </div>
  );
}



