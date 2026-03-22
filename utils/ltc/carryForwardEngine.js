export function applyCarryForward(data, conversionResult, eligibility) {
  const { history } = data;

  if (!history || !conversionResult || !eligibility) return null;

  // Only applies in BLOCK PERIOD
  if (eligibility.phase !== "BLOCK_PERIOD") {
    return {
      carryForwardAvailable: false,
      message: "Carry forward not applicable in first 8 years",
    };
  }

  const { currentBlock } = eligibility;

  let usedInBlock = 0;

  // =========================
  // COUNT USAGE IN CURRENT BLOCK
  // =========================
  history.forEach((row) => {
    if (
      row.year >= currentBlock.start &&
      row.year <= currentBlock.end &&
      row.type !== "NONE"
    ) {
      usedInBlock++;
    }
  });

  // =========================
  // TOTAL ENTITLEMENT
  // =========================
  let totalAllowed = 0;

  if (eligibility.isSameState) {
    totalAllowed = 1; // only AI
  } else {
    totalAllowed = 2; // 2 LTC in block (HT/AI flexible)
  }

  // =========================
  // UNUSED LTC
  // =========================
  let unused = totalAllowed - usedInBlock;

  if (unused < 0) unused = 0;

  // Only 1 can be carried
  let carryForwardAvailable = unused > 0;
  let carryForwardCount = carryForwardAvailable ? 1 : 0;

  // =========================
  // NEXT BLOCK CALCULATION
  // =========================
  const nextBlockStart = currentBlock.end + 1;
  const nextBlockEnd = nextBlockStart + 3;

  let canUseNextYear = false;
  let expiryYear = null;

  const currentYear = new Date().getFullYear();

  if (carryForwardAvailable) {
    canUseNextYear = true;
    expiryYear = nextBlockStart; // must use in first year
  }

  // =========================
  // DOUBLE LTC POSSIBILITY
  // =========================
  let doubleLTCYear = null;

  if (carryForwardAvailable) {
    doubleLTCYear = nextBlockStart;
  }

  return {
    carryForwardAvailable,
    carryForwardCount,

    unusedInBlock: unused,

    nextBlock: {
      start: nextBlockStart,
      end: nextBlockEnd,
    },

    usageRules: {
      canUseNextYear,
      expiryYear,
      doubleLTCYear,
    },

    suggestion: generateSuggestion({
      carryForwardAvailable,
      unused,
      currentBlock,
    }),
  };
}

function generateSuggestion({ carryForwardAvailable, unused, currentBlock }) {
  if (!carryForwardAvailable) {
    return "All LTC for this block already used.";
  }

  if (unused > 1) {
    return `You have ${unused} LTC remaining. Only 1 can be carried forward. Use before ${currentBlock.end}.`;
  }

  return `You can carry forward 1 LTC to next block. Use it in ${currentBlock.end + 1}.`;
}