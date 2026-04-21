import { formatINR } from "@/utils/format";

export default function PensionRow7({ label, value, highlight }) {

  const val = Number(value) || 0;

  return (


    <div className={`flex justify-between items-center p-3 text-base ${highlight ? "bg-blue-50 font-semibold" : ""}`}>

      <div className="text-gray-700">
        {label}
      </div>

      <div className="font-semibold text-blue-700">
        ₹ {formatINR(val)}
      </div>

    </div>
   

  );

}