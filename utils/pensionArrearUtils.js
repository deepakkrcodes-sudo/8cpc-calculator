export function calculatePensionArrear({
  lastBasicPay,
  fitmentFactor,
  implementationDate,
  daRates = [],
  retirementType = "before",
  retirementDate = null,
  commutation

}) {

  const basicPay = Number(lastBasicPay) || 0;
  if (!basicPay) return null;

  const comm = Number(commutation) || 40;


  // ===== 7th CPC =====
  const basic7 = basicPay;
  const pension7 = Math.round(basic7 * 0.5);
  const commuted7 = Math.round(pension7 * (comm / 100));
  const remaining7 = pension7 - commuted7;

  // ===== 8th CPC =====
  const basic8 = Math.round(basic7 * fitmentFactor);
  const pension8 = Math.round(basic8 * 0.5);
  const commuted8 = Math.round(pension8 * (comm / 100));
  const remaining8 = pension8 - commuted8;

  let totalArrear = 0;
  const breakdown = [];

  let dr7 = 58;
  let dr8 = 0;

  const arrearStart =
    retirementType === "after" && retirementDate
      ? new Date(retirementDate)
      : new Date("2026-01-01");

  const arrearEnd = new Date(implementationDate);

  let firstOld = 0;
  let firstNew = 0;

  for (let i = 0; i < daRates.length; i++) {

    const row = daRates[i] || {};
    const increment = Number(row.da) || 0;

    // DR progression
    dr7 += increment;
    dr8 += increment;

    const periodStart = new Date(row.start);
    const periodEnd = new Date(row.end);

    // ===== OVERLAP LOGIC =====
    const overlapStart = new Date(Math.max(periodStart, arrearStart));
    const overlapEnd = new Date(Math.min(periodEnd, arrearEnd));

    let months = 0;

    if (overlapStart <= overlapEnd) {
      months =
        (overlapEnd.getFullYear() - overlapStart.getFullYear()) * 12 +
        (overlapEnd.getMonth() - overlapStart.getMonth()) + 1;
    }
  

    // ===== CORRECT PENSION CALC =====

    // DR applied on BASIC pension
    const drAmount7 = Math.round(pension7 * dr7 / 100);
    const drAmount8 = Math.round(pension8 * dr8 / 100);

    const oldPension = remaining7 + drAmount7;
    const newPension = remaining8 + drAmount8;

    const monthlyIncrease = newPension - oldPension;
    const arrear = monthlyIncrease * months;

    totalArrear += arrear;

    if (i === 0) {
      firstOld = oldPension;
      firstNew = newPension;
    }


    breakdown.push({
      period: row.period,

      // ✅ ADD THIS LINE
      da: increment,

      dr7,
      dr8,

      months,

      pension7,
      pension8,

      remaining7,
      remaining8,

      drAmount7,
      drAmount8,

      oldPension: Math.round(oldPension),
      newPension: Math.round(newPension),

      monthlyIncrease: Math.round(monthlyIncrease),
      arrear: Math.round(arrear)
    });

  }

  return {

    summary: {
      lastBasicPay: Math.round(basicPay),

      pension7,
      pension8,

      remaining7,
      remaining8,

      // ✅ ADD THESE
      oldPension: Math.round(firstOld),
      newPension: Math.round(firstNew),

      monthlyIncrease: Math.round(firstNew - firstOld),
      totalArrear: Math.round(totalArrear),

      arrearStart: arrearStart.toDateString(),
      arrearEnd: arrearEnd.toDateString(),

      startingDR7: 58,
      startingDR8: 0
    },

    breakdown

  };

}