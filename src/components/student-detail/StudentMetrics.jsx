import { getRiskLabel } from "../../utils/risk";

function StudentMetrics({ student }) {
  return (
    <section className="student-metrics mb-3">
      {/* Kehadiran */}
      <div className="metric-card">
        <span>Kehadiran</span>
        <strong>{student.presensi ?? 0}%</strong>
      </div>

      {/* Rata-rata Nilai */}
      <div className="metric-card">
        <span>Rata-rata Nilai</span>
        <strong>{student.nilai ?? "-"}</strong>
      </div>

      {/* Rata-rata Nilai Tugas */}
      <div className="metric-card">
        <span>Rata-rata Nilai Tugas</span>
        <strong>{student.nilai_tugas ?? "-"}</strong>
      </div>

      {/* Study Hour */}
      <div className="metric-card">
        <span>Study Hour</span>
        <strong>{student.study_hour ?? "-"} Jam</strong>
      </div>

      {/* Status Risiko */}
      <div className="metric-card metric-risk">
        <span>Result Status Risk</span>
        <strong>{getRiskLabel(student.status_risk)}</strong>
      </div>
    </section>
  );
}

export default StudentMetrics;