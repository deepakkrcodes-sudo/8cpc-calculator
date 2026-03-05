export function applyIncrement({
  date,
  nextIncrementDate,
  currentBasicIndex,
  currentLevel,
  payMatrix
}){

  let isIncrement=false;

  if(
    nextIncrementDate &&
    date.getFullYear()===nextIncrementDate.getFullYear() &&
    date.getMonth()===nextIncrementDate.getMonth()
  ){

    if(
      currentBasicIndex <
      payMatrix[currentLevel].length-1
    ){

      currentBasicIndex++;
      isIncrement=true;
    }

    nextIncrementDate.setFullYear(
      nextIncrementDate.getFullYear()+1
    );

  }

  return {
    currentBasicIndex,
    nextIncrementDate,
    isIncrement
  }
}