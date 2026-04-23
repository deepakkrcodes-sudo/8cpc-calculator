import { formatINR } from "@/utils/format";

export default function PensionSummaryCard7({ result }) {

  if (!result) return null;

  const total = result.seventh.total;

  return (

    <div className="relative overflow-hidden rounded-2xl p-[1px] 
                bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 
                shadow-lg transition-all duration-300 hover:scale-[1.02]">

      {/* Inner Card */}
      <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 border border-white/40 text-center">

        {/* Icon */}
        <div className="flex justify-center mb-2">
          <div className="bg-gradient-to-br from-yellow-400 to-amber-500 
                      text-white p-2 rounded-full shadow-md text-lg">
            💰
          </div>
        </div>

        {/* Title */}
        <div className="text-sm text-gray-500 font-semibold tracking-wide">
          Total Monthly Pension (7th CPC)
        </div>

        {/* Amount */}
        <div className="text-3xl font-extrabold mt-2 
                    bg-gradient-to-r from-amber-500 to-yellow-600 
                    bg-clip-text text-transparent">
          ₹ {formatINR(total)}
        </div>

        {/* Subtext */}
        <div className="mt-3 text-xs text-gray-500">
          Includes Basic Pension, Commutation, and Dearness Relief
        </div>

        {/* Premium divider */}
        <div className="mt-4 h-1 w-16 mx-auto rounded-full 
                    bg-gradient-to-r from-amber-400 to-yellow-500"></div>

      </div>

      {/* Glow effect */}
      <div className="absolute -top-10 -right-10 w-40 h-40 
                  bg-yellow-300/30 rounded-full blur-3xl"></div>
    </div>

  );

} 