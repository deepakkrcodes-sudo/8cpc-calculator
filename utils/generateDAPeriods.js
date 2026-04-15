export function generateDAPeriods(implementationPeriod) {

  const periods = [];

  let month = "Jan";
  let year = 2026;

  while (true) {

    // ✅ STOP BEFORE adding implementation period
    if (`${month}-${year}` === implementationPeriod) break;

    let start, end, label;

    if (month === "Jan") {
      start = `${year}-01-01`;
      end = `${year}-06-30`;
      label = `Jan–Jun ${year}`;
    } else {
      start = `${year}-07-01`;
      end = `${year}-12-31`;
      label = `Jul–Dec ${year}`;
    }

    periods.push({
      label,
      start,
      end
    });

    // move forward
    if (month === "Jan") {
      month = "Jul";
    } else {
      month = "Jan";
      year++;
    }
  }

  return periods;
}