import { getRiskLabel } from "../../utils/risk";

function RiskAnalysisCard({ student }) {
  const risk = student?.analisis_ews;

  return (
    <>
      <p className="fw-semibold mb-2">
        📊 Indikator Metrik Utama Siswa
      </p>

      <section className="risk-analysis-card">
        {/* KIRI */}
        <div className="risk-analysis-section">
          <h6 className="fw-semibold">
            🚨 Tingkat Risiko:{" "}
            {risk?.tingkat_risiko_display ||
              getRiskLabel(risk?.status_risiko)}
          </h6>

          <p className="fw-semibold mb-2">
            📌 Faktor Penentu ML:
          </p>

          <p className="mb-0">
            Data faktor penentu ML belum tersedia pada
            response endpoint ini.
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