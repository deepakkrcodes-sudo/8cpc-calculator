import { TrendingUp, Wallet, IndianRupee, ArrowUpRight } from "lucide-react";

export default function ResultSummaryCard({ summary }) {
  if (!summary) return null;

  const format = (val) =>
    val !== undefined ? val.toLocaleString("en-IN") : "-";

  return (
    <div className="rounded-3xl p-[1px] bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 shadow-lg">

      <div className="bg-white rounded-3xl p-6 space-y-6">

        {/* HEADER */}
        <div className="text-center space-y-1">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center justify-center gap-2">
            <TrendingUp size={18} className="text-indigo-600" />
            Pension Impact Summary
          </h2>

          <p className="text-xs text-gray-500">
            Estimated change after 8th CPC implementation
          </p>

          <div className="inline-block text-[11px] bg-indigo-50 text-indigo-600 px-2 py-1 rounded-md mt-1">
            8th CPC
          </div>
        </div>


        {/* GRID */}
        <div className="grid grid-cols-3 gap-3">

          {/* CURRENT */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-center space-y-1">
            <div className="flex items-center justify-center gap-1 text-xs text-slate-500">
              <IndianRupee size={12} />
              Current
            </div>
            <div className="text-lg font-bold text-slate-800">
              ₹{format(summary.oldPension)}
            </div>
          </div>

          {/* PROJECTED */}
          <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100 text-center space-y-1">
            <div className="flex items-center justify-center gap-1 text-xs text-indigo-600">
              <TrendingUp size={12} />
              Projected
            </div>
            <div className="text-lg font-bold text-indigo-700">
              ₹{format(summary.newPension)}
            </div>
          </div>

          {/* INCREASE */}
          <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100 text-center space-y-1">
            <div className="flex items-center justify-center gap-1 text-xs text-emerald-600">
              <ArrowUpRight size={12} />
              Increase
            </div>
            <div className="text-lg font-bold text-emerald-700">
              +₹{format(summary.monthlyIncrease)}
            </div>
          </div>

        </div>


        {/* DIVIDER */}
        <div className="border-t border-gray-100"></div>


        {/* ARREAR HERO */}
        <div className="relative overflow-hidden rounded-3xl p-6 bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-600 text-white shadow-xl text-center">

          {/* Glow */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,white,transparent)]"></div>
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_bottom,white,transparent)]"></div>
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>

          <div className="relative space-y-3">

            {/* Header */}
            <div className="flex items-center justify-center gap-2 text-sm opacity-90">
              <Wallet size={16} />
              <span>Total Arrear (Estimated)</span>
            </div>

            {/* VALUE - CENTER HERO */}
            <div className="text-4xl font-extrabold tracking-tight leading-tight">
              ₹{format(summary.totalArrear)}
            </div>

            {/* Sub */}
            <div className="text-xs opacity-80 flex items-center justify-center gap-2">
              <TrendingUp size={12} />
              Growth impact till implementation
            </div>

          </div>

        </div>


        {/* FOOTNOTE */}
        <div className="text-[11px] text-gray-400 text-center flex items-center justify-center gap-1">
          <IndianRupee size={12} />
          Based on last basic pay ₹{format(summary.lastBasicPay)}
        </div>


        {/* PREMIUM FINISH LINE */}
        <div className="text-center text-[11px] text-gray-300 tracking-wide pt-1">
          — Projected Estimate • Not Official —
        </div>

      </div>
    </div>
  );
}