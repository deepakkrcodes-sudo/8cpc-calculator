import PayMatrixPage7CPC from "@/components/paymatrix/PayMatrixPage7CPC";


export const metadata = {
    title: "7th CPC Pay Matrix | Level-wise Salary Table & Pay Structure",

    description:
        "Explore the complete 7th Pay Commission pay matrix with level-wise salary, cells and annual increments. Check pay progression for all levels.",

    keywords: [
        "7th CPC pay matrix",
        "pay level salary table",
        "7th pay commission levels",
        "government pay scale",
        "salary progression 7th CPC"
    ],

    alternates: {
    canonical: "https://8cpccalculator.com/7th-cpc-pay-matrix"
  }
};



export default function Page() {
  return (
    <div className="space-y-6">

      <PayMatrixPage7CPC />

    </div>
  );
}

