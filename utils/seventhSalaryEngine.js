import { getTABase, getCGHS } from "./salaryEngine";


export function calculate7CPCSalary({

  level,
  basic,
  daPercent,
  city,
  hraPercent,
  tptaType

}) {

  const basicPay = Number(basic);

  const da =
    Math.round(
      basicPay * daPercent / 100
    );

  const hra =
    hraPercent === 0
      ? 0
      : Math.round(
          basicPay * hraPercent / 100
        );

  const taBase =
    getTABase(
      level,
      basicPay,
      tptaType
    );

  const ta =
    Math.round(
      taBase * (1 + daPercent / 100)
    );

  const gross =
    basicPay +
    da +
    hra +
    ta;

  const nps =
    Math.round(
      (basicPay + da) * 0.10
    );

  const cghs =
    getCGHS(level);

  const annualGross =
    gross * 12;

  const taxable =
    Math.max(
      annualGross      
      - 75000,
      0
    );


  const tax =
    Math.round(
      calculateIncomeTaxAnnual(taxable)/12
    );

    

  const net =
    gross -
    nps -
    cghs -
    tax;

  return {

    basic: basicPay,
    da,
    hra,
    ta,
    gross,
    nps,
    cghs,
    tax,
    net

  };

}

function calculateIncomeTaxAnnual(taxableIncome) {

  // Rebate rule (new regime FY 2025-26)
  
  if (taxableIncome <= 1200000) {
    return 0;
  }

  let tax = 0;

  const slabs = [
    { limit: 400000, rate: 0 },
    { limit: 800000, rate: 0.05 },
    { limit: 1200000, rate: 0.10 },
    { limit: 1600000, rate: 0.15 },
    { limit: 2000000, rate: 0.20 },
    { limit: 2400000, rate: 0.25 },
    { limit: Infinity, rate: 0.30 }
  ];

  let previousLimit = 0;

  for (const slab of slabs) {

    if (taxableIncome > previousLimit) {

      const taxableAmount =
        Math.min(taxableIncome, slab.limit) - previousLimit;

      tax += taxableAmount * slab.rate;

      previousLimit = slab.limit;

    } else {
      break;
    }

  }

  // Add 4% health and education cess
  tax = tax * 1.04;

  return Math.round(tax);

}