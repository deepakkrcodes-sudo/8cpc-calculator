export function calculateTA(level, basic, daPercent, tptaType){

  if(tptaType==="NONE") return 0;

  const levelNum =
    Number(level.replace("L",""));

  let base=0;

  if(levelNum>=9)
    base = tptaType==="HIGHER"?7200:3600;

  else if(levelNum>=3)
    base = tptaType==="HIGHER"?3600:1800;

  else{

    if(basic>=24200)
      base = tptaType==="HIGHER"?3600:1800;

    else
      base = tptaType==="HIGHER"?1350:900;

  }

  const da = base*daPercent/100;

  return base+da;

}