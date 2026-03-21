export default function ResultSummaryCard({ summary }) {

  return (

    <div className="result-card">

      <div className="result-header">
        <h2>📊 Pension Impact Summary</h2>
        <p>Estimated change after 8th CPC implementation</p>
      </div>

      <div className="result-grid">

        <div className="result-box current">
          <span className="label">Current Pension</span>
          <span className="amount">
            ₹{summary.basicPension.toLocaleString("en-IN")}
          </span>
        </div>

        <div className="result-box projected">
          <span className="label">Projected Pension</span>
          <span className="amount">
            ₹{summary.newBasicPension.toLocaleString("en-IN")}
          </span>
        </div>

        <div className="result-box increase">
          <span className="label">Monthly Increase</span>
          <span className="amount">
            +₹{summary.monthlyIncrease.toLocaleString("en-IN")}
          </span>
        </div>

      </div>

      <div className="arrear-box">

        <div className="arrear-title">
          Estimated Total Arrear
        </div>

        <div className="arrear-value">
          ₹{summary.totalArrear.toLocaleString("en-IN")}
        </div>

      </div>

    </div>

  );

}