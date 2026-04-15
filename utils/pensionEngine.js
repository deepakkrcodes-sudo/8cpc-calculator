export function calculatePension({

  basic = 0,
  fitment = 2.28,
  age = 60,
  commutation = 40,
  dr7 = 58,
  dr8 = 0,
  mode = "8cpc"

}) {


  const basicPay = Number(basic) || 0;
  if (!basicPay) return null;

  // ===== BASIC =====
  const basic7 = basicPay;
  const basic8 = mode === "8cpc"
    ? Math.round(basic7 * fitment)
    : basic7;

  // ===== PENSION =====
  const pension7 = Math.round(basic7 * 0.5);
  const pension8 = Math.round(basic8 * 0.5);

  // ===== COMMUTATION =====
  const commuted7 = Math.round(pension7 * (commutation / 100));
  const commuted8 = Math.round(pension8 * (commutation / 100));

  const remaining7 = pension7 - commuted7;
  const remaining8 = pension8 - commuted8;

  // ===== DR =====
  const drRate7 = dr7;
  const drRate8 = dr8;

  // ✅ FIX: rename variables
  const drAmount7 = Math.round(pension7 * (drRate7 / 100));
  const drAmount8 = Math.round(pension8 * (drRate8 / 100));

  // ===== TOTAL =====
  const total7 = remaining7 + drAmount7;
  const total8 = remaining8 + drAmount8;



  return {

    seventh: {
      basic: basic7,
      pension: pension7,
      commuted: commuted7,
      remaining: remaining7,
      dr: drAmount7,        // ✅ fixed
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
      dr: drAmount8,        // ✅ fixed
      drRate: drRate8,
      total: total8,
      family: Math.round(pension8 * 0.3),
      lumpSum: Math.round(commuted8 * 12 * 8.194)
    }

  };

}