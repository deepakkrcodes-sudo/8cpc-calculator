import { getNextCell, getPromotionBasic } from "./promotionEngine";
import { calculateTA } from "./taEngine";

function addMonths(date,m){
  const d=new Date(date);
  d.setMonth(d.getMonth()+m);
  return d;
}

function calcGross(basic,da,hra,ta){

  const daAmt = basic*da/100;
  const hraAmt = basic*hra/100;

  return basic+daAmt+hraAmt+ta;

}

export function calculateFixation(data){

const{

currentLevel,
currentBasic,
promotionLevel,

promotionDate,
dniDate,

daPercent,
hraPercent,
tptaType,

months,
interestRate

}=data;

const incremented =
  getNextCell(currentLevel,currentBasic);

const promotionBasic =
  getPromotionBasic(promotionLevel,incremented);

let cumulativeA=0;
let cumulativeB=0;
let cumulativeDiff=0;

const timeline=[];
const start=new Date(promotionDate);

for(let i=0;i<months;i++){

const date=addMonths(start,i);

/* OPTION A */

let basicA=promotionBasic;

/* OPTION B */

let basicB=currentBasic;

if(date>=new Date(dniDate)){

const inc =
  getNextCell(currentLevel,currentBasic);

basicB =
  getPromotionBasic(promotionLevel,inc);

}

/* TA */

const taA =
 calculateTA(promotionLevel,basicA,daPercent,tptaType);

const taB =
 calculateTA(currentLevel,basicB,daPercent,tptaType);

/* GROSS */

const grossA=
 calcGross(basicA,daPercent,hraPercent,taA);

const grossB=
 calcGross(basicB,daPercent,hraPercent,taB);

const diff = grossA-grossB;

cumulativeA+=grossA;
cumulativeB+=grossB;
cumulativeDiff+=diff;

const interest =
 cumulativeDiff*
 Math.pow(1+interestRate/1200,i+1);

timeline.push({

month:i+1,

basicA,
basicB,

grossA,
grossB,

difference:diff,
interestAdjusted:interest,

cumulativeA,
cumulativeB

});

console.log("optionA:", data.optionA, typeof data.optionA);

}

return{

timeline,
totalA:cumulativeA,
totalB:cumulativeB

};

}