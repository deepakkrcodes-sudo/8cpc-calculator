// utils/arrearEngine.js

import { payMatrix } from "@/data/payMatrix";
import {
  calculateIncomeTaxAnnual,
  getTABase,
  getCGHS
} from "./salaryEngine";


// ==========================
// DATE HELPERS
// ==========================

function parsePeriod(periodStr) {

  const [monthStr, yearStr] = periodStr.split(" ");

  const monthMap = {
    Jan: 0,
    July: 6
  };

  return new Date(
    Number(yearStr),
    monthMap[monthStr],
    1
  );

}


function addMonths(date, months) {

  const d = new Date(date);

  d.setMonth(d.getMonth() + months);

  return d;

}


// ==========================
// GENERATE PERIODS
// ==========================

export function generatePeriods(
  implementationPeriod
) {

  const periods = [];

  let current =
    new Date(2026, 0, 1);

  const end =
    parsePeriod(implementationPeriod);

  while (current < end) {

    const label =
      current.getMonth() === 0
        ? `Jan ${current.getFullYear()}`
        : `July ${current.getFullYear()}`;

    periods.push({
      label,
      date: new Date(current)
    });

    current =
      addMonths(current, 6);

  }

  return periods;

}


// ==========================
// CORE ENGINE
// ==========================

export function calculateArrear({

  level,
  basic,

  fitmentFactor,

  implementationPeriod,

  daRates,

  city,
  hra7Percent,
  hra8Percent,

  tptaType,

  incrementDate,

  promotion

}) {

  const periods =
    generatePeriods(
      implementationPeriod
    );


  // ======================
  // INITIAL STATE
  // ======================

  let currentLevel =
    level;

  let currentBasicIndex =
    payMatrix[level]
      .indexOf(basic);


  let nextIncrementDate =
    incrementDate
      ? parsePeriod(incrementDate)
      : null;


  let promotionApplied =
    false;


  let da7 = 58;
  let da8 = 0;


  let totalGrossArrear = 0;
  let totalNetArrear = 0;


  const periodResults = [];


  // ======================
  // LOOP PERIODS
  // ======================

  periods.forEach(
    (period, i) => {

      const date =
        period.date;


      // ==================
      // APPLY PROMOTION
      // ==================

      let isPromotion =
        false;

      if (
        promotion?.applicable &&
        !promotionApplied &&
        date >= new Date(promotion.date)
      ) {

        currentLevel =
          promotion.level;

        currentBasicIndex =
          payMatrix[promotion.level]
            .indexOf(
              promotion.basic
            );

        promotionApplied =
          true;

        isPromotion = true;


        // Reset increment cycle after promotion

        nextIncrementDate =
          promotion.incrementDate
            ? parsePeriod(
                promotion.incrementDate
              )
            : null;

      }


      // ==================
      // APPLY INCREMENT
      // ==================

      let isIncrement =
        false;

      if (
        nextIncrementDate &&
        date >= nextIncrementDate
      ) {

        if (
          currentBasicIndex <
          payMatrix[currentLevel]
            .length - 1
        ) {

          currentBasicIndex++;

          isIncrement = true;

        }

        nextIncrementDate =
          addMonths(
            nextIncrementDate,
            12
          );

      }


      const basic7 =
        payMatrix[currentLevel]
          [currentBasicIndex];


      const basic8 =
        Math.round(
          basic7 *
          fitmentFactor
        );


      // ==================
      // DA UPDATE
      // ==================

      const daIncrease =
        daRates[i] || 2;

      da7 += daIncrease;

      da8 += daIncrease;


      const da7Amount =
        Math.round(
          basic7 *
          da7 / 100
        );


      const da8Amount =
        Math.round(
          basic8 *
          da8 / 100
        );


      // ==================
      // HRA
      // ==================

      const hra7 =
        hra7Percent === 0
          ? 0
          : Math.round(
              basic7 *
              hra7Percent / 100
            );


      const hra8 =
        hra8Percent === 0
          ? 0
          : Math.round(
              basic8 *
              hra8Percent / 100
            );


      // ==================
      // TA
      // ==================

      const taBase =
        getTABase(
          currentLevel,
          basic7,
          tptaType
        );


      const ta7 =
        Math.round(
          taBase *
          (1 + da7 / 100)
        );


      const ta8 =
        Math.round(
          taBase *
          (1 + da8 / 100)
        );


      // ==================
      // GROSS
      // ==================

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


      // ==================
      // DEDUCTIONS
      // ==================

      const nps7 =
        Math.round(
          (basic7 +
           da7Amount) *
          0.10
        );


      const nps8 =
        Math.round(
          (basic8 +
           da8Amount) *
          0.10
        );


      const cghs =
        getCGHS(
          currentLevel
        );


      const tax7 =
        Math.round(
          calculateIncomeTaxAnnual(
            gross7 * 12
          ) / 12
        );


      const tax8 =
        Math.round(
          calculateIncomeTaxAnnual(
            gross8 * 12
          ) / 12
        );


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


      // ==================
      // ARREAR
      // ==================

      const grossArrear =
        (gross8 -
         gross7) * 6;


      const netArrear =
        (net8 -
         net7) * 6;


      totalGrossArrear +=
        grossArrear;


      totalNetArrear +=
        netArrear;


      periodResults.push({

        period:
          period.label,

        level:
          currentLevel,

        basic7,

        basic8,

        gross7,
        gross8,

        net7,
        net8,

        grossArrear:
          Math.round(
            grossArrear
          ),

        netArrear:
          Math.round(
            netArrear
          ),

        isPromotion,

        isIncrement

      });

    }
  );


  return {

    periods:
      periodResults,

    totalGrossArrear:
      Math.round(
        totalGrossArrear
      ),

    totalNetArrear:
      Math.round(
        totalNetArrear
      )

  };

}