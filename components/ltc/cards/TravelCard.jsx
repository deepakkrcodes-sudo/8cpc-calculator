export default function TravelCard({ data }) {
    if (!data) return null;

    const raw = data.payLevel;

    const payLevel =
        typeof raw === "string"
            ? Number(raw.replace("L", ""))
            : Number(raw);

    if (!payLevel) {
        console.warn("Invalid payLevel:", raw);
    }

    

    // =========================
    // AIR ELIGIBILITY (FIXED)
    // =========================
    let airAllowed = false;
    let airClass = "Not Eligible";

    if (payLevel >= 14) {
        airAllowed = true;
        airClass = "Business / Club Class";
    } else if (payLevel >= 6 && payLevel <= 13) {
        airAllowed = true;
        airClass = "Economy Class";
    }

    // =========================
    // TRAIN (FIXED STRICT RANGE)
    // =========================
    let trainClass = "";

    if (payLevel >= 12) {
        trainClass = "AC First Class";
    } else if (payLevel >= 6 && payLevel <= 11) {
        trainClass = "AC 2 Tier";
    } else {
        trainClass = "AC 3 Tier / AC Chair Car";
    }

    // =========================
    // SHIP (FIXED STRICT RANGE)
    // =========================
    let shipClass = "";

    if (payLevel >= 9) {
        shipClass = "Highest Class";
    } else if (payLevel >= 6 && payLevel <= 8) {
        shipClass = "Lower Class";
    } else if (payLevel >= 4 && payLevel <= 5) {
        shipClass = "Middle Class";
    } else {
        shipClass = "Lowest Class";
    }

    // =========================
    // SPECIAL AIR (ONLY ≤9)
    // =========================
    const showSpecialAir = payLevel <= 9;

    return (
        <div className="bg-white rounded-xl shadow-sm p-5 space-y-5">

            {/* HEADER */}
            <div className="border-b pb-3 flex items-center gap-2">
                ✈️ <h2 className="text-lg font-semibold">Travel Eligibility</h2>
            </div>

            {/* TABLE */}
            <div className="bg-purple-50/50 rounded-lg p-4">
                <div className="grid grid-cols-3 text-xs font-semibold text-gray-600 mb-2">
                    <div>Mode</div>
                    <div className="text-center">Allowed</div>
                    <div className="text-right">Class</div>
                </div>

                <Row mode="Train" allowed={true} className={trainClass} />
                <Row mode="Air" allowed={airAllowed} className={airClass} />
                <Row mode="Ship" allowed={true} className={shipClass} />
            </div>

            {/* SPECIAL AIR ONLY ≤9 */}
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

                    
                </div>
            )}

            {/* TRAVEL INSIGHT */}
            <div className="bg-green-50/60 rounded-lg p-5 text-center">

                <div className="text-sm text-gray-600">💡 Travel Insight</div>

                <div className="text-lg font-semibold text-green-700">
                    {payLevel >= 10
                        ? "You can freely plan air travel under LTC"
                        : payLevel >= 6
                            ? "You are entitled for Air Travel. Consider using it for long-distance trips."
                            : "Use All India LTC to avail air travel in special regions"}
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