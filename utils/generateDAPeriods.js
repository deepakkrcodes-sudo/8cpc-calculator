export function generateDAPeriods(implementationPeriod){

 const periods=[];

 const startYear=2026;
 let month="Jan";
 let year=startYear;

 while(true){

  periods.push({
   label:`${month} ${year}`
  });

  if(`${month}-${year}`===implementationPeriod) break;

  if(month==="Jan"){
   month="Jul";
  }else{
   month="Jan";
   year++;
  }

 }

 return periods;

}