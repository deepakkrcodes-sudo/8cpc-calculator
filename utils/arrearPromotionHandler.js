export function applyPromotion({
  promotion,
  promotionApplied,
  currentLevel,
  currentBasicIndex,
  payMatrix,
  period
}){

  if(
    promotion?.applicable &&
    !promotionApplied &&
    period.label === promotion.period
  ){

    return {

      level:promotion.level,

      basicIndex:
        payMatrix[promotion.level]
        .indexOf(promotion.basic),

      promotionApplied:true,

      isPromotion:true
    }

  }

  return {
    level:currentLevel,
    basicIndex:currentBasicIndex,
    promotionApplied,
    isPromotion:false
  }

}