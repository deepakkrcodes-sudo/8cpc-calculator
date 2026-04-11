export function applyConversion(data, eligibility) {
  const { history, hometown, office, currentWindow } = data;

  if (!history || !eligibility || !currentWindow) return null;

  const isSameState =
    hometown?.toLowerCase() === office?.toLowerCase();

  // =========================
  // FILTER CURRENT WINDOW
  // =========================
  const currentHistory = history.filter(
    (row) =>
      row.year >= currentWindow.start &&
      row.year <= currentWindow.end
  );

  // =========================
  // TRACK LAPSED
  // =========================
  const lapsedCount = history.filter(
    (row) =>
      row.year < currentWindow.start &&
      row.type === "NONE"
  ).length;

  // =====================================================
  // 🔷 FIRST 8 YEARS
  // =====================================================
  if (eligibility.phase === "FIRST_8_YEARS") {
    let HT_used = 0;
    let AI_used = 0;
    let conversionUsed = 0;

    currentHistory.forEach((row) => {
      if (row.type === "HT") HT_used++;

      if (row.type === "AI") AI_used++;

      if (row.type === "CONVERTED") {
        conversionUsed++;

        // ✅ ONLY consume HT
        HT_used++;
      }
    });

   

    const maxHT = isSameState ? 0 : 3;
    const maxAI = 1;

    return {
      remaining: {
        homeTown: Math.max(maxHT - HT_used, 0),
        allIndia: Math.max(maxAI - AI_used, 0),
      },

      usage: {
        HT_used,
        AI_used,
        conversionUsed,
      },

      limits: {
        maxHT,
        maxAI,
        maxConversion: 1,
      },

      lapsedCount,
    };
  }

  // =====================================================
  // 🔷 BLOCK PERIOD (> 8 YEARS)
  // =====================================================

  // =====================================================
  // 🔷 BLOCK PERIOD (> 8 YEARS)
  // =====================================================

  const { currentBlock } = eligibility;
  const subBlock1End = currentBlock.start + 1;

  let HT_SB1 = 0;
  let HT_SB2 = 0;
  let AI_used = 0;
  let conversionUsed = 0;

  currentHistory.forEach((row) => {
    const isSB1 = row.year <= subBlock1End;

    if (row.type === "HT") {
      if (isSB1) HT_SB1++;
      else HT_SB2++;
    }

    if (row.type === "AI") {
      AI_used++;
    }

    if (row.type === "CONVERTED") {
      conversionUsed++;
      HT_used++; // conversion behaves like AI

      // consume HT from same sub-block
      if (isSB1) HT_SB1 = Math.max(HT_SB1 - 1, 0);
      else HT_SB2 = Math.max(HT_SB2 - 1, 0);
    }
  });

  // =========================
  // 🔥 CORE FIX: BLOCK-BASED LIMIT
  // =========================

  // SAME STATE → only 1 LTC (AI only)
  const maxTotal = isSameState ? 1 : 2;

  // total used in block
  const totalUsed = HT_SB1 + HT_SB2 + AI_used;

  // remaining total LTC in block
  const remainingTotal = Math.max(maxTotal - totalUsed, 0);

  // =========================
  // 🔥 CORRECT REMAINING LOGIC
  // =========================

  let HT_remaining = 0;
  let AI_remaining = 0;

  // =========================
  // SAME STATE
  // =========================
  if (isSameState) {

    // only 1 AI per block
    AI_remaining = AI_used >= 1 ? 0 : 1;

    HT_remaining = 0;
  }

  // =========================
  // OTHER STATE
  // =========================
  else {

    // 🔥 AI: only 1 per block
    AI_remaining = AI_used >= 1 ? 0 : 1;

    // 🔥 check sub-block availability
    let SB1_free = HT_SB1 === 0 && !(AI_used > 0 && HT_SB1 === 0);
    let SB2_free = HT_SB2 === 0;

    let HT_possible = 0;

    if (SB1_free) HT_possible++;
    if (SB2_free) HT_possible++;

    // limit by total remaining
    HT_remaining = Math.min(HT_possible, remainingTotal);

    // 🔥 if AI already used → cannot allow again
    if (AI_used >= 1) {
      AI_remaining = 0;
    }

    // 🔥 ensure total constraint
    if (HT_remaining + AI_remaining > remainingTotal) {
      if (AI_remaining === 1) {
        HT_remaining = remainingTotal - 1;
      } else {
        HT_remaining = remainingTotal;
      }
    }
  }

  // =========================
  // SUB-BLOCK REMAINING (keep your feature intact)
  // =========================
  const maxHT_perSB = isSameState ? 0 : 1;

  const SB1_remaining = Math.max(maxHT_perSB - HT_SB1, 0);
  const SB2_remaining = Math.max(maxHT_perSB - HT_SB2, 0);

  // =========================
  // RETURN
  // =========================
  return {
    remaining: {
      homeTown: HT_remaining,
      allIndia: AI_remaining,
      total: remainingTotal, // 🔥 NEW (important for suggestion engine)
    },

    usage: {
      HT_SB1_used: HT_SB1,
      HT_SB2_used: HT_SB2,
      AI_used,
      conversionUsed,
      totalUsed, // 🔥 NEW (debug + UI)
    },

    limits: {
      totalAllowed: maxTotal, // 🔥 NEW
      HT_per_subBlock: maxHT_perSB,
      AI: 1,
      maxConversion: 1,
    },

    subBlock: {
      SB1_remaining,
      SB2_remaining,
    },

    lapsedCount,
  };
}