export function parsePeriod(periodStr) {

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


export function addMonths(date, months) {

    const d = new Date(date);

    d.setMonth(d.getMonth() + months);

    return d;

}


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