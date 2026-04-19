import { CheckCircle2, TrendingUp, IndianRupee, AlertCircle } from "lucide-react";

export default function FixationSummary({ result }) {
  if (!result) return null;

  const promotion = Math.round(result.totalA);
  const dni = Math.round(result.totalB);

  const diff = promotion - dni;
  const isPromotionBetter = diff >= 0;
  const better = isPromotionBetter ? "Date of Promotion" : "Date of Next Increment (DNI)";
  const gain = Math.abs(diff);

  const percent = dni > 0 ? ((gain / dni) * 100).toFixed(2) : 0;
  const total = promotion + dni;
  
  // Make bars more visually distinct by using a scale where the lower value is 80% of the max
  const maxVal = Math.max(promotion, dni);
  const promotionPercent = maxVal ? (promotion / maxVal) * 100 : 50;
  const dniPercent = maxVal ? (dni / maxVal) * 100 : 50;

  return (
    <div className="space-y-6">
      {/* DECISION CARD */}
      <div className={`relative overflow-hidden rounded-2xl shadow-sm border p-6 transition-all duration-300 ${isPromotionBetter ? "bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-100" : "bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-100"}`}>
        
        {/* Background glow effect */}
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
              Total Gain over {result.timeline.length} months: <span className={`font-bold ${isPromotionBetter ? "text-indigo-700" : "text-emerald-700"}`}>₹{gain.toLocaleString("en-IN")}</span> ({percent}%)
            </div>
          </div>
        </div>
      </div>

      {/* HISTOGRAM COMPARISON */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-6">
        <div className="flex items-center gap-2 border-b pb-3">
          <IndianRupee size={18} className="text-gray-500" />
          <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wider">
            Total Earnings Comparison
          </h3>
        </div>

        <div className="space-y-5 pt-2">
          {/* PROMOTION BAR */}
          <div>
            <div className="flex justify-between items-end mb-2">
              <span className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-indigo-500"></div>
                From Promotion Date
              </span>
              <span className="font-bold text-gray-900">
                ₹ {promotion.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-indigo-500 to-blue-500 h-full rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${promotionPercent}%` }}
              />
            </div>
          </div>

          {/* DNI BAR */}
          <div>
            <div className="flex justify-between items-end mb-2">
              <span className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                From DNI Date
              </span>
              <span className="font-bold text-gray-900">
                ₹ {dni.toLocaleString("en-IN")}
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
            <strong>Note:</strong> The above comparison shows the estimated gross salary difference for the simulation period. The interest rate chosen will further adjust the value of past arrears dynamically.
          </p>
        </div>
      </div>
    </div>
  );
}