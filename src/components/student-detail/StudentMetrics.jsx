function StudentMetrics({
  student,
  riskSummary,
}) {
  const metrics = student?.metrik_kinerja;

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

      {/* Tugas - tinggi 2 baris */}
      <div className="metric-card metric-task">
        <span>Tugas</span>
        <strong>
          {metrics?.rata_rata_tugas ?? "-"}
        </strong>
      </div>

      {/* Status Risk - tinggi 2 baris */}
      <div className="metric-card metric-risk">
        <span>Status Risk</span>
        <strong>
          {riskSummary?.status_risiko || "-"}
        </strong>
      </div>
    </section>
  );
}

export default StudentMetrics;