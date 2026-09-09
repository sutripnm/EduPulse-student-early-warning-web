import { getRiskLabel } from "../../utils/risk";

function StudentMetrics({ student }) {
  return (
    <section className="student-metrics mb-4">
      <div className="metric-card">
        <span>Kehadiran</span>
        <strong>{student.presensi ?? 0}%</strong>
      </div>

      <div className="metric-card">
        <span>Nilai</span>
        <strong>{student.nilai ?? "-"}</strong>
      </div>

      <div className="metric-card metric-risk">
        <span>Status Risiko</span>
        <strong>{getRiskLabel(student.status_risk)}</strong>
      </div>
    </section>
  );
}

export default StudentMetrics;
