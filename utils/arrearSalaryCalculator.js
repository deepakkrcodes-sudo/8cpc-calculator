import { payMatrix } from "@/data/payMatrix";
import {
  calculateIncomeTaxAnnual,
  getCGHS,
  getCGEGIS
} from "./salaryEngine";

export function calculateDefaultGPF({
  basic,
  daPercent
}) {
  const da = Math.round(basic * daPercent / 100);
  return Math.round((basic + da) * 0.06);
}

export function calculateArrearTax(totalGrossArrear) {
  return Math.round(calculateIncomeTaxAnnual(Math.max(totalGrossArrear, 0)));
}

function calculatePensionDeduction({
  basic,
  da,
  pensionSystem,
  gpfInput
}) {
  const income = basic + da;

  if (pensionSystem === "NPS") {
    return Math.round(0.1 * income);
  }

  const minGPF = Math.round(0.06 * income);
  return Math.max(Math.round(Number(gpfInput) || minGPF), minGPF);
}

function calculateDeductions({
  basic,
  da,
  level,
  pensionSystem,
  gpfInput,
  tax = 0
}) {
  const pensionDeduction = calculatePensionDeduction({
    basic,
    da,
    pensionSystem,
    gpfInput
  });
  const cgegis = getCGEGIS(level);
  const cghs = getCGHS(level);

  return {
    pensionDeduction,
    cgegis,
    cghs,
    tax,
    total: pensionDeduction + cgegis + cghs + tax
  };
}

export function calculatePeriodSalary({
  currentLevel,
  currentBasicIndex,
  fitmentFactor,
  da7Percent,
  da8Percent,
  pensionSystem = "NPS",
  gpfMonthly = 0,
  tax = 0
}) {
  const basic7 = payMatrix[currentLevel][currentBasicIndex];
  const basic8 = Math.round(basic7 * fitmentFactor);

  const da7Amount = Math.round(basic7 * da7Percent / 100);
  const da8Amount = Math.round(basic8 * da8Percent / 100);
  const gross7 = basic7 + da7Amount;
  const gross8 = basic8 + da8Amount;
  const deduction7 = calculateDeductions({
    basic: basic7,
    da: da7Amount,
    level: currentLevel,
    pensionSystem,
    gpfInput: gpfMonthly,
    tax
  });
  const deduction8 = calculateDeductions({
    basic: basic8,
    da: da8Amount,
    level: currentLevel,
    pensionSystem,
    gpfInput: gpfMonthly,
    tax
  });
  const net7 = gross7 - deduction7.total;
  const net8 = gross8 - deduction8.total;

  return {
    basic7,
    basic8,
    da7Percent,
    da8Percent,
    da7: da7Amount,
    da8: da8Amount,
    hra7: 0,
    hra8: 0,
    ta7: 0,
    ta8: 0,
    gross7,
    gross8,
    nps7: deduction7.pensionDeduction,
    nps8: deduction8.pensionDeduction,
    pension7: deduction7.pensionDeduction,
    pension8: deduction8.pensionDeduction,
    cgegis7: deduction7.cgegis,
    cgegis8: deduction8.cgegis,
    cghs7: deduction7.cghs,
    cghs8: deduction8.cghs,
    tax7: tax,
    tax8: tax,
    totalDeduction7: deduction7.total,
    totalDeduction8: deduction8.total,
    net7,
    net8
  };
}
