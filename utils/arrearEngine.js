// utils/arrearEngine.js

import { payMatrix } from "@/data/payMatrix";

import { generatePeriods, parsePeriod, addMonths }
    from "./arrearPeriodGenerator";

import { applyPromotion }
    from "./arrearPromotionHandler";

import { applyIncrement }
    from "./arrearIncrementHandler";

import { calculatePeriodSalary }
    from "./arrearSalaryCalculator";

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
        generatePeriods(implementationPeriod);

    let currentLevel = level;

    let currentBasicIndex =
        payMatrix[level].indexOf(basic);

    let nextIncrementDate =
        incrementDate
            ? parsePeriod(incrementDate)
            : null;

    let promotionApplied = false;

    let da7 = 60;
    let da8 = 0;

    let totalGrossArrear = 0;
    let totalNetArrear = 0;

    const periodResults = [];

    periods.forEach((period, i) => {

        const date = period.date;

        let isPromotion = false;
        let isIncrement = false;

        // ======================
        // PROMOTION
        // ======================

        if (
            promotion?.applicable &&
            !promotionApplied &&
            period.label === promotion.period
        ) {

            currentLevel = promotion.level;

            currentBasicIndex =
                payMatrix[promotion.level]
                    .indexOf(promotion.basic);

            promotionApplied = true;
            isPromotion = true;

            nextIncrementDate =
                promotion.incrementDate
                    ? parsePeriod(promotion.incrementDate)
                    : null;

        }

        // ======================
        // INCREMENT
        // ======================

        if (
            nextIncrementDate &&
            date.getFullYear() === nextIncrementDate.getFullYear() &&
            date.getMonth() === nextIncrementDate.getMonth()
        ) {

            if (
                currentBasicIndex <
                payMatrix[currentLevel].length - 1
            ) {

                currentBasicIndex++;
                isIncrement = true;

            }

            nextIncrementDate =
                addMonths(nextIncrementDate, 12);

        }

        // ======================
        // DA UPDATE
        // ======================

        let daIncrease = 0;

        if (i > 0) {

            // user entered DA increase for Jul 2026 onward
            daIncrease = Number(daRates?.[i - 1] ?? 2);

            da7 += daIncrease;
            da8 += daIncrease;

        }

        // ======================
        // SALARY
        // ======================

        const salary =
            calculatePeriodSalary({

                currentLevel,
                currentBasicIndex,
                fitmentFactor,
                city,
                hra7Percent,
                hra8Percent,
                tptaType,
                da7,
                da8

            });

        const grossDiff =
            Math.round(
                salary.gross8 -
                salary.gross7
            );

        const netDiff =
            Math.round(
                salary.net8 -
                salary.net7
            );

        const grossArrear =
            grossDiff * 6;

        const netArrear =
            netDiff * 6;

        totalGrossArrear += grossArrear;
        totalNetArrear += netArrear;

        periodResults.push({

            period: period.label,

            level: currentLevel,

            basic7: salary.basic7,
            basic8: salary.basic8,

            gross7: salary.gross7,
            gross8: salary.gross8,

            net7: salary.net7,
            net8: salary.net8,

            grossArrear,
            netArrear,

            isPromotion,
            isIncrement

        });

        const debugRows = [];

        debugRows.push({

            period: period.label,

            basic7: salary.basic7,
            da7Percent: da7,
            hra7: salary.hra7,
            ta7: salary.ta7,
            gross7: salary.gross7,
            nps7: salary.nps7,
            cghs: salary.cghs,
            tax7: salary.tax7,
            net7: salary.net7,

            basic8: salary.basic8,
            da8Percent: da8,
            hra8: salary.hra8,
            ta8: salary.ta8,
            gross8: salary.gross8,
            nps8: salary.nps8,
            tax8: salary.tax8,
            net8: salary.net8,

            diff: salary.net8 - salary.net7

        });

    });

    return {

        periods: periodResults,

        totalGrossArrear:
            Math.round(totalGrossArrear),

        totalNetArrear:
            Math.round(totalNetArrear)

    };

}