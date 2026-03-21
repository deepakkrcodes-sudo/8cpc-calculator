import { formatINR } from "@/utils/format";

export default function PensionRow({ label, v7, v8, highlight }) {

  const val7 = Number(v7) || 0;
  const val8 = Number(v8) || 0;

  const diff = val8 - val7;

  return (

    <div className={`grid grid-cols-[2fr_1fr_1fr_1fr] text-base ${highlight ? "bg-yellow-50 font-semibold" : ""}`}>

      <div className="p-3">{label}</div>

      <div className="p-3 text-center">
        ₹ {formatINR(val7)}
      </div>

      <div className="p-3 text-center text-blue-600">
        ₹ {formatINR(val8)}
      </div>

      <div className="p-3 text-center font-semibold text-green-600">
        +₹ {formatINR(diff)}
      </div>

    </div>

  );

}