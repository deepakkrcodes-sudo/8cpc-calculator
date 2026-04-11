"use client";

export function generatePlanner(eligibility, conversion, carryForward) {
  if (!eligibility) return [];

  const plan = [];
  const currentYear = new Date().getFullYear();

  // =========================
  // 🔵 FIRST 8 YEARS
  // =========================
  // =========================
// 🔵 FIRST 8 YEARS (FIXED)
// =========================
if (eligibility.phase === "FIRST_8_YEARS") {
  const map = eligibility.eligibilityMap;

  return map.map((item) => ({
    year: item.year, // ✅ ACTUAL YEAR
    type: item.type,
    label:
      item.type === "HT"
        ? "Home Town LTC"
        : item.type === "AI"
        ? "All India LTC"
        : "Not Eligible",
    priority: item.type !== "NONE" ? "RECOMMENDED" : "NONE",
  }));
}

  // =========================
  // 🔴 BLOCK PERIOD
  // =========================
  const { currentBlock, isSameState } = eligibility;

  const subBlock1 = [currentBlock.start, currentBlock.start + 1];
  const subBlock2 = [currentBlock.start + 2, currentBlock.end];

  // =========================
  // SAME STATE → ONLY AI
  // =========================
  if (isSameState) {
    plan.push({
      year: `${subBlock1[0]}-${subBlock2[1]}`,
      type: "AI",
      label: "All India LTC (1 per 4 yr. block)",
    });

    return plan;
  }

  // =========================
  // DIFFERENT STATE → OPTIMAL PLAN
  // =========================

  // 🔥 Sub-block 1 → HT
  plan.push({
    year: subBlock1[0],
    type: "HT",
    label: "Home Town LTC (Sub-block 1)",
  });

  // 🔥 Sub-block 2 → AI
  plan.push({
    year: subBlock2[0],
    type: "AI",
    label: "All India LTC (Sub-block 2)",
  });

  // =========================
  // 🔥 CARRY FORWARD (TOP PRIORITY)
  // =========================
  if (carryForward?.status === "ACTIVE") {
    plan.unshift({
      year: currentBlock.start,
      type: carryForward.carryForwardType,
      label: "Carry Forward LTC (Use Immediately)",
      urgent: true,
    });
  }

  return plan;
}