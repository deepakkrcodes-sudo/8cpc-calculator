"use client";

import {
  CalendarRange,
  Clock3,
  Layers3,
  Wallet
} from "lucide-react";
import { formatINR } from "@/utils/format";

export default function PremiumArrearSummaryCard({
  result,
  implementationPeriod,
  fitmentFactor
}) {
  if (!result) return null;

  return (
    <div className="overflow-hidden rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-lime-50 to-teal-100 text-slate-900 shadow-sm">
      <div className="p-3 sm:p-4 large:p-5 md:p-6 space-y-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-emerald-700/90">
              Estimated Net Arrear
            </div>
            <div className="mt-2 text-3xl md:text-4xl font-bold">
              Rs. {formatINR(result.totalNetArrear)}
            </div>
            <div className="mt-2 text-sm text-slate-600">
              Based on separate 7th CPC and 8th CPC salary calculation for each eligible period.
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-200 bg-white/70 p-3 text-emerald-700 shadow-sm backdrop-blur-sm">
            <Wallet size={24} />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            icon={<Wallet size={16} />}
            label="Gross Arrear"
            value={`Rs. ${formatINR(result.totalGrossArrear)}`}
          />
          <MetricCard
            icon={<Layers3 size={16} />}
            label="Fitment Factor"
            value={String(fitmentFactor)}
          />
          <MetricCard
            icon={<CalendarRange size={16} />}
            label="Eligible From"
            value={result.effectiveFrom}
          />
          <MetricCard
            icon={<Clock3 size={16} />}
            label="Eligible Months"
            value={String(result.totalEligibleMonths)}
          />
        </div>

        <div className="grid gap-3 rounded-2xl border border-emerald-200 bg-white/70 p-4 text-sm md:grid-cols-3">
          <div>
            <div className="text-emerald-700/80">Implementation</div>
            <div className="mt-1 font-semibold">{implementationPeriod}</div>
          </div>
          <div>
            <div className="text-emerald-700/80">Arrear Through</div>
            <div className="mt-1 font-semibold">{result.implementationDate}</div>
          </div>
          <div>
            <div className="text-emerald-700/80">Total Periods</div>
            <div className="mt-1 font-semibold">{result.periods.length}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ icon, label, value }) {
  return (
    <div className="rounded-2xl border border-emerald-200 bg-white/75 p-4 shadow-sm backdrop-blur-sm">
      <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-emerald-700/85">
        {icon}
        {label}
      </div>
      <div className="mt-2 text-lg font-semibold text-slate-900">
        {value}
      </div>
    </div>
  );
}
