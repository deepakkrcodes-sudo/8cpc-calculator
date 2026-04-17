const DAY_IN_MS = 24 * 60 * 60 * 1000;

function createUTCDate(year, month, day = 1) {
  return new Date(Date.UTC(year, month, day));
}

export function parsePeriod(periodStr) {
  const [monthStr, yearStr] = periodStr.split(" ");

  const monthMap = {
    Jan: 0,
    January: 0,
    Jul: 6,
    July: 6
  };

  return createUTCDate(
    Number(yearStr),
    monthMap[monthStr],
    1
  );
}

export function parseISODate(dateStr) {
  if (!dateStr) return null;

  const [year, month, day] = dateStr.split("-").map(Number);

  return createUTCDate(year, month - 1, day);
}

export function addMonths(date, months) {
  const d = new Date(date);
  d.setUTCMonth(d.getUTCMonth() + months);
  return d;
}

export function differenceInDays(startDate, endDate) {
  return Math.max(
    Math.round((endDate.getTime() - startDate.getTime()) / DAY_IN_MS),
    0
  );
}

export function formatDate(date) {
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC"
  });
}

export function generatePeriods(implementationPeriod) {
  const periods = [];
  let current = createUTCDate(2026, 0, 1);
  const endExclusive = parsePeriod(implementationPeriod);

  while (current < endExclusive) {
    const next = addMonths(current, 6);
    const label =
      current.getUTCMonth() === 0
        ? `Jan ${current.getUTCFullYear()}`
        : `July ${current.getUTCFullYear()}`;

    periods.push({
      label,
      date: new Date(current),
      start: new Date(current),
      endExclusive: new Date(next),
      end: new Date(next.getTime() - DAY_IN_MS),
      totalDays: differenceInDays(current, next)
    });

    current = next;
  }

  return periods;
}
