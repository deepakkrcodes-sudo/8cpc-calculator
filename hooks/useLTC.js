import { useState } from "react";
import { calculateLTC } from "../utils/ltc/calculateLTC";

export const useLTC = () => {
  const [result, setResult] = useState(null);

  const compute = (data) => {
    const res = calculateLTC(data);
    setResult(res);
  };

  return { result, compute };
};