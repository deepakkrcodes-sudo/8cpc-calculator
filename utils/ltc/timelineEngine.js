export function generateTimelineData({
  eligibility,
  conversion,
  carryForward,
  history
}) {
  if (!eligibility) return [];

  const currentYear = new Date().getFullYear();

  const result = [];

  // =========================
  // 🔵 FIRST 8 YEARS
  // =========================
  if (eligibility.phase === "FIRST_8_YEARS") {

    eligibility.eligibilityMap.forEach((item) => {

      const usedEntry = history.find(h => h.year === item.year);

      const used = usedEntry?.type || null;

      let allowed = [];
      if (item.type !== "NONE") {
        allowed = [item.type];
      }

      let action = "Optional";
      let priority = "OPTIONAL";

      if (!used && allowed.length > 0) {
        action = `Plan ${allowed[0]}`;
        priority = "RECOMMENDED";
      }

      result.push({
        year: item.year,
        subBlock: null,
        used,
        allowed,
        isCF: false,
        cfType: null,
        action,
        priority,
        isCurrent: item.year === currentYear,
      });
    });

    return result;
  }

  // =========================
  // 🔴 BLOCK PERIOD
  // =========================

  const { currentBlock, isSameState } = eligibility;

  const years = [];
  for (let y = currentBlock.start; y <= currentBlock.end; y++) {
    years.push(y);
  }

  const validCFYear = currentBlock.start;

  // track usage from history
  let AI_used = 0;
  let HT_SB1_used = 0;
  let HT_SB2_used = 0;

  const subBlock1End = currentBlock.start + 1;

  history.forEach((h) => {
    if (h.year < currentBlock.start || h.year > currentBlock.end) return;

    const isSB1 = h.year <= subBlock1End;

    if (h.type === "AI") AI_used++;

    if (h.type === "HT") {
      if (isSB1) HT_SB1_used++;
      else HT_SB2_used++;
    }

    if (h.type === "CONVERTED") {
      AI_used++;
    }
  });

  years.forEach((year) => {

    const isSB1 = year <= subBlock1End;
    const subBlock = isSB1 ? "SB1" : "SB2";

    const usedEntry = history.find(h => h.year === year);
    const used = usedEntry?.type || null;

    let allowed = [];

    // =========================
    // SAME STATE
    // =========================
    if (isSameState) {
      if (AI_used < 1 && !used) {
        allowed = ["AI"];
      }
    }

    // =========================
    // DIFFERENT STATE
    // =========================
    else {

      const sbUsed = isSB1 ? HT_SB1_used : HT_SB2_used;

      // HT allowed if sub-block not used
      if (sbUsed < 1 && !used) {
        allowed.push("HT");
      }

      // AI allowed if not used in block
      if (AI_used < 1 && !used) {
        allowed.push("AI");
      }
    }

    // =========================
    // CARRY FORWARD
    // =========================
    let isCF = false;
    let cfType = null;

    if (
      carryForward?.carryForwardAvailable &&
      year === validCFYear
    ) {
      isCF = true;
      cfType = carryForward.carryForwardType;
    }

    // =========================
    // ACTION + PRIORITY
    // =========================
    let action = "Optional";
    let priority = "OPTIONAL";

    if (used) {
      action = `Used ${used}`;
      priority = "DONE";
    }
    else if (isCF) {
      action = `Use CF (${cfType})`;
      priority = "CRITICAL";
    }
    else if (allowed.length > 0) {
      action = `Plan ${allowed.join("/")}`;
      priority = "RECOMMENDED";
    }
    else {
      action = "Not Allowed";
      priority = "NONE";
    }

    result.push({
      year,
      subBlock,
      used,
      allowed,
      isCF,
      cfType,
      action,
      priority,
      isCurrent: year === currentYear,
    });

  });

  return result;
}