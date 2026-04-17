import { payMatrix } from "@/data/payMatrix";
import {
  calculateIncomeTaxAnnual,
  getTABase,
  getCGHS
} from "./salaryEngine";

export function calculatePeriodSalary({
  currentLevel,
  currentBasicIndex,
  fitmentFactor,
  hraAmount,
  tptaType,
  da7Percent,
  da8Percent
}) {
  const basic7 = payMatrix[currentLevel][currentBasicIndex];
  const basic8 = Math.round(basic7 * fitmentFactor);

  const da7Amount = Math.round(basic7 * da7Percent / 100);
  const da8Amount = Math.round(basic8 * da8Percent / 100);
  const hra7 = hraAmount;
  const hra8 = hraAmount;
  const taBase7 = getTABase(currentLevel, basic7, tptaType);
  const taBase8 = getTABase(currentLevel, basic8, tptaType);
  const ta7 = Math.round(taBase7 * (1 + da7Percent / 100));
  const ta8 = Math.round(taBase8 * (1 + da8Percent / 100));
  const gross7 = basic7 + da7Amount + hra7 + ta7;
  const gross8 = basic8 + da8Amount + hra8 + ta8;
  const nps7 = Math.round((basic7 + da7Amount) * 0.10);
  const nps8 = Math.round((basic8 + da8Amount) * 0.10);
  const cghs7 = getCGHS(currentLevel);
  const cghs8 = getCGHS(currentLevel);
  const annualGross7 = gross7 * 12;
  const tax7 = Math.round(calculateIncomeTaxAnnual(annualGross7) / 12);
  const tax8 = tax7;
  const net7 = gross7 - nps7 - cghs7 - tax7;
  const net8 = gross8 - nps8 - cghs8 - tax8;

  return {
    basic7,
    basic8,
    da7Percent,
    da8Percent,
    da7: da7Amount,
    da8: da8Amount,
    hra7,
    hra8,
    ta7,
    ta8,
    gross7,
    gross8,
    nps7,
    nps8,
    cghs7,
    cghs8,
    tax7,
    tax8,
    net7,
    net8
  };
}
