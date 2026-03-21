export default function FixationRow({ data }) {

  const formatINR = (value) => {
    // fallback to 0 if value is undefined, null, or not a number
    const num = Number(value ?? 0);
    return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(num);
  };

  return (
    <div className="grid grid-cols-[40px_repeat(4,minmax(0,1fr))] border-b py-2 items-center text-[11px] sm:text-sm">

      {/* Month */}
      <div className="text-gray-600">
        {data.month ?? "-"}
      </div>

      {/* Values */}
      <div className="text-center min-w-0">
        {`₹ ${formatINR(data.optionA)}`}
      </div>

      <div className="text-center min-w-0">
        {`₹ ${formatINR(data.optionB)}`}
      </div>

      <div className="text-center min-w-0">
        {`₹ ${formatINR(data.difference)}`}
      </div>

      <div className="text-center text-blue-600 min-w-0">
        {`₹ ${formatINR(data.interestAdjusted)}`}
      </div>

    </div>
  );
}