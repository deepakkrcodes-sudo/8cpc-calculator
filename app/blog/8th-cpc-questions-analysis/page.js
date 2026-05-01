import Link from "next/link";

export const metadata = {
  title: "8th CPC Questions Explained: What the Commission Is Really Asking",
  description:
    "Editorial analysis of the major 8th CPC consultation questions and what they reveal about salary, pension, allowances, performance and pay structure outcomes.",
  alternates: {
    canonical: "https://8cpccalculator.com/blog/8th-cpc-questions-analysis"
  }
};

const questionThemes = [
  {
    theme: "Salary Structure",
    signal: "The Commission is testing whether the pay matrix needs reform, not merely a multiplier update.",
    outcome:
      "Possible rationalization of levels, entry pay, promotion jumps and pay progression."
  },
  {
    theme: "Fitment Factor",
    signal: "Questions around pay revision imply that DA merger and real wage increase are being studied separately.",
    outcome:
      "Final fitment may be lower than union demands but supported by a structured justification."
  },
  {
    theme: "Allowances",
    signal: "Allowance questions usually mean the Commission is checking relevance, duplication and cost.",
    outcome:
      "Some allowances may be retained, merged, simplified or linked to new eligibility logic."
  },
  {
    theme: "Pension",
    signal: "Pension questions show that retirees are part of the cost and equity equation.",
    outcome:
      "Pension revision may be considered alongside fitment, but OPS confirmation cannot be assumed."
  },
  {
    theme: "Performance and Efficiency",
    signal: "The Commission may examine whether pay should better reflect accountability and productivity.",
    outcome:
      "Potential emphasis on rational staffing, career progression and performance-linked review."
  },
  {
    theme: "Fiscal Impact",
    signal: "Every salary question has a budget question behind it.",
    outcome:
      "Recommendations may be moderated or phased if the recurring burden is high."
  }
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Why are the 8th CPC consultation questions important?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "The questions reveal what the Commission is studying: pay structure, allowances, pension, fiscal impact, employee expectations and administrative efficiency."
      }
    },
    {
      "@type": "Question",
      name: "Do the questions confirm the fitment factor?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "No. The questions do not confirm the fitment factor. They help the Commission collect evidence before forming recommendations."
      }
    },
    {
      "@type": "Question",
      name: "Do the 8th CPC questions confirm OPS?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "No. Pension-related questions may examine pension benefits and concerns, but they do not confirm restoration of the Old Pension Scheme."
      }
    }
  ]
};

export default function QuestionsAnalysisPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="relative h-56 sm:h-72">
          <img
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1400"
            alt="Consultation meeting with documents"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
          <div className="absolute bottom-0 p-5 sm:p-7 text-white space-y-3">
            <div className="text-xs uppercase tracking-wider text-indigo-100">
              8th CPC Consultation Decoded
            </div>
            <h1 className="text-2xl sm:text-4xl font-semibold max-w-4xl leading-tight">
              8th CPC Questions Explained: What the Commission Is Really Asking
            </h1>
            <p className="text-sm text-gray-100 max-w-3xl">
              A deeper reading of the consultation themes and what they may indicate
              about salary, pension, allowances and final recommendations.
            </p>
          </div>
        </div>
      </section>

      <article className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sm:p-7 space-y-7">
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">Why the Questions Matter</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            A Pay Commission questionnaire is not a casual survey. It is a map of
            the Commission's concerns. The questions show what evidence it wants
            before deciding how far salary, pension and allowance reform should go.
          </p>
          <p className="text-sm text-gray-700 leading-relaxed">
            The real value is not only in the questions themselves, but in what they
            imply: where the government sees pressure, where employee bodies may
            negotiate, and where the final report may introduce changes.
          </p>
        </section>

        <section className="grid sm:grid-cols-2 gap-4">
          {questionThemes.map((item) => (
            <div key={item.theme} className="rounded-xl border border-gray-200 p-4 shadow-sm">
              <h3 className="font-semibold text-gray-900">{item.theme}</h3>
              <div className="mt-2 rounded-lg bg-indigo-50 border border-indigo-100 p-3">
                <div className="text-xs font-semibold text-indigo-700">What the question signals</div>
                <p className="text-sm text-gray-700 leading-relaxed mt-1">{item.signal}</p>
              </div>
              <div className="mt-2 rounded-lg bg-emerald-50 border border-emerald-100 p-3">
                <div className="text-xs font-semibold text-emerald-700">Possible outcome</div>
                <p className="text-sm text-gray-700 leading-relaxed mt-1">{item.outcome}</p>
              </div>
            </div>
          ))}
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">Decoding the Commission's Thinking</h2>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="text-left p-3">Question Type</th>
                  <th className="text-left p-3">Hidden Policy Concern</th>
                  <th className="text-left p-3">Likely Direction</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="p-3">Minimum pay and fitment</td>
                  <td className="p-3">Adequacy of salary at lower levels</td>
                  <td className="p-3">A defensible minimum-pay formula.</td>
                </tr>
                <tr>
                  <td className="p-3">Allowances</td>
                  <td className="p-3">Cost, duplication and relevance</td>
                  <td className="p-3">Rationalization rather than blanket expansion.</td>
                </tr>
                <tr>
                  <td className="p-3">Pension benefits</td>
                  <td className="p-3">Retiree welfare vs long-term liability</td>
                  <td className="p-3">Measured pension revision, not automatic OPS confirmation.</td>
                </tr>
                <tr>
                  <td className="p-3">Performance and productivity</td>
                  <td className="p-3">Efficiency of public expenditure</td>
                  <td className="p-3">More focus on accountability and progression rules.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-xl border border-yellow-200 bg-yellow-50 p-5 space-y-3">
          <h2 className="text-xl font-semibold text-yellow-950">What These Questions Do Not Mean</h2>
          <ul className="text-sm text-gray-800 space-y-2">
            <li>They do not confirm a final fitment factor.</li>
            <li>They do not guarantee OPS restoration.</li>
            <li>They do not mean every allowance will increase.</li>
            <li>They do not guarantee immediate implementation.</li>
            <li>They do not remove the role of fiscal constraints.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">What Outcomes Are Most Likely?</h2>
          <div className="grid sm:grid-cols-3 gap-3">
            <div className="rounded-xl border border-gray-200 p-4">
              <div className="text-xs text-gray-500">Salary</div>
              <div className="font-semibold text-gray-900 mt-1">Moderate fitment</div>
              <p className="text-xs text-gray-600 mt-1">Likely framed through DA merger, minimum pay and fiscal capacity.</p>
            </div>
            <div className="rounded-xl border border-gray-200 p-4">
              <div className="text-xs text-gray-500">Allowances</div>
              <div className="font-semibold text-gray-900 mt-1">Selective revision</div>
              <p className="text-xs text-gray-600 mt-1">More likely than universal expansion of every allowance.</p>
            </div>
            <div className="rounded-xl border border-gray-200 p-4">
              <div className="text-xs text-gray-500">Pension</div>
              <div className="font-semibold text-gray-900 mt-1">Careful adjustment</div>
              <p className="text-xs text-gray-600 mt-1">Pensioner concerns matter, but final design depends on liability.</p>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
          <h2 className="text-xl font-semibold text-emerald-950">Editorial Verdict</h2>
          <p className="text-sm text-emerald-950 leading-relaxed mt-2">
            The questionnaire suggests that the 8th CPC is likely thinking in systems:
            salary structure, affordability, pension sustainability, allowances and
            administrative efficiency. That points toward a carefully reasoned package,
            not a simple acceptance of the highest demand.
          </p>
        </section>

        <section className="rounded-xl border border-gray-200 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Translate Questions Into Salary Impact</h2>
            <p className="text-sm text-gray-600">Use the calculator to test how different fitment assumptions affect monthly salary.</p>
          </div>
          <Link href="/" className="inline-flex justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
            Open Calculator
          </Link>
        </section>
      </article>

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
