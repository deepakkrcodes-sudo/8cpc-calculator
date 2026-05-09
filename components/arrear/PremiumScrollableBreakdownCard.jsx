"use client";

import { useMemo, useRef, useState } from "react";
import {
  BadgeIndianRupee,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  TrendingUp
} from "lucide-react";
import { formatINR } from "@/utils/format";

function formatPeriodLabel(period) {
  const [month, year] = period.split(" ");
  const end = month === "Jan" ? `Jun ${year}` : `Dec ${year}`;
  return `${month}-${end}`;
}

function formatShortLabel(period) {
  const [month, year] = period.split(" ");
  return month === "Jan" ? `Jan-Jun ${year}` : `Jul-Dec ${year}`;
}

function toTimelineItems(periods) {
  const items = [];

  periods.forEach((period, index) => {
    items.push({
      ...period,
      id: `period-${period.period}-${index}`,
      type: "period",
      label: formatShortLabel(period.period),
      sortDate: getSortDate(period.period).getTime()
    });

    if (period.isPromotion) {
      items.push({
        ...period,
        id: `promotion-${period.promotionDate || index}`,
        type: "promotion",
        label: "Promotion Event",
        sortDate: Number(period.promotionDate) || getSortDate(period.period).getTime()
      });
    }
  });

  return items.sort((a, b) => a.sortDate - b.sortDate || (a.type === "promotion" ? 1 : -1));
}

function getSortDate(period) {
  const [month, year] = period.split(" ");
  return new Date(Number(year), month === "Jan" ? 0 : 6, 1);
}

function money(value) {
  return `Rs. ${formatINR(Number((Number(value) || 0).toFixed(2)))}`;
}

function monthlyValue(value, item) {
  const months = Number(item?.eligibleMonths || 6);
  return months > 0 ? Number(value || 0) / months : Number(value || 0);
}

export default function PremiumScrollableBreakdownCard({ result }) {
  const scrollerRef = useRef(null);
  const timelineItems = useMemo(
    () => toTimelineItems(result?.periods ?? []),
    [result?.periods]
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [tableStyle, setTableStyle] = useState("lines");
  const activeItem = timelineItems[activeIndex];

  if (!result || !timelineItems.length || !activeItem) return null;

  function moveActive(direction) {
    const nextIndex = Math.min(
      Math.max(activeIndex + direction, 0),
      timelineItems.length - 1
    );

    setActiveIndex(nextIndex);

    window.requestAnimationFrame(() => {
      const target = scrollerRef.current?.querySelector(`[data-index="${nextIndex}"]`);
      target?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    });
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="space-y-5 p-1 sm:p-2 lg:p-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-md sm:text-large font-semibold uppercase tracking-[0.18em] text-indigo-600">
              <BadgeIndianRupee size={18} />
              Period-wise Salary Breakdown
            </div>


          </div>



        </div>

        <div className="space-y-3">
          <div className="mt-1 flex items-start gap-1.5 text-[10px] leading-relaxed text-amber-700/90 sm:text-[12px]">

            <span className="mt-[3px] h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />

            <span>
              Arrear estimation considers Basic Pay and DA only; fixed deductions and regular tax are assumed unchanged during accrual.
            </span>

          </div>

          {/* TIMELINE */}
          <TimelineScroller
            activeIndex={activeIndex}
            items={timelineItems}
            onMove={moveActive}
            onSelect={setActiveIndex}
            scrollerRef={scrollerRef}
          />

          {/* RIGHT-ALIGNED EVENT BADGES */}
          {(activeItem?.isPromotion || activeItem?.isIncrement) && (
            <div className="flex justify-end gap-2">

              {activeItem?.isIncrement ? (
                <div
                  className="
            inline-flex items-center gap-1

            rounded-full
            border border-emerald-200
            bg-emerald-50

            px-2 py-1

            text-[10px]
            sm:text-xs

            font-medium
            text-emerald-700

            shadow-sm
          "
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Increment
                </div>
              ) : null}

              {activeItem?.isPromotion ? (
                <div
                  className="
            inline-flex items-center gap-1

            rounded-full
            border border-violet-200
            bg-violet-50

            px-2 py-1

            text-[10px]
            sm:text-xs

            font-medium
            text-violet-700

            shadow-sm
          "
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
                  Promotion
                </div>
              ) : null}

            </div>
          )}

          {/* DETAILS */}
          <ActivePeriodDetails
            item={activeItem}
            tableStyle={tableStyle}
          />


        </div>
      </div>
    </section>
  );
}



function TimelineScroller({
  activeIndex,
  items,
  onMove,
  onSelect,
  scrollerRef
}) {
  return (
    <div className="relative rounded-2xl ">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-6 sm:w-10 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-6 sm:w-10 bg-gradient-to-l from-white to-transparent" />

      <button
        type="button"
        aria-label="Previous period"
        onClick={() => onMove(-1)}
        disabled={activeIndex === 0}
        className="absolute left-1 sm:left-2 top-1/2 z-20 grid h-7 w-7 sm:h-9 sm:w-9 -translate-y-1/2 place-items-center rounded-full border border-white bg-white/95 text-slate-700 shadow-md transition hover:text-indigo-600 disabled:opacity-40"
      >
        <ChevronLeft size={18} />
      </button>

      <div
        ref={scrollerRef}
        className="
        flex
        justify-start
        sm:justify-center

        snap-x
        snap-mandatory

        gap-2
        sm:gap-3

        overflow-x-auto
        scroll-smooth

        py-1

        pl-9
        pr-9
        sm:pl-12
        sm:pr-12

        [scrollbar-width:none]
        [&::-webkit-scrollbar]:hidden
        "
      >
        {items.map((item, index) => (
          <TimelineItem
            key={item.id}
            item={item}
            index={index}
            isActive={activeIndex === index}
            onSelect={onSelect}
          />
        ))}
      </div>

      <button
        type="button"
        aria-label="Next period"
        onClick={() => onMove(1)}
        disabled={activeIndex === items.length - 1}
        className="absolute right-1 sm:right-2 top-1/2 z-20 grid h-7 w-7 sm:h-9 sm:w-9 -translate-y-1/2 place-items-center rounded-full border border-white bg-white/95 text-slate-700 shadow-md transition hover:text-indigo-600 disabled:opacity-40"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}

function TimelineItem({ item, index, isActive, onSelect }) {
  const isPromotion = item.type === "promotion";

  return (
    <button
      type="button"
      data-index={index}
      onClick={() => onSelect(index)}
      className={`

  min-w-[92px]
  sm:min-w-[118px]
  md:min-w-[132px]

  snap-center
  rounded-xl
  sm:rounded-2xl

  border

  px-2.5
  sm:px-4

  py-2
  sm:py-3

  text-left

  text-[10px]
  sm:text-xs
  md:text-sm

  shadow-sm
  transition-all
  duration-200

  focus:outline-none
  focus:ring-2
  focus:ring-indigo-400

  ${isActive
          ? isPromotion
            ? "border-violet-300 bg-violet-600 text-white shadow-violet-200"
            : "border-indigo-300 bg-indigo-600 text-white shadow-indigo-200"
          : isPromotion
            ? "border-violet-100 bg-violet-50 text-violet-800 hover:bg-violet-100"
            : "border-slate-200 bg-white text-slate-700 hover:border-indigo-200 hover:bg-indigo-50"
        }`}
    >
      <div className="flex items-center gap-2">
        {isPromotion ? <Sparkles size={15} /> : null}
        <span className="font-semibold leading-tight tracking-tight text-[10px] sm:text-xs md:text-sm">{item.label}</span>
      </div>
      <div
        className={`mt-1 text-[9px] sm:text-[10px] md:text-[11px] leading-tight ${isActive ? "text-white/80" : "text-slate-500"
          }`}
      >
        {isPromotion
          ? "Promotion & Pay Fixation"
          : ""}
      </div>
      <div className="mt-2 flex gap-1.5">

        {item.isIncrement ? (
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        ) : null}

        {item.isPromotion ? (
          <span className="h-1.5 w-1.5 rounded-full bg-violet-300" />
        ) : null}

      </div>
    </button>
  );
}

function ActivePeriodDetails({ item, tableStyle }) {
  const monthlyGross7 = monthlyValue(item.gross7, item);
  const monthlyGross8 = monthlyValue(item.gross8, item);
  const monthlyDeduction7 = monthlyValue(item.pension7 ?? item.nps7, item);
  const monthlyDeduction8 = monthlyValue(item.pension8 ?? item.nps8, item);
  const monthlyNet7 = monthlyGross7 - monthlyDeduction7;
  const monthlyNet8 = monthlyGross8 - monthlyDeduction8;
  const netDifference = monthlyNet8 - monthlyNet7;
  const periodArrear = item.periodArrear ?? item.netArrear;
  const incomeRows = [
    [
      "Basic Pay",
      monthlyValue(item.basic7Total ?? item.basic7, item),
      monthlyValue(item.basic8Total ?? item.basic8, item)
    ],
    ["DA", monthlyValue(item.da7, item), monthlyValue(item.da8, item)],
    [
      "Gross Income",
      monthlyValue(item.gross7, item),
      monthlyValue(item.gross8, item),
      true
    ]
  ];
  const deductionRows = [
    [
      "NPS",
      monthlyDeduction7,
      monthlyDeduction8
    ],
    [
      "Total Deduction",
      monthlyDeduction7,
      monthlyDeduction8,
      true
    ]
  ];

  return (
    <div className=" p-1  sm:p-2">


      <div className="mt-4 grid gap-4">
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <ComparisonSection
            tone="green"
            title="Income"
            rows={incomeRows}
            tableStyle={tableStyle}
          />

          <ComparisonSection
            tone="pink"
            title="Deductions"
            rows={deductionRows}
            tableStyle={tableStyle}
          />

          <NetPayHighlightRow
            seventh={monthlyNet7}
            eighth={monthlyNet8}
            tableStyle={tableStyle}
          />
        </div>

        <SummaryCards
          netDifference={netDifference}
          periodArrear={periodArrear}
        />
      </div>
    </div>
  );
}

function Badge({ tone, label }) {
  const styles = {
    violet: "border-violet-200 bg-violet-50 text-violet-700",
    green: "border-emerald-200 bg-emerald-50 text-emerald-700"
  };

  return (
    <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${styles[tone]}`}>
      {label}
    </span>
  );
}

function ComparisonSection({ title, rows, tone }) {
  const styles = {
    green: {
      wrapper: "bg-blue-50/40",
      title: "text-blue-700"
    },

    pink: {
      wrapper: "bg-rose-50/40",
      title: "text-rose-700"
    }
  };

  const current = styles[tone];

  return (
    <div
      className={`border-b border-gray-200 p-3 md:p-4 ${current.wrapper}`}
    >

      {/* TITLE */}
      <div
        className={`mb-3 text-sm font-semibold ${current.title}`}
      >
        {tone === "green" ? "📈" : "📉"} {title}
      </div>

      {/* HEADER */}
      <div className="grid grid-cols-3 border-b border-gray-200 pb-2 text-xs font-semibold text-gray-500">
        <div>
          Component
        </div>

        <div className="text-center">
          7th CPC
        </div>

        <div className="text-center">
          8th CPC
        </div>
      </div>

      {/* ROWS */}
      <div>

        {rows.map(([label, seventh, eighth, highlight]) => (
          <div
            key={label}
            className={`
              grid grid-cols-3 items-center
              border-b border-gray-200/70
              px-1 py-2.5
              text-sm

              ${highlight ? "font-semibold" : ""}
            `}
          >

            {/* LABEL */}
            <div className="text-gray-700">
              {label}
            </div>

            {/* 7TH */}
            <div className="text-center tabular-nums text-gray-800">
              ₹{" "}
              {Number(seventh || 0).toLocaleString("en-IN", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              })}
            </div>

            {/* 8TH */}
            <div className="text-center tabular-nums text-gray-800">
              ₹{" "}
              {Number(eighth || 0).toLocaleString("en-IN", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              })}
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}

function NetPayHighlightRow({ seventh, eighth, tableStyle }) {
  const isGrid = tableStyle === "grid";
  const rowClass = isGrid
    ? "grid grid-cols-3 items-center border-x border-b border-indigo-200 bg-gradient-to-r from-indigo-50 to-indigo-100 text-sm font-bold text-slate-950"
    : "grid grid-cols-3 gap-2 items-center bg-gradient-to-r from-indigo-50 to-indigo-100 px-6 py-3 text-sm font-bold text-slate-950";
  const cellClass = isGrid
    ? "px-3 py-3 border-r border-indigo-200 last:border-r-0"
    : "";
  const valueCellClass = isGrid
    ? `${cellClass} text-center tabular-nums`
    : "text-center tabular-nums";

  return (
    <div className={rowClass}>
      <div className={cellClass}>Net Pay</div>
      <div className={valueCellClass}>{money(seventh)}</div>
      <div className={valueCellClass}>{money(eighth)}</div>
    </div>
  );
}

function SummaryCards({
  netDifference,
  periodArrear
}) {
  return (
    <div className="grid gap-3">
      <SummaryCard
        title="Net Monthly Difference"
        value={netDifference}
        arrear={periodArrear}
        arrearLabel="6 Month Period Net Arrear"
        tone="blue"
      />
    </div>
  );
}

function SummaryCard({
  title,
  value,
  arrear,
  arrearLabel,
  tone
}) {
  const styles = {
    emerald:
      "border-emerald-200 bg-gradient-to-br from-emerald-50 to-blue-50 text-emerald-700",

    blue:
      "border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-700"
  };

  return (
    <div
      className={`
        rounded-xl
        border
        px-3 py-3
        shadow-sm

        ${styles[tone]}
      `}
    >

      {/* MOBILE LAYOUT */}
      <div className="sm:hidden">

        <div className="flex items-start justify-between gap-3">

          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              {title}
            </div>

            <div className="mt-1 text-base font-bold tabular-nums text-slate-900">
              {money(value)}
            </div>
          </div>

          <div className="rounded-full bg-white/80 px-2 py-1 text-[10px] font-semibold text-slate-500">
            Monthly
          </div>

        </div>

        <div className="mt-3 border-t border-white/80 pt-2">

          <div className="text-xs font-medium text-slate-500">
            {arrearLabel}
          </div>

          <div className="mt-0.5 text-xl font-extrabold tabular-nums text-slate-950">
            {money(arrear)}
          </div>

        </div>

      </div>

      {/* DESKTOP / LAPTOP LAYOUT */}
      <div className="hidden sm:flex items-center justify-between gap-6">

        {/* LEFT */}
        <div className="min-w-0">

          <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {title}
          </div>

          <div className="mt-1 text-lg font-bold tabular-nums text-slate-900">
            {money(value)}
          </div>

        </div>

        {/* RIGHT */}
        <div className="border-l border-white/80 pl-5 text-right">

          <div className="text-xs font-medium text-slate-500">
            {arrearLabel}
          </div>

          <div className="mt-1 text-2xl font-extrabold tabular-nums text-slate-950">
            {money(arrear)}
          </div>

        </div>

      </div>

    </div>
  );
}
