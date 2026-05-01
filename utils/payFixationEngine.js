import { payMatrix as defaultPayMatrix } from "@/data/payMatrix";
import { calculateTA } from "./taEngine";

function addMonths(date, months) {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}

function addSixMonths(date) {
  const d = new Date(date);
  d.setMonth(d.getMonth() + 6);
  return d;
}

function calcGross(basic, da, hra, ta) {
  const daAmt = basic * da / 100;
  const hraAmt = basic * hra / 100;

  return basic + daAmt + hraAmt + ta;
}

function getLevelCells(payMatrix, level) {
  const cells = payMatrix[level];

  if (!Array.isArray(cells) || cells.length === 0) {
    throw new Error(`Pay matrix level not found: ${level}`);
  }

  return cells.map(Number);
}

export function getNextCell(level, basic, payMatrix = defaultPayMatrix) {
  const cells = getLevelCells(payMatrix, level);
  const currentBasic = Number(basic);
  const index = cells.indexOf(currentBasic);

  if (index === -1) {
    throw new Error(`Basic ${currentBasic} not found in ${level}`);
  }

  return cells[index + 1] || cells[index];
}

export function getEqualOrNextCell(level, value, payMatrix = defaultPayMatrix) {
  const cells = getLevelCells(payMatrix, level);
  const target = Number(value);
  const cell = cells.find((basic) => basic >= target);

  if (!cell) {
    throw new Error(`No equal or higher cell found in ${level} for ${target}`);
  }

  return cell;
}

function getIncrementDate(year, incrementMonth) {
  return new Date(year, incrementMonth === "JAN" ? 0 : 6, 1);
}

function getNextIncrementDateFromPromotion(promotionDate) {
  const date = new Date(promotionDate);
  const earliest = addSixMonths(date);
  const year = date.getFullYear();
  const candidates = [
    new Date(year, 0, 1),
    new Date(year, 6, 1),
    new Date(year + 1, 0, 1),
    new Date(year + 1, 6, 1),
    new Date(year + 2, 0, 1),
    new Date(year + 2, 6, 1)
  ];

  return candidates.find((candidate) => candidate > date && candidate >= earliest);
}

function getDniDate(promotionDate, incrementMonth) {
  const date = new Date(promotionDate);
  const year = date.getFullYear();
  const sameYearDni = getIncrementDate(year, incrementMonth);

  if (sameYearDni >= date) return sameYearDni;

  return getIncrementDate(year + 1, incrementMonth);
}

export function calculateFixation(data) {
  const {
    currentLevel,
    currentBasic,
    promotionLevel,
    promotionDate,
    incrementMonth,
    payMatrix = defaultPayMatrix,
    daPercent = 0,
    hraPercent = 0,
    tptaType = "NONE",
    months = 0,
    interestRate = 0
  } = data;

  if (!currentLevel || !currentBasic || !promotionLevel || !promotionDate || !incrementMonth) {
    throw new Error("Missing required pay fixation inputs");
  }

  const currentBasicValue = Number(currentBasic);

  const notionalPay = getNextCell(currentLevel, currentBasicValue, payMatrix);
  const promotedPayOption1 = getEqualOrNextCell(promotionLevel, notionalPay, payMatrix);
  const nextIncrementDateOption1 = getNextIncrementDateFromPromotion(promotionDate);
  const nextPayOption1 = getNextCell(promotionLevel, promotedPayOption1, payMatrix);

  const incrementedBasic = getNextCell(currentLevel, currentBasicValue, payMatrix);
  const notionalPay2 = getNextCell(currentLevel, incrementedBasic, payMatrix);
  const promotedPayOption2 = getEqualOrNextCell(promotionLevel, notionalPay2, payMatrix);
  const dniDate = getDniDate(promotionDate, incrementMonth);

  const option1 = {
    basic: promotedPayOption1,
    notionalPay,
    nextIncrementDate: nextIncrementDateOption1,
    nextIncrement: nextPayOption1
  };

  const option2 = {
    basic: promotedPayOption2,
    incrementedBasic,
    notionalPay: notionalPay2,
    dniDate
  };

  const betterOption =
    promotedPayOption2 > promotedPayOption1
      ? "option2"
      : "option1";

  let cumulativeA = 0;
  let cumulativeB = 0;
  let cumulativeDiff = 0;

  const timeline = [];
  const start = new Date(promotionDate);
  const simulationMonths = Number(months) || 0;

  for (let i = 0; i < simulationMonths; i++) {
    const date = addMonths(start, i);

    const basicA =
      nextIncrementDateOption1 && date >= nextIncrementDateOption1
        ? nextPayOption1
        : promotedPayOption1;

    const basicB =
      date >= dniDate
        ? promotedPayOption2
        : currentBasicValue;

    const levelB =
      date >= dniDate
        ? promotionLevel
        : currentLevel;

    const taA = calculateTA(promotionLevel, basicA, Number(daPercent), tptaType);
    const taB = calculateTA(levelB, basicB, Number(daPercent), tptaType);

    const grossA = calcGross(basicA, Number(daPercent), Number(hraPercent), taA);
    const grossB = calcGross(basicB, Number(daPercent), Number(hraPercent), taB);
    const diff = grossA - grossB;

    cumulativeA += grossA;
    cumulativeB += grossB;
    cumulativeDiff += diff;

    const interest =
      cumulativeDiff *
      Math.pow(1 + Number(interestRate) / 1200, i + 1);

    timeline.push({
      month: i + 1,
      date: date.toISOString(),
      basicA,
      basicB,
      grossA,
      grossB,
      difference: diff,
      interestAdjusted: interest,
      cumulativeA,
      cumulativeB
    });
  }

  return {
    option1,
    option2,
    betterOption,
    timeline,
    totalA: cumulativeA,
    totalB: cumulativeB
  };
}
