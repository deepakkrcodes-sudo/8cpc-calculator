// ===============================
// SALARY ENGINE
// Calculates 7th CPC and 8th CPC salary
// ===============================


// ===============================
// CGHS CONTRIBUTION
// ===============================

export function getCGHS(level) {

  const levelNum = parseInt(level.replace("L", ""));

  if (levelNum <= 5) return 250;
  if (levelNum === 6) return 450;
  if (levelNum <= 11) return 650;
  return 1000;

}


// ===============================
// TRANSPORT ALLOWANCE BASE
// ===============================
export function getTABase(level, basic, tptaType) {

  if (tptaType === "NONE") return 0;

  const levelNum = parseInt(level.replace("L", ""));

  let higher;
  let lower;

  if (levelNum >= 9) {
    higher = 7200;
    lower = 3600;
  } else if (levelNum >= 3) {
    higher = 3600;
    lower = 1800;
  } else {
    // Level 1–2 special condition
    if (basic >= 24200) {
      higher = 3600;
      lower = 1800;
    } else {
      higher = 1350;
      lower = 900;
    }
  }

  // 🔹 Step 1: Get base TA
  let ta = 0;

  if (tptaType === "HIGHER" || tptaType === "PWD_HIGHER") {
    ta = higher;
  } else if (tptaType === "OTHER" || tptaType === "PWD_OTHER") {
    ta = lower;
  }

  // 🔹 Step 2: Apply 2× for PwD
  if (tptaType === "PWD_HIGHER" || tptaType === "PWD_OTHER") {
    ta = ta * 2;
  }

  return ta;
}


// ===============================
// INCOME TAX (NEW REGIME)
// ===============================
export function calculateIncomeTaxAnnual(annualGrossIncome) {

  const STANDARD_DEDUCTION = 75000;

  // Step 1: Deduct standard deduction
  const taxableIncome = Math.max(
    annualGrossIncome - STANDARD_DEDUCTION,
    0
  );

  // Step 2: Rebate condition
  if (taxableIncome <= 1200000) {
    return 0;
  }

  const slabs = [
    { upto: 400000, rate: 0 },
    { upto: 800000, rate: 0.05 },
    { upto: 1200000, rate: 0.10 },
    { upto: 1600000, rate: 0.15 },
    { upto: 2000000, rate: 0.20 },
    { upto: 2400000, rate: 0.25 },
    { upto: Infinity, rate: 0.30 }
  ];

  let tax = 0;
  let previousLimit = 0;

  for (let slab of slabs) {

    if (taxableIncome > previousLimit) {

      const taxableInThisSlab =
        Math.min(taxableIncome, slab.upto) - previousLimit;

      tax += taxableInThisSlab * slab.rate;

      previousLimit = slab.upto;

    } else {
      break;
    }

  }

  // Step 3: Add 4% cess
  const taxWithCess = tax * 1.04;

  return Math.round(taxWithCess);
}
// ===============================
// CORE SALARY CALCULATOR
// ===============================
export function calculateSalary({

  level,
  basic,
  fitmentFactor,
  hraPercent8,
  city,
  daPercent,
  tptaType,
  otherAllowances,
  otherDeductions


}) {

  // ==========================
  // 7TH CPC CALCULATION
  // ==========================

  const basic7 = basic;

  const da7 = Math.round(basic7 * 0.60); // current DA

  const hra7PercentMap = {
    X: 30,
    Y: 20,
    Z: 10
  };

  // If 8th CPC HRA is 0 → force 7th CPC HRA = 0
  const hra7Percent = hraPercent8 === 0 ? 0 : hra7PercentMap[city];

  const hra7 = basic7 * hra7Percent / 100;



  const taBase7 = getTABase(level, basic7, tptaType);

  const ta7 = Math.round(
    taBase7 * (1 + 0.60)
  );

  const otherAllow7 =
    otherAllowances.reduce((sum, a) => sum + (a.amount7 || 0), 0);

  const otherAllow8 =
    otherAllowances.reduce((sum, a) => sum + (a.amount8 || 0), 0);

  const gross7 =
    basic7 +
    da7 +
    hra7 +
    ta7 +
    otherAllow7;

  const nps7 =
    Math.round((basic7 + da7) * 0.10);

  const cghs7 =
    getCGHS(level);


  const annual7 = gross7 * 12;

  const taxAnnual7 = calculateIncomeTaxAnnual(annual7);

  const tax7 = Math.round(taxAnnual7 / 12);

  const otherDed7 =
    (otherDeductions || []).reduce((sum, d) => sum + (d.amount7 || 0), 0);

 

  const net7 =
    gross7 -
    nps7 -
    cghs7 -
    tax7 -
    otherDed7;


  // ==========================
  // 8TH CPC gross
  // ==========================

  const revisedBasic =
    Math.round(basic * fitmentFactor);

  const da8 =
    Math.round(
      revisedBasic * daPercent / 100
    );

  const hra8 =
    Math.round(
      revisedBasic * hraPercent8 / 100
    );

  const taBase8 =
    getTABase(level, revisedBasic, tptaType);

  const ta8 =
    Math.round(
      taBase8 * (1 + daPercent / 100)
    );



  const gross8 =
    revisedBasic +
    da8 +
    hra8 +
    ta8 +
    otherAllow8;

  const nps8 =

    Math.round(
      (revisedBasic + da8) * 0.10
    )
    ;

  const cghs8 =
    getCGHS(level);


  const annual8 = gross8 * 12;

  const taxAnnual8 = calculateIncomeTaxAnnual(annual8);

  const tax8 = Math.round(taxAnnual8 / 12);




  const otherDed8 =
    (otherDeductions || []).reduce((sum, d) => sum + (d.amount8 || 0), 0);
  const net8 =
    gross8 -
    nps8 -
    cghs8 -
    tax8 -
    otherDed8;


  // ==========================
  // DIFFERENCE
  // ==========================

  const increaseMonthly =
    net8 - net7;

  const increaseAnnual =
    increaseMonthly * 12;

  const increasePercent =
    Math.round(
      (increaseMonthly / net7) * 100
    );




  return {

    seventh: {
      basic: basic7,
      da: da7,
      hra: hra7,
      ta: ta7,
      gross: gross7,
      nps: nps7,
      cghs: cghs7,
      tax: tax7,
      net: net7
    },

    eighth: {
      basic: revisedBasic,
      da: da8,
      hra: hra8,
      ta: ta8,
      gross: gross8,
      nps: nps8,
      cghs: cghs8,
      tax: tax8,
      net: net8
    },

    difference: {
      monthly: increaseMonthly,
      annual: increaseAnnual,
      percent: increasePercent
    }

  };

}