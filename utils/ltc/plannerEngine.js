"use client";

export function generatePlanner(eligibility) {
  if (!eligibility) return [];

  const plan = [];
  const currentYear = new Date().getFullYear();

  // =========================
  // FIRST 8 YEARS
  // =========================
  if (eligibility.phase === "FIRST_8_YEARS") {
    eligibility.eligibilityMap.forEach((item, index) => {
      plan.push({
        year: currentYear - (eligibility.serviceYear - (index + 1)),
        type: item.type,
        label:
          item.type === "HT"
            ? "Home Town LTC"
            : item.type === "AI"
            ? "All India LTC"
            : "Not Eligible",
      });
    });

    return plan;
  }

  // =========================
  // BLOCK PERIOD
  // =========================
  const { currentBlock } = eligibility;

  for (let y = currentBlock.start; y <= currentBlock.end; y++) {
    let type = "HT";

    if (eligibility.isSameState) {
      type = "AI";
    } else if (y === currentBlock.end) {
      type = "AI";
    }

    plan.push({
      year: y,
      type,
      label:
        type === "HT"
          ? "Home Town LTC"
          : "All India LTC",
    });
  }

  // NEXT BLOCK PREVIEW
  const nextStart = currentBlock.end + 1;

  plan.push({
    year: nextStart,
    type: "AI",
    label: "Next Block Starts",
    highlight: true,
  });

  return plan;
}