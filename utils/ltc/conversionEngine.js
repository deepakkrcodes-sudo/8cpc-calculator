export function applyConversion(data, eligibility) {
    const { history, hometown, office } = data;

    if (!history || !eligibility) return null;

    const isSameState =
        hometown?.toLowerCase() === office?.toLowerCase();

    let homeTownUsed = 0;
    let allIndiaUsed = 0;
    let conversionUsed = 0;

    // =========================
    // COUNT FROM HISTORY
    // =========================
    history.forEach((row) => {
        if (row.type === "HT") {
            homeTownUsed++;
        }

        if (row.type === "AI") {
            allIndiaUsed++;
        }

        if (row.type === "CONVERTED") {
            conversionUsed++;
            allIndiaUsed++; // converted counts as AI
        }
    });

    // =========================
    // VALIDATION RULES
    // =========================

    let maxConversion = 1;

    if (isSameState) {
        maxConversion = 0;
    }

    let conversionValid = true;
    let errors = [];

    if (conversionUsed > maxConversion) {
        conversionValid = false;
        errors.push("Only 1 conversion allowed in a block/period");
    }

    if (isSameState && conversionUsed > 0) {
        conversionValid = false;
        errors.push(
            "Conversion not allowed when Home Town and HQ are same"
        );
    }

    // =========================
    // APPLY EFFECTIVE COUNTS
    // =========================

    let effectiveHT = homeTownUsed - conversionUsed;
    let effectiveAI = allIndiaUsed;

    if (effectiveHT < 0) effectiveHT = 0;

    // =========================
    // LIMITS BASED ON PHASE
    // =========================

    let maxHT = 0;
    let maxAI = 0;

    if (eligibility.phase === "FIRST_8_YEARS") {
        if (eligibility.isSameState) {
            maxHT = 0;
            maxAI = Math.floor(eligibility.serviceYear / 4);
        } else {
            maxHT = 3;
            maxAI = 1;
        }
    } else {
        if (eligibility.isSameState) {
            maxHT = 0;
            maxAI = 1;
        } else {
            maxHT = 2;
            maxAI = 1;
        }
    }

    // =========================
    // REMAINING CALCULATION
    // =========================

    let remainingHT = Math.max(maxHT - effectiveHT, 0);
    let remainingAI = Math.max(maxAI - effectiveAI, 0);

    return {
        conversionUsed,
        conversionValid,
        errors,

        usage: {
            homeTownUsed: effectiveHT,
            allIndiaUsed: effectiveAI,
        },

        limits: {
            maxHT,
            maxAI,
            maxConversion,
        },

        remaining: {
            homeTown: remainingHT,
            allIndia: remainingAI,
        },
    };
}