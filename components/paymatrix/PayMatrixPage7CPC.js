"use client";
import { useState } from "react";
import { payMatrix } from "@/data/payMatrix";
import OtherToolsSection from "@/components/tools/OtherToolsSection";       
import FAQSection7cpcPayMatrix from "@/components/paymatrix/FAQSection7cpcPayMatrix";
import DownloadPDF from "@/components/paymatrix/DownloadPDF";
import PayLevelSelector from "@/components/paymatrix/PayLevelSelector";
import PayMatrixDisplay from "@/components/paymatrix/PayMatrixDisplay";


export default function PayMatrixPage() {

    const [level, setLevel] = useState("");

    return (

        <div className="page-container">

            <div className="text-center space-y-2 mb-6">

                <h1 className="text-2xl font-bold">
                    7th CPC Pay Matrix
                </h1>

                <p className="text-gray-600 text-sm">
                    View salary levels and pay progression under the 7th Central Pay Commission
                </p>

            </div>

            <PayLevelSelector
                level={level}
                setLevel={setLevel}
                payMatrix={payMatrix}
            />

            {level && (

                <PayMatrixDisplay
                    level={level}
                    matrix={payMatrix[level]}
                />

            )}

            <div className="mt-5">

                <DownloadPDF />

            </div>

            <div className="block mb-5 bg-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition">
                <OtherToolsSection />
            </div>

            <FAQSection7cpcPayMatrix />




        </div>



    );
}

