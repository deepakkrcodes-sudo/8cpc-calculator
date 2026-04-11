export const FAQ_DATA = [

/* ================= FAMILY ================= */
{
  category: "FAMILY",
  title: "Family & Eligibility",
  icon: "👨‍👩‍👧",
  faqs: [
    {
      q: "Who is included in family for LTC?",
      a: "Family includes spouse, up to 2 children, dependent parents, and dependent siblings. Step children and adopted children are also included. Some special cases like widowed or divorced daughters may also be covered if dependent.",
      tags: ["important", "basic"]
    },
    {
      q: "Are parents-in-law eligible for LTC?",
      a: "No. Parents-in-law are NOT included in LTC family definition.",
      tags: ["most-asked"]
    },
    {
      q: "What is dependency condition in LTC?",
      a: "A family member is considered dependent if their income is less than minimum pension (₹9000 + DA). This condition does NOT apply to spouse.",
      tags: ["important"]
    },
    {
      q: "Can family travel without employee?",
      a: "Yes. Family members can travel separately, even at different times and destinations.",
      tags: ["most-asked"]
    },
    {
      q: "Can unmarried son/daughter above 25 years claim LTC?",
      a: "Yes, if they are unmarried and financially dependent on the employee.",
    },
    {
      q: "Can husband and wife both claim LTC?",
      a: "Yes, if both are government employees, but double claim for same journey is not allowed.",
    },
  ],
},

/* ================= BLOCK ================= */
{
  category: "BLOCK",
  title: "Block Year & Eligibility",
  icon: "📅",
  faqs: [
    {
      q: "What is LTC block period?",
      a: "LTC is given in 4-year blocks (example: 2022–2025). You can take LTC based on this cycle.",
      tags: ["important"]
    },
    {
      q: "What are sub-blocks in LTC?",
      a: "Each 4-year block is divided into 2 parts: first 2 years and next 2 years. You can take one LTC in each.",
    },
    {
      q: "If Home Town and HQ are same?",
      a: "You cannot take Home Town LTC. You can only take All India LTC.",
      tags: ["edge-case"]
    },
    {
      q: "Can I take 2 LTC in same year?",
      a: "Yes. If one LTC is carried forward from previous block, you can take 2 LTC in same year.",
      tags: ["important"]
    },
    {
      q: "Can LTC be extended?",
      a: "Yes. Block and sub-block can be extended by 1 year automatically.",
    },
  ],
},

/* ================= NEW RECRUIT ================= */
{
  category: "NEW_RECRUIT",
  title: "New Employees (First 8 Years)",
  icon: "🟢",
  faqs: [
    {
      q: "When does LTC eligibility start?",
      a: "After completing 1 year of service. Joining year is not counted.",
      tags: ["important"]
    },
    {
      q: "How many LTC are allowed in first 8 years?",
      a: "Total 8 LTC: 6 Home Town + 2 All India (4th and 8th year).",
      tags: ["most-asked"]
    },
    {
      q: "Can unused LTC be carried forward for new recruits?",
      a: "No. LTC lapses if not used in that year.",
      tags: ["important"]
    },
    {
      q: "Do fresh recruits follow normal block system?",
      a: "No. First 8 years are personal cycle. After that normal block system applies.",
    },
    {
      q: "If Home Town = HQ for new recruit?",
      a: "Home Town LTC is not allowed. Only All India LTC is allowed.",
    },
  ],
},

/* ================= TRAVEL ================= */
{
  category: "TRAVEL",
  title: "Travel Rules & Reimbursement",
  icon: "✈️",
  faqs: [
    {
      q: "Can I travel by taxi in LTC?",
      a: "Taxi is allowed only where public transport is not available. Otherwise not allowed.",
      tags: ["important"]
    },
    {
      q: "Is personal car allowed in LTC?",
      a: "Only in special cases like disability. Otherwise reimbursement is limited.",
    },
    {
      q: "Are local travel expenses covered?",
      a: "No. Taxi/auto from home to station/airport is NOT reimbursed.",
      tags: ["most-asked"]
    },
    {
      q: "Are food and hotel charges covered?",
      a: "No. LTC only covers travel fare, not hotel or food expenses.",
    },
    {
      q: "Are premium trains like Vande Bharat allowed?",
      a: "Yes. Trains like Vande Bharat, Tejas, Humsafar are allowed as per entitlement.",
    },
    {
      q: "Can I book tour packages?",
      a: "Private tour packages are NOT allowed. Only ITDC, IRCTC, or government tours are allowed (fare part only).",
    },
  ],
},

/* ================= AIR ================= */
{
  category: "AIR",
  title: "Air Travel Rules",
  icon: "🛫",
  faqs: [
    {
      q: "Who can travel by air in LTC?",
      a: "Pay Level 10 and above can travel by air. Others can use special schemes.",
      tags: ["most-asked"]
    },
    {
      q: "Where should I book flight tickets?",
      a: "Only through authorized agents: Balmer Lawrie, Ashok Travels, IRCTC.",
      tags: ["important"]
    },
    {
      q: "Is LTC-80 fare available?",
      a: "No. LTC-80 scheme is discontinued.",
    },
    {
      q: "Can I take cheapest flight?",
      a: "Yes. You must book cheapest or near cheapest fare (within allowed range).",
    },
    {
      q: "Is break journey allowed in air travel?",
      a: "No. You cannot stop in between except for connecting flights.",
    },
  ],
},

/* ================= SPECIAL SCHEME ================= */
{
  category: "SPECIAL",
  title: "Special LTC (NER, J&K, Andaman)",
  icon: "🏔️",
  faqs: [
    {
      q: "What is special LTC scheme?",
      a: "Government allows air travel for all employees to NER, J&K, Ladakh, Andaman.",
      tags: ["important"]
    },
    {
      q: "Till when is this scheme valid?",
      a: "Currently extended till 25 September 2026.",
    },
    {
      q: "Can non-air eligible employees travel by flight?",
      a: "Yes. Under this scheme, even lower pay levels can travel by air.",
    },
    {
      q: "Is Lakshadweep included?",
      a: "No. Lakshadweep is not included in this scheme.",
    },
  ],
},

/* ================= CLAIM ================= */
{
  category: "CLAIM",
  title: "Claim & Reimbursement",
  icon: "📄",
  faqs: [
    {
      q: "When should I submit LTC claim?",
      a: "Within 3 months after journey completion.",
      tags: ["important"]
    },
    {
      q: "What if I delay claim?",
      a: "It may be rejected. Some relaxation up to 6 months is possible with approval.",
    },
    {
      q: "Can I get leave encashment without travel?",
      a: "Yes, if you declare travel and follow rules properly.",
    },
    {
      q: "Can I claim LTC during suspension?",
      a: "No. Employee cannot claim, but family can travel.",
    },
  ],
},

];