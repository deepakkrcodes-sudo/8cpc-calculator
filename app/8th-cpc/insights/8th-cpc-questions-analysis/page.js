import Link from "next/link";
import FitmentProbabilityMeter from "@/components/blog/FitmentProbabilityMeter";

export const metadata = {
  title: "8th CPC Questions Decoded: Deep Analysis, Fitment Factor & What Govt May Decide",
  description:
    "In-depth editorial analysis of 8th CPC consultation questions with past trends, fitment factor prediction, CPI impact and fiscal reasoning.",
  alternates: {
    canonical: "https://8cpccalculator.com/blog/8th-cpc-questions-analysis"
  }
};

const questionsDeepDive = [
  {
    q: "Q1: Guiding Philosophy: Implementation of the recommendations of a Pay Commission has macroeconomics impacts. Some of these are positive in terms of boost to consumption and savings whilst others are negative in terms of the higher fiscal deficit, inflationary potential & crowding out of other expenditure such as for overall development & public welfare. Decisions in this regard involve choices. Based on current state of the economy & the country's aspirations, what should be the guiding philosophy which must underpin the overall approach of the 8th CPC?",
    analysis:
      "This is the most foundational question in the entire consultation. The Commission is not assuming that salary increase is the default objective. Instead, it is explicitly asking whether the guiding principle should be fiscal prudence, real wage growth, or a balanced approach. This reveals that the Commission is aware of competing priorities — economic growth, inflation control, and employee welfare — and is seeking justification for whichever path it takes.",
    reveal:
      "The inclusion of fiscal deficit, inflation, and crowding out of welfare expenditure clearly indicates that affordability is central to decision-making, not an afterthought.",
    impactExpectation:
      "The outcome is likely to be a balanced and fiscally cautious pay revision, not an aggressive one-time jump. Employees can expect increases to be justified through inflation protection, limited real wage improvement and affordability at scale, with the Commission framing every recommendation around economic sustainability."
  },
  {
    q: "Q2: Govt vs Private Pay Relativity : Pay determination in organisations including Government involves horizontal relativity i.e. for analogous posts across domains/cadres being placed in the same level/scale & vertical relativity i.e. on promotion, transition to a higher scale/band of pay. Relativity within different posts of Government has been broadly established over time. However, relativity/positioning between pay and perquisites in Government and the private sector is less established. How should the 8th CPC assess/evaluate relativity between pay & perquisites in Government and the public/private sector?",
    analysis:
      "This question highlights a long-standing challenge — comparing government salaries with private sector compensation. Government jobs include hidden benefits like job security, pension, housing and medical coverage, which are not directly comparable with private sector salaries. The Commission is trying to determine how these should be valued.",
    reveal:
      "The Commission is not convinced that direct salary comparison with the private sector is appropriate without adjusting for benefits.",
    impactExpectation:
      "If job security, pension support, medical cover and other benefits are valued strongly, the 8th CPC may avoid matching private-sector salaries directly. The likely expectation is a total-compensation approach where basic pay rises moderately, while the government argues that non-cash benefits already create meaningful value."
  },
  {
    q: "Q3: Uniform vs Sector-Based Pay : Should 8th CPC consider uniform horizontal relativity across all government departments, or should it consider sector-specific benchmarking where government functions are compared with their respective industry peers? For instance, should compensation for government engineers be benchmarked against private sector engineering firms, financial officers against the BFSI sector, and healthcare professionals against private healthcare? What would be the advantages and implementation considerations of such an approach?",
    analysis:
      "This question is extremely important because it challenges the uniform pay matrix introduced in the 7th CPC. The Commission is exploring whether engineers, scientists, defence personnel and administrators should be benchmarked separately against their respective industries.",
    reveal:
      "This indicates openness to breaking the ‘one-size-fits-all’ structure.",
    impactExpectation:
      "This could lead to selective improvement for specialized and talent-critical roles, while keeping general administrative increases controlled. The expectation should be partial differentiation, especially for engineers, scientists, healthcare, finance and other strategic cadres, rather than a complete break from the common pay matrix."
  },
  {
    q: "Q4: Valuation of Govt Job Benefits  : Security of tenure, a training regimen, housing, leave encashment, predictable increments, medical coverage, time-bound progression, inflation-indexed salary, retiral benefits are certain features associated with most jobs in Government. How should these be factored in while crafting a compensation matrix and relative positioning viz-a-vis the private sector?",
    analysis:
      "The Commission is trying to quantify non-monetary benefits such as job security, leave, pension and medical coverage. These benefits are often overlooked in salary comparisons but form a significant part of total compensation.",
    reveal:
      "The government may use these benefits to justify a lower increase in direct salary.",
    impactExpectation:
      "A higher valuation of government benefits will reduce pressure for a steep rise in basic pay. The likely outcome is that the 8th CPC may present government compensation as already competitive when job security, leave, healthcare, housing support and retirement benefits are counted, which would limit the case for aggressive pay hikes."
  },
  {
    q: "Q5: Impact on Informal Sector : Government employment is part of the organized sector. A far larger proportion of the job force is in the informal sector and the gig economy. What influence do you think entry level pay scales implemented by Government have on compensation practices in the informal or gig sector?",
    analysis:
      "This is an unconventional and insightful question. It suggests that government pay is seen as a benchmark that influences wages in the broader economy, especially in the informal and gig sectors.",
    reveal:
      "The Commission is thinking beyond government employees and considering macroeconomic labour market effects.",
    impactExpectation:
      "Entry-level pay should still rise, but the Commission may avoid a very high minimum pay that creates pressure across informal and gig labour markets. The practical expectation is a controlled increase that protects government employees' purchasing power without creating a wage benchmark the wider economy cannot absorb."
  },
  {
    q: "Q6: Fitment Factor : Salaries in Government have a distinct element of compensation for length of service (increment, usually annual), an element of neutralization for changes in cost of living/inflation (dearness allowance) & an element for higher responsibilities based on seniority/merit (pay scale on promotion). In that context, what do you think the fitment factor adopted by Pay Commissions should represent? What should such a fitment factor principally aim for?",
    analysis:
      "This is the most critical question for employees. Importantly, the Commission is not asking for a number but asking what the fitment factor should represent — inflation neutralisation, real wage growth or parity. This framing is deliberate and indicates that logic will decide the number.",
    reveal:
      "The Commission is designing a justification framework before deciding the multiplier.",
    impactExpectation:
      "This framing reduces the probability of a very high fitment factor because the multiplier must now be defended by logic, not headline demand. Based on present inflation, DA absorption and fiscal constraints, a realistic expectation remains a moderate fitment range around 1.92 to 2.28, with limited real growth added over inflation neutralisation.",
    impact:
      "This reduces the probability of a very high fitment factor.",
    expectation:
      "A range of 1.92–2.28 appears most realistic based on current conditions."
  },
  {
    q: "Q7: Apex Salary & Variable Pay : Salary of a Secretary in the Central Government typically represents the apex or the pinnacle i.e. the highest end of the scale. What should be the principle for determining this? Should there be a variable pay component for such position? ",
    analysis:
      "The mention of variable pay for top-level positions like Secretary is significant. It introduces the possibility of performance-linked compensation at senior levels.",
    reveal:
      "The Commission is open to structural reform, not just numerical revision.",
    impactExpectation:
      "The outcome may be a cautious introduction of performance-linked pay at senior levels rather than a major change for all employees. Expectations should stay modest: the Commission may use apex posts to test variable pay symbolically, while keeping most salary structure fixed and predictable.",
    impact:
      "Top salaries may include performance components instead of only fixed pay.",
    expectation:
      "Limited but symbolic introduction of variable pay at higher levels."
  },
  {
    q: "Q8: Attracting Talent (Group A): How can pay scales for all Group A Services be fixed so as to attract candidates of the requisite caliber? Should pay scales be more attractive at entry point or later, after a few years in service? What principles should guide such differentiation to ensure competitive positioning for talent-critical roles while maintaining fiscal prudence?",
    analysis:
      "The Commission is concerned that government jobs may not be attractive enough for high-caliber candidates compared to private sector opportunities.",
    reveal:
      "Retention and talent attraction are emerging concerns.",
    impactExpectation:
      "The 8th CPC may improve entry-level or early-career compensation for Group A and talent-critical services, but it is unlikely to translate into a universal hike for every cadre. The expectation is targeted strengthening where recruitment or retention pressure is real, balanced against fiscal prudence.",
    impact:
      "Entry-level or early-career pay may be improved selectively.",
    expectation:
      "Targeted increases rather than across-the-board hikes."
  },
  {
    q: "Q9: Increment Structure : How should rates and frequency of increments in respect of different scales of pay be determined? Should these be uniform or vary across scales/ time periods during service?",
    analysis:
      "Currently, increments are uniform (3%). This question opens the possibility of differentiated increments based on level or performance.",
    reveal:
      "Uniform progression may be reconsidered.",
    impactExpectation:
      "Future salary growth may become less uniform, especially at higher levels where responsibility and performance can be measured more clearly. Employees should expect the Commission to study increment reform seriously, though any shift away from the familiar 3% annual increment is likely to be gradual and carefully phased.",
    impact:
      "Future salary growth may vary more across employees.",
    expectation:
      "Increment reforms likely, especially for higher levels."
  },
  {
    q: "Q10: Allowances vs Cafeteria Approach : Over course of time, many allowances have been introduced or rationalized based on specific nature of work, expenses such as on travel, compensation for hardship/risk/peculiarities associated with place of posting etc. Most of these are partially inflation indexed. An alternative approach has been the Cafeteria Approach followed by Central Public Sector Enterprises (CPSEs), wherein except for a handful of allowances, executives choose from a set of perquisites & allowances, subject to an overall ceiling of basic pay. Which approach do you think is more appropriate for Central Government employees? ",
    analysis:
      "The cafeteria model allows employees to choose benefits within a fixed budget. This shifts from entitlement-based allowances to flexible compensation.",
    reveal:
      "Government is exploring cost control through flexibility.",
    impactExpectation:
      "Allowances are more likely to be reorganized than simply increased across the board. A partial cafeteria or hybrid model could emerge, giving employees some flexibility within a ceiling while helping the government control duplication, leakage and open-ended allowance growth.",
    impact:
      "Allowances may not increase uniformly and could be restructured.",
    expectation:
      "Partial adoption or hybrid model likely."
  },
  {
    q: "Q11: Pension Sustainability : The Seventh Pay Commission had assessed that in January, 2014, there were about 47 lakh serving Central Government personnel. This included CAPF, Railways & Defence forces. The number of pensioners was just short of 52 lakhs. In 2025-26, the number of Central Government personnel stands at about 50 lakhs, which the number of pensioners is almost 70 lakhs. The increase in the number of pensions has created additional demands on Government's Budget. What approaches could help to satisfy reasonable expectations of pensioners whilst keeping the fiscal impact within manageable limits?",
    analysis:
      "With pensioners increasing rapidly, this question highlights the growing fiscal burden. The Commission is balancing pensioner welfare with sustainability.",
    reveal:
      "Pension is a major constraint in decision-making.",
    impactExpectation:
      "Pensioners can expect a revision, but the outcome is likely to be moderated by the sharp rise in pension liability. The Commission may protect reasonable pensioner expectations while adding fiscal safeguards, which means large unfunded pension expansion or a simple return to costlier models looks unlikely.",
    impact:
      "Large pension increases may be avoided.",
    expectation:
      "Moderate revision with fiscal safeguards."
  },
  {
    q: "Q12: Hybrid DA Model : The Seventh Pay Commission was constituted in 2014 and implemented from 1.1.2016. The period since then has been marked by a lower trajectory of inflation, as compared to earlier decades. This is also reflected in the All-India Consumer Price Index (Industrial Workers) which is used for DA calculation. Should the 8th CPC explore a hybrid indexation approach that factors in both inflation protection and formal sector wage growth trends? What proportion might be reasonable for each component and what implementation considerations would arise? What are your expectations on inflation/CPI increase over the next 10 years?",
    analysis:
      "Linking DA to both inflation and wage growth would be a major structural change. It reduces the need for large periodic pay revisions.",
    reveal:
      "The Commission is thinking long-term, beyond just 8th CPC.",
    impactExpectation:
      "If a hybrid DA model is accepted, pay growth may become more gradual and continuous instead of depending heavily on large Pay Commission jumps. The expectation is that the idea will be explored seriously, but implementation may be cautious because changing DA indexation affects employees, pensioners and long-term budgeting.",
    impact:
      "Future pay growth may become more gradual and continuous.",
    expectation:
      "Exploration likely, implementation uncertain but possible."
  },
  {
    q: "Q13: Railways, CAPF, Defence : Railways, CAPF and Defence forces typically account for about 70% of Central Government personnel. What particular considerations, monetary or nonmonetary should be factored in while determining their pay & allowances?",
    analysis:
      "These sectors have unique working conditions and risks. The Commission is evaluating whether they need special compensation structures.",
    reveal:
      "Uniform pay approach may be reconsidered.",
    impactExpectation:
      "Railways, CAPF and Defence may receive selective allowance or benefit improvements because their working conditions, risk and deployment patterns differ from ordinary civil posts. The expectation is not a uniform raise for everyone, but targeted enhancements where hardship, mobility, safety and operational demands justify them.",
    impact:
      "Higher allowances or benefits for these sectors.",
    expectation:
      "Selective enhancements rather than uniform changes."
  },
  {
    q: "Q14: Scientists Pay : Scientists work in certain specialized streams/departments such as Department of Space, Department of Atomic Energy etc. What should be appropriate benchmarks to be kept in mind for fixing their emoluments?",
    analysis:
      "The government struggles to compete with private sector and global institutions for scientific talent.",
    reveal:
      "Talent retention is a strategic priority.",
    impactExpectation:
      "Scientific and strategic technical roles may receive better incentives, special pay arrangements or faster progression to prevent talent loss. The likely expectation is improved compensation for scientists, but focused on retention and national capability rather than a broad salary reset for all categories.",
    impact:
      "Special pay structures or incentives may be introduced.",
    expectation:
      "Improved compensation for scientific roles."
  },
  {
    q: "Q15: Military Pay Structure : Military Service Pay is currently admissible to personnel of Armed Forces. This was in recognition of the special nature of their duties. In that context and given the changing nature of their jobs, how should the pay of soldiers, sailors and air force personnel be determined? How should it relate to the starting salary in Government or the pay of a constable in CAPFI Police?",
    analysis:
      "This question addresses long-standing parity issues between armed forces and CAPF.",
    reveal:
      "The Commission is aware of existing dissatisfaction.",
    impactExpectation:
      "The 8th CPC may adjust Military Service Pay or relative starting-pay structures, but it will need to balance armed forces, CAPF and civilian comparators carefully. Employees should expect calibrated corrections that address military hardship and parity concerns without creating fresh inter-service conflict.",
    impact:
      "Adjustments in MSP or relative pay structures.",
    expectation:
      "Careful balancing to avoid inter-service conflict."
  },
  {
    q: "Q16: Defence Pension Burden : The nation has many more military pensioners than serving military personnel. In 2025-26, outgo on Defence Pensions is likely to be higher than the outgo on Defence salary and allowances. As overall defence pension bill increases, in line with projections, impact will be visible on equipment and arms purchase, their maintenance and on modernization of defence forces. What changes would you recommend to contain increases in defence manpower costs and its pension bill?",
    analysis:
      "Defence pensions are consuming a large portion of the budget. The Commission is exploring ways to control this growth.",
    reveal:
      "Fiscal pressure is extremely high in defence pensions.",
    impactExpectation:
      "Defence pension pressure makes structural reform more likely than benefit expansion. The expected direction is containment through manpower planning, tenure design, pension-cost management and possibly new service models, because unchecked pension growth can crowd out modernization and equipment spending.",
    impact:
      "Structural reforms possible.",
    expectation:
      "Containment strategies rather than expansion."
  },
  {
    q: "Q17: Bonus Reform : Productivity Linked Bonus (PLB) is paid to some employees of Government such as Railways, Postal staff whilst Non-Productivity Linked Bonus is given to specified Central Government employees including some in Armed Forces. How can the Bonus structure be reimagined for rewarding excellence in productivity & performance? Should PLB/ Ad-hoc Bonus continue to be given on uniform basis (e.g. 60 days of salary for all) or be differentiated, based on individual performance?",
    analysis:
      "Current bonus systems are largely uniform. The Commission is questioning their effectiveness in rewarding productivity.",
    reveal:
      "Shift toward performance-linked incentives.",
    impactExpectation:
      "Bonus payments may gradually become more differentiated instead of remaining fully uniform. The likely outcome is a slow move toward productivity and performance-linked bonus design, though implementation will probably be cautious because measuring individual performance across government functions is difficult.",
    impact:
      "Bonus may become differentiated.",
    expectation:
      "Gradual move toward performance-based bonus."
  },
  {
    q: "Q18: Lateral Entry & Flexibility : Contractual appointments in the form of lateral entry have been tried during the last few years. Do you think this should be expanded and other practices such as part-time work, flexi time etc. be introduced in Government at middle/ higher levels to tap a bigger talent pool? What could be the pros and cons of doing so?",
    analysis:
      "This is a forward-looking reform question. It suggests the government is considering a more flexible workforce model.",
    reveal:
      "Traditional lifetime employment model may evolve.",
    impactExpectation:
      "The government may expand lateral entry and flexible work practices at middle and senior levels, creating more competition and a wider talent pool within the system. The expectation is gradual expansion, not a sudden replacement of regular service structures, with safeguards needed for accountability, neutrality and institutional continuity.",
    impact:
      "New hiring practices and competition within system.",
    expectation:
      "Gradual expansion of lateral entry."
  }
];

const questionThemes = [
  {
    theme: "Pay Philosophy",
    signal:
      "The Commission is not assuming salary increase as default. It is questioning the guiding philosophy itself—whether fiscal prudence or real wage growth should dominate.",
    outcome:
      "Final recommendations are likely to be balanced and fiscally contained rather than aggressive, with justification rooted in macroeconomic conditions."
  },
  {
    theme: "Fitment Factor",
    signal:
      "The question is framed around what the fitment factor should represent, not what number it should be. This signals that the Commission is deciding the logic before the number.",
    outcome:
      "Fitment is likely to align with inflation neutralisation plus limited real growth, rather than a large structural jump like 7th CPC."
  },
  {
    theme: "Allowances",
    signal:
      "Questions around cafeteria approach and rationalisation indicate concern about duplication, inefficiency and fiscal leakage.",
    outcome:
      "Allowances may be simplified, merged or partially made flexible rather than universally increased."
  },
  {
    theme: "Pension",
    signal:
      "Explicit mention of fiscal limits and rising pensioners shows that pension is a major budget constraint.",
    outcome:
      "Pension revision is likely but carefully calibrated. Structural changes possible, but OPS restoration is unlikely."
  },
  {
    theme: "Performance",
    signal:
      "Questions on productivity, bonus redesign and variable pay suggest the Commission is exploring linking pay to outcomes.",
    outcome:
      "Increment structure and bonus system may see reforms introducing differentiation based on performance."
  },
  {
    theme: "Fiscal Reality",
    signal:
      "Repeated emphasis on cost, sustainability and macroeconomic impact shows affordability is central.",
    outcome:
      "Even justified salary increases may be moderated due to large-scale financial implications."
  }
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the most probable fitment factor in 8th CPC?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Based on past trends, inflation levels and fiscal constraints, the most probable fitment factor lies in the range of 1.92 to 2.28. A lower value reflects inflation neutralisation, while the higher range includes modest real wage growth. Extremely high values like 2.57 are less likely in current conditions."
      }
    },
    {
      "@type": "Question",
      name: "Why is the government expected to be conservative this time?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "The number of pensioners has significantly increased, and even small changes in salary structure result in massive recurring expenditure. Additionally, the government must balance salary increases with capital expenditure, infrastructure development and fiscal deficit targets."
      }
    },
    {
      "@type": "Question",
      name: "How do past pay commissions influence 8th CPC decisions?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Past commissions provide a benchmark. The 6th CPC had a fitment of about 1.86, while the 7th CPC moved to 2.57 due to high inflation and structural corrections. Since the current decade has seen lower inflation, a similar jump is unlikely, and the 8th CPC is expected to focus on calibration rather than correction."
      }
    },
    {
      "@type": "Question",
      name: "Will 8th CPC increase salary significantly?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Salary will increase, but likely in a moderate and structured manner. The focus is expected to be on maintaining real purchasing power rather than delivering a large windfall increase. Any increase will be justified through economic and fiscal reasoning."
      }
    },
    {
      "@type": "Question",
      name: "What role does inflation play in pay revision?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Inflation is already compensated through Dearness Allowance, which is periodically revised. Therefore, the pay commission does not need to fully account for inflation again, reducing the pressure for large jumps in basic pay."
      }
    },
    {
      "@type": "Question",
      name: "Will allowances increase significantly?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "The trend suggests rationalisation rather than expansion. The Commission is evaluating whether a cafeteria approach or streamlined allowance system would be more efficient, which may reduce unnecessary components while improving flexibility."
      }
    },
    {
      "@type": "Question",
      name: "Is OPS restoration likely?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "There is no indication in the questions that the Old Pension Scheme will be restored. The focus is on balancing pension benefits with long-term fiscal sustainability."
      }
    },
    {
      "@type": "Question",
      name: "What is hybrid DA indexation?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Hybrid indexation refers to combining inflation (CPI) with wage growth trends. This would ensure that salaries remain competitive with the broader economy, not just protected against inflation."
      }
    },
    {
      "@type": "Question",
      name: "Why are fitment factor predictions different across experts?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Different assumptions are used—some focus only on inflation, while others include real wage growth or parity with private sector. The final value depends on which philosophy the Commission adopts."
      }
    },
    {
      "@type": "Question",
      name: "When will 8th CPC be implemented?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Typically, Pay Commissions take about 18 months to submit their report. Implementation may follow after government approval, so timelines can extend depending on administrative and political decisions."
      }
    }
  ]
};

export default function QuestionsAnalysisPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* HERO */}
      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="relative h-56 sm:h-72">
          <img
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1400"
            alt="Consultation meeting"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
          <div className="absolute bottom-0 p-5 text-white">
            <h1 className="text-2xl sm:text-4xl font-semibold">
              8th CPC Questions Decoded: Deep Analysis & What Govt May Actually Do
            </h1>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="bg-white rounded-2xl border p-6 space-y-4">
        <h2 className="text-xl font-semibold">Why These Questions Matter</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          A Pay Commission questionnaire is not just a feedback exercise—it is a strategic document that reveals the direction of thinking before recommendations are finalized. Each question reflects a policy dilemma the government is trying to solve, whether it is balancing salary growth with fiscal sustainability, or aligning public sector compensation with private benchmarks.
        </p>
        <p className="text-sm text-gray-700 leading-relaxed">
          The 8th CPC questions go a step further than previous commissions. They are structured, targeted and economically grounded, indicating that the Commission is not merely revising salaries but reconsidering the entire compensation framework. This makes decoding these questions extremely valuable for predicting outcomes.
        </p>
      </section>

      {/* PAST TREND */}
      <section className="bg-white rounded-2xl border p-6 space-y-4">
        <h2 className="text-xl font-semibold">Past Trends: What Data Tells Us</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          Historically, Pay Commissions have adjusted salaries based on inflation, structural corrections and economic conditions. The 6th CPC introduced a fitment factor of around 1.86 during a high inflation period. The 7th CPC increased this to 2.57, reflecting both inflation neutralisation and structural pay correction.
        </p>
        <p className="text-sm text-gray-700 leading-relaxed">
          However, the current decade presents a different picture. Inflation has been relatively stable, and Dearness Allowance already compensates employees regularly. This means the 8th CPC is less about correcting past distortions and more about fine-tuning the system. Therefore, expecting a similar jump as 7th CPC may not align with economic reality.
        </p>
      </section>

      {/* THEMES }
      <section className="grid sm:grid-cols-2 gap-4">
        {questionThemes.map((item) => (
          <div key={item.theme} className="border p-4 rounded-xl">
            <h3 className="font-semibold">{item.theme}</h3>
            <p className="text-sm mt-2 text-gray-700">{item.signal}</p>
            <p className="text-sm mt-2 text-gray-600">{item.outcome}</p>
          </div>
        ))}
      </section>*/}

      {/* PREDICTION */}



      <section className="grid sm:grid-cols-1 gap-4">
        {questionsDeepDive.map((item) => (
          <div key={item.q} className="rounded-xl border border-gray-200 p-5 shadow-sm space-y-3">
            <h3 className="font-semibold text-gray-900">{item.q}</h3>

            <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-3">
              <div className="text-xs font-semibold text-indigo-700">Decoding Commission's Focus</div>
              <p className="text-sm text-gray-700 mt-1 leading-relaxed">
                {item.analysis} {item.reveal}
              </p>
            </div>

            <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-3">
              <div className="text-xs font-semibold text-emerald-700">
                Impact on 8cpc outcome & expectation
              </div>
              <p className="text-sm text-gray-700 mt-1 leading-relaxed">{item.impactExpectation}</p>
            </div>
          </div>
        ))}
      </section>

      <FitmentProbabilityMeter />

      <section className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 space-y-3">
        <h2 className="text-xl font-semibold">Most Probable Outcome</h2>
        <p className="text-sm text-gray-800 leading-relaxed">
          Based on economic conditions, past trends and fiscal constraints, the most realistic outcome is a moderate fitment factor. A range of 1.92 to 2.28 appears highly probable, where the lower end reflects inflation neutralisation and the upper end includes limited real wage growth.
        </p>
        <p className="text-sm text-gray-800 leading-relaxed">
          The government is likely to adopt a conservative approach because even a small increase in fitment factor translates into massive recurring expenditure when applied across millions of employees and pensioners. Therefore, affordability at scale becomes the decisive factor.
        </p>
      </section>

      {/* VERDICT */}
      <section className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
        <h2 className="text-xl font-semibold">Editorial Verdict</h2>
        <p className="text-sm text-gray-800 leading-relaxed mt-2">
          The 8th CPC is unlikely to deliver an aggressive pay hike. Instead, it is shaping towards a carefully justified and fiscally sustainable revision. The emphasis will be on maintaining purchasing power, improving structural efficiency and ensuring long-term sustainability rather than offering a headline-grabbing increase.
        </p>
      </section>

      {/* CTA */}
      <section className="flex justify-between items-center border rounded-xl p-4">
        <div>
          <h3 className="font-semibold">Check Your Salary Impact</h3>
          <p className="text-sm text-gray-600">Use calculator to test fitment scenarios</p>
        </div>
        <Link href="/" className="bg-indigo-600 text-white px-4 py-2 rounded-lg">
          Open Calculator
        </Link>
      </section>

      {/* FAQ */}
      <section className="bg-white border rounded-2xl p-6 space-y-4">
        <h2 className="text-xl font-semibold">FAQs</h2>
        {faqSchema.mainEntity.map((faq) => (
          <div key={faq.name}>
            <h3 className="font-semibold text-sm">{faq.name}</h3>
            <p className="text-sm text-gray-700 mt-1">{faq.acceptedAnswer.text}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
