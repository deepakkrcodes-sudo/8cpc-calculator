export function applyCarryForward(data, eligibility) {
  const { carryForwardInput } = data; 
  // { available: true/false, type: "HT" | "AI" }

  if (!eligibility) return null;

  // =========================
  // ONLY BLOCK PERIOD
  // =========================
  if (eligibility.phase !== "BLOCK_PERIOD") {
    return {
      carryForwardAvailable: false,
      status: "NOT_APPLICABLE",
      message: "Carry forward not applicable in first 8 years",
    };
  }

  const { currentBlock } = eligibility;
  const currentYear = new Date().getFullYear();

  if (!currentBlock) return null;

  const validYear = currentBlock.start;

  // =========================
  // USER INPUT
  // =========================
  const isAvailable = carryForwardInput?.available;
  const type = carryForwardInput?.type || null;

  if (!isAvailable) {
    return {
      carryForwardAvailable: false,
      carryForwardType: null,
      status: "NOT_AVAILABLE",
      message: "✔ Carry forward LTC already utilized / not applicable.",
    };
  }

  // =========================
  // STATUS LOGIC
  // =========================
  let status = "NONE";

  if (currentYear < validYear) {
    status = "UPCOMING";
  } else if (currentYear === validYear) {
    status = "ACTIVE";
  } else {
    status = "LAPSED";
  }

  const usable = status === "ACTIVE";

  return {
    carryForwardAvailable: usable,
    carryForwardType: type, // HT / AI
    status,
    validYear,

    rules: {
      validOnlyInYear: validYear,
      note:
        type === "HT"
          ? "HT carry forward cannot be used as All India"
          : "AI carry forward usable anywhere",
    },

    message: buildMessage({
      status,
      type,
      validYear,
    }),
  };
}

function buildMessage({ status, type, validYear }) {
  if (status === "NOT_AVAILABLE") {
    return "✔ Carry forward LTC already utilized.";
  }

  if (status === "UPCOMING") {
    return `Carry forward (${type}) will be available in ${validYear}.`;
  }

  if (status === "ACTIVE") {
    return `⚠ Use your carry forward (${type}) LTC in ${validYear} or it will lapse.`;
  }

  if (status === "LAPSED") {
    return `❌ Carry forward (${type}) LTC utilization period completed.`;
  }

  return "";
}