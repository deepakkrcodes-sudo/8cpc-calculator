export function getTravelEntitlement({ payLevel }) {
  if (payLevel >= 10) {
    return {
      air: true,
      train: true,
      specialAirZones: ["NER", "J&K", "Andaman"],
    };
  }

  return {
    air: false,
    train: true,
    specialAirZones: ["NER", "J&K", "Andaman"],
  };
}