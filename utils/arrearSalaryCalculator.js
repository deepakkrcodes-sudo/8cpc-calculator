// utils/arrearSalaryCalculator.js

import { payMatrix } from "@/data/payMatrix";
import {
  calculateIncomeTaxAnnual,
  getTABase,
  getCGHS
} from "./salaryEngine";

import { parsePeriod, addMonths } from "./arrearPeriodGenerator";

export function calculatePeriodSalary({

  currentLevel,
  currentBasicIndex,
  fitmentFactor,
  city,
  hra7Percent,
  hra8Percent,
  tptaType,
  da7,
  da8

}) {

  const basic7 = payMatrix[currentLevel][currentBasicIndex];

  const basic8 = Math.round(basic7 * fitmentFactor);

  // =================
  // DA
  // =================

  const da7Amount =
    Math.round(basic7 * da7 / 100);

  const da8Amount =
    Math.round(basic8 * da8 / 100);

  // =================
  // HRA
  // =================

  const hra7 =
    hra7Percent === 0
      ? 0
      : Math.round(basic7 * hra7Percent / 100);

  const hra8 =
    hra8Percent === 0
      ? 0
      : Math.round(basic8 * hra8Percent / 100);

  // =================
  // TA
  // =================

  const taBase7 =
    getTABase(currentLevel, basic7, tptaType);

  const taBase8 =
    getTABase(currentLevel, basic8, tptaType);

  const ta7 =
    Math.round(taBase7 * (1 + da7 / 100));

  const ta8 =
    Math.round(taBase8 * (1 + da8 / 100));

  // =================
  // GROSS
  // =================

  const gross7 =
    basic7 +
    da7Amount +
    hra7 +
    ta7;

  const gross8 =
    basic8 +
    da8Amount +
    hra8 +
    ta8;

  // =================
  // DEDUCTIONS
  // =================

  const nps7 =
    Math.round((basic7 + da7Amount) * 0.10);

  const nps8 =
    Math.round((basic8 + da8Amount) * 0.10);

  const cghs =
    getCGHS(currentLevel);

  const annualGross7 = gross7 * 12;
  const annualGross8 = gross8 * 12;

  const tax7 =
    Math.round(
      calculateIncomeTaxAnnual(annualGross7) / 12
    );

  const tax8 = tax7;

  const net7 =
    gross7 -
    nps7 -
    cghs -
    tax7;

  const net8 =
    gross8 -
    nps8 -
    cghs -
    tax8;

  return {

    basic7,
    basic8,

    gross7,
    gross8,

    net7,
    net8

  };

}