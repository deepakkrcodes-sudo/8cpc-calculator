import { Layers  } from "lucide-react";

export default function PayLevelSelector({
  level,
  setLevel,
  payMatrix,
  setBasic // optional (if you want reset)
}) {

  return (

    <div className="bg-white rounded-xl shadow-sm p-5 mb-6">

      <label className="flex items-center gap-2 text-md font-semibold mb-2">
        <Layers  size={18} className="text-indigo-600" />
        Select Pay Level
      </label>

      <select
        className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={level}
        onChange={(e) => {

          const selectedLevel = e.target.value;

          setLevel(selectedLevel);

          // reset basic if passed
          if (setBasic) setBasic("");

        }}
      >

        <option value="">
          Select Level
        </option>

        {Object.keys(payMatrix).map(l => {

          const values = payMatrix[l];

          const first = values[0];
          const last = values[values.length - 1];

          const label =
            `${l} (₹${first.toLocaleString("en-IN")} → ₹${last.toLocaleString("en-IN")})`;

          return (
            <option key={l} value={l}>
              {label}
            </option>
          );

        })}

      </select>

    </div>

  );

}