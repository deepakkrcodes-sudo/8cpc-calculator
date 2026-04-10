"use client";

import { applyConversion } from "./conversionEngine";
import { applyCarryForward } from "./carryForwardEngine";
import { generatePlanner } from "./plannerEngine";
import { getEligibility } from "./eligibilityEngine";
import { generateSuggestion } from "./suggestionEngine";
import { generateTimelineData } from "./timelineEngine"; // 👈 ADD THIS

export function calculateLTC(data) {
  const { basicInfo, history } = data;

  if (!basicInfo) return null;

  const eligibility = getEligibility(basicInfo);

  if (!eligibility) return null;

  // =========================
  // CLEAN PAY LEVEL
  // =========================
  const rawLevel = basicInfo.payLevel;

  const cleanPayLevel =
    typeof rawLevel === "string"
      ? Number(rawLevel.replace("L", ""))
      : Number(rawLevel);

  // =========================
  // CURRENT WINDOW
  // =========================
  const joiningYear = Number(basicInfo.doj);
  const currentYear = new Date().getFullYear();

  let currentWindow;

  if (eligibility.phase === "FIRST_8_YEARS") {
    currentWindow = {
      start: Math.max(joiningYear + 1, currentYear - 3),
      end: currentYear,
    };
  } else {
    currentWindow = eligibility.currentBlock;
  }

  // =========================
  // CONVERSION
  // =========================
  const conversion = applyConversion(
    {
      history,
      hometown: basicInfo.hometown,
      office: basicInfo.office,
      currentWindow,
    },
    eligibility
  );

  // =========================
  // CARRY FORWARD
  // =========================
  const carryForward = applyCarryForward(
    {
      history,
    },
    conversion,
    eligibility
  );

  // =========================
  // SUGGESTION
  // =========================
  const suggestionData = generateSuggestion({
    eligibility,
    conversion,
    carryForward,
  });

  // =========================
  // FINAL RESULT
  // =========================
  return {
    currentWindow,

    rawEligibility: eligibility, 

    eligibility: buildSummary(
      eligibility,
      conversion,
      carryForward,
      currentWindow
    ),

    suggestion: {
      ...suggestionData,
      remaining: conversion?.remaining,
      carryForward,
    },

    travel: {
      payLevel: cleanPayLevel,
    },

    timeline: generateTimelineData({
      eligibility,
      conversion,
      carryForward,
      history,
    }),

    planner: generatePlanner(
      eligibility,
      conversion,
      carryForward
    ),
  };
}

function buildSummary(eligibility, conversion, carryForward) {
  if (!eligibility) return null;

  let summary = {
    phase: eligibility.phase,
    serviceYears: eligibility.serviceYears,
    isSameState: eligibility.isSameState,
  };

  if (eligibility.phase === "BLOCK_PERIOD") {
    summary.block = eligibility.currentBlock;
    summary.subBlock = eligibility.subBlock;
  }

  if (conversion) {
    summary.homeTownRemaining = conversion.remaining.homeTown;
    summary.allIndiaRemaining = conversion.remaining.allIndia;
  }

  if (carryForward?.carryForwardAvailable) {
    summary.carryForward = true;
    summary.carryForwardYear =
      carryForward?.usageRules?.expiryYear ?? null;
  }
  return summary;
}
