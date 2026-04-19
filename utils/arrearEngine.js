import { payMatrix } from "@/data/payMatrix";
import {
  addMonths,
  differenceInDays,
  formatDate,
  generatePeriods,
  parseISODate
} from "./arrearPeriodGenerator";
import { calculatePeriodSalary } from "./arrearSalaryCalculator";

const ARREAR_START_DATE = new Date(Date.UTC(2026, 0, 1));

export function calculateArrear({
  level,
  basic,
  fitmentFactor,
  implementationPeriod,
  daRates,
  hra7Percent,
  tptaType,
  incrementDate,
  joiningType,
  joiningDate,
  promotion
}) {
  const periods = generatePeriods(implementationPeriod);
  const effectiveFrom = resolveEffectiveStartDate(joiningType, joiningDate);
  const implementationDate = periods.at(-1)?.endExclusive ?? ARREAR_START_DATE;
  let totalGrossArrear = 0;
  let totalNetArrear = 0;
  let totalEligibleMonths = 0;
  let cumulativeDaIncrease = 0;
  const periodResults = [];
  const initialBasicIndex = payMatrix[level].indexOf(basic);
  const initialNextIncrementDate = getInitialIncrementDate({
    effectiveFrom,
    incrementDate,
    joiningType
  });
  const promotionPlan = getPromotionPlan({
    level,
    basicIndex: initialBasicIndex,
    incrementDate,
    joiningType,
    joiningDate,
    promotion
  });

  let currentLevel = promotionPlan?.effectiveDate && promotionPlan.effectiveDate <= effectiveFrom
    ? promotionPlan.level
    : level;
  let currentBasicIndex = promotionPlan?.effectiveDate && promotionPlan.effectiveDate <= effectiveFrom
    ? promotionPlan.basicIndex
    : initialBasicIndex;
  let promotionApplied = Boolean(
    promotionPlan?.effectiveDate && promotionPlan.effectiveDate <= effectiveFrom
  );
  let nextIncrementDate = promotionApplied
    ? promotionPlan.nextIncrementDateAfterFixation
    : initialNextIncrementDate;

  periods.forEach((period, index) => {
    const periodStart = period.start;
    const periodEndExclusive = period.endExclusive;
    const eligibleStart =
      effectiveFrom > periodStart ? effectiveFrom : periodStart;

    if (eligibleStart >= periodEndExclusive) {
      cumulativeDaIncrease += Number(daRates?.[index] ?? 2);
      return;
    }

    cumulativeDaIncrease += Number(daRates?.[index] ?? 2);

    const da7Percent = 58 + cumulativeDaIncrease;
    const da8Percent = cumulativeDaIncrease;

    let cursor = eligibleStart;
    const aggregate = createPeriodAggregate(period, da7Percent, da8Percent);

    while (cursor < periodEndExclusive) {
      const eventFlags = applyEventsAtDate({
        date: cursor,
        currentLevel,
        currentBasicIndex,
        nextIncrementDate,
        promotionPlan,
        promotionApplied
      });

      currentLevel = eventFlags.currentLevel;
      currentBasicIndex = eventFlags.currentBasicIndex;
      nextIncrementDate = eventFlags.nextIncrementDate;
      promotionApplied = eventFlags.promotionApplied;
      aggregate.isIncrement = aggregate.isIncrement || eventFlags.isIncrement;
      aggregate.isPromotion = aggregate.isPromotion || eventFlags.isPromotion;

      if (eventFlags.isIncrement && !aggregate.incrementDate) {
        aggregate.incrementDate = cursor.getTime();
      }
      if (eventFlags.isPromotion && !aggregate.promotionDate) {
        aggregate.promotionDate = cursor.getTime();
      }

      const nextBoundary = getNextBoundary({
        cursor,
        periodEndExclusive,
        nextIncrementDate,
        promotionPlan,
        promotionApplied
      });

      const basic7ForHRA = payMatrix[currentLevel][currentBasicIndex];
      const hraAmount = Math.round(basic7ForHRA * hra7Percent / 100);
      const salary = calculatePeriodSalary({
        currentLevel,
        currentBasicIndex,
        fitmentFactor,
        hraAmount,
        tptaType,
        da7Percent,
        da8Percent
      });

      const segmentDays = differenceInDays(cursor, nextBoundary);
      const segmentMonths = Number(
        ((segmentDays / period.totalDays) * 6).toFixed(4)
      );
      const grossDiff = Math.round(salary.gross8 - salary.gross7);
      const netDiff = Math.round(salary.net8 - salary.net7);
      const grossArrear = Math.round(grossDiff * segmentMonths);
      const netArrear = Math.round(netDiff * segmentMonths);

      totalGrossArrear += grossArrear;
      totalNetArrear += netArrear;
      totalEligibleMonths += segmentMonths;

      aggregate.levelStart ||= currentLevel;
      aggregate.basicStart ||= salary.basic7;
      aggregate.levelEnd = currentLevel;
      aggregate.basicEnd = salary.basic7;
      aggregate.gross7 += Math.round(salary.gross7 * segmentMonths);
      aggregate.gross8 += Math.round(salary.gross8 * segmentMonths);
      aggregate.net7 += Math.round(salary.net7 * segmentMonths);
      aggregate.net8 += Math.round(salary.net8 * segmentMonths);
      aggregate.grossArrear += grossArrear;
      aggregate.netArrear += netArrear;
      aggregate.tax7 = salary.tax7;
      aggregate.tax8 = salary.tax8;
      aggregate.hra7 = salary.hra7;
      aggregate.hra8 = salary.hra8;
      aggregate.ta7 = salary.ta7;
      aggregate.ta8 = salary.ta8;
      aggregate.basic8 = salary.basic8;
      aggregate.eligibleDays += segmentDays;
      aggregate.eligibleMonths += segmentMonths;

      cursor = nextBoundary;
    }

    periodResults.push(finalizePeriodAggregate(aggregate));
  });

  return {
    periods: periodResults,
    totalGrossArrear: Math.round(totalGrossArrear),
    totalNetArrear: Math.round(totalNetArrear),
    totalEligibleMonths: Number(totalEligibleMonths.toFixed(2)),
    effectiveFrom: formatDate(effectiveFrom),
    implementationDate: formatDate(new Date(implementationDate.getTime() - 86400000))
  };
}

export function getPromotionPreview({
  level,
  basic,
  incrementDate,
  joiningType,
  joiningDate,
  promotion
}) {
  if (!promotion?.applicable || !promotion.level || !basic || !level) {
    return { options: [], basic: "" };
  }

  const initialBasicIndex = payMatrix[level].indexOf(Number(basic));
  const plan = getPromotionPlan({
    level,
    basicIndex: initialBasicIndex,
    incrementDate,
    joiningType,
    joiningDate,
    promotion
  });

  return {
    options: payMatrix[promotion.level] ?? [],
    basic: plan?.basic ?? ""
  };
}

function resolveEffectiveStartDate(joiningType, joiningDate) {
  if (joiningType === "after" && joiningDate) {
    const parsedJoiningDate = parseISODate(joiningDate);
    return parsedJoiningDate > ARREAR_START_DATE
      ? parsedJoiningDate
      : ARREAR_START_DATE;
  }

  return ARREAR_START_DATE;
}

function getInitialIncrementDate({ effectiveFrom, incrementDate, joiningType }) {
  if (joiningType === "after") {
    return getResidencyIncrementDate(effectiveFrom);
  }

  if (!incrementDate) return null;
  const incrementMonth = incrementDate.startsWith("Jan") ? 0 : 6;
  let candidate = new Date(
    Date.UTC(effectiveFrom.getUTCFullYear(), incrementMonth, 1)
  );

  if (candidate <= effectiveFrom) {
    candidate = new Date(
      Date.UTC(effectiveFrom.getUTCFullYear() + 1, incrementMonth, 1)
    );
  }

  return candidate;
}

function getResidencyIncrementDate(effectiveDate) {
  const year = effectiveDate.getUTCFullYear();
  const month = effectiveDate.getUTCMonth();
  const day = effectiveDate.getUTCDate();

  if (month === 0 && day === 1) {
    return new Date(Date.UTC(year, 6, 1));
  }

  if (month < 6) {
    return new Date(Date.UTC(year + 1, 0, 1));
  }

  if (month === 6 && day === 1) {
    return new Date(Date.UTC(year + 1, 0, 1));
  }

  return new Date(Date.UTC(year + 1, 6, 1));
}

function getPromotionPlan({
  level,
  basicIndex,
  incrementDate,
  joiningType,
  joiningDate,
  promotion
}) {
  if (!promotion?.applicable || !promotion.level || !promotion.date) {
    return null;
  }

  const effectiveFrom = resolveEffectiveStartDate(joiningType, joiningDate);
  const promotionDate = parseISODate(promotion.date);

  if (!promotionDate) return null;

  let simulatedBasicIndex = basicIndex;
  let nextIncrementDate = getInitialIncrementDate({
    effectiveFrom,
    incrementDate,
    joiningType
  });

  while (nextIncrementDate && nextIncrementDate < promotionDate) {
    simulatedBasicIndex = getIncrementedIndex(level, simulatedBasicIndex, 1);
    nextIncrementDate = addMonths(nextIncrementDate, 12);
  }

  let fixationDate = promotionDate;
  let incrementSteps = 1;

  if (promotion.payFixation === "dni") {
    while (nextIncrementDate && nextIncrementDate <= promotionDate) {
      nextIncrementDate = addMonths(nextIncrementDate, 12);
    }

    fixationDate = nextIncrementDate;
    incrementSteps = 2;
  }

  if (!fixationDate) return null;

  const promotedBasicIndex = getPromotedBasicIndex({
    currentLevel: level,
    currentBasicIndex: simulatedBasicIndex,
    promotedLevel: promotion.level,
    incrementSteps
  });

  return {
    level: promotion.level,
    basicIndex: promotedBasicIndex,
    basic: payMatrix[promotion.level][promotedBasicIndex],
    promotionDate,
    effectiveDate: fixationDate,
    payFixation: promotion.payFixation ?? "promotion_date",
    nextIncrementDateAfterFixation:
      promotion.payFixation === "dni"
        ? addMonths(fixationDate, 12)
        : getResidencyIncrementDate(fixationDate)
  };
}

function getPromotedBasicIndex({
  currentLevel,
  currentBasicIndex,
  promotedLevel,
  incrementSteps
}) {
  const sourceLevelValues = payMatrix[currentLevel];
  const promotedLevelValues = payMatrix[promotedLevel];
  const incrementedIndex = getIncrementedIndex(
    currentLevel,
    currentBasicIndex,
    incrementSteps
  );
  const incrementedBasic = sourceLevelValues[incrementedIndex];
  const nearestHigherIndex = promotedLevelValues.findIndex(
    (value) => value >= incrementedBasic
  );

  return nearestHigherIndex === -1
    ? promotedLevelValues.length - 1
    : nearestHigherIndex;
}

function getIncrementedIndex(level, basicIndex, steps) {
  return Math.min(
    basicIndex + steps,
    payMatrix[level].length - 1
  );
}

function isSameUTCDate(firstDate, secondDate) {
  return Boolean(firstDate) &&
    Boolean(secondDate) &&
    firstDate.getTime() === secondDate.getTime();
}

function applyEventsAtDate({
  date,
  currentLevel,
  currentBasicIndex,
  nextIncrementDate,
  promotionPlan,
  promotionApplied
}) {
  let isPromotion = false;
  let isIncrement = false;

  if (
    promotionPlan &&
    !promotionApplied &&
    isSameUTCDate(date, promotionPlan.effectiveDate)
  ) {
    currentLevel = promotionPlan.level;
    currentBasicIndex = promotionPlan.basicIndex;
    nextIncrementDate = promotionPlan.nextIncrementDateAfterFixation;
    promotionApplied = true;
    isPromotion = true;
  } else if (
    nextIncrementDate &&
    isSameUTCDate(date, nextIncrementDate)
  ) {
    currentBasicIndex = getIncrementedIndex(
      currentLevel,
      currentBasicIndex,
      1
    );
    nextIncrementDate = addMonths(nextIncrementDate, 12);
    isIncrement = true;
  }

  return {
    currentLevel,
    currentBasicIndex,
    nextIncrementDate,
    promotionApplied,
    isPromotion,
    isIncrement
  };
}

function getNextBoundary({
  cursor,
  periodEndExclusive,
  nextIncrementDate,
  promotionPlan,
  promotionApplied
}) {
  let nextBoundary = periodEndExclusive;

  if (nextIncrementDate && nextIncrementDate > cursor && nextIncrementDate < nextBoundary) {
    nextBoundary = nextIncrementDate;
  }

  if (
    promotionPlan &&
    !promotionApplied &&
    promotionPlan.effectiveDate > cursor &&
    promotionPlan.effectiveDate < nextBoundary
  ) {
    nextBoundary = promotionPlan.effectiveDate;
  }

  return nextBoundary;
}

function createPeriodAggregate(period, da7Percent, da8Percent) {
  return {
    period: period.label,
    da7Percent,
    da8Percent,
    gross7: 0,
    gross8: 0,
    net7: 0,
    net8: 0,
    grossArrear: 0,
    netArrear: 0,
    eligibleDays: 0,
    eligibleMonths: 0,
    isIncrement: false,
    isPromotion: false,
    promotionDate: null,
    incrementDate: null,
    levelStart: "",
    levelEnd: "",
    basicStart: 0,
    basicEnd: 0,
    basic8: 0,
    tax7: 0,
    tax8: 0,
    hra7: 0,
    hra8: 0,
    ta7: 0,
    ta8: 0,
    eligibleFrom: formatDate(period.start),
    eligibleTo: formatDate(new Date(period.endExclusive.getTime() - 86400000))
  };
}

function finalizePeriodAggregate(aggregate) {
  return {
    period: aggregate.period,
    level:
      aggregate.levelStart === aggregate.levelEnd
        ? aggregate.levelEnd
        : `${aggregate.levelStart} to ${aggregate.levelEnd}`,
    basic7: aggregate.basicEnd,
    basic8: aggregate.basic8,
    da7Percent: aggregate.da7Percent,
    da8Percent: aggregate.da8Percent,
    hra7: aggregate.hra7,
    hra8: aggregate.hra8,
    ta7: aggregate.ta7,
    ta8: aggregate.ta8,
    gross7: aggregate.gross7,
    gross8: aggregate.gross8,
    net7: aggregate.net7,
    net8: aggregate.net8,
    tax7: aggregate.tax7,
    tax8: aggregate.tax8,
    grossArrear: aggregate.grossArrear,
    netArrear: aggregate.netArrear,
    eligibleDays: aggregate.eligibleDays,
    eligibleMonths: Number(aggregate.eligibleMonths.toFixed(2)),
    eligibleFrom: aggregate.eligibleFrom,
    eligibleTo: aggregate.eligibleTo,
    isIncrement: aggregate.isIncrement,
    isPromotion: aggregate.isPromotion,
    promotionDate: aggregate.promotionDate,
    incrementDate: aggregate.incrementDate
  };
}
