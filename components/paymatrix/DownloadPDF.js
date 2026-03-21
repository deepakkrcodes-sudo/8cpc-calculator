export default function DownloadPDF(){

 return(

  <div className="bg-white rounded-xl shadow-sm p-5 mb-6 flex justify-between items-center">

  <div>
    <h2 className="font-semibold">
      Download Complete Pay Matrix
    </h2>

    <p className="text-sm text-gray-500">
      Official pay matrix reference PDF
    </p>
  </div>

  <a
    href="/pdf/7cpc-pay-matrix.pdf"
    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
  >
    Download PDF
  </a>

</div>

 );

}