import { getRiskLabel } from "../../utils/risk";

function RiskAnalysisCard({ student }) {
  return (
    <>
      <p className="fw-semibold mb-2">
        📊 Indikator Metrik Utama Siswa
      </p>

      <section className="risk-analysis-card">
        {/* KIRI */}
        <div className="risk-analysis-section">
          <h6 className="fw-semibold">
            🚨 Tingkat Risiko: {getRiskLabel(student.status_risk)}
          </h6>

          <p className="fw-semibold mb-2">
            📌 Faktor Penentu ML:
          </p>

          <ol className="risk-factor-list">
            <li>
              Absensi di bawah batas 70%.
            </li>
          </ol>
        </div>

        {/* KANAN */}
        <div className="risk-analysis-section">
          <h6 className="fw-semibold text-center">
            💡 Rekomendasi Tindakan
          </h6>

          <ul className="risk-recommendation-list">
            <li>
              Terbitkan Surat Pemberitahuan Wali.
            </li>

            <li>
              Jadwalkan konseling individu (BK).
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}

export default RiskAnalysisCard;