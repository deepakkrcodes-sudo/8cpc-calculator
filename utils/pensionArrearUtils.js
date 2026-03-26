export function calculatePensionArrear({
  basicPension,
  fitmentFactor,
  implementationDate,
  daRates = []
}) {

  const basic = Number(basicPension) || 0;
  if (!basic) return null;

  const newBasicPension = Math.round(basic * fitmentFactor);

  let totalArrear = 0;
  const breakdown = [];

  let dr7 = 58;
  let dr8 = 0;

  let firstOldPension = 0;
  let firstNewPension = 0;

  for (let i = 0; i < daRates.length; i++) {

    const row = daRates[i] || {};
    const months = 6;

    const increment = Number(row.da) || 0;

    dr7 += increment;
    dr8 += increment;

    const oldPension = basic * (1 + dr7 / 100);
    const newPension = newBasicPension * (1 + dr8 / 100);

    const monthlyIncrease = newPension - oldPension;
    const arrear = monthlyIncrease * months;

    totalArrear += arrear;

    // ✅ capture first period for summary
    if (i === 0) {
      firstOldPension = oldPension;
      firstNewPension = newPension;
    }

    breakdown.push({
      period: row.period || `Period ${i + 1}`,

      da: increment,

      dr7,
      dr8,

      months,

      oldPension: Math.round(oldPension),
      newPension: Math.round(newPension),

      monthlyIncrease: Math.round(monthlyIncrease),
      arrear: Math.round(arrear)
    });

  }

  return {

    summary: {
      // ✅ stable UI fields
      basicPension: Math.round(firstOldPension || basic),
      newBasicPension,

      monthlyIncrease: Math.round(
        (firstNewPension || newBasicPension) -
        (firstOldPension || basic)
      ),

      totalArrear: Math.round(totalArrear),

      // ✅ extra clarity fields (safe to add)
      inputBasicPension: Math.round(basic),
      startingDR7: 58,
      startingDR8: 0
    },

    breakdown

  };

}