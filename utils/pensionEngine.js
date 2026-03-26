export function calculatePension({
  basic = 0,
  fitment = 1.92,
  age = 60,
  commutation = 40,
  dr = 60,
  mode = "8cpc"
}) {

  console.log("ENGINE INPUT:", { basic, fitment, age, commutation, dr });

  const basicPay = Number(basic) || 0;
  if (!basicPay) return null;

  // Basic values
  const basic7 = basicPay;
  const basic8 = mode === "8cpc"
    ? Math.round(basic7 * fitment)
    : basic7;

  // Pension
  const pension7 = Math.round(basic7 * 0.5);
  const pension8 = Math.round(basic8 * 0.5);

  // Commutation
  const commuted7 = Math.round(pension7 * (commutation / 100));
  const commuted8 = Math.round(pension8 * (commutation / 100));

  const remaining7 = pension7 - commuted7;
  const remaining8 = pension8 - commuted8;

  // DR Logic
  const drRate7 = dr;   // e.g. 60%
  const drRate8 = 0;    // Reset in 8th CPC

  const dr7 = Math.round(remaining7 * (drRate7 / 100));
  const dr8 = Math.round(remaining8 * (drRate8 / 100));

  // Totals
  const total7 = remaining7 + dr7;
  const total8 = remaining8 + dr8;

  console.log("ENGINE OUTPUT:", {
    basic7,
    pension7,
    total7,
    basic8,
    pension8,
    total8
  });

  return {

    seventh: {
      basic: basic7,
      pension: pension7,
      commuted: commuted7,
      remaining: remaining7,
      dr: dr7,
      drRate: drRate7, 
      total: total7,
      family: Math.round(pension7 * 0.3),
      lumpSum: Math.round(commuted7 * 12 * 8.194)
    },

    eighth: {
      basic: basic8,
      pension: pension8,
      commuted: commuted8,
      remaining: remaining8,
      dr: dr8,
      drRate: drRate8, 
      total: total8,
      family: Math.round(pension8 * 0.3),
      lumpSum: Math.round(commuted8 * 12 * 8.194)
    }

  };

}