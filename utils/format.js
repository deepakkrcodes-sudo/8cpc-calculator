export function formatINR(value) {

  const num = Number(value);

  if (!num && num !== 0) return "0";

  return new Intl.NumberFormat("en-IN").format(num);

}

export function formatCompactINR(value) {

  if (value >= 10000000)
    return (value / 10000000).toFixed(1) + "Cr";

  if (value >= 100000)
    return (value / 100000).toFixed(1) + "L";

  if (value >= 1000)
    return (value / 1000).toFixed(1) + "K";

  return value;

}