export function formatINR(value) {

  return new Intl.NumberFormat("en-IN").format(value);

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