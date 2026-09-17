function StudentMetrics({ student }) {
  // Ambil 2 bagian data siswa yang relevan buat kartu metrik ini:
  // angka kinerja (kehadiran, nilai, dst) dan hasil analisis risiko.
  const metrics = student?.metrik_kinerja;
  const risk = student?.analisis_ews;

  return (
    <section className="student-metrics mb-3">
      <div className="metric-card">
        <span>Kehadiran</span>
        <strong>
          {metrics?.kehadiran_pct ?? 0}%
        </strong>
      </div>

      <div className="metric-card">
        <span>Rata-rata Nilai</span>
        <strong>
          {metrics?.rata_rata_nilai ?? "-"}
        </strong>
      </div>

      <div className="metric-card">
        <span>Rata-rata Nilai Tugas</span>
        <strong>
          {metrics?.rata_rata_tugas ?? "-"}
        </strong>
      </div>

      <div className="metric-card">
        <span>Study Hour</span>
        <strong>
          {metrics?.study_hour ?? "-"} Jam
        </strong>
      </div>

      <div className="metric-card metric-risk">
        <span>Result Status Risk</span>
        <strong>
          {risk?.tingkat_risiko_display || "-"}
        </strong>
      </div>
    </section>
  );
}

export default StudentMetrics;