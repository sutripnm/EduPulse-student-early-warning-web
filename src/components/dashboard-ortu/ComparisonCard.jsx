// Kartu "sekarang vs bulan lalu" dengan indikator tren naik/turun.
// Dipakai 5x di DashboardOrtuPage untuk kehadiran, study time, dan
// nilai (pretest/assessment/posttest).
function ComparisonCard({ title, unit, sekarang, bulanLalu, selisih }) {
  const hasData =
    sekarang !== null &&
    sekarang !== undefined &&
    bulanLalu !== null &&
    bulanLalu !== undefined;

  // Kalau backend belum kirim `selisih` langsung, hitung sendiri dari
  // sekarang - bulanLalu (dibulatkan 1 desimal).
  const diff = hasData
    ? (selisih ?? Math.round((sekarang - bulanLalu) * 10) / 10)
    : null;

  let trendClass = "text-secondary";
  let trendSign = "";

  if (diff > 0) {
    trendClass = "text-success";
    trendSign = "▲ +";
  } else if (diff < 0) {
    trendClass = "text-danger";
    trendSign = "▼ ";
  } else if (diff === 0) {
    trendSign = "▬ ";
  }

  return (
    <div className="col-md-4 col-6">
      <div className="dashboard-ortu-box h-100 text-center">
        <p className="small text-secondary mb-1">{title}</p>

        <h4 className="fw-bold mb-1">
          {sekarang ?? "-"}
          {unit && <span className="fs-6 fw-normal"> {unit}</span>}
        </h4>

        <p className="small text-secondary mb-0">
          Bulan lalu: {hasData ? `${bulanLalu}${unit ? ` ${unit}` : ""}` : "-"}
        </p>

        {hasData && (
          <p className={`small fw-semibold mb-0 ${trendClass}`}>
            {trendSign}
            {Math.abs(diff)}
            {unit ? ` ${unit}` : ""}
          </p>
        )}
      </div>
    </div>
  );
}

export default ComparisonCard;
