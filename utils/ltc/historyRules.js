export function getAllowedOptions({
  year,
  rows,
  eligibility,
  isSameState
}) {
  if (!eligibility) return ["NONE"];

  const joiningYear = Number(eligibility?.joiningYear || 0);
  const serviceYear = year - joiningYear;

  // =========================
  // 🔵 FIRST 8 YEARS
  // =========================
  if (eligibility.phase === "FIRST_8_YEARS") {

  // 🔥 get current visible window years sorted
  const sortedYears = rows.map(r => r.year).sort((a, b) => a - b);

  // 🔥 position inside current 4-year window (1–4)
  const position = sortedYears.indexOf(year) + 1;

  // =========================
  // SAME STATE
  // =========================
  if (isSameState) {
    if (position === 4) {
      return ["NONE", "AI"];
    }
    return ["NONE"];
  }

  // =========================
  // DIFFERENT STATE
  // =========================

  // Year 1–3 → HT + CONVERTED
  if (position <= 3) {
    return ["NONE", "HT", "CONVERTED"];
  }

  // Year 4 → ONLY AI
  if (position === 4) {
    return ["NONE", "AI"];
  }

  return ["NONE"];
}

  // =========================
  // 🔴 BEYOND 8 YEARS (KEEP YOUR WORKING LOGIC)
  // =========================

  const currentBlock = eligibility.currentBlock;
  const subBlock1End = currentBlock.start + 1;

  let HT_sub1 = 0;
  let HT_sub2 = 0;
  let AI_used = 0;

  rows.forEach((r) => {
    if (r.type === "HT") {
      if (r.year <= subBlock1End) HT_sub1++;
      else HT_sub2++;
    }

    if (r.type === "AI") AI_used++;
  });

  const isSubBlock1 = year <= subBlock1End;

  // SAME STATE → only AI
  if (isSameState) {
    if (AI_used >= 1) return ["NONE"];
    return ["NONE", "AI"];
  }

  // DIFFERENT STATE

  if (isSubBlock1 && HT_sub1 >= 1) return ["NONE"];
  if (!isSubBlock1 && HT_sub2 >= 1) return ["NONE"];

  if (AI_used >= 1) {
    return ["NONE", "HT"];
  }

  return ["NONE", "HT", "AI"];
}