export function getEligibility(data) {
  const { doj, hometown, office } = data;

  if (!doj) return null;

  const currentYear = new Date().getFullYear();
  const joiningYear = new Date(doj).getFullYear();

  // Joining year NOT counted
  const serviceYear = currentYear - joiningYear;

  const isSameState =
    hometown?.toLowerCase() === office?.toLowerCase();

  let phase = "";
  let eligibilityMap = [];

  // =========================
  // PHASE 1: FIRST 8 YEARS
  // =========================
  if (serviceYear <= 8) {
    phase = "FIRST_8_YEARS";

    if (isSameState) {
      // Only All India in 4th & 8th year
      for (let i = 1; i <= serviceYear; i++) {
        let type = "NONE";

        if (i === 4 || i === 8) {
          type = "AI";
        }

        eligibilityMap.push({
          serviceYear: i,
          type,
        });
      }
    } else {
      // HT for 1-3, AI in 4, repeat
      for (let i = 1; i <= serviceYear; i++) {
        let type = "HT";

        if (i % 4 === 0) {
          type = "AI";
        }

        eligibilityMap.push({
          serviceYear: i,
          type,
        });
      }
    }

    return {
      phase,
      serviceYear,
      isSameState,
      eligibilityMap,
    };
  }

  // =========================
  // PHASE 2: BLOCK PERIOD
  // =========================
  phase = "BLOCK_PERIOD";

  // Block calculation
  const blocks = [
    { start: 2018, end: 2021 },
    { start: 2022, end: 2025 },
    { start: 2026, end: 2029 },
    { start: 2030, end: 2033 },
  ];

  let currentBlock = null;

  for (let block of blocks) {
    if (currentYear >= block.start && currentYear <= block.end) {
      currentBlock = block;
      break;
    }
  }

  // Fallback (future-safe)
  if (!currentBlock) {
    const base = Math.floor((currentYear - 2018) / 4) * 4 + 2018;
    currentBlock = { start: base, end: base + 3 };
  }

  // Sub-block logic
  let subBlock = "";
  if (currentYear <= currentBlock.start + 1) {
    subBlock = "FIRST_SUB_BLOCK"; // e.g. 2022-23
  } else {
    subBlock = "SECOND_SUB_BLOCK"; // e.g. 2024-25
  }

  // Eligibility rules
  let blockEligibility = {};

  if (isSameState) {
    blockEligibility = {
      HT: 0,
      AI: 1,
    };
  } else {
    blockEligibility = {
      HT: 1, // per sub-block
      AI: 1,
      flexible: true,
    };
  }

  return {
    phase,
    serviceYear,
    isSameState,
    currentBlock,
    subBlock,
    blockEligibility,
  };
}