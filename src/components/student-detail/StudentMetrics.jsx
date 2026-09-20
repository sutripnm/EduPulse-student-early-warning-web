import {
  getRiskLabel,
  getRiskBadgeClass,
} from "../../utils/risk";

/** Komponen atau fungsi StudentMetrics yang menangani bagian UI terkait. */
function StudentMetrics({ student }) {
  const metrics = student?.metrik_kinerja;
  const analysis = student?.analisis_ews;

  // Status risiko berasal dari endpoint detail-siswa
  const riskStatus = analysis?.status_risiko;

  // Gunakan helper yang sama agar warna dan label konsisten
  // dengan komponen risk lainnya.
  const riskClass = getRiskBadgeClass(
    riskStatus
  ).replace("risk-badge ", "");

  return (
    <section className="student-metrics mb-3">

      {/* Kehadiran */}
      <div className="metric-card">
        <span>Kehadiran</span>

        <strong>
          {metrics?.kehadiran_pct ?? 0}%
        </strong>
      </div>

      {/* Pretest */}
      <div className="metric-card">
        <span>Pretest</span>

        <strong>
          {metrics?.rata_rata_pretest ?? "-"}
        </strong>
      </div>

      {/* Study Hour */}
      <div className="metric-card">
        <span>Study Hour</span>

        <strong>
          {metrics?.study_hour ?? "-"} Jam
        </strong>
      </div>

      {/* Posttest */}
      <div className="metric-card">
        <span>Posttest</span>

        <strong>
          {metrics?.rata_rata_posttest ?? "-"}
        </strong>
      </div>

      {/* Tugas */}
      <div className="metric-card metric-task">
        <span>Tugas</span>

        <strong>
          {metrics?.rata_rata_tugas ?? "-"}
        </strong>
      </div>

      {/* Status Risk */}
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
