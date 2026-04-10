export function getEligibility(data) {
  const { doj, hometown, office } = data;

  if (!doj) return null;

  const currentYear = new Date().getFullYear();

  // DOJ is year
  const joiningYear = Number(doj);

  // completed service years
  const serviceYears = currentYear - joiningYear;

  const isSameState =
    hometown?.toLowerCase() === office?.toLowerCase();

  // =====================================================
  // 🔵 PHASE 1 — FIRST 8 YEARS
  // =====================================================
  if (serviceYears <= 8) {
    const phase = "FIRST_8_YEARS";

    const eligibilityMap = [];

    for (let i = 1; i <= serviceYears; i++) {
      let type = "NONE";

      if (isSameState) {
        // Only AI in 4th & 8th year
        if (i === 4 || i === 8) {
          type = "AI";
        }
      } else {
        // HT for 1–3, AI in 4
        if (i % 4 === 0) {
          type = "AI";
        } else {
          type = "HT";
        }
      }

      eligibilityMap.push({
        serviceYear: i,
        year: joiningYear + i, // 🔥 IMPORTANT
        type,
      });
    }

    return {
      phase,
      serviceYears,
      joiningYear,
      isSameState,
      eligibilityMap,
    };
  }

  // =====================================================
  // 🔴 PHASE 2 — BLOCK PERIOD
  // =====================================================
  const phase = "BLOCK_PERIOD";

  // dynamic block calculation
  const base =
    Math.floor((currentYear - 2018) / 4) * 4 + 2018;

  const currentBlock = {
    start: base,
    end: base + 3,
  };

  // sub-block split
  const subBlock1 = {
    start: currentBlock.start,
    end: currentBlock.start + 1,
  };

  const subBlock2 = {
    start: currentBlock.start + 2,
    end: currentBlock.end,
  };

  const subBlock =
    currentYear <= subBlock1.end
      ? "FIRST_SUB_BLOCK"
      : "SECOND_SUB_BLOCK";

  // eligibility rules
  const blockEligibility = isSameState
    ? {
        HT: 0,
        AI: 1,
        rule: "Only 1 AI allowed in block",
      }
    : {
        HT: 1, // per sub-block
        AI: 1,
        rule: "1 HT per sub-block + 1 AI per block",
      };

  return {
    phase,
    serviceYears,
    joiningYear,
    isSameState,

    currentBlock,
    subBlock,

    subBlocks: {
      SB1: subBlock1,
      SB2: subBlock2,
    },

    blockEligibility,
  };
}