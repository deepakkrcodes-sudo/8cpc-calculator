export default function TravelCard({ data }) {
    if (!data) return null;

    const raw = data?.payLevel || data?.level;

    let payLevel = null;

    if (typeof raw === "number") {
        payLevel = raw;
    } else if (typeof raw === "string") {
        const match = raw.match(/\d+/); // extract number safely
        payLevel = match ? Number(match[0]) : null;
    }
   

    // =========================
    // ✈️ AIR (CORRECTED)
    // =========================
    const airAllowed = payLevel >= 9;
    const airClass = airAllowed ? "Economy (LTC-80 Fare)" : "Not Eligible";

    // =========================
    // 🚆 TRAIN (CORRECTED)
    // =========================
    let trainClass = "";

    if (payLevel >= 12) {
        trainClass = "AC First Class";
    } else if (payLevel >= 9) {
        trainClass = "AC 2 Tier";
    } else if (payLevel >= 6) {
        trainClass = "AC 2 / AC 3 / Chair Car";
    } else {
        trainClass = "Sleeper / AC 3 / Chair Car";
    }

    // =========================
    // 🛳 SHIP (SIMPLIFIED CORRECT)
    // =========================
    let shipClass = "";

    if (payLevel >= 10) {
        shipClass = "Deluxe Class";
    } else if (payLevel >= 6) {
        shipClass = "First / Cabin Class";
    } else {
        shipClass = "As per TA Rules";
    }

    // =========================
    // 🚌 ROAD (NEW)
    // =========================
    const roadClass = "Public Transport / 200 km Private Limit";

    // =========================
    // 🌍 SPECIAL AIR
    // =========================
    const showSpecialAir = payLevel <= 8;

    return (
        <div className="bg-white rounded-xl shadow-sm p-5 space-y-5">

            {/* HEADER */}
            <div className="border-b pb-3 flex items-center gap-2">
                ✈️ <h2 className="text-lg font-semibold">
                    Your LTC Travel Entitlement
                </h2>
            </div>

            {/* TABLE */}
            <div className="bg-purple-50/50 rounded-lg p-4">
                <div className="grid grid-cols-3 text-xs font-semibold text-gray-600 mb-2">
                    <div>Mode</div>
                    <div className="text-center">Allowed</div>
                    <div className="text-right">Class / Limit</div>
                </div>

                <Row mode="Train" allowed={true} className={trainClass} />
                <Row mode="Air" allowed={airAllowed} className={airClass} />
                <Row mode="Road" allowed={true} className={roadClass} />
                <Row mode="Ship" allowed={true} className={shipClass} />
            </div>

            {/* SPECIAL AIR */}
            {showSpecialAir && (
                <div className="bg-blue-50/50 rounded-lg p-4">
                    <div className="text-sm font-semibold text-blue-700 mb-2">
                        🌍 Special Air Relaxation
                    </div>

                    <ul className="text-sm list-disc ml-5">
                        <li>North East Region (NER)</li>
                        <li>Jammu & Kashmir / Ladakh</li>
                        <li>Andaman & Nicobar</li>
                    </ul>

                    <div className="text-xs text-gray-500 mt-2">
                        Air travel allowed even below Level 9 for these sectors
                    </div>
                </div>
            )}

            {/* TRAVEL INSIGHT (SMARTER) */}
            <div className="bg-green-50/60 rounded-lg p-5 text-center">

                <div className="text-sm text-gray-600">💡 Smart Insight</div>

                <div className="text-lg font-semibold text-green-700">
                    {payLevel >= 12
                        ? "Maximize LTC with premium rail or air routes"
                        : payLevel >= 9
                            ? "Air travel available — choose shortest LTC-80 routes"
                            : payLevel >= 6
                                ? "Rail is primary — use special air routes strategically"
                                : "Use NER/J&K LTC schemes to unlock air travel"}
                </div>

            </div>

        </div>
    );
}

function Row({ mode, allowed, className }) {
    return (
        <div className="grid grid-cols-3 text-sm py-2 border-t">
            <div>{mode}</div>
            <div className="text-center">{allowed ? "✔" : "✖"}</div>
            <div className="text-right">{className}</div>
        </div>
    );
}