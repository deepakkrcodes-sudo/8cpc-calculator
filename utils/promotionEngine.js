import { payMatrix } from "@/data/payMatrix";

export function getNextCell(level, basic) {

  const cells = payMatrix[level];

  const index = cells.indexOf(Number(basic));

  if (index === -1) throw new Error("Basic not found");

  return cells[index + 1] || cells[index];

}

export function getPromotionBasic(level, basic) {

  const cells = payMatrix[level];

  const value =
    cells.find(v => v >= basic);

  if (!value) throw new Error("Promotion basic not found");

  return value;

}