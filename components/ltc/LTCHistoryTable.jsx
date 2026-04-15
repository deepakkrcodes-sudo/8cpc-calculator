import { useEffect, useState } from "react";
import { getAllowedOptions } from "@/utils/ltc/historyRules";
import { getCarryForwardStatus } from "@/utils/ltc/carryForwardRules";
import {
  CalendarDays,
  MapPin,
  Building2,
  Layers,
  History
} from "lucide-react";


export default function LTCHistoryTable({ basicInfo, eligibility, onChange }) {

  const [rows, setRows] = useState([]);
  const [info, setInfo] = useState("");
  const [unknown, setUnknown] = useState(false);

  const [error, setError] = useState("");
  const joiningYear = Number(basicInfo?.doj || 0);
  const [carryForwardAvailable, setCarryForwardAvailable] = useState("NO");
  const [carryForwardType, setCarryForwardType] = useState(null);

  const isSameState =
    basicInfo?.hometown?.toLowerCase() ===
    basicInfo?.office?.toLowerCase();

  // =========================
  // 🔥 MAIN ENGINE
  // =========================
  useEffect(() => {


    if (!basicInfo?.doj || !eligibility) return;

    const currentYear = new Date().getFullYear();
    const serviceYears = currentYear - joiningYear;

    let relevantYears = [];

    // ✅ FIRST 8 YEARS
    if (serviceYears <= 8) {
      setInfo("Showing last 4 years (relevant LTC window)");

      const last4Start = currentYear - 3;
      const startYear = Math.max(joiningYear + 1, last4Start);

      for (let y = startYear; y <= currentYear; y++) {
        relevantYears.push(y);
      }
    }

    // ✅ BLOCK PERIOD
    else {
      const blockStart = eligibility?.currentBlock?.start;
      const blockEnd = eligibility?.currentBlock?.end;

      if (!blockStart || !blockEnd) return;

      setInfo(`Showing block ${blockStart}-${blockEnd}`);

      for (let y = blockStart; y <= blockEnd; y++) {
        relevantYears.push(y);
      }
    }

    const generated = generateRows(relevantYears, eligibility);

    // 🔥 LOOP PREVENTION (SAFE)
    const isSame =
      rows.length === generated.length &&
      rows.every((r, i) => r.year === generated[i].year);

    if (!isSame) {
      setRows(generated);

    }

  }, [
    basicInfo?.doj,
    basicInfo?.hometown || "",
    basicInfo?.office || "",
    eligibility?.currentBlock?.start,
    eligibility?.currentBlock?.end
  ]);

  // =========================
  // 🔁 NOT SURE TOGGLE
  // =========================
  const handleToggle = () => {
    const newVal = !unknown;
    setUnknown(newVal);

    if (newVal) {
      const reset = rows.map((r) => ({
        ...r,
        type: "NONE",
      }));
      setRows(reset);
      onChange(reset);
    } else {
      onChange(rows);
    }
  };

  const handleSelect = (year, value) => {

    setError("");

    setRows((prevRows) => {
      const updated = [...prevRows];

      const index = updated.findIndex((r) => r.year === year);
      const row = updated[index];

      const currentBlock = eligibility?.currentBlock;
      const subBlock1End = currentBlock?.start + 1;

      const isSubBlock1 = row.year <= subBlock1End;

      let HT_sub1 = 0;
      let HT_sub2 = 0;
      let AI_used = 0;

      updated.forEach((r, i) => {
        if (i === index) return;

        if (r.type === "HT") {
          if (r.year <= subBlock1End) HT_sub1++;
          else HT_sub2++;
        }

        if (r.type === "AI") AI_used++;
      });

      // =========================
      // 🔥 FIRST 8 YEARS RULE
      // =========================
      if (eligibility.phase === "FIRST_8_YEARS") {
        const serviceYear = row.year - joiningYear;

        // 🔥 COUNT EXISTING USAGE
        let HT_used = 0;
        let AI_used = 0;
        let conversionUsed = 0;

        updated.forEach((r, i) => {
          if (i === index) return;

          if (r.type === "HT") HT_used++;
          if (r.type === "AI") AI_used++;
          if (r.type === "CONVERTED") {
            conversionUsed++;
            HT_used++; // conversion counts as AI
          }
        });

        // SAME STATE
        if (isSameState) {
          if (value === "HT") {
            setError("Home Town not allowed (same state)");
            return prevRows;
          }

          if (serviceYear < 4 && value === "AI") {
            setError("All India allowed only in 4th year");
            return prevRows;
          }

          if (value === "CONVERTED") {
            setError("Conversion not applicable when Home Town = HQ");
            return prevRows;
          }
        }

        // DIFFERENT STATE
        else {
          let blockPeriod = serviceYear % 4;
         
          if (blockPeriod < 4 && blockPeriod > 0 && value === "AI") {
            setError("All India allowed only in 4th year");
            return prevRows;
          }

          if (blockPeriod === 0 && value === "HT") {
            setError("Home Town not allowed in 4th year");
            return prevRows;
          }

          // ❌ ONLY 1 CONVERSION
          if (value === "CONVERTED" && conversionUsed >= 1) {
            setError("Only 1 conversion allowed per 4 year period in first 8 years");
            return prevRows;
          }


          // ❌ ONLY 1 AI (DO NOT COUNT CURRENT ROW)
          if (value === "AI") {
            const alreadyHasAI = updated.some((r, i) =>
              i !== index && r.type === "AI"
            );

            if (alreadyHasAI) {
              setError("Only 1 All India LTC allowed in first 8 years");
              return prevRows;
            }
          }
        }
      }

      // =========================
      // 🔥 BEYOND 8 YEARS
      // =========================
      else {
        const currentBlock = eligibility?.currentBlock;
        const subBlock1End = currentBlock?.start + 1;

        const isSubBlock1 = row.year <= subBlock1End;

        let HT_sub1 = 0;
        let HT_sub2 = 0;
        let AI_used = 0;

        // 🔥 Count existing usage (excluding current row)
        updated.forEach((r, i) => {
          if (i === index) return;

          if (r.type === "HT") {
            if (r.year <= subBlock1End) HT_sub1++;
            else HT_sub2++;
          }

          if (r.type === "AI") AI_used++;
        });

        // =========================
        // SAME STATE
        // =========================
        if (isSameState) {

          // ❌ HT not allowed
          if (value === "HT") {
            setError("Home Town not allowed (same state)");
            return prevRows;
          }

          // ❌ Only 1 AI in block
          if (value === "AI" && AI_used >= 1) {
            setError("Only 1 All India LTC allowed in block");
            return prevRows;
          }
        }

        // =========================
        // DIFFERENT STATE
        // =========================
        else {

          // ❌ Only 1 AI in entire block
          if (value === "AI" && AI_used >= 1) {
            setError("Only 1 All India LTC allowed in block");
            return prevRows;
          }

          // 🔥 NEW RULE: ONLY 1 LTC PER SUB-BLOCK (HT OR AI)
          const subBlockLTCUsed = updated.some((r, i) => {
            if (i === index) return false;

            const sameSubBlock =
              (r.year <= subBlock1End && isSubBlock1) ||
              (r.year > subBlock1End && !isSubBlock1);

            return sameSubBlock && (r.type === "HT" || r.type === "AI");
          });

          if (subBlockLTCUsed) {
            setError("Only 1 LTC allowed per sub-block");
            return prevRows;
          }
        }
      }

      updated[index] = { ...row, type: value };

      return updated;
    });
  };;

  useEffect(() => {
    if (onChange) {
      onChange(rows);
    }
  }, [rows]);

  const currentYear = new Date().getFullYear();

  const getCFMessage = () => {
    if (eligibility?.phase !== "BLOCK_PERIOD" || !eligibility?.currentBlock) {
      return null;
    }

    const validYear = eligibility.currentBlock.start;

    // ❌ NOT AVAILABLE
    if (carryForwardAvailable === "NO") {
      return {
        text: "✔ Carry forward LTC already utilized / not applicable.",
        color: "text-green-700",
      };
    }

    // ⚠️ TYPE NOT SELECTED
    if (carryForwardAvailable === "YES" && !carryForwardType) {
      return {
        text: "⚠ Please select carry forward type (Home Town / All India).",
        color: "text-yellow-700",
      };
    }

    // =========================
    // STATUS LOGIC
    // =========================
    if (currentYear < validYear) {
      return {
        text: `Carry forward (${carryForwardType}) will be available in ${validYear}.`,
        color: "text-blue-700",
      };
    }

    if (currentYear === validYear) {
      return {
        text: `⚠ Use your carry forward (${carryForwardType}) LTC in ${validYear} or it will lapse.`,
        color: "text-yellow-700",
      };
    }

    return {
      text: `❌ Carry forward (${carryForwardType}) LTC utilization period completed.`,
      color: "text-red-700",
    };
  };

  const cfMessage = getCFMessage();
  // =========================
  // UI
  // =========================
  if (!basicInfo?.doj || !eligibility) return null;

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm space-y-4 mt-4">


      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-md font-semibold text-gray-800 flex items-center gap-2 mt-4">
            <History size={18} className="text-indigo-500" />
            LTC History
          </h2>
          <p className="text-xs text-gray-500">{info}</p>
        </div>

        <button
          onClick={handleToggle}
          className={`text-xs px-3 py-1 rounded-full border ${unknown
            ? "bg-blue-600 text-white border-blue-600"
            : "bg-gray-100 text-gray-600"
            }`}
        >
          Not Sure
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-300 text-red-700 text-sm px-3 py-2 rounded">
          ⚠ {error}
        </div>
      )}


      {/* 🔥 CARRY FORWARD */}

      {eligibility?.phase !== "FIRST_8_YEARS" && eligibility?.currentBlock && (
        <div className="bg-yellow-50 p-3 rounded-lg">

          <label className="text-sm font-medium">
            Carry Forward LTC (Block {eligibility.currentBlock.start - 4}-{eligibility.currentBlock.end - 4})
          </label>

          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="NO"
                checked={carryForwardAvailable === "NO"}
                onChange={() => {
                  setCarryForwardAvailable("NO");
                  setCarryForwardType(null); // reset
                }}
              />
              No
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="YES"
                checked={carryForwardAvailable === "YES"}
                onChange={() => setCarryForwardAvailable("YES")}
              />
              Yes
            </label>
          </div>

          {carryForwardAvailable === "YES" && (
            <div className="mt-3 flex gap-4">

              <button
                onClick={() => setCarryForwardType("HT")}
                className={`px-4 py-2 rounded-lg border ${carryForwardType === "HT"
                  ? "bg-green-100 border-green-400"
                  : "bg-green-50 text-green-700"
                  }`}
              >
                Home Town
              </button>

              <button
                onClick={() => setCarryForwardType("AI")}
                className={`px-4 py-2 rounded-lg border ${carryForwardType === "AI"
                  ? "bg-purple-100 border-purple-400"
                  : "bg-purple-50 text-purple-700"
                  }`}
              >
                All India
              </button>

            </div>
          )}

          {cfMessage && (
            <div className={`text-xs mt-2 ${cfMessage.color}`}>
              {cfMessage.text}
            </div>
          )}

        </div>
      )
      }

      {/* UNKNOWN MODE */}
      {
        unknown ? (
          <div className="bg-blue-50 rounded-lg p-3 text-sm text-gray-700">
            🤖 Assuming no LTC usage. Showing maximum eligibility.
          </div>
        ) : (
          <>
            <div className="space-y-3">

              {rows.map((row, i) => {

                const rowServiceYear = row.year - joiningYear;
                const currentRow = rows.find((r) => r.year === row.year);
                const allowedOptions = getAllowedOptions({
                  year: row.year,
                  rows: rows,
                  eligibility,
                  isSameState

                });


                return (
                  <div key={row.year} className="bg-gray-50 p-3 rounded-lg">

                    <div className="flex justify-between items-center">

                      <div>
                        <div className="font-medium text-gray-700">
                          {row.year}
                        </div>

                        {row.subBlock && (
                          <div className="text-xs text-gray-400">
                            {row.subBlock === "SB1"
                              ? "Sub Block 1"
                              : "Sub Block 2"}
                          </div>
                        )}
                      </div>

                      <select
                        value={row.type || "NONE"}
                        onChange={(e) => handleSelect(row.year, e.target.value)}
                        className="border rounded p-2 text-sm"
                      >
                        <option value="NONE">Not Availed</option>
                        <option value="HT">Home Town</option>
                        <option value="AI">All India</option>
                        {!isSameState && eligibility.phase === "FIRST_8_YEARS" && (
                          <option value="CONVERTED">Converted</option>
                        )}
                      </select>

                    </div>


                  </div>
                );
              })}
            </div>

            <div className="text-xs text-blue-600 mt-2">
              {getSmartHint({ eligibility, isSameState })}
            </div>



          </>
        )
      }
    </div >
  );
}

// =========================
// HELPERS
// =========================

function formatLabel(opt) {
  if (opt === "HT") return "Home Town";
  if (opt === "AI") return "All India";
  if (opt === "CONVERTED") return "Converted (NER/J&K etc)";
  return "Not Availed";
}

function getHint(eligibility) {
  if (eligibility.phase === "FIRST_8_YEARS") {
    return "HT in years 1–3, AI in 4th year";
  }
  return "1 HT per sub-block + 1 AI per block";
}

function getSmartHint({ eligibility, isSameState }) {
  if (!eligibility) return "";

  const phase = eligibility.phase;

  // =========================
  // 1️⃣ FIRST 8 YEARS
  // =========================
  if (phase === "FIRST_8_YEARS") {
    if (isSameState) {
      return "Home Town LTC not allowed (HQ = Home Town). You can avail 1 All India LTC in first 8 years.";
    }

    return "You can avail 3 Home Town and 1 All India LTC in first 8 years. Plan carefully as unused LTC lapses.";
  }

  // =========================
  // 2️⃣ BEYOND 8 YEARS
  // =========================
  if (isSameState) {
    return "Only 1 All India LTC allowed per 4-year block (Home Town not allowed).";
  }

  return "Each 4-year block has 2 sub-blocks: choose 1 Home Town in one sub-block and 1 All India in the other.";
}

function generateRows(years, eligibility) {
  if (!eligibility?.currentBlock) {
    return years.map((year) => ({
      year,
      type: "NONE",
    }));
  }

  const subBlock1End = eligibility.currentBlock.start + 1;

  return years.map((year) => ({
    year,
    type: "NONE",
    subBlock: year <= subBlock1End ? "SB1" : "SB2",
  }));
}