export default function ArrearBreakdownTable({ breakdown }) {

  return (

    <div className="breakdown-card mr-5">

      <h2>📅 Arrear Breakdown</h2>

      <table className="breakdown-table pd">

        <thead>
          <tr>
            <th>Period</th>
            <th>DA %</th>
            <th>New Pension</th>
            <th>Increase</th>
            <th>Arrear</th>
          </tr>
        </thead>

        <tbody>

          {breakdown.map((row, index) => (

            <tr key={index}>

              <td className="period">

                {row.period}

                {index !== 0 && (
                  <span className="da-change">
                    ▲
                  </span>
                )}

              </td>

              <td>{row.da}%</td>

              <td className="new-pension">
                ₹{row.newPension.toLocaleString("en-IN")}
              </td>

              <td className="increase">
                +₹{row.monthlyIncrease.toLocaleString("en-IN")}
              </td>

              <td className="arrear">
                ₹{row.arrear.toLocaleString("en-IN")}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

      <div className="breakdown-legend">
        <span className="legend-symbol">▲</span> Dearness Allowance (DA) Increase
      </div>

    </div>

  );

}