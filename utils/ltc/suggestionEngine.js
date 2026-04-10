export function generateSuggestion({
  eligibility,
  conversion,
  carryForward,
}) {
  if (!eligibility || !conversion) return null;

  const homeTown = conversion.remaining?.homeTown ?? 0;
  const allIndia = conversion.remaining?.allIndia ?? 0;

  const phase = eligibility.phase;
  const isSameState = eligibility.isSameState;

  const carryStatus = carryForward?.status;
  const carryType = carryForward?.carryForwardType;
  const carryYear = carryForward?.rules?.validOnlyInYear;

  // =========================
  // 🚨 PRIORITY 1 — CARRY FORWARD
  // =========================
  if (carryStatus === "ACTIVE") {
    return {
      type: "CARRY_FORWARD",
      message: `You have a carry forward (${carryType}) LTC.`,
      advice: `Use it in ${carryYear} or it will lapse.`,
      urgent: true,
    };
  }

  if (carryStatus === "LAPSED") {
    return {
      type: "CARRY_LAPSED",
      message: `Your carry forward LTC (${carryType}) has lapsed.`,
      advice: "Plan your LTC better in current block.",
      urgent: false,
    };
  }

  // =========================
  // 🎯 PRIORITY 2 — BOTH AVAILABLE
  // =========================
  if (homeTown > 0 && allIndia > 0) {
    return {
      type: "PLAN_BOTH",
      message: `You have ${homeTown} Home Town and ${allIndia} All India LTC remaining.`,
      advice:
        phase === "FIRST_8_YEARS"
          ? "Use Home Town in early years and All India in the 4th year."
          : "Plan one LTC in each sub-block for maximum benefit.",
    };
  }

  // =========================
  // 🎯 PRIORITY 3 — ONLY HT
  // =========================
  if (homeTown > 0) {
    return {
      type: "PLAN_HT",
      message: `You have ${homeTown} Home Town LTC remaining.`,
      advice:
        phase === "FIRST_8_YEARS"
          ? "Use it before completing 4-year cycle or it will lapse."
          : "Use it in the correct sub-block to avoid loss.",
    };
  }

  // =========================
  // 🎯 PRIORITY 4 — ONLY AI
  // =========================
  if (allIndia > 0) {
    return {
      type: "PLAN_AI",
      message: `You have ${allIndia} All India LTC remaining.`,
      advice:
        phase === "FIRST_8_YEARS"
          ? "Best used in the 4th year for long-distance travel."
          : "Plan strategically as only one AI is allowed per block.",
    };
  }

  // =========================
  // 🎯 PRIORITY 5 — COMPLETED
  // =========================
  return {
    type: "COMPLETED",
    message: "You have utilized all LTC benefits for this period.",
    next:
      phase === "BLOCK_PERIOD"
        ? `Next block starts ${eligibility.currentBlock.start + 4}`
        : "Next eligibility will arise in upcoming years.",
  };
}