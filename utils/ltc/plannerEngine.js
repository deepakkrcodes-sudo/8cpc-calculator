"use client";

export function generatePlanner(eligibility, conversion, carryForward) {
  if (!eligibility) return [];

  const plan = [];
  const currentYear = new Date().getFullYear();

  // =========================
  // 🔵 FIRST 8 YEARS
  // =========================
  if (eligibility.phase === "FIRST_8_YEARS") {
    const joiningYear = eligibility.joiningYear;

    for (let i = 1; i <= 4; i++) {
      const year = joiningYear + i;

      let type = "NONE";

      if (eligibility.isSameState) {
        if (i === 4) type = "AI";
      } else {
        if (i < 4) type = "HT";
        if (i === 4) type = "AI";
      }

      plan.push({
        year,
        type,
        label:
          type === "HT"
            ? "Home Town LTC"
            : type === "AI"
            ? "All India LTC"
            : "Not Eligible",
      });
    }

    return plan;
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
      year: subBlock1[0],
      type: "AI",
      label: "All India LTC (Best Year)",
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