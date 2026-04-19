"use client";
import { useState } from "react";
import { payMatrix } from "@/data/payMatrix";
import DownloadPDF from "@/components/paymatrix/DownloadPDF";
import PayLevelSelector from "@/components/paymatrix/PayLevelSelector";
import PayMatrixDisplay from "@/components/paymatrix/PayMatrixDisplay";


export default function PayMatrixPage() {

    const [level, setLevel] = useState("");

    return (

        <div className="page-container">

           
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

        




        </div>



    );
}

