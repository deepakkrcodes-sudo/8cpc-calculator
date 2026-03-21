export function calculatePensionArrear({
  basicPension,
  fitmentFactor,
  implementationDate,
  daRates
}) {

  const newBasicPension = Math.round(basicPension * fitmentFactor);

  let totalArrear = 0;

  const breakdown = [];

  for (let i = 0; i < daRates.length; i++) {

    const row = daRates[i];

    const months = 6;

    const newPension =
      newBasicPension + (newBasicPension * row.da / 100);

    const oldPension =
      basicPension + (basicPension * row.da / 100);

    const monthlyIncrease = newPension - oldPension;

    const arrear = monthlyIncrease * months;

    totalArrear += arrear;

    breakdown.push({
      period: row.period,
      da: row.da,
      months,
      newPension: Math.round(newPension),
      monthlyIncrease: Math.round(monthlyIncrease),
      arrear: Math.round(arrear)
    });

  }

  return {

    summary: {
      basicPension,
      newBasicPension,
      monthlyIncrease: newBasicPension - basicPension,
      totalArrear: Math.round(totalArrear)
    },

    breakdown

  };

}