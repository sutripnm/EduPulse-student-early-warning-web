import { getRiskLabel, getRiskBadgeClass } from "../../utils/risk";

function StudentMetrics({
  student,
  riskSummary,
}) {
  const metrics = student?.metrik_kinerja;

  // Pakai helper yang sama dengan StudentListPage/RiskBadge, biar
  // translate label & warna badge-nya konsisten di semua halaman
  // (dan status_risiko yang mentah dari API otomatis diterjemahkan,
  // bukan ditampilkan apa adanya seperti "HIGH").
  const riskStatus = riskSummary?.status_risiko;
  const riskClass = getRiskBadgeClass(riskStatus).replace("risk-badge ", "");

  return (
    <section className="student-metrics mb-3">

      <div className="metric-card">
        <span>Kehadiran</span>
        <strong>
          {metrics?.kehadiran_pct ?? 0}%
        </strong>
      </div>

      <div className="metric-card">
        <span>Pretest</span>
        <strong>
          {metrics?.rata_rata_pretest ?? "-"}
        </strong>
      </div>

      <div className="metric-card">
        <span>Study Hour</span>
        <strong>
          {metrics?.study_hour ?? "-"} Jam
        </strong>
      </div>

      <div className="metric-card">
        <span>Posttest</span>
        <strong>
          {metrics?.rata_rata_posttest ?? "-"}
        </strong>
      </div>

      <div className="metric-card metric-task">
        <span>Tugas</span>
        <strong>
          {metrics?.rata_rata_tugas ?? "-"}
        </strong>
      </div>

      <div
        className={`metric-card metric-risk ${riskClass}`}
      >
        <span>Status Risk</span>

        <strong>
          {getRiskLabel(riskStatus)}
        </strong>
      </div>

    </section>
  );
}

export default StudentMetrics;