function RankedClassList({ items, colorClass }) {
  return items.map((item, index) => (
    <div
      key={item.className}
      className="d-flex justify-content-between align-items-center mb-2"
    >
      <span className="small">
        {index + 1}. {item.className}
      </span>
      <span className={`small fw-semibold ${colorClass}`}>
        {item.count} siswa
      </span>
    </div>
  ));
}

function ClassInsightPanel({ highRiskClasses, lowRiskClasses }) {
  return (
    <div className="dashboard-box today-summary h-100">
      <h6 className="mb-4">Insight Kelas</h6>

      <div className="mb-4">
        <p className="fw-semibold mb-3">🏫 High Risk Terbanyak</p>
        <RankedClassList items={highRiskClasses} colorClass="text-danger" />
      </div>

      <hr />

      <div className="mt-4">
        <p className="fw-semibold mb-3">✅ Low Risk Terbanyak</p>
        <RankedClassList items={lowRiskClasses} colorClass="text-success" />
      </div>
    </div>
  );
}

export default ClassInsightPanel;
