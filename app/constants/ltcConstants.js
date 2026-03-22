import React, { useState } from "react";
import BasicInfoForm from "./BasicInfoForm";
import LTCHistoryTable from "./LTCHistoryTable";

export default function LTCForm({ onCalculate }) {
  const [basicInfo, setBasicInfo] = useState({});
  const [history, setHistory] = useState([]);

  const handleSubmit = () => {
    onCalculate({
      ...basicInfo,
      history,
    });
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <BasicInfoForm onChange={setBasicInfo} />
      <LTCHistoryTable basicInfo={basicInfo} onChange={setHistory} />

      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Calculate LTC
      </button>
    </div>
  );
}