import { getRiskLabel } from "../../utils/risk";

function RiskAnalysisCard({
  student,
  riskSummary,
  selectedMapel,
  recommendation,
  onGenerateRecommendation,
  recommendationLoading,
}) {

  const analysis = student?.analisis_ews;

  const riskLabel =
    riskSummary?.status_risiko ||
    "-";

  const recommendationText =
    recommendation?.guru ||
    (!selectedMapel
      ? "Pilih mata pelajaran untuk melihat rekomendasi tindakan yang lebih spesifik."
      : "Rekomendasi AI belum dibuat untuk mata pelajaran yang dipilih.");

  return (
    <>
      <p className="fw-semibold mb-2">
        📊 Indikator Metrik Utama Siswa
      </p>

      <section className="risk-analysis-card">

        {/* ANALISIS EWS */}
        <div className="risk-analysis-section risk-ews-section">
          <h6 className="fw-semibold mb-3">
            📊 Analisis EWS
          </h6>

          <div className="risk-ews-content">
            <span className="risk-ews-label">
              Tingkat Risiko
            </span>

            <strong className="risk-ews-status">
              {riskSummary?.status_risiko || "-"}
            </strong>
          </div>

          <div className="mt-3">
            <span className="risk-ews-label">
              Status Risiko
            </span>

            <strong className="risk-ews-status">
              {riskSummary?.status_risiko || "-"}
            </strong>
          </div>
        </div>

        {/* REKOMENDASI */}
        <div className="risk-analysis-section risk-recommendation-section">
          <div>
            <h6 className="fw-semibold mb-3">
              💡 Rekomendasi Tindakan
            </h6>

            <p className="risk-recommendation-text mb-0">
              {recommendationText}
            </p>
          </div>

          <div className="risk-ai-action">
          <button
            type="button"
            className="btn risk-ai-button"
            onClick={onGenerateRecommendation}
            disabled={recommendationLoading || !selectedMapel}
          >
            {recommendationLoading
              ? "Generating..."
              : "✨ Generate Rekomendasi AI"}
          </button>
          </div>
        </div>

      </section>
    </>
  );
}

export default RiskAnalysisCard;