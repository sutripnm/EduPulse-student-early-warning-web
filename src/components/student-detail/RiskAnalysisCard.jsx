import {
  BsBarChartFill,
  BsLightbulbFill,
} from "react-icons/bs";

import { getRiskLabel } from "../../utils/risk";

function RiskAnalysisCard({
  student,
  selectedMapel,
  recommendation,
  recommendationLoading,
}) {
  const analysis =
    student?.analisis_ews;

  const riskStatus =
    analysis?.status_risiko;

  return (
    <>
      <p className="fw-semibold mb-2">
        <BsBarChartFill className="me-2" />
        Indikator Metrik Utama Siswa
      </p>

      <section className="risk-analysis-card">

        {/* =========================
            ANALISIS EWS
            ========================= */}
        <div className="risk-analysis-section risk-ews-section">
          <h6 className="fw-semibold mb-3">
            <BsBarChartFill className="me-2" />
            Analisis EWS
          </h6>

          <div className="risk-ews-content">
            <span className="risk-ews-label">
              Status Risiko
            </span>

            <strong className="risk-ews-status">
              {getRiskLabel(
                riskStatus
              )}
            </strong>
          </div>
        </div>

        {/* =========================
            REKOMENDASI
            ========================= */}
        <div className="risk-analysis-section risk-recommendation-section">

          <div>
            <h6 className="fw-semibold mb-3">
              <BsLightbulbFill className="me-2" />
              Rekomendasi Tindakan
            </h6>

            {recommendationLoading ? (
              <p className="risk-recommendation-text mb-0">
                Sedang menyiapkan rekomendasi...
              </p>
            ) : recommendation?.guru ? (
              <p className="risk-recommendation-text mb-0">
                {recommendation.guru}
              </p>
            ) : !selectedMapel ? (
              <p className="risk-recommendation-text mb-0">
                Belum ada mata pelajaran yang dipilih.
              </p>
            ) : (
              <p className="risk-recommendation-text mb-0">
                Rekomendasi belum tersedia untuk
                mata pelajaran ini.
              </p>
            )}
          </div>

        </div>

      </section>
    </>
  );
}

export default RiskAnalysisCard;