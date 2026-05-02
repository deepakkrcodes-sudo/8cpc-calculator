import Link from "next/link";
import OtherToolsSection from "@/components/tools/OtherToolsSection";

export const metadata = {
  title: "History of Pay Commissions in India: 1st to 7th CPC and 8th CPC Signals",
  description:
    "A deep editorial history of Indian Pay Commissions from the 1st to 7th CPC, with insights on what past salary reforms indicate for the 8th CPC.",
  alternates: {
    canonical: "https://8cpccalculator.com/blog/history-of-pay-commission-india"
  }
};

const commissions = [
  {
    name: "1st CPC",
    period: "1946-47",
    anchor: "Post-independence salary structure",
    insight:
      "The first commission created a formal pay architecture for a newly independent state. It was less about generosity and more about administrative order."
  },
  {
    name: "2nd CPC",
    period: "1957-59",
    anchor: "Socialist-era fairness",
    insight:
      "The second commission reflected a welfare-state mindset. Pay was viewed through fairness, subsistence and public service motivation."
  },
  {
    name: "3rd CPC",
    period: "1970-73",
    anchor: "Need-based minimum wage",
    insight:
      "This phase introduced stronger thinking around minimum wage logic, inflation pressure and family needs."
  },
  {
    name: "4th CPC",
    period: "1983-86",
    anchor: "Modernization pressure",
    insight:
      "Government employment had to remain attractive as the economy became more complex. Allowances and relativity became more important."
  },
  {
    name: "5th CPC",
    period: "1994-97",
    anchor: "Liberalization-era adjustment",
    insight:
      "The post-1991 economy created new comparisons with private-sector pay. Fiscal stress also became a visible constraint."
  },
  {
    name: "6th CPC",
    period: "2006-08",
    anchor: "Pay bands and grade pay",
    insight:
      "The 6th CPC simplified many structures but also created compression issues that later needed correction."
  },
  {
    name: "7th CPC",
    period: "2013-16",
    anchor: "Pay matrix and 2.57 fitment",
    insight:
      "The 7th CPC replaced pay bands with a cleaner pay matrix. Its 2.57 factor corrected structure, not just inflation."
  }
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Why are Pay Commissions formed in India?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Pay Commissions are formed to review salary, pension, allowances and service conditions of central government employees and pensioners."
      }
    },
    {
      "@type": "Question",
      name: "Which Pay Commission introduced the pay matrix?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "The 7th Central Pay Commission introduced the pay matrix, replacing the pay band and grade pay structure."
      }
    },
    {
      "@type": "Question",
      name: "Does history indicate the 8th CPC fitment factor?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "History gives clues but not a confirmed number. Past commissions show that final pay revision depends on inflation, fiscal capacity, employee expectations and structural pay problems."
      }
    }
  ]
};

export default function HistoryOfPayCommissionPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="relative h-56 sm:h-72">
          <img
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1400"
            alt="Government finance files and charts"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
          <div className="absolute bottom-0 p-5 sm:p-7 text-white space-y-3">
            <div className="text-xs uppercase tracking-wider text-indigo-100">
              Pay Commission History
            </div>
            <h1 className="text-2xl sm:text-4xl font-semibold max-w-4xl leading-tight">
              History of Pay Commissions in India: What 1st to 7th CPC Reveals About the 8th CPC
            </h1>
            <p className="text-sm text-gray-100 max-w-3xl">
              A long-view editorial on how salary reform moved from subsistence pay
              to pay matrix rationalization and what this means for 2026 expectations.
            </p>
          </div>
        </div>
      </section>

      <article className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sm:p-7 space-y-7">
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">Why Pay Commission History Matters</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            Pay Commissions are not just salary-hike events. They are moments when
            the government rebalances employee welfare, pension obligations, fiscal
            discipline and administrative efficiency. Each commission reflects the
            economy and politics of its time.
          </p>
          <p className="text-sm text-gray-700 leading-relaxed">
            This is why the history of Pay Commissions is useful for understanding
            the 8th CPC. Past patterns do not produce a guaranteed fitment factor,
            but they show how governments think when salary revision becomes unavoidable.
          </p>
        </section>

        <section className="grid sm:grid-cols-3 gap-4">
          <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-4">
            <div className="text-xs text-indigo-700">Core Pattern</div>
            <div className="text-lg font-semibold text-gray-900">Inflation + Structure</div>
            <p className="text-xs text-gray-700 mt-1">Most revisions combine price compensation with pay rationalization.</p>
          </div>
          <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
            <div className="text-xs text-emerald-700">Recurring Constraint</div>
            <div className="text-lg font-semibold text-gray-900">Fiscal Capacity</div>
            <p className="text-xs text-gray-700 mt-1">Salary and pension bills limit how generous each award can be.</p>
          </div>
          <div className="rounded-xl border border-orange-100 bg-orange-50 p-4">
            <div className="text-xs text-orange-700">8th CPC Signal</div>
            <div className="text-lg font-semibold text-gray-900">Moderation Likely</div>
            <p className="text-xs text-gray-700 mt-1">History favors compromise over extreme demands.</p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Commission-by-Commission Analysis</h2>
          <div className="space-y-4">
            {commissions.map((item) => (
              <div key={item.name} className="rounded-xl border border-gray-200 p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                  <span className="text-xs text-gray-500">{item.period}</span>
                </div>
                <div className="text-sm font-medium text-indigo-700 mt-2">{item.anchor}</div>
                <p className="text-sm text-gray-700 leading-relaxed mt-1">{item.insight}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">The Big Shift: From Pay Bands to Pay Matrix</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            The 7th CPC's pay matrix was a major design change. It made progression
            easier to read and reduced ambiguity in pay fixation. But it also made
            the fitment factor more visible to employees because revised basic pay
            could be understood through a simple multiplier.
          </p>
          <p className="text-sm text-gray-700 leading-relaxed">
            For the 8th CPC, the government may prefer to retain the matrix logic
            rather than rebuild the entire system. The real debate may therefore be
            about fitment factor, pension treatment, allowances and rationalization
            between levels.
          </p>
        </section>

        <section className="rounded-xl border border-yellow-200 bg-yellow-50 p-5 space-y-3">
          <h2 className="text-xl font-semibold text-yellow-950">What History Suggests for 8th CPC</h2>
          <ul className="text-sm text-gray-800 space-y-2">
            <li>Salary revision usually balances employee expectations with fiscal limits.</li>
            <li>Large headline demands often act as negotiation anchors.</li>
            <li>Final recommendations usually avoid extremes.</li>
            <li>Pay structure simplification matters as much as the multiplier.</li>
            <li>Pension impact can strongly influence the final fiscal decision.</li>
          </ul>
        </section>

        <section className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
          <h2 className="text-xl font-semibold text-emerald-950">Editorial Verdict</h2>
          <p className="text-sm text-emerald-950 leading-relaxed mt-2">
            The history of Pay Commissions shows one consistent pattern: expectations
            begin high, fiscal reality pulls them lower, and the final award lands
            in a negotiated middle. For the 8th CPC, this means history supports a
            meaningful revision, but not necessarily an aggressive fitment factor.
          </p>
        </section>

        <section className="rounded-xl border border-gray-200 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Compare Your 7th vs 8th CPC Salary</h2>
            <p className="text-sm text-gray-600">Use different fitment scenarios and see the practical salary effect.</p>
          </div>
          <Link href="/" className="inline-flex justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
            Open Calculator
          </Link>
        </section>
      </article>

      <div className="bg-gray-100 p-4 rounded-xl shadow-sm hover:shadow-md transition">
              <OtherToolsSection />
            </div>

      <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sm:p-7 space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">FAQs</h2>
        {faqSchema.mainEntity.map((faq) => (
          <div key={faq.name} className="border-b border-gray-100 pb-3 last:border-0">
            <h3 className="text-sm font-semibold text-gray-900">{faq.name}</h3>
            <p className="text-sm text-gray-700 mt-1 leading-relaxed">{faq.acceptedAnswer.text}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
