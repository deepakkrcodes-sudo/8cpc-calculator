"use client";

import { applyConversion } from "./conversionEngine";
import { applyCarryForward } from "./carryForwardEngine";
import { generatePlanner } from "./plannerEngine";
import { getEligibility } from "./eligibilityEngine";

export function calculateLTC(data) {
  const { basicInfo, history } = data;

  if (!basicInfo) return null;

    const eligibility = getEligibility(basicInfo);

  // =========================
  // CLEAN PAY LEVEL
  // =========================
  const rawLevel = basicInfo.payLevel;

  const cleanPayLevel =
    typeof rawLevel === "string"
      ? Number(rawLevel.replace("L", ""))
      : Number(rawLevel);

  // =========================
  // CONVERSION
  // =========================
  const conversion =
    applyConversion(
      {
        history,
        hometown: basicInfo.hometown,
        office: basicInfo.office,
      },
      eligibility
    ) || {
      remaining: { homeTown: 0, allIndia: 0 },
    };

  // =========================
  // CARRY FORWARD
  // =========================
  const carryForward =
    applyCarryForward(
      { history },
      conversion,
      eligibility
    ) || null;

    

  // =========================
  // FINAL RESULT
  // =========================
  return {
    eligibility: buildSummary(
      eligibility,
      conversion,
      carryForward
    ),

    travel: {
      payLevel: cleanPayLevel,
    },

    suggestion: {
      remaining: conversion.remaining,
      carryForward,
    },

    timeline: buildTimeline(eligibility),

    planner: generatePlanner(eligibility),
  };
}

function buildSummary(eligibility, conversion, carryForward) {
  if (!eligibility) return null;

  let summary = {
    phase: eligibility.phase,
    serviceYear: eligibility.serviceYear,
    isSameState: eligibility.isSameState,
  };

  if (eligibility.phase === "BLOCK_PERIOD") {
    summary.block = eligibility.currentBlock;
    summary.subBlock = eligibility.subBlock;
  }

  summary.homeTownRemaining =
    conversion?.remaining?.homeTown ?? 0;

  summary.allIndiaRemaining =
    conversion?.remaining?.allIndia ?? 0;

  if (carryForward?.carryForwardAvailable) {
    summary.carryForward = true;
    summary.carryForwardYear =
      carryForward.usageRules?.expiryYear;
  }

  return summary;
}

function buildTimeline(eligibility) {
  if (!eligibility) return [];

  // FIRST 8 YEARS
  if (eligibility.phase === "FIRST_8_YEARS") {
    return eligibility.eligibilityMap.map((item) => ({
      yearLabel: `Year ${item.serviceYear}`,
      type: item.type,
      label:
        item.type === "HT"
          ? "Home Town"
          : item.type === "AI"
            ? "All India"
            : "Not Eligible",
    }));
  }

  // BLOCK PERIOD
  return [
    {
      label: `Block ${eligibility.currentBlock.start}-${eligibility.currentBlock.end}`,
      type: "BLOCK",
    },
  ];
}

