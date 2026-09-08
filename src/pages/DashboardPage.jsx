import useDashboardData from "../hooks/useDashboardData";
import KpiCards from "../components/dashboard/KpiCards";
import Sidebar from "../components/Sidebar";
import "../styles/dashboard-page.css";
import { riskFactorColors } from "../hooks/useDashboardData";
import PerformanceTrendChart from "../components/dashboard/PerformanceTrendChart";
import { ResponsiveContainer,Line, LineChart, XAxis, YAxis, Tooltip, CartesianGrid, Pie, PieChart, Cell, Bar, BarChart, Legend} from 'recharts';
import DashboardHeader from "../components/dashboard/DashboardHeader";
import RiskDonutChart from "../components/dashboard/RiskDonutChart";
import TopInterventionTable from "../components/dashboard/TopInterventionTable";

function DashboardPage() {
  const { dashboardData, riskData, riskByClassData, riskFactorData, topRiskStudents, topHighRiskClasses, topLowRiskClasses } = useDashboardData();

  return (
    <main className="dashboard-page d-flex">
      <Sidebar />
      <section className="dashboard-main flex-grow-1 p-4">

        {/* Header */}
        <DashboardHeader dashboardData={dashboardData} />

        {/* KPI Cards */}
        <KpiCards dashboardData={dashboardData} />

        {/* ==============================================================
              Main Analytics Section
        ============================================================== */}
          <section className="row g-3">

            {/* Left Content */}
            <div className="col-lg-9">

              <div className="row g-3">

                {/* Charts */}
                <PerformanceTrendChart dashboardData={dashboardData} />

                {/* Donut Chart */}
                <RiskDonutChart data={riskData} />

              </div>

              {/* ==============================================================
                  Top 5 Students Needing Intervention Section
              ============================================================== */}
                <TopInterventionTable topRiskStudents={topRiskStudents} />

            </div>

            {/* ==============================================================
                  Today's Summary Section / Ringkasan Hari Ini
            ============================================================== */}
            <div className="col-lg-3">

              <div className="dashboard-box today-summary h-100">

                <h6 className="mb-4">
                  Insight Kelas
                </h6>

                {/* High Risk */}
                <div className="mb-4">

                  <p className="fw-semibold mb-3">
                    🏫 High Risk Terbanyak
                  </p>

                  {topHighRiskClasses.map((item, index) => (
                    <div
                      key={item.className}
                      className="d-flex justify-content-between align-items-center mb-2"
                    >
                      <span className="small">
                        {index + 1}. {item.className}
                      </span>

                      <span className="small fw-semibold text-danger">
                        {item.count} siswa
                      </span>
                    </div>
                  ))}

                </div>

                <hr />

                {/* Low Risk */}
                <div className="mt-4">

                  <p className="fw-semibold mb-3">
                    ✅ Low Risk Terbanyak
                  </p>

                  {topLowRiskClasses.map((item, index) => (
                    <div
                      key={item.className}
                      className="d-flex justify-content-between align-items-center mb-2"
                    >
                      <span className="small">
                        {index + 1}. {item.className}
                      </span>

                      <span className="small fw-semibold text-success">
                        {item.count} siswa
                      </span>
                    </div>
                  ))}

                </div>

              </div>

            </div>

          </section>

        {/* ==============================================================
              SCHOOL ANALYTICS SECTION
        ============================================================== */}
          <section className="mt-5">

            <h5 className="mb-3">
              LAPORAN ANALITIS & STATISTIK SEKOLAH
            </h5>

            <div className="d-flex gap-2 mb-3">

              <button className="btn btn-primary rounded-pill">
                Filter Kelas
              </button>

              <button className="btn btn-primary rounded-pill">
                Filter Mapel
              </button>
            </div>

            <div className="row g-3">

              <div className="col-lg-6">
                <div className="dashboard-box analytics-box">

                  <h6 className="mb-1">
                    📊 Perbandingan Risiko per Kelas
                  </h6>

                  <p className="small mb-3">
                    Jumlah siswa berdasarkan tingkat risiko
                  </p>

                  <div className="analytics-chart-container">

                    <ResponsiveContainer width="100%" height={260}>

                    <BarChart data={riskByClassData}>

                      <CartesianGrid strokeDasharray="3 3" />

                      <XAxis dataKey="nama_kelas" />

                      <YAxis />

                      <Tooltip />

                      <Bar
                        dataKey="jumlah_high_risk"
                        name="Risiko Tinggi"
                        fill="#dc3545"
                      />

                    </BarChart>

                    </ResponsiveContainer>

                  </div>

                </div>
              </div>

              <div className="col-lg-6">
        <div className="dashboard-box analytics-box">

          <h6 className="mb-1">
            🎯 Faktor Utama Risiko ML
          </h6>

          <p className="small mb-2">
            Faktor yang paling berkontribusi terhadap risiko siswa
          </p>

          <div className="analytics-chart-container">

            <ResponsiveContainer width="100%" height={260}>

              <PieChart>

                <Pie
                  data={riskFactorData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={85}
                  label={({ percent }) =>
                    `${(percent * 100).toFixed(0)}%`
                  }
                >
                  {riskFactorData.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={riskFactorColors[index]}
                    />
                  ))}
                </Pie>

                <Tooltip />

                <Legend />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>
              </div>

            </div>

          </section>
      </section>
    </main>
  );
}

export default DashboardPage;