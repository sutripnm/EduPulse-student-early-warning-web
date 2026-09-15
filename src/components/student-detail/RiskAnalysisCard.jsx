import { getRiskLabel } from "../../utils/risk";

function RiskAnalysisCard({ student }) {
  const risk = student?.analisis_ews;

  const riskDisplay =
    risk?.tingkat_risiko_display ||
    getRiskLabel(risk?.status_risiko);

  return (
    <>
      <p className="fw-semibold mb-2">
        📊 Indikator Metrik Utama Siswa
      </p>

      <section className="risk-analysis-card">
        {/* KIRI */}
        <div className="risk-analysis-section">
          <h6 className="fw-semibold">
            🚨 Tingkat Risiko: {riskDisplay}
          </h6>

          <p className="fw-semibold mb-2">
            📌 Status Early Warning System
          </p>

          <p className="mb-0">
            Status risiko siswa saat ini adalah{" "}
            <strong>{riskDisplay}</strong>.
          </p>
        </div>

        {/* KANAN */}
        <div className="risk-analysis-section">
          <h6 className="fw-semibold text-center">
            💡 Rekomendasi Tindakan
          </h6>

          <p className="text-center mt-4 mb-0">
            {risk?.rekomendasi_tindakan || "-"}
          </p>
        </div>
      </section>
    </>
  );
}

export default RiskAnalysisCard;