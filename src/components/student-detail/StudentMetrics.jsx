function StudentMetrics({
  student,
  riskSummary,
}) {
  const metrics = student?.metrik_kinerja;

  const riskStatus = String(
    riskSummary?.status_risiko || ""
  ).toUpperCase();

  const riskClass =
    riskStatus === "HIGH" ||
    riskStatus === "TINGGI"
      ? "risk-high"
      : riskStatus === "MEDIUM" ||
        riskStatus === "SEDANG"
      ? "risk-medium"
      : riskStatus === "LOW" ||
        riskStatus === "RENDAH"
      ? "risk-low"
      : "";

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
          {riskSummary?.status_risiko || "-"}
        </strong>
      </div>

    </section>
  );
}

export default StudentMetrics;