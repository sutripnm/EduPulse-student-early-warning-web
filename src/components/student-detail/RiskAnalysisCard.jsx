import { getRiskLabel } from "../../utils/risk";

function RiskAnalysisCard({ student }) {
  return (
    <>
      <p className="fw-semibold mb-2">📊 Analisis Risiko Siswa</p>

      <section className="risk-analysis-card">
        <div className="risk-analysis-section">
          <h6 className="fw-semibold">🚨 Status Risiko</h6>
          <p className="mb-0">
            Siswa saat ini memiliki status risiko{" "}
            <strong>{getRiskLabel(student.status_risk)}</strong>.
          </p>
        </div>
      </section>
    </>
  );
}

export default RiskAnalysisCard;
