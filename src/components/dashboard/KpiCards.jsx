import { FiUsers, FiAlertTriangle, FiMinusCircle, FiCheckCircle } from "react-icons/fi";

function KpiCards({ dashboardData }) {
  return (
// KPI
    <section className="row g-3 mb-4">

      {/* Total Siswa */}
      <div className="col-6 col-xl-3">
        <div className="dashboard-kpi h-100 p-3">

          <div className="d-flex justify-content-between align-items-start">
            <div>
              <p className="text-secondary mb-1">
                Total Siswa
              </p>

            <h3 className="fw-bold mb-1">
              {dashboardData ? dashboardData.summary.total_siswa : "..."}
            </h3>

            </div>

            <div className="kpi-icon">
              <FiUsers />
            </div>
          </div>

        </div>
      </div>

      {/* Risiko Tinggi */}
      <div className="col-6 col-xl-3">
        <div className="dashboard-kpi h-100 p-3">

          <div className="d-flex justify-content-between align-items-start">
            <div>
              <p className="text-secondary mb-1">
                Risiko Tinggi
              </p>

              <h3 className="fw-bold mb-1 text-danger">
                {dashboardData ? dashboardData.summary.risiko_tinggi : "..."}
              </h3>

              <small className="text-danger">
                {dashboardData
                  ? `${dashboardData.proporsi_risiko.tinggi.percentage}% dari total siswa`
                  : "..."}
              </small>
            </div>

            <div className="kpi-icon">
              <FiAlertTriangle />
            </div>
          </div>

        </div>
      </div>

      {/* Risiko Sedang */}
      <div className="col-6 col-xl-3">
        <div className="dashboard-kpi h-100 p-3">

          <div className="d-flex justify-content-between align-items-start">
            <div>
              <p className="text-secondary mb-1">
                Risiko Sedang
              </p>

              <h3 className="fw-bold mb-1 text-warning">
                {dashboardData ? dashboardData.summary.risiko_sedang : "..."}
              </h3>

              <small className="text-secondary">
                {dashboardData
                  ? `${dashboardData.proporsi_risiko.sedang.percentage}% dari total siswa`
                  : "..."}
              </small>
            </div>

            <div className="kpi-icon">
              <FiMinusCircle />
            </div>
          </div>

        </div>
      </div>

      {/* Risiko Rendah */}
      <div className="col-6 col-xl-3">
        <div className="dashboard-kpi h-100 p-3">

          <div className="d-flex justify-content-between align-items-start">
            <div>
              <p className="text-secondary mb-1">
                Risiko Rendah
              </p>

              <h3 className="fw-bold mb-1 text-success">
                {dashboardData
                  ? dashboardData.proporsi_risiko.rendah.count
                  : "..."}
              </h3>

              <small className="text-success">
                {dashboardData
                  ? `${dashboardData.proporsi_risiko.rendah.percentage}% dari total siswa`
                  : "..."}
              </small>
            </div>

            <div className="kpi-icon">
              <FiCheckCircle />
            </div>
          </div>

        </div>
      </div>

    </section>
  )
}

export default KpiCards