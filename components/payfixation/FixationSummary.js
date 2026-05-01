import { CheckCircle2, TrendingUp, IndianRupee, AlertCircle } from "lucide-react";

export default function FixationSummary({ result }) {
  if (!result) return null;

  const promotion = Math.round(result.totalA);
  const dni = Math.round(result.totalB);

  const isPromotionBetter = result.betterOption !== "option2";
  const better = isPromotionBetter ? "Date of Promotion" : "Date of Next Increment (DNI)";
  const basicGain = Math.abs((result.option1?.basic || 0) - (result.option2?.basic || 0));

  const maxVal = Math.max(promotion, dni);
  const promotionPercent = maxVal ? (promotion / maxVal) * 100 : 50;
  const dniPercent = maxVal ? (dni / maxVal) * 100 : 50;

  return (
    <div className="space-y-6">
      <div className={`relative overflow-hidden rounded-2xl shadow-sm border p-6 transition-all duration-300 ${isPromotionBetter ? "bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-100" : "bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-100"}`}>
        <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full blur-2xl opacity-40 ${isPromotionBetter ? "bg-indigo-400" : "bg-emerald-400"}`}></div>

        <div className="flex items-start justify-between relative z-10">
          <div>
            <div className={`text-xs font-bold uppercase tracking-wider mb-1 ${isPromotionBetter ? "text-indigo-600" : "text-emerald-600"}`}>
              Recommended Fixation Date
            </div>
            <div className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <CheckCircle2 className={isPromotionBetter ? "text-indigo-500" : "text-emerald-500"} size={24} />
              {better}
            </div>
            <div className="text-sm font-medium text-gray-600 mt-2 flex items-center gap-1">
              <TrendingUp size={16} className={isPromotionBetter ? "text-indigo-500" : "text-emerald-500"} />
              Basic Pay Advantage: <span className={`font-bold ${isPromotionBetter ? "text-indigo-700" : "text-emerald-700"}`}>Rs {basicGain.toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-6">
        <div className="flex items-center gap-2 border-b pb-3">
          <IndianRupee size={18} className="text-gray-500" />
          <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wider">
            Total Earnings Comparison
          </h3>
        </div>

        <div className="space-y-5 pt-2">
          <div>
            <div className="flex justify-between items-end mb-2">
              <span className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-indigo-500"></div>
                From Promotion Date
              </span>
              <span className="font-bold text-gray-900">
                Rs {promotion.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-indigo-500 to-blue-500 h-full rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${promotionPercent}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-end mb-2">
              <span className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                From DNI Date
              </span>
              <span className="font-bold text-gray-900">
                Rs {dni.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${dniPercent}%` }}
              />
            </div>
          </div>
        </div>

        <div className="bg-amber-50 rounded-lg p-3 flex items-start gap-2 border border-amber-100">
          <AlertCircle className="text-amber-500 shrink-0 mt-0.5" size={16} />
          <p className="text-xs text-amber-800 leading-relaxed">
            <strong>Note:</strong> The recommendation is based on the higher basic pay under FR 22(I)(a)(1). The earnings comparison below remains an estimate for the selected simulation period.
          </p>
        </div>
      </div>
    </div>
  );
}
