export function applyIncrement({

  date,
  nextIncrementDate,
  currentBasicIndex,
  currentLevel,
  payMatrix

}) {

  let isIncrement = false;

  const levelNumber =
    Number(currentLevel.replace("L",""));

  const isMaxLevel =
    levelNumber >= 17;

  const isLastCell =
    currentBasicIndex >=
    payMatrix[currentLevel].length - 1;

  if (
    nextIncrementDate &&
    date.getFullYear() === nextIncrementDate.getFullYear() &&
    date.getMonth() === nextIncrementDate.getMonth()
  ) {

    if (!isMaxLevel && !isLastCell) {

      currentBasicIndex++;
      isIncrement = true;

    }

    nextIncrementDate.setFullYear(
      nextIncrementDate.getFullYear() + 1
    );

  }

  return {
    currentBasicIndex,
    nextIncrementDate,
    isIncrement
  };

}