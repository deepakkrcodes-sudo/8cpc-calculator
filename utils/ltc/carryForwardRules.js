export function getCarryForwardStatus({
  carryForward,
  currentBlock,
  currentYear,
  previousBlockUsed
}) {
  if (!currentBlock) return null;

  const firstYear = currentBlock.start;

  
  // ❌ already used in previous block
  if (previousBlockUsed) {
    return {
      status: "NOT_APPLICABLE",
      message: "Carry forward not applicable (already used in previous block)"
    };
  }

  // ❌ user selected NONE
  if (carryForward === "NONE") {
    return {
      status: "NOT_SELECTED",
      message: "No carry forward selected"
    };
  }

  // ✅ usable window
  if (currentYear === firstYear) {
    return {
      status: "ACTIVE",
      message: `Use carry forward LTC before ${firstYear}`
    };
  }

  // ❌ lapsed
  if (currentYear > firstYear) {
    return {
      status: "LAPSED",
      message: `Carry forward LTC lapsed in ${firstYear}`
    };
  }

  return null;
}